
import React from 'react';
import { User, FileText, Download, School } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

// Mock profile data
const profileData = {
  name: 'Иванов Иван Иванович',
  group: 'ИС-31',
  role: 'Староста',
  email: 'ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  dutyCount: 3,
  absenceCount: 2,
};

const ProfileInfo = () => {
  return (
    <div>
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
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h3 className="font-medium">Контактная информация</h3>
        </CardHeader>
        <CardContent className="pb-3">
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
        </CardContent>
      </Card>
      
      <Card className="mb-6">
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
      
      <h3 className="font-medium mb-3">Мои отчеты</h3>
      <div className="space-y-3">
        <Button variant="outline" className="w-full flex justify-between items-center">
          <span className="flex items-center">
            <FileText size={16} className="mr-2" />
            Личная статистика
          </span>
          <Download size={16} />
        </Button>
        
        <Button variant="outline" className="w-full flex justify-between items-center">
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
