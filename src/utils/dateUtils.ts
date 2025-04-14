
import { ClassPeriod } from '../types';

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getCurrentTime(): Date {
  // Return the actual current time for accurate time tracking
  return new Date();
}

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday-Friday (1-5)
}

export function isSaturday(date: Date): boolean {
  return date.getDay() === 6; // Saturday (6)
}

export function getCurrentPeriodInfo(periods: ClassPeriod[]): {
  currentPeriod?: ClassPeriod;
  nextPeriod?: ClassPeriod;
  isBreak: boolean;
  timeRemaining: number;
  progressPercent: number;
} {
  const now = getCurrentTime();
  const currentTimeStr = formatTime(now);
  
  // Convert current time to minutes since midnight for easier comparison
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  
  // Function to convert "HH:MM" to minutes since midnight
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Find current period or break
  let currentPeriod: ClassPeriod | undefined;
  let nextPeriod: ClassPeriod | undefined;
  let isBreak = true;
  let timeRemaining = 0;
  let progressPercent = 0;
  
  // Check if we're in a class period
  for (let i = 0; i < periods.length; i++) {
    const period = periods[i];
    const startTimeInMinutes = timeToMinutes(period.startTime);
    const endTimeInMinutes = timeToMinutes(period.endTime);
    
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
      // We're in a class period
      currentPeriod = period;
      nextPeriod = i < periods.length - 1 ? periods[i + 1] : undefined;
      isBreak = false;
      
      // Calculate time remaining in class and progress percentage
      timeRemaining = endTimeInMinutes - currentTimeInMinutes;
      progressPercent = ((currentTimeInMinutes - startTimeInMinutes) / (endTimeInMinutes - startTimeInMinutes)) * 100;
      break;
    }
    
    // Check if we're in a break before the next class
    if (i < periods.length - 1) {
      const nextPeriodStartInMinutes = timeToMinutes(periods[i + 1].startTime);
      
      if (currentTimeInMinutes >= endTimeInMinutes && currentTimeInMinutes < nextPeriodStartInMinutes) {
        // We're in a break
        currentPeriod = period; // Just ended
        nextPeriod = periods[i + 1]; // Coming up
        isBreak = true;
        
        // Calculate time remaining in break and progress percentage
        timeRemaining = nextPeriodStartInMinutes - currentTimeInMinutes;
        progressPercent = ((currentTimeInMinutes - endTimeInMinutes) / (nextPeriodStartInMinutes - endTimeInMinutes)) * 100;
        break;
      }
    }
  }
  
  return {
    currentPeriod,
    nextPeriod,
    isBreak,
    timeRemaining,
    progressPercent,
  };
}

export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours} ч ${mins} мин`;
  }
  
  return `${mins} мин`;
}

export function getCurrentDayType(): 'weekday' | 'saturday' | 'sunday' {
  const now = new Date();
  const day = now.getDay();
  
  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  return 'weekday';
}
