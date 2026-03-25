import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { contactConfig as defaultContactConfig } from '@/config';
export default function AdminConfigContact() {
    const [label, setLabel] = useState('');
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [infoCards, setInfoCards] = useState([]);
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
    const updateInfoCard = (index, field, value) => {
        const newCards = [...infoCards];
        newCards[index] = { ...newCards[index], [field]: value };
        setInfoCards(newCards);
    };
    const removeInfoCard = (index) => {
        setInfoCards(infoCards.filter((_, i) => i !== index));
    };
    const iconOptions = ['Mail', 'MapPin', 'Phone', 'Github', 'Linkedin', 'Twitter'];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u8054\u7CFB\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u914D\u7F6E\u8054\u7CFB\u533A\u57DF\u7684\u5185\u5BB9" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u677F\u5757\u8BBE\u7F6E" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u7B7E" }), _jsx(Input, { value: label, onChange: (e) => setLabel(e.target.value), placeholder: "Contact", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u9898" }), _jsx(Input, { value: headline, onChange: (e) => setHeadline(e.target.value), placeholder: "\u8054\u7CFB\u6211", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u63CF\u8FF0" }), _jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "\u8054\u7CFB\u63CF\u8FF0...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-lg font-medium text-[#f0f0f0]", children: ["\u8054\u7CFB\u5361\u7247 (", infoCards.length, ")"] }), _jsxs(Button, { onClick: addInfoCard, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u6DFB\u52A0\u5361\u7247"] })] }), infoCards.map((card, index) => (_jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-[#f0f0f0] text-lg", children: ["\u5361\u7247 ", index + 1] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeInfoCard(index), className: "text-red-400 hover:text-red-300 hover:bg-red-500/10", children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u56FE\u6807" }), _jsx("select", { value: card.icon, onChange: (e) => updateInfoCard(index, 'icon', e.target.value), className: "w-full h-10 px-3 bg-[#050505] border border-[#8c8c91]/20 rounded-md text-[#f0f0f0]", children: iconOptions.map(icon => (_jsx("option", { value: icon, children: icon }, icon))) })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6807\u9898" }), _jsx(Input, { value: card.title, onChange: (e) => updateInfoCard(index, 'title', e.target.value), placeholder: "\u4F8B\u5982\uFF1A\u7535\u5B50\u90AE\u7BB1", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5185\u5BB9" }), _jsx(Input, { value: card.content, onChange: (e) => updateInfoCard(index, 'content', e.target.value), placeholder: "\u4F8B\u5982\uFF1Ayour@email.com", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] })] }, index))), infoCards.length === 0 && (_jsx("div", { className: "text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10", children: _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u5361\u7247\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0" }) }))] })] }));
}
