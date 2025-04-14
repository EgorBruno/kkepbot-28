
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Users, FileText, Settings, Menu, X, UserCog, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminStudentsList from './AdminStudentsList';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import GroupManagement from './GroupManagement';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'groups' | 'reports' | 'settings'>('students');
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
      <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
        <Sidebar>
          <SidebarHeader>
            <div className="px-4 py-3">
              <h1 className="text-xl font-bold">Админ панель</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Управление системой</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'students'} 
                  onClick={() => setActiveTab('students')}
                  tooltip="Студенты"
                >
                  <Users size={18} className="mr-2" />
                  <span>Студенты</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'groups'} 
                  onClick={() => setActiveTab('groups')}
                  tooltip="Группы"
                >
                  <UserCog size={18} className="mr-2" />
                  <span>Группы</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'reports'} 
                  onClick={() => setActiveTab('reports')}
                  tooltip="Отчеты"
                >
                  <FileText size={18} className="mr-2" />
                  <span>Отчеты</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'settings'} 
                  onClick={() => setActiveTab('settings')}
                  tooltip="Настройки"
                >
                  <Settings size={18} className="mr-2" />
                  <span>Настройки</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleBackToMain} tooltip="На главную">
                  <ChevronLeft size={18} className="mr-2" />
                  <span>На главную</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Выйти">
                  <LogOut size={18} className="mr-2" />
                  <span>Выйти</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'students' && <AdminStudentsList />}
          {activeTab === 'groups' && <GroupManagement />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </SidebarProvider>
  );
};
