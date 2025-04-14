
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Users, FileText, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminStudentsList from './AdminStudentsList';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'reports' | 'settings'>('students');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 flex flex-col`}>
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold">Админ панель</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Управление системой</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === 'students' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveTab('students')}
          >
            <Users size={18} className="mr-2" />
            Студенты
          </Button>
          
          <Button
            variant={activeTab === 'reports' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={18} className="mr-2" />
            Отчеты
          </Button>
          
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} className="mr-2" />
            Настройки
          </Button>
        </nav>

        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={handleBackToMain}>
            <ChevronLeft size={18} className="mr-2" />
            На главную
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'students' && <AdminStudentsList />}
        {activeTab === 'reports' && <AdminReports />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
