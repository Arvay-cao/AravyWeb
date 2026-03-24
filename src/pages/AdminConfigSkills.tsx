import { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { skillsConfig as defaultSkillsConfig } from '@/config';
import type { SkillCategory } from '@/config';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableSkillCategoryProps {
  category: SkillCategory;
  index: number;
  updateCategory: <K extends keyof SkillCategory>(index: number, field: K, value: SkillCategory[K]) => void;
  removeCategory: (index: number) => void;
  addSkill: (categoryIndex: number, skill: string) => void;
  removeSkill: (categoryIndex: number, skill: string) => void;
}

function SortableSkillCategory({ 
  category, 
  index, 
  updateCategory, 
  removeCategory, 
  addSkill, 
  removeSkill 
}: SortableSkillCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical 
                {...attributes} 
                {...listeners} 
                className="w-5 h-5 text-[#8c8c91] cursor-move hover:text-[#f0f0f0] transition-colors" 
              />
              <CardTitle className="text-[#f0f0f0] text-lg">分类 {index + 1}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCategory(index)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">分类名称</Label>
            <Input
              value={category.name}
              onChange={(e) => updateCategory(index, 'name', e.target.value)}
              placeholder="例如：前端框架"
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">技能列表</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-[#050505] text-[#f0f0f0] flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index, skill)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="输入技能名称，按回车添加"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addSkill(index, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminConfigSkills() {
  const [label, setLabel] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setLabel(savedConfig.skills?.label || defaultSkillsConfig.label);
    setHeadline(savedConfig.skills?.headline || defaultSkillsConfig.headline);
    setDescription(savedConfig.skills?.description || defaultSkillsConfig.description);
    setCategories(savedConfig.skills?.categories || defaultSkillsConfig.categories);
  }, []);

  const handleSave = () => {
    saveSiteConfig({
      skills: {
        label,
        headline,
        description,
        categories,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setLabel(defaultSkillsConfig.label);
    setHeadline(defaultSkillsConfig.headline);
    setDescription(defaultSkillsConfig.description);
    setCategories(defaultSkillsConfig.categories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: '新分类', skills: [] }]);
  };

  const updateCategory = <K extends keyof SkillCategory>(index: number, field: K, value: SkillCategory[K]) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setCategories(newCategories);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const addSkill = (categoryIndex: number, skill: string) => {
    if (skill && !categories[categoryIndex].skills.includes(skill)) {
      const newCategories = [...categories];
      newCategories[categoryIndex].skills.push(skill);
      setCategories(newCategories);
    }
  };

  const removeSkill = (categoryIndex: number, skill: string) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].skills = newCategories[categoryIndex].skills.filter(s => s !== skill);
    setCategories(newCategories);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCategoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.name === active.id);
        const newIndex = items.findIndex((item) => item.name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">技能配置</h1>
          <p className="text-[#8c8c91] mt-1">管理技术栈和技能展示</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaved ? '已保存' : '保存'}
          </Button>
        </div>
      </div>

      {/* Section Settings */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">板块设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标签</Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Skills"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标题</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="技术栈"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">描述</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="技能描述..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skill Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#f0f0f0]">技能分类 ({categories.length})</h2>
          <Button
            onClick={addCategory}
            className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加分类
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCategoryDragEnd}
        >
          <SortableContext
            items={categories.map(c => c.name)}
            strategy={verticalListSortingStrategy}
          >
            {categories.map((category, index) => (
              <SortableSkillCategory
                key={category.name}
                category={category}
                index={index}
                updateCategory={updateCategory}
                removeCategory={removeCategory}
                addSkill={addSkill}
                removeSkill={removeSkill}
              />
            ))}
          </SortableContext>
        </DndContext>

        {categories.length === 0 && (
          <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10">
            <p className="text-[#8c8c91]">暂无分类，点击上方按钮添加</p>
          </div>
        )}
      </div>
    </div>
  );
}
