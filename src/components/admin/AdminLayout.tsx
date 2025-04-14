
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Users, FileText, Settings, Menu, X, UserCog, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminStudentsList from './AdminStudentsList';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import GroupManagement from './GroupManagement';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'groups' | 'reports' | 'settings'>('students');
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из панели администратора",
    });
    navigate('/');
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  const handleTabChange = (tab: 'students' | 'groups' | 'reports' | 'settings') => {
    setActiveTab(tab);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const TabButton = ({ 
    tab, 
    current, 
    icon, 
    label 
  }: { 
    tab: 'students' | 'groups' | 'reports' | 'settings'; 
    current: string; 
    icon: React.ReactNode; 
    label: string;
  }) => (
    <Button
      variant={tab === current ? "default" : "ghost"}
      className={`w-full justify-start gap-2 mb-1 ${tab === current ? 'bg-primary text-primary-foreground' : ''}`}
      onClick={() => handleTabChange(tab)}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );

  const renderMobileNav = () => (
    <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-30 md:hidden">
          <Menu size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Админ панель</h2>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X size={20} />
              </Button>
            </DrawerClose>
          </div>
          
          <div className="space-y-2">
            <TabButton tab="students" current={activeTab} icon={<Users size={18} />} label="Студенты" />
            <TabButton tab="groups" current={activeTab} icon={<UserCog size={18} />} label="Группы" />
            <TabButton tab="reports" current={activeTab} icon={<FileText size={18} />} label="Отчеты" />
            <TabButton tab="settings" current={activeTab} icon={<Settings size={18} />} label="Настройки" />
          </div>
          
          <div className="absolute bottom-20 left-0 right-0 p-4 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2" 
              onClick={handleBackToMain}
            >
              <ChevronLeft size={18} />
              <span>На главную</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  const renderDesktopNav = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-30 hidden md:flex">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] border-r sm:w-[300px]">
        <div className="py-4">
          <h2 className="text-xl font-bold mb-6">Админ панель</h2>
          <div className="space-y-2">
            <TabButton tab="students" current={activeTab} icon={<Users size={18} />} label="Студенты" />
            <TabButton tab="groups" current={activeTab} icon={<UserCog size={18} />} label="Группы" />
            <TabButton tab="reports" current={activeTab} icon={<FileText size={18} />} label="Отчеты" />
            <TabButton tab="settings" current={activeTab} icon={<Settings size={18} />} label="Настройки" />
          </div>
          
          <div className="absolute bottom-20 left-0 right-0 p-4 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2" 
              onClick={handleBackToMain}
            >
              <ChevronLeft size={18} />
              <span>На главную</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile ? renderMobileNav() : renderDesktopNav()}

      <main className="pt-16 px-4 pb-16 md:pl-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {activeTab === 'students' && 'Студенты'}
              {activeTab === 'groups' && 'Группы'}
              {activeTab === 'reports' && 'Отчеты'}
              {activeTab === 'settings' && 'Настройки'}
            </h1>
            
            {/* Mobile tab selector */}
            <div className="flex md:hidden gap-1">
              <Button 
                size="sm" 
                variant={activeTab === 'students' ? "default" : "outline"} 
                onClick={() => handleTabChange('students')}
              >
                <Users size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={activeTab === 'groups' ? "default" : "outline"} 
                onClick={() => handleTabChange('groups')}
              >
                <UserCog size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={activeTab === 'reports' ? "default" : "outline"} 
                onClick={() => handleTabChange('reports')}
              >
                <FileText size={16} />
              </Button>
              <Button 
                size="sm" 
                variant={activeTab === 'settings' ? "default" : "outline"} 
                onClick={() => handleTabChange('settings')}
              >
                <Settings size={16} />
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6 overflow-auto">
            {activeTab === 'students' && <AdminStudentsList />}
            {activeTab === 'groups' && <GroupManagement />}
            {activeTab === 'reports' && <AdminReports />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>
      </main>
    </div>
  );
};
