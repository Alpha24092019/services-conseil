import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Scale,
  BookOpen,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  LogOut,
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const sidebarLinks = [
    { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { to: '/admin/articles', label: 'المقالات', icon: FileText },
    { to: '/admin/laws', label: 'القوانين', icon: Scale },
    { to: '/admin/books', label: 'الكتب', icon: BookOpen },
    { to: '/admin/orders', label: 'الطلبات', icon: ShoppingCart },
    { to: '/admin/categories', label: 'التصنيفات', icon: Settings },
    { to: '/admin/users', label: 'المستخدمين', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">لوحة التحكم</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.to || 
            (link.to !== '/admin' && location.pathname.startsWith(link.to));
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 mr-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>العودة للموقع</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-background border-b px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-bold">لوحة التحكم</span>
        </Link>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 bg-background border-l min-h-screen sticky top-0">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
