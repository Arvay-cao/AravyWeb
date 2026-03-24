import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, RotateCcw, Plus, X, GripVertical, Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { projectsConfig as defaultProjectsConfig } from '@/config';
import type { Project } from '@/config';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableProjectCardProps {
  project: Project;
  index: number;
  updateProject: <K extends keyof Project>(id: number, field: K, value: Project[K]) => void;
  removeProject: (id: number) => void;
  handleOpenImageDialog: (projectId: number) => void;
  triggerFileInput: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (projectId: number) => void;
  addTechStack: (id: number, tech: string) => void;
  removeTechStack: (id: number, tech: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function SortableProjectCard({ 
  project, 
  index, 
  updateProject, 
  removeProject, 
  handleOpenImageDialog, 
  triggerFileInput, 
  handleFileUpload, 
  handleRemoveImage, 
  addTechStack, 
  removeTechStack,
  fileInputRef
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

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
              <CardTitle className="text-[#f0f0f0] text-lg">项目 {index + 1}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">项目名称</Label>
              <Input
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">分类</Label>
              <Input
                value={project.category}
                onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">项目描述</Label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">年份</Label>
              <Input
                value={project.year}
                onChange={(e) => updateProject(project.id, 'year', e.target.value)}
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#8c8c91]">封面图片</Label>
              {project.image ? (
                <div className="relative group aspect-[16/10] rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={triggerFileInput}
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-12 h-12"
                    >
                      <Upload className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => handleRemoveImage(project.id)}
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-12 h-12"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={triggerFileInput}
                    variant="outline"
                    className="flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6" />
                      <span>上传图片</span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => handleOpenImageDialog(project.id)}
                    variant="outline"
                    className="flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-6 h-6" />
                      <span>输入链接</span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">技术栈</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-[#050505] text-[#f0f0f0] flex items-center gap-1"
                >
                  {tech}
                  <button
                    onClick={() => removeTechStack(project.id, tech)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="输入技术名称，按回车添加"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTechStack(project.id, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">演示链接</Label>
              <Input
                value={project.demoUrl || ''}
                onChange={(e) => updateProject(project.id, 'demoUrl', e.target.value)}
                placeholder="https://demo.example.com"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">源码链接</Label>
              <Input
                value={project.repoUrl || ''}
                onChange={(e) => updateProject(project.id, 'repoUrl', e.target.value)}
                placeholder="https://github.com/..."
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminConfigProjects() {
  const [label, setLabel] = useState('');
  const [headline, setHeadline] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setLabel(savedConfig.projects?.label || defaultProjectsConfig.label);
    setHeadline(savedConfig.projects?.headline || defaultProjectsConfig.headline);
    setProjects(savedConfig.projects?.projects || defaultProjectsConfig.projects);
  }, []);

  const handleSave = () => {
    saveSiteConfig({
      projects: {
        label,
        headline,
        projects,
      },
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setLabel(defaultProjectsConfig.label);
    setHeadline(defaultProjectsConfig.headline);
    setProjects(defaultProjectsConfig.projects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: '新项目',
      description: '项目描述',
      image: '',
      category: '分类',
      year: new Date().getFullYear().toString(),
      techStack: [],
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = <K extends keyof Project>(id: number, field: K, value: Project[K]) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addTechStack = (id: number, tech: string) => {
    const project = projects.find(p => p.id === id);
    if (project && tech && !project.techStack.includes(tech)) {
      updateProject(id, 'techStack', [...project.techStack, tech]);
    }
  };

  const removeTechStack = (id: number, tech: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      updateProject(id, 'techStack', project.techStack.filter(t => t !== tech));
    }
  };

  const handleOpenImageDialog = (projectId: number) => {
    setCurrentProjectId(projectId);
    setShowImageDialog(true);
  };

  const handleAddImage = () => {
    if (imageUrl.trim() && currentProjectId) {
      updateProject(currentProjectId, 'image', imageUrl.trim());
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (currentProjectId) {
          updateProject(currentProjectId, 'image', result);
        }
        setShowImageDialog(false);
      };
      reader.onerror = () => {
        alert('文件读取失败，请重试');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (projectId: number) => {
    updateProject(projectId, 'image', '');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 防止误触，提升体验
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback(() => {
    // Drag started
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Dragging over target
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        // 找到两个元素在数组中的位置
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          console.error('找不到对应的元素');
          return items;
        }

        // 直接交换两个位置的元素
        const newItems = [...items];
        const temp = newItems[oldIndex];
        newItems[oldIndex] = newItems[newIndex];
        newItems[newIndex] = temp;

        return newItems;
      });
    }
  }, [projects]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">项目配置</h1>
          <p className="text-[#8c8c91] mt-1">管理项目案例展示</p>
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
                placeholder="Projects"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标题</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="项目案例"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#f0f0f0]">项目列表 ({projects.length})</h2>
          <Button
            onClick={addProject}
            className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加项目
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map(p => p.id)}
            strategy={rectSortingStrategy}
          >
            {projects.map((project, index) => (
              <SortableProjectCard
                key={project.id}
                project={project}
                index={index}
                updateProject={updateProject}
                removeProject={removeProject}
                handleOpenImageDialog={handleOpenImageDialog}
                triggerFileInput={triggerFileInput}
                handleFileUpload={handleFileUpload}
                handleRemoveImage={handleRemoveImage}
                addTechStack={addTechStack}
                removeTechStack={removeTechStack}
                fileInputRef={fileInputRef}
              />
            ))}
          </SortableContext>
        </DndContext>

        {projects.length === 0 && (
          <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10">
            <p className="text-[#8c8c91]">暂无项目，点击上方按钮添加</p>
          </div>
        )}
      </div>

      {/* Image URL Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
          <DialogHeader>
            <DialogTitle>添加项目封面图片</DialogTitle>
            <DialogDescription className="text-[#8c8c91]">
              输入图片 URL 地址
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddImage();
              }
            }}
            className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImageDialog(false)}
              className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
            >
              取消
            </Button>
            <Button
              onClick={handleAddImage}
              className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
