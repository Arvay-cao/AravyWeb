import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        contactItems: [],
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
    const updateField = (field, value) => {
        setConfig((prev) => ({ ...prev, [field]: value }));
    };
    const addContactItem = () => {
        updateField('contactItems', [...config.contactItems, '']);
    };
    const updateContactItem = (index, value) => {
        const newItems = [...config.contactItems];
        newItems[index] = value;
        updateField('contactItems', newItems);
    };
    const removeContactItem = (index) => {
        updateField('contactItems', config.contactItems.filter((_, i) => i !== index));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u9875\u811A\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u914D\u7F6E\u9875\u9762\u5E95\u90E8\u7684\u663E\u793A\u5185\u5BB9" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u6EDA\u52A8\u6587\u5B57" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6EDA\u52A8\u6587\u5B57\u5185\u5BB9" }), _jsx(Input, { value: config.marqueeText, onChange: (e) => updateField('marqueeText', e.target.value), placeholder: "Frontend Developer", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u54C1\u724C\u4FE1\u606F" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u54C1\u724C\u540D\u79F0" }), _jsx(Input, { value: config.brandName, onChange: (e) => updateField('brandName', e.target.value), placeholder: "\u9648\u660E\u8FDC", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u54C1\u724C\u63CF\u8FF0" }), _jsx(Textarea, { value: config.brandDescription, onChange: (e) => updateField('brandDescription', e.target.value), placeholder: "\u54C1\u724C\u63CF\u8FF0...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] min-h-[80px]" })] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u6807\u9898\u8BBE\u7F6E" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5FEB\u901F\u94FE\u63A5\u6807\u9898" }), _jsx(Input, { value: config.quickLinksTitle, onChange: (e) => updateField('quickLinksTitle', e.target.value), placeholder: "\u5FEB\u901F\u94FE\u63A5", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u8054\u7CFB\u65B9\u5F0F\u6807\u9898" }), _jsx(Input, { value: config.contactTitle, onChange: (e) => updateField('contactTitle', e.target.value), placeholder: "\u8054\u7CFB\u65B9\u5F0F", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" })] })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u8054\u7CFB\u4FE1\u606F" }), _jsxs(Button, { onClick: addContactItem, variant: "outline", size: "sm", className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), "\u6DFB\u52A0"] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [config.contactItems.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { value: item, onChange: (e) => updateContactItem(index, e.target.value), placeholder: "\u8054\u7CFB\u4FE1\u606F", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0]" }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeContactItem(index), className: "text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }, index))), config.contactItems.length === 0 && (_jsx("p", { className: "text-[#8c8c91] text-center py-4", children: "\u6682\u65E0\u8054\u7CFB\u4FE1\u606F" }))] })] })] }));
}
