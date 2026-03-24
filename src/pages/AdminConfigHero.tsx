import { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { heroConfig as defaultHeroConfig } from '@/config';

export default function AdminConfigHero() {
  const [config, setConfig] = useState({
    brandLeft: '',
    brandRight: '',
    tagline: '',
    badge: '',
    since: '',
    email: '',
    heroImage: '',
    heroImageAlt: '',
    scrollText: '',
    copyrightText: '',
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setConfig({
      brandLeft: savedConfig.hero?.brandLeft || defaultHeroConfig.brandLeft,
      brandRight: savedConfig.hero?.brandRight || defaultHeroConfig.brandRight,
      tagline: savedConfig.hero?.tagline || defaultHeroConfig.tagline,
      badge: savedConfig.hero?.badge || defaultHeroConfig.badge,
      since: savedConfig.hero?.since || defaultHeroConfig.since,
      email: savedConfig.hero?.email || defaultHeroConfig.email,
      heroImage: savedConfig.hero?.heroImage || defaultHeroConfig.heroImage,
      heroImageAlt: savedConfig.hero?.heroImageAlt || defaultHeroConfig.heroImageAlt,
      scrollText: savedConfig.hero?.scrollText || defaultHeroConfig.scrollText,
      copyrightText: savedConfig.hero?.copyrightText || defaultHeroConfig.copyrightText,
    });
  }, []);

  const handleSave = () => {
    saveSiteConfig({
      hero: config,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      brandLeft: defaultHeroConfig.brandLeft,
      brandRight: defaultHeroConfig.brandRight,
      tagline: defaultHeroConfig.tagline,
      badge: defaultHeroConfig.badge,
      since: defaultHeroConfig.since,
      email: defaultHeroConfig.email,
      heroImage: defaultHeroConfig.heroImage,
      heroImageAlt: defaultHeroConfig.heroImageAlt,
      scrollText: defaultHeroConfig.scrollText,
      copyrightText: defaultHeroConfig.copyrightText,
    });
  };

  const updateField = (field: string, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">首页配置</h1>
          <p className="text-[#8c8c91] mt-1">配置 Hero 区域的显示内容</p>
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
          <div className="bg-[#050505] rounded-lg p-8 flex items-center justify-center gap-8">
            <div className="text-right">
              <h2 className="text-4xl font-light text-[#f0f0f0]">{config.brandLeft || '姓名'}</h2>
              <p className="text-[#8c8c91] text-sm mt-2 max-w-[200px]">{config.tagline || '简介'}</p>
            </div>
            <div className="w-32 h-40 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl flex items-center justify-center">
              {config.heroImage ? (
                <img src={config.heroImage} alt={config.heroImageAlt} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-[#8c8c91] text-4xl font-light">
                  {(config.brandLeft || '姓')[0]}
                </span>
              )}
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-light text-[#f0f0f0]">{config.brandRight || '职位'}</h2>
              <p className="text-[#8c8c91] text-xs mt-2 uppercase tracking-widest">{config.since || '经验'}</p>
            </div>
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
              <Label className="text-[#8c8c91]">左侧名称</Label>
              <Input
                value={config.brandLeft}
                onChange={(e) => updateField('brandLeft', e.target.value)}
                placeholder="例如：陈明远"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">右侧职位</Label>
              <Input
                value={config.brandRight}
                onChange={(e) => updateField('brandRight', e.target.value)}
                placeholder="例如：Developer"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#8c8c91]">个人简介</Label>
            <Textarea
              value={config.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              placeholder="简短的个人介绍..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">徽章文字</Label>
              <Input
                value={config.badge}
                onChange={(e) => updateField('badge', e.target.value)}
                placeholder="例如：Frontend Engineer"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">经验年限</Label>
              <Input
                value={config.since}
                onChange={(e) => updateField('since', e.target.value)}
                placeholder="例如：5+ Years Experience"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">邮箱</Label>
              <Input
                value={config.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your@email.com"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">头像图片 URL</Label>
              <Input
                value={config.heroImage}
                onChange={(e) => updateField('heroImage', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">滚动提示文字</Label>
              <Input
                value={config.scrollText}
                onChange={(e) => updateField('scrollText', e.target.value)}
                placeholder="向下滚动探索更多"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">版权文字</Label>
              <Input
                value={config.copyrightText}
                onChange={(e) => updateField('copyrightText', e.target.value)}
                placeholder="© 2024"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
