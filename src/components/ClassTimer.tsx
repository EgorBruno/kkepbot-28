
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
  const { theme } = useTheme();
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
  
  // Определим классы в зависимости от темы
  const getThemeGradient = (isBreak: boolean) => {
    switch (theme) {
      case 'blue': 
        return isBreak 
          ? 'bg-gradient-to-r from-blue-400 to-blue-300 shadow-[0_0_15px_rgba(13,148,233,0.3)]'
          : 'bg-gradient-to-r from-blue-300 to-blue-200 shadow-[0_0_15px_rgba(13,148,233,0.3)]';
      case 'green': 
        return isBreak 
          ? 'bg-gradient-to-r from-green-400 to-green-300 shadow-[0_0_15px_rgba(94,184,94,0.3)]'
          : 'bg-gradient-to-r from-green-300 to-green-200 shadow-[0_0_15px_rgba(94,184,94,0.3)]';
      case 'dark': 
        return isBreak 
          ? 'bg-gradient-to-r from-gray-700 to-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.3)]'
          : 'bg-gradient-to-r from-gray-600 to-gray-500 shadow-[0_0_15px_rgba(0,0,0,0.3)]';
      default: // Фиолетовая тема (по умолчанию)
        return isBreak 
          ? 'bg-gradient-to-r from-schedule-blue to-blue-200 shadow-[0_0_15px_rgba(13,148,233,0.3)]' 
          : 'bg-gradient-to-r from-schedule-lightPurple to-purple-200 shadow-[0_0_15px_rgba(155,135,245,0.3)]';
    }
  };
  
  // Определим класс для прогресс-бара в зависимости от темы
  const getProgressBarClass = (isBreak: boolean) => {
    switch (theme) {
      case 'blue': 
        return 'from-blue-500 to-blue-400';
      case 'green': 
        return 'from-green-500 to-green-400';
      case 'dark': 
        return 'from-gray-300 to-gray-400';
      default: // Фиолетовая тема
        return isBreak 
          ? 'from-blue-400 to-cyan-400' 
          : 'from-purple-400 to-pink-400';
    }
  };
  
  // Class determination for the glow effect
  const glowClass = isAfterClasses 
    ? 'bg-gray-100' 
    : getThemeGradient(periodInfo.isBreak);
  
  const progressBarClass = getProgressBarClass(periodInfo.isBreak);
  
  return (
    <div className={`rounded-lg p-4 mb-4 ${glowClass} ultra-smooth`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{getStatusText()}</h3>
        {periodInfo.timeRemaining > 0 && !isAfterClasses && (
          <span className="text-schedule-darkGray font-medium bg-white/30 px-3 py-1 rounded-full text-sm text-center">
            {formatMinutesToTime(periodInfo.timeRemaining)}
          </span>
        )}
      </div>
      
      {periodInfo.timeRemaining > 0 && !isAfterClasses && (
        <>
          <div className="w-full bg-white/30 rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${progressBarClass}`}
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
              <div className="bg-white/40 px-3 py-2 rounded-md inline-block">
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
