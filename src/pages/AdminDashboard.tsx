import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Edit3, 
  Save,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPublishedPosts, getDraftPosts } from '@/utils/blogStorage';
import { getSiteConfig } from '@/utils/configStorage';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState<Array<{id: string, title: string, date: string}>>([]);

  useEffect(() => {
    const published = getPublishedPosts();
    const drafts = getDraftPosts();
    getSiteConfig();

    setStats({
      publishedPosts: published.length,
      draftPosts: drafts.length,
      totalViews: 0, // 实际项目中从后端获取
    });

    // 获取最近发布的文章
    const recent = published.slice(0, 5).map(post => ({
      id: post.id,
      title: post.title,
      date: new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN'),
    }));
    setRecentPosts(recent);
  }, []);

  const quickActions = [
    { icon: Edit3, label: '写文章', href: '/admin/blog/edit', color: 'bg-blue-500/20 text-blue-400' },
    { icon: FileText, label: '博客管理', href: '/admin/blog', color: 'bg-green-500/20 text-green-400' },
    { icon: Save, label: '草稿箱', href: '/admin/blog?tab=drafts', color: 'bg-amber-500/20 text-amber-400' },
    { icon: Eye, label: '查看网站', href: '/', color: 'bg-purple-500/20 text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-[#f0f0f0]">仪表盘</h1>
        <p className="text-[#8c8c91] mt-1">欢迎回来，管理员</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#8c8c91] text-sm font-normal">已发布文章</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-light text-[#f0f0f0]">{stats.publishedPosts}</span>
              <FileText className="w-8 h-8 text-[#8c8c91]/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#8c8c91] text-sm font-normal">草稿箱</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-light text-[#f0f0f0]">{stats.draftPosts}</span>
              <Save className="w-8 h-8 text-[#8c8c91]/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#8c8c91] text-sm font-normal">总阅读量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-light text-[#f0f0f0]">{stats.totalViews}</span>
              <Eye className="w-8 h-8 text-[#8c8c91]/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-[#f0f0f0] mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              to={action.href}
              className="flex flex-col items-center p-6 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 hover:border-[#8c8c91]/30 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-[#f0f0f0] text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#f0f0f0]">最近发布</h2>
          <Link to="/admin/blog" className="text-[#8c8c91] hover:text-[#f0f0f0] text-sm">
            查看全部
          </Link>
        </div>
        
        {recentPosts.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" />
              <p className="text-[#8c8c91]">暂无发布的文章</p>
              <Link to="/admin/blog/edit">
                <Button className="mt-4 bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]">
                  写第一篇文章
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#1a1a1a] border-[#8c8c91]/10">
            <CardContent className="p-0">
              {recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== recentPosts.length - 1 ? 'border-b border-[#8c8c91]/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#8c8c91]" />
                    <span className="text-[#f0f0f0]">{post.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8c8c91] text-sm">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Site Config Status */}
      <div>
        <h2 className="text-lg font-medium text-[#f0f0f0] mb-4">网站配置</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '首页配置', href: '/admin/config/hero', status: '已配置' },
            { label: '关于配置', href: '/admin/config/about', status: '已配置' },
            { label: '项目配置', href: '/admin/config/projects', status: '已配置' },
            { label: '技能配置', href: '/admin/config/skills', status: '已配置' },
          ].map((config) => (
            <Link
              key={config.href}
              to={config.href}
              className="p-4 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 hover:border-[#8c8c91]/30 transition-colors"
            >
              <p className="text-[#f0f0f0] text-sm">{config.label}</p>
              <p className="text-green-400 text-xs mt-1">{config.status}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
