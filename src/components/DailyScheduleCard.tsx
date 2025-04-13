
import React from 'react';
import { getCurrentDayType } from '../utils/dateUtils';
import { getDailySchedule } from '../data/bellSchedule';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getCurrentPeriodInfo } from '../utils/dateUtils';
import { useTheme } from '../contexts/ThemeContext';

const DailyScheduleCard = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const dayType = getCurrentDayType();
  const schedule = getDailySchedule(dayType === 'saturday' ? 'saturday' : 'weekday');
  const periodInfo = getCurrentPeriodInfo(schedule);
  
  const getTitleText = () => {
    if (dayType === 'sunday') return 'Расписание на понедельник';
    return dayType === 'saturday' ? 'Расписание на сегодня (суббота)' : 'Расписание на сегодня';
  };
  
  // Определяем цвета активной пары в зависимости от темы
  const getActiveClassStyles = () => {
    return getThemeBasedClass({
      light: 'bg-schedule-lightPurple border-l-4 border-schedule-purple',
      dark: 'bg-gray-700 border-l-4 border-schedule-purple',
      blue: 'bg-schedule-blue border-l-4 border-schedule-darkBlue',
      green: 'bg-schedule-lightPurple border-l-4 border-schedule-green',
      purple: 'bg-schedule-lightPurple border-l-4 border-schedule-purple'
    });
  };
  
  const getPastClassStyles = () => {
    return getThemeBasedClass({
      light: 'bg-gray-50 text-gray-500',
      dark: 'bg-gray-800 text-gray-400',
      defaultClass: 'bg-gray-50 text-gray-500'
    });
  };
  
  const getUpcomingClassStyles = () => {
    return getThemeBasedClass({
      light: 'bg-white border border-gray-100',
      dark: 'bg-gray-900 border border-gray-700',
      blue: 'bg-white border border-blue-100',
      green: 'bg-white border border-green-100',
      purple: 'bg-white border border-purple-100'
    });
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{getTitleText()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {dayType !== 'sunday' ? (
            schedule.map((period) => {
              const isActive = periodInfo.currentPeriod?.id === period.id && !periodInfo.isBreak;
              const isPast = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) > period.endTime;
              
              return (
                <div 
                  key={period.id} 
                  className={`flex justify-between p-3 rounded-md ${
                    isActive 
                      ? getActiveClassStyles()
                      : isPast 
                        ? getPastClassStyles() 
                        : getUpcomingClassStyles()
                  }`}
                >
                  <div className="font-medium">{period.name}</div>
                  <div>{period.startTime} - {period.endTime}</div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">Выходной день</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyScheduleCard;
