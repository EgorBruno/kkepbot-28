
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
import Confetti from './Confetti';

const ClassTimer = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const [periodInfo, setPeriodInfo] = useState<{
    currentPeriod?: ClassPeriod;
    nextPeriod?: ClassPeriod;
    isBreak: boolean;
    timeRemaining: number;
    progressPercent: number;
    timeToNextClass?: number;
  }>({
    isBreak: false,
    timeRemaining: 0,
    progressPercent: 0
  });
  
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
      const info = getCurrentPeriodInfo(schedule);
      
      // Calculate time to next class in minutes if we're in a break
      let timeToNextClass;
      if (info.isBreak && info.nextPeriod) {
        const now = new Date();
        const [nextHours, nextMinutes] = info.nextPeriod.startTime.split(':').map(Number);
        const nextClassTime = new Date();
        nextClassTime.setHours(nextHours, nextMinutes, 0, 0);
        
        const timeDiffMs = nextClassTime.getTime() - now.getTime();
        timeToNextClass = Math.max(0, Math.floor(timeDiffMs / 1000 / 60)); // Convert to minutes
      }
      
      setPeriodInfo({
        ...info,
        timeToNextClass
      });
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
  
  // Check if we're in break and if there's a warning (less than 2 hours to next class)
  const isInBreak = periodInfo.isBreak && periodInfo.nextPeriod;
  const showWarning = isInBreak && periodInfo.timeToNextClass && periodInfo.timeToNextClass <= 120;
  
  // Enhanced subtle RGB gradients based on the theme and status
  const getThemeGradient = (isBreak: boolean) => {
    if (isAfterClasses) {
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100',
        dark: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
        blue: 'bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100',
        green: 'bg-gradient-to-r from-green-100 via-green-50 to-green-100',
        purple: 'bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100'
      }) + ' animate-gradient-x';
    }
    
    if (isBreak) {
      // Subtle break time RGB gradients with animation
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100',
        dark: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
        blue: 'bg-gradient-to-r from-blue-200 via-sky-100 to-blue-200',
        green: 'bg-gradient-to-r from-green-100 via-emerald-50 to-green-100',
        purple: 'bg-gradient-to-r from-purple-100 via-violet-50 to-purple-100'
      }) + ' animate-gradient-x';
    } else {
      // Subtle class time RGB gradients with animation
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100',
        dark: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
        blue: 'bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-100',
        green: 'bg-gradient-to-r from-green-100 via-teal-50 to-green-100',
        purple: 'bg-gradient-to-r from-purple-100 via-fuchsia-50 to-purple-100'
      }) + ' animate-gradient-x';
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
    <div className={`rounded-lg p-4 mb-4 shadow-lg ultra-smooth relative ${getThemeGradient(periodInfo.isBreak)}`}>
      {/* Confetti animation for breaks */}
      {isInBreak && !showWarning && (
        <Confetti type="rest" />
      )}
      
      {/* Warning animation when close to next class */}
      {showWarning && (
        <Confetti type="warning" />
      )}
      
      <div className="flex justify-between items-center mb-3 relative z-10">
        <h3 className="font-semibold text-lg">{getStatusText()}</h3>
        {periodInfo.timeRemaining > 0 && !isAfterClasses && (
          <span className={`${getBackgroundTextClass()} px-3 py-1 rounded-full text-sm text-center`}>
            {formatMinutesToTime(periodInfo.timeRemaining)}
          </span>
        )}
      </div>
      
      {periodInfo.timeRemaining > 0 && !isAfterClasses && (
        <>
          <div className={`w-full ${getBackgroundTextClass()} rounded-full h-2.5 mb-2 overflow-hidden relative z-10`}>
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressBarClass(periodInfo.isBreak)}`}
              style={{ 
                width: `${periodInfo.progressPercent}%`,
                transition: 'width 1s ease-in-out'
              }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-schedule-darkGray/80 relative z-10">
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
            <div className="mt-3 text-sm text-schedule-darkGray relative z-10">
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
