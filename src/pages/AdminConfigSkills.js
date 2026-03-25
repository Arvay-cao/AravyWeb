import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function SortableSkillCategory({ category, index, updateCategory, removeCategory, addSkill, removeSkill }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = useSortable({ id: category.name });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return (_jsx("div", { ref: setNodeRef, style: style, className: "sortable-item", children: _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(GripVertical, { ...attributes, ...listeners, className: "w-5 h-5 text-[#8c8c91] cursor-move hover:text-[#f0f0f0] transition-colors" }), _jsxs(CardTitle, { className: "text-[#f0f0f0] text-lg", children: ["\u5206\u7C7B ", index + 1] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeCategory(index), className: "text-red-400 hover:text-red-300 hover:bg-red-500/10", children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5206\u7C7B\u540D\u79F0" }), _jsx(Input, { value: category.name, onChange: (e) => updateCategory(index, 'name', e.target.value), placeholder: "\u4F8B\u5982\uFF1A\u524D\u7AEF\u6846\u67B6", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6280\u80FD\u5217\u8868" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: category.skills.map((skill) => (_jsxs(Badge, { variant: "secondary", className: "bg-[#050505] text-[#f0f0f0] flex items-center gap-1", children: [skill, _jsx("button", { onClick: () => removeSkill(index, skill), className: "ml-1 hover:text-red-400", children: _jsx(X, { className: "w-3 h-3" }) })] }, skill))) }), _jsx(Input, { placeholder: "\u8F93\u5165\u6280\u80FD\u540D\u79F0\uFF0C\u6309\u56DE\u8F66\u6DFB\u52A0", onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            addSkill(index, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }, className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] })] }) }));
}
export default function AdminConfigSkills() {
    const [label, setLabel] = useState('');
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
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
    const updateCategory = (index, field, value) => {
        const newCategories = [...categories];
        newCategories[index] = { ...newCategories[index], [field]: value };
        setCategories(newCategories);
    };
    const removeCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };
    const addSkill = (categoryIndex, skill) => {
        if (skill && !categories[categoryIndex].skills.includes(skill)) {
            const newCategories = [...categories];
            newCategories[categoryIndex].skills.push(skill);
            setCategories(newCategories);
        }
    };
    const removeSkill = (categoryIndex, skill) => {
        const newCategories = [...categories];
        newCategories[categoryIndex].skills = newCategories[categoryIndex].skills.filter(s => s !== skill);
        setCategories(newCategories);
    };
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const handleCategoryDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setCategories((items) => {
                const oldIndex = items.findIndex((item) => item.name === active.id);
                const newIndex = items.findIndex((item) => item.name === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u6280\u80FD\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u7BA1\u7406\u6280\u672F\u6808\u548C\u6280\u80FD\u5C55\u793A" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u677F\u5757\u8BBE\u7F6E" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u7B7E" }), _jsx(Input, { value: label, onChange: (e) => setLabel(e.target.value), placeholder: "Skills", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u9898" }), _jsx(Input, { value: headline, onChange: (e) => setHeadline(e.target.value), placeholder: "\u6280\u672F\u6808", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u63CF\u8FF0" }), _jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "\u6280\u80FD\u63CF\u8FF0...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-lg font-medium text-[#f0f0f0]", children: ["\u6280\u80FD\u5206\u7C7B (", categories.length, ")"] }), _jsxs(Button, { onClick: addCategory, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u6DFB\u52A0\u5206\u7C7B"] })] }), _jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleCategoryDragEnd, children: _jsx(SortableContext, { items: categories.map(c => c.name), strategy: verticalListSortingStrategy, children: categories.map((category, index) => (_jsx(SortableSkillCategory, { category: category, index: index, updateCategory: updateCategory, removeCategory: removeCategory, addSkill: addSkill, removeSkill: removeSkill }, category.name))) }) }), categories.length === 0 && (_jsx("div", { className: "text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10", children: _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u5206\u7C7B\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0" }) }))] })] }));
}
