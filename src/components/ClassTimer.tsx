
import React, { useState, useEffect } from 'react';
import { ClassPeriod } from '../types';
import { 
  getCurrentPeriodInfo, 
  formatMinutesToTime,
  getCurrentDayType
} from '../utils/dateUtils';
import { getDailySchedule } from '../data/bellSchedule';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '../contexts/ThemeContext';

const ClassTimer = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const [periodInfo, setPeriodInfo] = useState<{
    currentPeriod?: ClassPeriod;
    nextPeriod?: ClassPeriod;
    isBreak: boolean;
    timeRemaining: number;
    progressPercent: number;
  }>({
    isBreak: false,
    timeRemaining: 0,
    progressPercent: 0
  });
  
  // Temporary mock for testing - make class end at 21:00
  useEffect(() => {
    const updatePeriodInfo = () => {
      const dayType = getCurrentDayType();
      if (dayType === 'sunday') {
        setPeriodInfo({
          isBreak: true,
          timeRemaining: 0,
          progressPercent: 0
        });
        return;
      }
      
      const schedule = getDailySchedule(dayType === 'saturday' ? 'saturday' : 'weekday');
      
      // Temporarily modify the schedule for testing purposes
      const modifiedSchedule = schedule.map(period => {
        if (period === schedule[schedule.length - 1]) {
          return { ...period, endTime: '21:00' };
        }
        return period;
      });
      
      const info = getCurrentPeriodInfo(modifiedSchedule);
      setPeriodInfo(info);
    };
    
    // Update immediately and then every minute
    updatePeriodInfo();
    const interval = setInterval(updatePeriodInfo, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getStatusText = () => {
    if (!periodInfo.currentPeriod && !periodInfo.nextPeriod) {
      return 'Занятия на сегодня завершены';
    }
    
    if (periodInfo.isBreak) {
      return periodInfo.nextPeriod 
        ? `Перемена до следующей пары` 
        : 'Занятия на сегодня завершены';
    }
    
    return `Идёт ${periodInfo.currentPeriod?.name}`;
  };
  
  // Calculate if we're outside of class hours
  const isAfterClasses = !periodInfo.currentPeriod && !periodInfo.nextPeriod;
  
  // New subtle RGB gradients based on the theme and status
  const getThemeGradient = (isBreak: boolean) => {
    if (isAfterClasses) {
      return getThemeBasedClass({
        light: 'bg-gray-100',
        dark: 'bg-gray-800',
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        purple: 'bg-purple-100'
      });
    }
    
    if (isBreak) {
      // Subtle break time gradients with RGB animation
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 animate-gradient-x',
        dark: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-gradient-x',
        blue: 'bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 animate-gradient-x',
        green: 'bg-gradient-to-r from-green-100 via-green-200 to-green-100 animate-gradient-x',
        purple: 'bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 animate-gradient-x'
      });
    } else {
      // Subtle class time gradients with RGB animation
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 animate-gradient-x',
        dark: 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-gradient-x',
        blue: 'bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 animate-gradient-x',
        green: 'bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 animate-gradient-x',
        purple: 'bg-gradient-to-r from-purple-100 via-violet-100 to-purple-100 animate-gradient-x'
      });
    }
  };
  
  // Определим класс для прогресс-бара в зависимости от темы
  const getProgressBarClass = (isBreak: boolean) => {
    return getThemeBasedClass({
      light: isBreak ? 'from-blue-400 to-cyan-400' : 'from-purple-400 to-pink-400',
      dark: 'from-gray-300 to-gray-400',
      blue: 'from-blue-500 to-blue-400',
      green: 'from-green-500 to-green-400',
      purple: 'from-purple-500 to-purple-400'
    });
  };
  
  const getBackgroundTextClass = () => {
    return getThemeBasedClass({
      light: 'bg-white/30',
      dark: 'bg-white/10',
      defaultClass: 'bg-white/30'
    });
  };
  
  return (
    <div className={`rounded-lg p-4 mb-4 ${getThemeGradient(periodInfo.isBreak)} shadow-lg ultra-smooth`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{getStatusText()}</h3>
        {periodInfo.timeRemaining > 0 && !isAfterClasses && (
          <span className={`text-schedule-darkGray font-medium ${getBackgroundTextClass()} px-3 py-1 rounded-full text-sm text-center`}>
            {formatMinutesToTime(periodInfo.timeRemaining)}
          </span>
        )}
      </div>
      
      {periodInfo.timeRemaining > 0 && !isAfterClasses && (
        <>
          <div className={`w-full ${getBackgroundTextClass()} rounded-full h-2.5 mb-2 overflow-hidden`}>
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressBarClass(periodInfo.isBreak)}`}
              style={{ 
                width: `${periodInfo.progressPercent}%`,
                boxShadow: '0 0 10px rgba(155, 135, 245, 0.5)',
                transition: 'width 1s ease-in-out'
              }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-schedule-darkGray/80">
            {periodInfo.isBreak ? (
              <>
                <span>{periodInfo.currentPeriod?.endTime || ''}</span>
                <span>{periodInfo.nextPeriod?.startTime || ''}</span>
              </>
            ) : (
              <>
                <span>{periodInfo.currentPeriod?.startTime || ''}</span>
                <span>{periodInfo.currentPeriod?.endTime || ''}</span>
              </>
            )}
          </div>
          
          {periodInfo.nextPeriod && (
            <div className="mt-3 text-sm text-schedule-darkGray">
              <div className={`${getBackgroundTextClass()} px-3 py-2 rounded-md inline-block`}>
                <span>Следующая пара: </span>
                <span className="font-semibold">{periodInfo.nextPeriod.name} ({periodInfo.nextPeriod.startTime})</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassTimer;
