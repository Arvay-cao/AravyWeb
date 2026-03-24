import { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { footerConfig as defaultFooterConfig } from '@/config';

export default function AdminConfigFooter() {
  const [config, setConfig] = useState({
    marqueeText: '',
    brandName: '',
    brandDescription: '',
    quickLinksTitle: '',
    contactTitle: '',
    contactItems: [] as string[],
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setConfig({
      marqueeText: savedConfig.footer?.marqueeText || defaultFooterConfig.marqueeText,
      brandName: savedConfig.footer?.brandName || defaultFooterConfig.brandName,
      brandDescription: savedConfig.footer?.brandDescription || defaultFooterConfig.brandDescription,
      quickLinksTitle: savedConfig.footer?.quickLinksTitle || defaultFooterConfig.quickLinksTitle,
      contactTitle: savedConfig.footer?.contactTitle || defaultFooterConfig.contactTitle,
      contactItems: savedConfig.footer?.contactItems || defaultFooterConfig.contactItems,
    });
  }, []);

  const handleSave = () => {
    saveSiteConfig({
      footer: config,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      marqueeText: defaultFooterConfig.marqueeText,
      brandName: defaultFooterConfig.brandName,
      brandDescription: defaultFooterConfig.brandDescription,
      quickLinksTitle: defaultFooterConfig.quickLinksTitle,
      contactTitle: defaultFooterConfig.contactTitle,
      contactItems: defaultFooterConfig.contactItems,
    });
  };

  const updateField = <K extends keyof typeof config>(field: K, value: typeof config[K]) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const addContactItem = () => {
    updateField('contactItems', [...config.contactItems, '']);
  };

  const updateContactItem = (index: number, value: string) => {
    const newItems = [...config.contactItems];
    newItems[index] = value;
    updateField('contactItems', newItems);
  };

  const removeContactItem = (index: number) => {
    updateField('contactItems', config.contactItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">页脚配置</h1>
          <p className="text-[#8c8c91] mt-1">配置页面底部的显示内容</p>
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

      {/* Marquee */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">滚动文字</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">滚动文字内容</Label>
            <Input
              value={config.marqueeText}
              onChange={(e) => updateField('marqueeText', e.target.value)}
              placeholder="Frontend Developer"
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">品牌信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">品牌名称</Label>
            <Input
              value={config.brandName}
              onChange={(e) => updateField('brandName', e.target.value)}
              placeholder="陈明远"
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">品牌描述</Label>
            <Textarea
              value={config.brandDescription}
              onChange={(e) => updateField('brandDescription', e.target.value)}
              placeholder="品牌描述..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Titles */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <CardTitle className="text-[#f0f0f0] text-lg">标题设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">快速链接标题</Label>
              <Input
                value={config.quickLinksTitle}
                onChange={(e) => updateField('quickLinksTitle', e.target.value)}
                placeholder="快速链接"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">联系方式标题</Label>
              <Input
                value={config.contactTitle}
                onChange={(e) => updateField('contactTitle', e.target.value)}
                placeholder="联系方式"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Items */}
      <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#f0f0f0] text-lg">联系信息</CardTitle>
            <Button
              onClick={addContactItem}
              variant="outline"
              size="sm"
              className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
            >
              <Plus className="w-4 h-4 mr-1" />
              添加
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.contactItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => updateContactItem(index, e.target.value)}
                placeholder="联系信息"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeContactItem(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {config.contactItems.length === 0 && (
            <p className="text-[#8c8c91] text-center py-4">暂无联系信息</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
