import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, RotateCcw, Plus, X, GripVertical, Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { projectsConfig as defaultProjectsConfig } from '@/config';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function SortableProjectCard({ project, index, updateProject, removeProject, handleOpenImageDialog, triggerFileInput, handleFileUpload, handleRemoveImage, addTechStack, removeTechStack, fileInputRef }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = useSortable({ id: project.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return (_jsx("div", { ref: setNodeRef, style: style, className: "sortable-item", children: _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(GripVertical, { ...attributes, ...listeners, className: "w-5 h-5 text-[#8c8c91] cursor-move hover:text-[#f0f0f0] transition-colors" }), _jsxs(CardTitle, { className: "text-[#f0f0f0] text-lg", children: ["\u9879\u76EE ", index + 1] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeProject(project.id), className: "text-red-400 hover:text-red-300 hover:bg-red-500/10", children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u9879\u76EE\u540D\u79F0" }), _jsx(Input, { value: project.title, onChange: (e) => updateProject(project.id, 'title', e.target.value), className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5206\u7C7B" }), _jsx(Input, { value: project.category, onChange: (e) => updateProject(project.id, 'category', e.target.value), className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u9879\u76EE\u63CF\u8FF0" }), _jsx(Textarea, { value: project.description, onChange: (e) => updateProject(project.id, 'description', e.target.value), className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5E74\u4EFD" }), _jsx(Input, { value: project.year, onChange: (e) => updateProject(project.id, 'year', e.target.value), className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5C01\u9762\u56FE\u7247" }), project.image ? (_jsxs("div", { className: "relative group aspect-[16/10] rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10", children: [_jsx("img", { src: project.image, alt: project.title, className: "w-full h-full object-cover" }), _jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsx(Button, { onClick: triggerFileInput, variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-12 h-12", children: _jsx(Upload, { className: "w-5 h-5" }) }), _jsx(Button, { onClick: () => handleRemoveImage(project.id), variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-12 h-12", children: _jsx(X, { className: "w-5 h-5" }) })] })] })) : (_jsxs("div", { className: "flex gap-3", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsx(Button, { onClick: triggerFileInput, variant: "outline", className: "flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Upload, { className: "w-6 h-6" }), _jsx("span", { children: "\u4E0A\u4F20\u56FE\u7247" })] }) }), _jsx(Button, { onClick: () => handleOpenImageDialog(project.id), variant: "outline", className: "flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(ImageIcon, { className: "w-6 h-6" }), _jsx("span", { children: "\u8F93\u5165\u94FE\u63A5" })] }) })] }))] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6280\u672F\u6808" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: project.techStack.map((tech) => (_jsxs(Badge, { variant: "secondary", className: "bg-[#050505] text-[#f0f0f0] flex items-center gap-1", children: [tech, _jsx("button", { onClick: () => removeTechStack(project.id, tech), className: "ml-1 hover:text-red-400", children: _jsx(X, { className: "w-3 h-3" }) })] }, tech))) }), _jsx(Input, { placeholder: "\u8F93\u5165\u6280\u672F\u540D\u79F0\uFF0C\u6309\u56DE\u8F66\u6DFB\u52A0", onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            addTechStack(project.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }, className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6F14\u793A\u94FE\u63A5" }), _jsx(Input, { value: project.demoUrl || '', onChange: (e) => updateProject(project.id, 'demoUrl', e.target.value), placeholder: "https://demo.example.com", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6E90\u7801\u94FE\u63A5" }), _jsx(Input, { value: project.repoUrl || '', onChange: (e) => updateProject(project.id, 'repoUrl', e.target.value), placeholder: "https://github.com/...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] })] })] }) }));
}
export default function AdminConfigProjects() {
    const [label, setLabel] = useState('');
    const [headline, setHeadline] = useState('');
    const [projects, setProjects] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const fileInputRef = useRef(null);
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
        const newProject = {
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
    const updateProject = (id, field, value) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    };
    const removeProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };
    const addTechStack = (id, tech) => {
        const project = projects.find(p => p.id === id);
        if (project && tech && !project.techStack.includes(tech)) {
            updateProject(id, 'techStack', [...project.techStack, tech]);
        }
    };
    const removeTechStack = (id, tech) => {
        const project = projects.find(p => p.id === id);
        if (project) {
            updateProject(id, 'techStack', project.techStack.filter(t => t !== tech));
        }
    };
    const handleOpenImageDialog = (projectId) => {
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
    const handleFileUpload = (e) => {
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
                const result = event.target?.result;
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
    const handleRemoveImage = (projectId) => {
        updateProject(projectId, 'image', '');
    };
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // 防止误触，提升体验
        },
    }), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const handleDragStart = useCallback(() => {
        // Drag started
    }, []);
    const handleDragOver = useCallback(() => {
        // Dragging over target
    }, []);
    const handleDragEnd = useCallback((event) => {
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u9879\u76EE\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u7BA1\u7406\u9879\u76EE\u6848\u4F8B\u5C55\u793A" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u677F\u5757\u8BBE\u7F6E" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u7B7E" }), _jsx(Input, { value: label, onChange: (e) => setLabel(e.target.value), placeholder: "Projects", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u9898" }), _jsx(Input, { value: headline, onChange: (e) => setHeadline(e.target.value), placeholder: "\u9879\u76EE\u6848\u4F8B", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-lg font-medium text-[#f0f0f0]", children: ["\u9879\u76EE\u5217\u8868 (", projects.length, ")"] }), _jsxs(Button, { onClick: addProject, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u6DFB\u52A0\u9879\u76EE"] })] }), _jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: projects.map(p => p.id), strategy: rectSortingStrategy, children: projects.map((project, index) => (_jsx(SortableProjectCard, { project: project, index: index, updateProject: updateProject, removeProject: removeProject, handleOpenImageDialog: handleOpenImageDialog, triggerFileInput: triggerFileInput, handleFileUpload: handleFileUpload, handleRemoveImage: handleRemoveImage, addTechStack: addTechStack, removeTechStack: removeTechStack, fileInputRef: fileInputRef }, project.id))) }) }), projects.length === 0 && (_jsx("div", { className: "text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10", children: _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u9879\u76EE\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0" }) }))] }), _jsx(Dialog, { open: showImageDialog, onOpenChange: setShowImageDialog, children: _jsxs(DialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "\u6DFB\u52A0\u9879\u76EE\u5C01\u9762\u56FE\u7247" }), _jsx(DialogDescription, { className: "text-[#8c8c91]", children: "\u8F93\u5165\u56FE\u7247 URL \u5730\u5740" })] }), _jsx(Input, { placeholder: "https://example.com/image.jpg", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    handleAddImage();
                                }
                            }, className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowImageDialog(false), className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u53D6\u6D88" }), _jsx(Button, { onClick: handleAddImage, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: "\u6DFB\u52A0" })] })] }) })] }));
}
