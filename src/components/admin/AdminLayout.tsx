
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Users, FileText, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminStudentsList from './AdminStudentsList';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'reports' | 'settings'>('students');
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
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarContent>
            <div className="p-4 border-b dark:border-gray-700">
              <h1 className="text-xl font-bold">Админ панель</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 group-data-[collapsible=icon]:hidden">
                Управление системой
              </p>
            </div>

            <div className="flex-1 p-4 space-y-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Студенты"
                    isActive={activeTab === 'students'} 
                    onClick={() => setActiveTab('students')}
                  >
                    <Users size={18} className="mr-2" />
                    <span>Студенты</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Отчеты"
                    isActive={activeTab === 'reports'} 
                    onClick={() => setActiveTab('reports')}
                  >
                    <FileText size={18} className="mr-2" />
                    <span>Отчеты</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Настройки"
                    isActive={activeTab === 'settings'} 
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={18} className="mr-2" />
                    <span>Настройки</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            <SidebarFooter className="p-4 border-t dark:border-gray-700 space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleBackToMain}>
                <ChevronLeft size={18} className="mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">На главную</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut size={18} className="mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">Выйти</span>
              </Button>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto max-w-6xl">
            {activeTab === 'students' && <AdminStudentsList />}
            {activeTab === 'reports' && <AdminReports />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
