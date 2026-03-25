import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // 检查是否已登录
        const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
        if (isLoggedIn) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        // 模拟登录验证（实际项目中应该调用后端API）
        // 默认账号: admin / admin123
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('admin_logged_in', 'true');
            sessionStorage.setItem('admin_mode', 'true');
            navigate('/admin/dashboard');
        }
        else {
            setError('用户名或密码错误');
        }
        setIsLoading(false);
    };
    return (_jsx("div", { className: "min-h-screen bg-[#050505] flex items-center justify-center px-4", children: _jsxs(Card, { className: "w-full max-w-md bg-[#1a1a1a] border-[#8c8c91]/20", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "text-2xl font-light text-[#f0f0f0]", children: "\u540E\u53F0\u7BA1\u7406\u767B\u5F55" }), _jsx(CardDescription, { className: "text-[#8c8c91]", children: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u8D26\u53F7\u548C\u5BC6\u7801" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "username", className: "text-[#8c8c91]", children: "\u7528\u6237\u540D" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" }), _jsx(Input, { id: "username", type: "text", placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", value: username, onChange: (e) => setUsername(e.target.value), className: "pl-10 bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-[#8c8c91]", children: "\u5BC6\u7801" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" }), _jsx(Input, { id: "password", type: showPassword ? 'text' : 'password', placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: password, onChange: (e) => setPassword(e.target.value), className: "pl-10 pr-10 bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8c91] hover:text-[#f0f0f0]", children: showPassword ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }), error && (_jsx("div", { className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg", children: _jsx("p", { className: "text-red-400 text-sm text-center", children: error }) })), _jsx(Button, { type: "submit", disabled: isLoading, className: "w-full bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: isLoading ? '登录中...' : '登录' }), _jsx("div", { className: "text-center text-[#8c8c91] text-xs", children: _jsx("p", { children: "\u9ED8\u8BA4\u8D26\u53F7: admin / admin123" }) })] }) })] }) }));
}
