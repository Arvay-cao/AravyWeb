import { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { contactConfig as defaultContactConfig } from '@/config';
import type { InfoCard } from '@/config';

export default function AdminConfigContact() {
  const [label, setLabel] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [infoCards, setInfoCards] = useState<InfoCard[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setLabel(savedConfig.contact?.label || defaultContactConfig.label);
    setHeadline(savedConfig.contact?.headline || defaultContactConfig.headline);
    setDescription(savedConfig.contact?.description || defaultContactConfig.description);
    setInfoCards(savedConfig.contact?.infoCards || defaultContactConfig.infoCards);
  }, []);

  const handleSave = () => {
    saveSiteConfig({
      contact: {
        label,
        headline,
        description,
        infoCards,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setLabel(defaultContactConfig.label);
    setHeadline(defaultContactConfig.headline);
    setDescription(defaultContactConfig.description);
    setInfoCards(defaultContactConfig.infoCards);
  };

  const addInfoCard = () => {
    setInfoCards([...infoCards, { icon: 'Mail', title: '新卡片', content: '内容' }]);
  };

  const updateInfoCard = (index: number, field: keyof InfoCard, value: string) => {
    const newCards = [...infoCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setInfoCards(newCards);
  };

  const removeInfoCard = (index: number) => {
    setInfoCards(infoCards.filter((_, i) => i !== index));
  };

  const iconOptions = ['Mail', 'MapPin', 'Phone', 'Github', 'Linkedin', 'Twitter'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">联系配置</h1>
          <p className="text-[#8c8c91] mt-1">配置联系区域的内容</p>
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
                placeholder="Contact"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#8c8c91]">标题</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="联系我"
                className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#8c8c91]">描述</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="联系描述..."
              className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#f0f0f0]">联系卡片 ({infoCards.length})</h2>
          <Button
            onClick={addInfoCard}
            className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加卡片
          </Button>
        </div>

        {infoCards.map((card, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-[#8c8c91]/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#f0f0f0] text-lg">卡片 {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInfoCard(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#8c8c91]">图标</Label>
                  <select
                    value={card.icon}
                    onChange={(e) => updateInfoCard(index, 'icon', e.target.value)}
                    className="w-full h-10 px-3 bg-[#050505] border border-[#8c8c91]/20 rounded-md text-[#f0f0f0]"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[#8c8c91]">标题</Label>
                  <Input
                    value={card.title}
                    onChange={(e) => updateInfoCard(index, 'title', e.target.value)}
                    placeholder="例如：电子邮箱"
                    className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#8c8c91]">内容</Label>
                <Input
                  value={card.content}
                  onChange={(e) => updateInfoCard(index, 'content', e.target.value)}
                  placeholder="例如：your@email.com"
                  className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {infoCards.length === 0 && (
          <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10">
            <p className="text-[#8c8c91]">暂无卡片，点击上方按钮添加</p>
          </div>
        )}
      </div>
    </div>
  );
}
