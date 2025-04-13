
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ClipboardCheck, FileText, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const tabs = [
  { id: 'home', path: '/', icon: Home, label: 'Главная' },
  { id: 'absences', path: '/absences', icon: Users, label: 'Отсутствующие' },
  { id: 'duty', path: '/duty', icon: ClipboardCheck, label: 'Дежурство' },
  { id: 'reports', path: '/reports', icon: FileText, label: 'Отчеты' },
  { id: 'profile', path: '/profile', icon: User, label: 'Профиль' },
];

const BottomNavigation = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // Определяем основной цвет в зависимости от текущей темы
  const getActiveColorClass = () => {
    switch (theme) {
      case 'blue': return 'text-schedule-darkBlue';
      case 'green': return 'text-schedule-green';
      case 'dark': return 'text-white';
      default: return 'text-schedule-purple';
    }
  };

  // Определяем фоновый цвет для активных иконок в зависимости от темы
  const getActiveBgClass = () => {
    switch (theme) {
      case 'blue': return 'bg-schedule-blue';
      case 'green': return 'bg-schedule-green/20';
      case 'dark': return 'bg-gray-700';
      default: return 'bg-schedule-lightPurple';
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-10 ultra-smooth">
      <div className="max-w-[500px] mx-auto">
        <div className="flex items-center justify-between bottom-tab-height">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const IconComponent = tab.icon;
            
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 smooth-transition ${
                  isActive ? getActiveColorClass() : 'text-muted-foreground'
                }`}
              >
                <div className={`p-1.5 rounded-full ${isActive ? getActiveBgClass() : ''}`}>
                  <IconComponent 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 1.8} 
                    className={isActive ? 'ultra-smooth' : 'opacity-80 ultra-smooth'} 
                  />
                </div>
                <span className={`text-xs mt-0.5 font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
