
import React, { useState, useEffect } from 'react';
import { User, FileText, Download, School, Edit, Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock profile data
const initialProfileData = {
  name: 'Иванов Иван Иванович',
  group: 'ИС-31',
  role: 'Староста',
  email: 'ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  dutyCount: 3,
  absenceCount: 2,
};

type ThemeOption = {
  id: string;
  name: string;
  color: string;
  bodyClass: string;
};

const themeOptions: ThemeOption[] = [
  { id: 'light', name: 'Светлая', color: '#ffffff', bodyClass: '' },
  { id: 'dark', name: 'Темная', color: '#1E1E1E', bodyClass: 'dark' },
  { id: 'purple', name: 'Фиолетовая', color: '#9b87f5', bodyClass: 'theme-purple' },
  { id: 'blue', name: 'Голубая', color: '#0EA5E9', bodyClass: 'theme-blue' },
  { id: 'green', name: 'Зеленая', color: '#5EB85E', bodyClass: 'theme-green' },
];

const ProfileInfo = () => {
  const [profileData, setProfileData] = useState({ ...initialProfileData });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialProfileData });
  const [selectedTheme, setSelectedTheme] = useState<string>('light');
  const { toast } = useToast();

  // Apply theme on initial load
  useEffect(() => {
    // Try to load theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    setSelectedTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    // Find the selected theme
    const theme = themeOptions.find(t => t.id === themeId);
    if (!theme) return;

    // Remove all theme classes
    document.body.classList.remove('dark', 'theme-purple', 'theme-blue', 'theme-green');
    
    // Add the new theme class if it's not empty
    if (theme.bodyClass) {
      document.body.classList.add(theme.bodyClass);
    }
    
    // Save the theme preference
    localStorage.setItem('selectedTheme', themeId);
  };

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    applyTheme(value);
    toast({
      title: "Тема изменена",
      description: `Применена ${themeOptions.find(t => t.id === value)?.name.toLowerCase()} тема`,
    });
  };

  return (
    <div className="pb-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-schedule-lightPurple rounded-full flex items-center justify-center mb-4">
          <User size={40} className="text-schedule-purple" />
        </div>
        <h2 className="text-xl font-semibold">{profileData.name}</h2>
        <div className="flex items-center text-gray-500 mt-1">
          <School size={16} className="mr-1" />
          <span>{profileData.group} • {profileData.role}</span>
        </div>
      </div>
      
      <Card className="mb-6 card-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h3 className="font-medium">Контактная информация</h3>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Edit size={16} className="mr-1" />
              Изменить
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X size={16} className="mr-1" />
                Отмена
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Check size={16} className="mr-1" />
                Сохранить
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="pb-3">
          {!isEditing ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{profileData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Телефон:</span>
                <span>{profileData.phone}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Email:</span>
                <Input 
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Телефон:</span>
                <Input 
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="col-span-2"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="mb-6 card-shadow">
        <CardHeader className="pb-2">
          <h3 className="font-medium">Статистика</h3>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Всего дежурств:</span>
              <span>{profileData.dutyCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Пропущено занятий:</span>
              <span>{profileData.absenceCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 card-shadow">
        <CardHeader className="pb-2">
          <h3 className="font-medium">Цветовая тема</h3>
        </CardHeader>
        <CardContent className="pb-3">
          <Select value={selectedTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тему" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((theme) => (
                <SelectItem key={theme.id} value={theme.id} className="flex items-center">
                  <div className="flex items-center">
                    <span 
                      className="w-4 h-4 rounded-full mr-2 border border-gray-200" 
                      style={{ backgroundColor: theme.color }}
                    ></span>
                    {theme.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <h3 className="font-medium mb-3">Мои отчеты</h3>
      <div className="space-y-3">
        <Button variant="outline" className="w-full flex justify-between items-center card-hover">
          <span className="flex items-center">
            <FileText size={16} className="mr-2" />
            Личная статистика
          </span>
          <Download size={16} />
        </Button>
        
        <Button variant="outline" className="w-full flex justify-between items-center card-hover">
          <span className="flex items-center">
            <FileText size={16} className="mr-2" />
            Отчет по дежурствам
          </span>
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
