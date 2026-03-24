import { useState, useEffect, useRef } from 'react';
import { Save, RotateCcw, Upload, X, Image as ImageIcon, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { aboutConfig as defaultAboutConfig } from '@/config';
import type { GalleryImage } from '@/types/blog';
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

interface ImageCardProps {
  img: GalleryImage;
  index: number;
  handleOpenImageDialog: (index: number) => void;
  handleRemoveImage: (index: number) => void;
  triggerFileInput: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function ImageCard({ 
  img, 
  index, 
  handleOpenImageDialog, 
  handleRemoveImage, 
  triggerFileInput,
  fileInputRef
}: ImageCardProps) {
  return (
    <div className="sortable-item">
      <div className="relative group aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10 h-full">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={() => {
              if (fileInputRef.current) {
                (fileInputRef.current as HTMLInputElement & { __currentImageIndex?: number | null }).__currentImageIndex = index;
              }
              triggerFileInput();
            }}
            className="hidden"
          />
          <Button
            onClick={() => handleOpenImageDialog(index)}
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-10 h-10"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleRemoveImage(index)}
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-10 h-10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80">
          <p className="text-white text-xs truncate">{img.label}</p>
        </div>
      </div>
    </div>
  );
}

interface SortableStatProps {
  stat: { value: string; label: string };
  index: number;
  updateStat: (index: number, field: 'value' | 'label', value: string) => void;
  removeStat: (index: number) => void;
}

function SortableStatCard({ stat, index, updateStat, removeStat }: SortableStatProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${stat.value}-${stat.label}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      <div className="flex items-center gap-3 p-3 bg-[#050505] rounded-lg border border-[#8c8c91]/10">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-move p-1 rounded hover:bg-[#8c8c91]/20 transition-colors"
        >
          <GripVertical className="w-4 h-4 text-[#8c8c91]" />
        </div>
        <Input
          value={stat.value}
          onChange={(e) => updateStat(index, 'value', e.target.value)}
          placeholder="数值"
          className="bg-transparent border-[#8c8c91]/20 text-[#f0f0f0] w-24"
        />
        <Input
          value={stat.label}
          onChange={(e) => updateStat(index, 'label', e.target.value)}
          placeholder="标签"
          className="bg-transparent border-[#8c8c91]/20 text-[#f0f0f0] flex-1"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeStat(index)}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function AdminConfigAbout() {
  const [config, setConfig] = useState({
    label: '',
    headline: '',
    description: '',
    bottomText: '',
    galleryImages: [] as GalleryImage[],
    stats: [] as Array<{ value: string; label: string }>,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLabel, setImageLabel] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const updateField = (field: string, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenImageDialog = (index?: number) => {
    if (index !== undefined) {
      setCurrentImageIndex(index);
      setImageUrl(config.galleryImages[index]?.src || '');
      setImageLabel(config.galleryImages[index]?.label || '');
    } else {
      setCurrentImageIndex(null);
      setImageUrl('');
      setImageLabel('');
    }
    setShowImageDialog(true);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      const newImage: GalleryImage = {
        src: imageUrl.trim(),
        alt: imageLabel || 'Gallery Image',
        label: imageLabel || 'Image',
      };
      
      if (currentImageIndex !== null) {
        // Update existing image
        const updatedImages = [...config.galleryImages];
        updatedImages[currentImageIndex] = newImage;
        setConfig({ ...config, galleryImages: updatedImages });
      } else {
        // Add new image
        setConfig({ ...config, galleryImages: [...config.galleryImages, newImage] });
      }
      
      setImageUrl('');
      setImageLabel('');
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
        const newImage: GalleryImage = {
          src: result,
          alt: 'Gallery Image',
          label: 'New Image',
        };
        
        // Get the current image index from the input element's custom property
        const target = e.target as HTMLInputElement & { __currentImageIndex?: number | null };
        const imageIndex = target.__currentImageIndex;
        
        if (imageIndex !== undefined && imageIndex !== null) {
          const updatedImages = [...config.galleryImages];
          updatedImages[imageIndex] = newImage;
          setConfig({ ...config, galleryImages: updatedImages });
        } else {
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

  const handleRemoveImage = (index: number) => {
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

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const updatedStats = [...config.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setConfig({ ...config, stats: updatedStats });
  };

  const removeStat = (index: number) => {
    const updatedStats = config.stats.filter((_, i) => i !== index);
    setConfig({ ...config, stats: updatedStats });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleStatDragEnd = (event: DragEndEvent) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">关于配置</h1>
          <p className="text-[#8c8c91] mt-1">配置关于我区域的内容</p>
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

      {/* Preview */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">实时预览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#050505] rounded-lg p-8">
            <p className="text-[#8c8c91] text-sm tracking-widest uppercase mb-4">{config.label || 'Label'}</p>
            <h2 className="text-4xl font-light text-[#f0f0f0] mb-4">{config.headline || '标题'}</h2>
            <p className="text-[#8c8c91] max-w-2xl">{config.description || '描述内容'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">配置项</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标签</Label>
              <Input
                value={config.label}
                onChange={(e) => updateField('label', e.target.value)}
                placeholder="About Me"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标题</Label>
              <Input
                value={config.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="关于我"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">描述</Label>
            <Textarea
              value={config.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="个人介绍..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[120px]"
            />
          </div>

          {/* Gallery Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[#8c8c91]">图库图片 ({config.galleryImages.length})</Label>
              <Button
                onClick={() => handleOpenImageDialog()}
                size="sm"
                className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加图片
              </Button>
            </div>
            
            {config.galleryImages.length === 0 ? (
              <div className="text-center py-12 bg-[#050505] rounded-lg border border-[#8c8c91]/10">
                <p className="text-[#8c8c91]">暂无图片，点击上方按钮添加</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {config.galleryImages.map((img, index) => (
                  <ImageCard
                    key={`${img.src}-${index}`}
                    img={img}
                    index={index}
                    handleOpenImageDialog={handleOpenImageDialog}
                    handleRemoveImage={handleRemoveImage}
                    triggerFileInput={triggerFileInput}
                    fileInputRef={fileInputRef}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[#8c8c91]">统计数据 ({config.stats.length})</Label>
              <Button
                onClick={addStat}
                size="sm"
                className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加统计
              </Button>
            </div>
            
            {config.stats.length === 0 ? (
              <div className="text-center py-12 bg-[#050505] rounded-lg border border-[#8c8c91]/10">
                <p className="text-[#8c8c91]">暂无统计数据，点击上方按钮添加</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleStatDragEnd}
              >
                <SortableContext
                  items={config.stats.map((_, i) => `${_.value}-${_.label}-${i}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {config.stats.map((stat, index) => (
                      <SortableStatCard
                        key={`${stat.value}-${stat.label}-${index}`}
                        stat={stat}
                        index={index}
                        updateStat={updateStat}
                        removeStat={removeStat}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">底部文字</Label>
            <Textarea
              value={config.bottomText}
              onChange={(e) => updateField('bottomText', e.target.value)}
              placeholder="底部补充说明..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Image URL Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
          <DialogHeader>
            <DialogTitle>{currentImageIndex !== null ? '编辑图片' : '添加图片'}</DialogTitle>
            <DialogDescription className="text-[#8c8c91]">
              {currentImageIndex !== null ? '修改图片信息或重新上传' : '上传图片或输入图片链接'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
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
                className="flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91]"
              >
                <Upload className="w-4 h-4 mr-2" />
                上传图片
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="图片标签..."
                  value={imageLabel}
                  onChange={(e) => setImageLabel(e.target.value)}
                  className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">图片 URL</Label>
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
            </div>
          </div>
          
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
              {currentImageIndex !== null ? '更新' : '添加'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
