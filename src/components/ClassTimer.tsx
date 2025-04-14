
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
import { PartyPopper, Clock, AlertCircle } from 'lucide-react';
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
      
      // Get current time in minutes for comparison
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      
      // Calculate time until next class (if applicable)
      let timeToNextClass: number | undefined = undefined;
      
      if (schedule.length > 0) {
        const nextClassToday = schedule.find(period => {
          const [startHour, startMinute] = period.startTime.split(':').map(Number);
          const startTimeInMinutes = startHour * 60 + startMinute;
          return startTimeInMinutes > currentTimeInMinutes;
        });
        
        if (nextClassToday) {
          const [startHour, startMinute] = nextClassToday.startTime.split(':').map(Number);
          const startTimeInMinutes = startHour * 60 + startMinute;
          timeToNextClass = startTimeInMinutes - currentTimeInMinutes;
        }
      }
      
      const info = getCurrentPeriodInfo(schedule);
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
  
  // Check if we're on break and should show the celebration
  const showBreakCelebration = periodInfo.isBreak && periodInfo.nextPeriod;
  
  // Check if the next class is approaching (within 2 hours)
  const isNextClassApproaching = periodInfo.timeToNextClass !== undefined && 
                                periodInfo.timeToNextClass <= 120 && 
                                periodInfo.timeToNextClass > 0;
  
  // Enhanced subtle RGB gradients based on the theme and status
  const getThemeGradient = () => {
    if (isAfterClasses) {
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100',
        dark: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
        blue: 'bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100',
        green: 'bg-gradient-to-r from-green-100 via-green-50 to-green-100',
        purple: 'bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100'
      }) + ' animate-gradient-x';
    }
    
    if (showBreakCelebration) {
      // More vibrant celebration colors
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100',
        dark: 'bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-900',
        blue: 'bg-gradient-to-r from-blue-200 via-cyan-100 to-teal-200',
        green: 'bg-gradient-to-r from-emerald-100 via-green-50 to-lime-100',
        purple: 'bg-gradient-to-r from-fuchsia-100 via-purple-50 to-violet-100'
      }) + ' animate-gradient-x';
    }
    
    if (isNextClassApproaching) {
      // Warning colors for approaching class
      return getThemeBasedClass({
        light: 'bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100',
        dark: 'bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900',
        blue: 'bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100',
        green: 'bg-gradient-to-r from-lime-100 via-green-50 to-emerald-100',
        purple: 'bg-gradient-to-r from-violet-100 via-purple-50 to-fuchsia-100'
      }) + ' animate-gradient-x';
    }
    
    if (periodInfo.isBreak) {
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
  const getProgressBarClass = () => {
    if (showBreakCelebration) {
      return getThemeBasedClass({
        light: 'from-purple-400 to-pink-400',
        dark: 'from-purple-500 to-pink-500',
        blue: 'from-blue-500 to-cyan-400',
        green: 'from-green-500 to-emerald-400',
        purple: 'from-purple-500 to-fuchsia-400'
      });
    }
    
    if (isNextClassApproaching) {
      return getThemeBasedClass({
        light: 'from-amber-400 to-orange-400',
        dark: 'from-amber-500 to-orange-500',
        blue: 'from-blue-500 to-indigo-400',
        green: 'from-lime-500 to-green-400',
        purple: 'from-violet-500 to-fuchsia-400'
      });
    }
    
    return getThemeBasedClass({
      light: periodInfo.isBreak ? 'from-blue-400 to-cyan-400' : 'from-purple-400 to-pink-400',
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
    <div className={`rounded-lg p-4 mb-4 shadow-lg ultra-smooth relative overflow-hidden ${getThemeGradient()}`}>
      {showBreakCelebration && <Confetti />}
      
      <div className="flex justify-between items-center mb-3 relative z-10">
        <div className="flex items-center">
          {showBreakCelebration && (
            <PartyPopper className="mr-2 text-pink-500 animate-bounce" size={20} />
          )}
          {isNextClassApproaching && (
            <AlertCircle className="mr-2 text-amber-500 animate-pulse" size={20} />
          )}
          <h3 className="font-semibold text-lg">
            {showBreakCelebration ? 'УРА! ОТДЫХ!' : getStatusText()}
          </h3>
        </div>
        {periodInfo.timeRemaining > 0 && !isAfterClasses && (
          <span className={`${getBackgroundTextClass()} px-3 py-1 rounded-full text-sm text-center flex items-center`}>
            <Clock className="mr-1" size={14} />
            {formatMinutesToTime(periodInfo.timeRemaining)}
          </span>
        )}
      </div>
      
      {periodInfo.timeRemaining > 0 && !isAfterClasses && (
        <>
          <div className={`w-full ${getBackgroundTextClass()} rounded-full h-2.5 mb-2 overflow-hidden`}>
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressBarClass()}`}
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
                {isNextClassApproaching ? (
                  <span className="flex items-center">
                    <AlertCircle className="mr-1 text-amber-500" size={14} />
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      Скоро начнется: {periodInfo.nextPeriod.name} ({periodInfo.nextPeriod.startTime})
                    </span>
                  </span>
                ) : (
                  <>
                    <span>Следующая пара: </span>
                    <span className="font-semibold">{periodInfo.nextPeriod.name} ({periodInfo.nextPeriod.startTime})</span>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Flying sad emoji animation when class is approaching */}
      {isNextClassApproaching && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            >
              😭
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassTimer;
