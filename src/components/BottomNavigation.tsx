
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ClipboardCheck, FileText, User } from 'lucide-react';

const tabs = [
  { id: 'home', path: '/', icon: Home, label: 'Главная' },
  { id: 'absences', path: '/absences', icon: Users, label: 'Отсутствующие' },
  { id: 'duty', path: '/duty', icon: ClipboardCheck, label: 'Дежурство' },
  { id: 'reports', path: '/reports', icon: FileText, label: 'Отчеты' },
  { id: 'profile', path: '/profile', icon: User, label: 'Профиль' },
];

const BottomNavigation = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="max-w-[500px] mx-auto">
        <div className="flex items-center justify-between bottom-tab-height">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const IconComponent = tab.icon;
            
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 ${
                  isActive ? 'text-schedule-purple' : 'text-gray-500'
                }`}
              >
                <IconComponent size={24} className={isActive ? 'animate-pulse-soft' : ''} />
                <span className="text-xs mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
