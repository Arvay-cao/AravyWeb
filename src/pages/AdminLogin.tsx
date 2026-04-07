import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模拟登录验证（实际项目中应该调用后端API）
    // 默认账号: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('admin_logged_in', 'true');
      sessionStorage.setItem('admin_mode', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('用户名或密码错误');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1a1a1a] border-[#8c8c91]/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-light text-[#f0f0f0]">
            后台管理登录
          </CardTitle>
          <CardDescription className="text-[#8c8c91]">
            请输入管理员账号和密码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#8c8c91]">
                用户名
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" />
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#8c8c91]">
                密码
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8c91] hover:text-[#f0f0f0]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>

            <div className="text-center text-[#8c8c91] text-xs">
              <p>默认账号: admin / admin123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
