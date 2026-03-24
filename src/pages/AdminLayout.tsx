import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  Home,
  User,
  Briefcase,
  Code,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useCustomCursor from '@/hooks/useCustomCursor';

const menuItems = [
  { icon: LayoutDashboard, label: '仪表盘', href: '/admin/dashboard' },
  { icon: Home, label: '首页配置', href: '/admin/config/hero' },
  { icon: User, label: '关于配置', href: '/admin/config/about' },
  { icon: Briefcase, label: '项目配置', href: '/admin/config/projects' },
  { icon: Code, label: '技能配置', href: '/admin/config/skills' },
  { icon: Mail, label: '联系配置', href: '/admin/config/contact' },
  { icon: Settings, label: '页脚配置', href: '/admin/config/footer' },
  { icon: FileText, label: '博客管理', href: '/admin/blog' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize custom cursor
  useCustomCursor();

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_mode');
    navigate('/admin/login');
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex admin-panel">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#1a1a1a] border-r border-[#8c8c91]/10 fixed h-full overflow-hidden">
        <div className="p-6 border-b border-[#8c8c91]/10 shrink-0">
          <Link to="/" className="text-xl font-light text-[#f0f0f0]">
            陈明远<span className="text-[#8c8c91]">.</span>
          </Link>
          <p className="text-[#8c8c91] text-xs mt-1">后台管理系统</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-[#8c8c91]/20 text-[#f0f0f0]'
                  : 'text-[#8c8c91] hover:bg-[#8c8c91]/10 hover:text-[#f0f0f0]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#8c8c91]/10 shrink-0">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-[#8c8c91]/10">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-light text-[#f0f0f0]">
            陈明远<span className="text-[#8c8c91]">.</span>
          </Link>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#8c8c91]">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#1a1a1a] border-r border-[#8c8c91]/10 p-0">
              <div className="p-6 border-b border-[#8c8c91]/10">
                <p className="text-[#8c8c91] text-xs">后台管理系统</p>
              </div>
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#8c8c91]/20 text-[#f0f0f0]'
                        : 'text-[#8c8c91] hover:bg-[#8c8c91]/10 hover:text-[#f0f0f0]'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#8c8c91]/10">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0">
        <div className="p-6 lg:p-8 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
