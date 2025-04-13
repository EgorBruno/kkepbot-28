
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
  const { theme, getThemeBasedClass } = useTheme();
  
  // Определяем цвета для активного элемента в зависимости от текущей темы
  const getActiveColorClass = () => {
    return getThemeBasedClass({
      light: 'text-schedule-purple',
      dark: 'text-white',
      blue: 'text-schedule-darkBlue',
      green: 'text-schedule-green',
      purple: 'text-schedule-purple'
    });
  };

  // Определяем фоновый цвет для активных иконок в зависимости от темы
  const getActiveBgClass = () => {
    return getThemeBasedClass({
      light: 'bg-schedule-lightPurple',
      dark: 'bg-gray-700',
      blue: 'bg-schedule-blue',
      green: 'bg-schedule-green/20',
      purple: 'bg-schedule-lightPurple'
    });
  };
  
  // Цвет для неактивных элементов
  const getInactiveTextClass = () => {
    return getThemeBasedClass({
      light: 'text-muted-foreground',
      dark: 'text-gray-500',
      defaultClass: 'text-muted-foreground'
    });
  };
  
  // Фон для навигационной панели
  const getNavBgClass = () => {
    return getThemeBasedClass({
      light: 'bg-background border-border',
      dark: 'bg-gray-900 border-gray-800',
      defaultClass: 'bg-background border-border'
    });
  };
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${getNavBgClass()} shadow-lg z-10 ultra-smooth`}>
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
                  isActive ? getActiveColorClass() : getInactiveTextClass()
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
