
import React, { useState } from 'react';
import { User, FileText, Download, School, Edit, Check, X, Camera } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTheme, themeOptions } from '../contexts/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// Mock profile data
const initialProfileData = {
  name: 'Иванов Иван Иванович',
  group: 'ИС-31',
  role: 'Староста',
  email: 'ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  dutyCount: 3,
  absenceCount: 2,
  photoUrl: '',
};

// Mock group options
const groupOptions = [
  { id: 'IS-31', name: 'ИС-31' },
  { id: 'IS-32', name: 'ИС-32' },
  { id: 'IS-33', name: 'ИС-33' },
];

// Mock role options
const roleOptions = [
  { id: 'student', name: 'Студент' },
  { id: 'headman', name: 'Староста' },
  { id: 'deputy', name: 'Заместитель старосты' },
];

const ProfileInfo = () => {
  const [profileData, setProfileData] = useState({ ...initialProfileData });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialProfileData });
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
    setPhotoPreview(null);
  };

  const handleSave = () => {
    // Update profile with new data including photo
    const updatedProfile = { 
      ...editData, 
      photoUrl: photoPreview || profileData.photoUrl 
    };
    
    setProfileData(updatedProfile);
    setIsEditing(false);
    setPhotoPreview(null);
    
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPhotoPreview(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: "Тема изменена",
      description: `Применена ${themeOptions.find(t => t.id === value)?.name.toLowerCase()} тема`,
    });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="pb-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24">
            {(profileData.photoUrl || photoPreview) ? (
              <AvatarImage 
                src={photoPreview || profileData.photoUrl} 
                alt={profileData.name} 
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-schedule-lightPurple text-schedule-purple text-xl">
                {getInitials(profileData.name)}
              </AvatarFallback>
            )}
          </Avatar>
          
          {isEditing && (
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-schedule-purple text-white p-1.5 rounded-full cursor-pointer">
              <Camera size={16} />
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>
        
        {!isEditing ? (
          <>
            <h2 className="text-xl font-semibold">{profileData.name}</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <School size={16} className="mr-1" />
              <span>{profileData.group} • {profileData.role}</span>
            </div>
          </>
        ) : (
          <div className="w-full max-w-xs space-y-3">
            <Input 
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              placeholder="ФИО"
              className="text-center"
            />
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={editData.group} 
                onValueChange={(value) => setEditData({...editData, group: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Группа" />
                </SelectTrigger>
                <SelectContent>
                  {groupOptions.map(group => (
                    <SelectItem key={group.id} value={group.name}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={editData.role} 
                onValueChange={(value) => setEditData({...editData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
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
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тему" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((themeOption) => (
                <SelectItem key={themeOption.id} value={themeOption.id} className="flex items-center">
                  <div className="flex items-center">
                    <span 
                      className="w-4 h-4 rounded-full mr-2 border border-gray-200" 
                      style={{ backgroundColor: themeOption.color }}
                    ></span>
                    {themeOption.name}
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
