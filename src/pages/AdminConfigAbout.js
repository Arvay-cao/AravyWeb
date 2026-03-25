import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Save, RotateCcw, Upload, X, Image as ImageIcon, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { aboutConfig as defaultAboutConfig } from '@/config';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function ImageCard({ img, index, handleOpenImageDialog, handleRemoveImage, triggerFileInput, fileInputRef }) {
    return (_jsx("div", { className: "sortable-item", children: _jsxs("div", { className: "relative group aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10 h-full", children: [_jsx("img", { src: img.src, alt: img.alt, className: "w-full h-full object-cover" }), _jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: () => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.__currentImageIndex = index;
                                }
                                triggerFileInput();
                            }, className: "hidden" }), _jsx(Button, { onClick: () => handleOpenImageDialog(index), variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-10 h-10", children: _jsx(ImageIcon, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: () => handleRemoveImage(index), variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-10 h-10", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-2 bg-black/80", children: _jsx("p", { className: "text-white text-xs truncate", children: img.label }) })] }) }));
}
function SortableStatCard({ stat, index, updateStat, removeStat }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = useSortable({ id: `${stat.value}-${stat.label}-${index}` });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return (_jsx("div", { ref: setNodeRef, style: style, className: "sortable-item", children: _jsxs("div", { className: "flex items-center gap-3 p-3 bg-[#050505] rounded-lg border border-[#8c8c91]/10", children: [_jsx("div", { ...attributes, ...listeners, className: "cursor-move p-1 rounded hover:bg-[#8c8c91]/20 transition-colors", children: _jsx(GripVertical, { className: "w-4 h-4 text-[#8c8c91]" }) }), _jsx(Input, { value: stat.value, onChange: (e) => updateStat(index, 'value', e.target.value), placeholder: "\u6570\u503C", className: "bg-transparent border-[#8c8c91]/20 text-[#f0f0f0] w-24" }), _jsx(Input, { value: stat.label, onChange: (e) => updateStat(index, 'label', e.target.value), placeholder: "\u6807\u7B7E", className: "bg-transparent border-[#8c8c91]/20 text-[#f0f0f0] flex-1" }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeStat(index), className: "text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }) }));
}
export default function AdminConfigAbout() {
    const [config, setConfig] = useState({
        label: '',
        headline: '',
        description: '',
        bottomText: '',
        galleryImages: [],
        stats: [],
    });
    const [isSaved, setIsSaved] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageLabel, setImageLabel] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const fileInputRef = useRef(null);
    useEffect(() => {
        const savedConfig = getSiteConfig();
        setConfig({
            label: savedConfig.about?.label || defaultAboutConfig.label,
            headline: savedConfig.about?.headline || defaultAboutConfig.headline,
            description: savedConfig.about?.description || defaultAboutConfig.description,
            bottomText: savedConfig.about?.bottomText || defaultAboutConfig.bottomText,
            galleryImages: savedConfig.about?.galleryImages || defaultAboutConfig.galleryImages,
            stats: savedConfig.about?.stats || defaultAboutConfig.stats,
        });
    }, []);
    const handleSave = () => {
        saveSiteConfig({
            about: config,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    const handleReset = () => {
        setConfig({
            label: defaultAboutConfig.label,
            headline: defaultAboutConfig.headline,
            description: defaultAboutConfig.description,
            bottomText: defaultAboutConfig.bottomText,
            galleryImages: defaultAboutConfig.galleryImages,
            stats: defaultAboutConfig.stats,
        });
    };
    const updateField = (field, value) => {
        setConfig((prev) => ({ ...prev, [field]: value }));
    };
    const handleOpenImageDialog = (index) => {
        if (index !== undefined) {
            setCurrentImageIndex(index);
            setImageUrl(config.galleryImages[index]?.src || '');
            setImageLabel(config.galleryImages[index]?.label || '');
        }
        else {
            setCurrentImageIndex(null);
            setImageUrl('');
            setImageLabel('');
        }
        setShowImageDialog(true);
    };
    const handleAddImage = () => {
        if (imageUrl.trim()) {
            const newImage = {
                src: imageUrl.trim(),
                alt: imageLabel || 'Gallery Image',
                label: imageLabel || 'Image',
            };
            if (currentImageIndex !== null) {
                // Update existing image
                const updatedImages = [...config.galleryImages];
                updatedImages[currentImageIndex] = newImage;
                setConfig({ ...config, galleryImages: updatedImages });
            }
            else {
                // Add new image
                setConfig({ ...config, galleryImages: [...config.galleryImages, newImage] });
            }
            setImageUrl('');
            setImageLabel('');
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
                const newImage = {
                    src: result,
                    alt: 'Gallery Image',
                    label: 'New Image',
                };
                // Get the current image index from the input element's custom property
                const target = e.target;
                const imageIndex = target.__currentImageIndex;
                if (imageIndex !== undefined && imageIndex !== null) {
                    const updatedImages = [...config.galleryImages];
                    updatedImages[imageIndex] = newImage;
                    setConfig({ ...config, galleryImages: updatedImages });
                }
                else {
                    setConfig({ ...config, galleryImages: [...config.galleryImages, newImage] });
                }
                setShowImageDialog(false);
                // Reset the custom property
                target.__currentImageIndex = null;
            };
            reader.onerror = () => {
                alert('文件读取失败，请重试');
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = (index) => {
        const updatedImages = config.galleryImages.filter((_, i) => i !== index);
        setConfig({ ...config, galleryImages: updatedImages });
    };
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const addStat = () => {
        setConfig({
            ...config,
            stats: [...config.stats, { value: '0', label: '新统计项' }],
        });
    };
    const updateStat = (index, field, value) => {
        const updatedStats = [...config.stats];
        updatedStats[index] = { ...updatedStats[index], [field]: value };
        setConfig({ ...config, stats: updatedStats });
    };
    const removeStat = (index) => {
        const updatedStats = config.stats.filter((_, i) => i !== index);
        setConfig({ ...config, stats: updatedStats });
    };
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const handleStatDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setConfig((prev) => {
                const oldIndex = prev.stats.findIndex((_, i) => `${_.value}-${_.label}-${i}` === active.id);
                const newIndex = prev.stats.findIndex((_, i) => `${_.value}-${_.label}-${i}` === over.id);
                return {
                    ...prev,
                    stats: arrayMove(prev.stats, oldIndex, newIndex),
                };
            });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u5173\u4E8E\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u914D\u7F6E\u5173\u4E8E\u6211\u533A\u57DF\u7684\u5185\u5BB9" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u5B9E\u65F6\u9884\u89C8" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "bg-[#050505] rounded-lg p-8", children: [_jsx("p", { className: "text-[#8c8c91] text-sm tracking-widest uppercase mb-4", children: config.label || 'Label' }), _jsx("h2", { className: "text-4xl font-light text-[#f0f0f0] mb-4", children: config.headline || '标题' }), _jsx("p", { className: "text-[#8c8c91] max-w-2xl", children: config.description || '描述内容' })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u914D\u7F6E\u9879" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u7B7E" }), _jsx(Input, { value: config.label, onChange: (e) => updateField('label', e.target.value), placeholder: "About Me", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u9898" }), _jsx(Input, { value: config.headline, onChange: (e) => updateField('headline', e.target.value), placeholder: "\u5173\u4E8E\u6211", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u63CF\u8FF0" }), _jsx(Textarea, { value: config.description, onChange: (e) => updateField('description', e.target.value), placeholder: "\u4E2A\u4EBA\u4ECB\u7ECD...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[120px]" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Label, { className: "text-[#8c8c91]", children: ["\u56FE\u5E93\u56FE\u7247 (", config.galleryImages.length, ")"] }), _jsxs(Button, { onClick: () => handleOpenImageDialog(), size: "sm", className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u6DFB\u52A0\u56FE\u7247"] })] }), config.galleryImages.length === 0 ? (_jsx("div", { className: "text-center py-12 bg-[#050505] rounded-lg border border-[#8c8c91]/10", children: _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u56FE\u7247\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0" }) })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: config.galleryImages.map((img, index) => (_jsx(ImageCard, { img: img, index: index, handleOpenImageDialog: handleOpenImageDialog, handleRemoveImage: handleRemoveImage, triggerFileInput: triggerFileInput, fileInputRef: fileInputRef }, `${img.src}-${index}`))) }))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Label, { className: "text-[#8c8c91]", children: ["\u7EDF\u8BA1\u6570\u636E (", config.stats.length, ")"] }), _jsxs(Button, { onClick: addStat, size: "sm", className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u6DFB\u52A0\u7EDF\u8BA1"] })] }), config.stats.length === 0 ? (_jsx("div", { className: "text-center py-12 bg-[#050505] rounded-lg border border-[#8c8c91]/10", children: _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u7EDF\u8BA1\u6570\u636E\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0" }) })) : (_jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleStatDragEnd, children: _jsx(SortableContext, { items: config.stats.map((_, i) => `${_.value}-${_.label}-${i}`), strategy: verticalListSortingStrategy, children: _jsx("div", { className: "space-y-3", children: config.stats.map((stat, index) => (_jsx(SortableStatCard, { stat: stat, index: index, updateStat: updateStat, removeStat: removeStat }, `${stat.value}-${stat.label}-${index}`))) }) }) }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5E95\u90E8\u6587\u5B57" }), _jsx(Textarea, { value: config.bottomText, onChange: (e) => updateField('bottomText', e.target.value), placeholder: "\u5E95\u90E8\u8865\u5145\u8BF4\u660E...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]" })] })] })] }), _jsx(Dialog, { open: showImageDialog, onOpenChange: setShowImageDialog, children: _jsxs(DialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: currentImageIndex !== null ? '编辑图片' : '添加图片' }), _jsx(DialogDescription, { className: "text-[#8c8c91]", children: currentImageIndex !== null ? '修改图片信息或重新上传' : '上传图片或输入图片链接' })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsxs(Button, { onClick: triggerFileInput, variant: "outline", className: "flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91]", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "\u4E0A\u4F20\u56FE\u7247"] }), _jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "\u56FE\u7247\u6807\u7B7E...", value: imageLabel, onChange: (e) => setImageLabel(e.target.value), className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u56FE\u7247 URL" }), _jsx(Input, { placeholder: "https://example.com/image.jpg", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), onKeyDown: (e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddImage();
                                                }
                                            }, className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowImageDialog(false), className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u53D6\u6D88" }), _jsx(Button, { onClick: handleAddImage, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: currentImageIndex !== null ? '更新' : '添加' })] })] }) })] }));
}
