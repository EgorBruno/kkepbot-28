
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { weekdaySchedule, saturdaySchedule } from '../data/bellSchedule';
import { Card, CardContent } from './ui/card';
import { getCurrentDayType } from '../utils/dateUtils';
import { useTheme } from '../contexts/ThemeContext';

const BellScheduleSection = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const [activeTab, setActiveTab] = useState<'weekday' | 'saturday'>('weekday');
  
  useEffect(() => {
    // Set default tab based on current day
    const dayType = getCurrentDayType();
    if (dayType === 'saturday') {
      setActiveTab('saturday');
    } else {
      setActiveTab('weekday');
    }
  }, []);
  
  // Адаптивный класс для наведения на карточку в зависимости от темы
  const getCardHoverClass = () => {
    return getThemeBasedClass({
      light: 'hover:bg-gray-50 border-gray-100',
      dark: 'hover:bg-gray-800 border-gray-700',
      blue: 'hover:bg-blue-50 border-blue-100',
      green: 'hover:bg-green-50 border-green-100',
      purple: 'hover:bg-purple-50 border-purple-100',
      defaultClass: 'card-hover'
    });
  };

  // Get only the first 4 pairs for each schedule
  const limitedWeekdaySchedule = weekdaySchedule.slice(0, 4);
  const limitedSaturdaySchedule = saturdaySchedule.slice(0, 4);
  
  return (
    <Card className="mb-4 card-shadow">
      <CardContent className="pt-4">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekday">Будни</TabsTrigger>
            <TabsTrigger value="saturday">Суббота</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekday" className="space-y-2">
            {limitedWeekdaySchedule.map((period) => (
              <div key={period.id} className={`flex justify-between p-3 border rounded-md ${getCardHoverClass()}`}>
                <div className="font-medium">{period.name}</div>
                <div>{period.startTime} - {period.endTime}</div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="saturday" className="space-y-2">
            {limitedSaturdaySchedule.map((period) => (
              <div key={period.id} className={`flex justify-between p-3 border rounded-md ${getCardHoverClass()}`}>
                <div className="font-medium">{period.name}</div>
                <div>{period.startTime} - {period.endTime}</div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BellScheduleSection;
