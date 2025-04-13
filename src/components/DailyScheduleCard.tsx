
import React from 'react';
import { getCurrentDayType } from '../utils/dateUtils';
import { getDailySchedule } from '../data/bellSchedule';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getCurrentPeriodInfo } from '../utils/dateUtils';

const DailyScheduleCard = () => {
  const dayType = getCurrentDayType();
  const schedule = getDailySchedule(dayType === 'saturday' ? 'saturday' : 'weekday');
  const periodInfo = getCurrentPeriodInfo(schedule);
  
  const getTitleText = () => {
    if (dayType === 'sunday') return 'Расписание на понедельник';
    return dayType === 'saturday' ? 'Расписание на сегодня (суббота)' : 'Расписание на сегодня';
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
                      ? 'bg-schedule-lightPurple border-l-4 border-schedule-purple' 
                      : isPast 
                        ? 'bg-gray-50 text-gray-500' 
                        : 'bg-white border border-gray-100'
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
