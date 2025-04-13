import { BellSchedule, ClassPeriod } from '../types';

export const weekdaySchedule: ClassPeriod[] = [
  { id: 1, name: '1 пара', startTime: '08:45', endTime: '10:05' },
  { id: 2, name: '2 пара', startTime: '10:25', endTime: '11:45' },
  { id: 3, name: '3 пара', startTime: '12:05', endTime: '13:25' },
  { id: 4, name: '4 пара', startTime: '13:35', endTime: '14:55' },
  { id: 5, name: '5 пара', startTime: '16:00', endTime: '17:35' },
  { id: 6, name: '6 пара', startTime: '17:45', endTime: '19:20' },
];

export const saturdaySchedule: ClassPeriod[] = [
  { id: 1, name: '1 пара', startTime: '08:45', endTime: '10:00' },
  { id: 2, name: '2 пара', startTime: '10:10', endTime: '11:25' },
  { id: 3, name: '3 пара', startTime: '11:35', endTime: '12:50' },
  { id: 4, name: '4 пара', startTime: '13:00', endTime: '14:15' },
];

export const bellSchedules: BellSchedule[] = [
  {
    id: 1,
    dayType: 'weekday',
    periods: weekdaySchedule,
  },
  {
    id: 2,
    dayType: 'saturday',
    periods: saturdaySchedule,
  },
];

export const getDailySchedule = (dayType: 'weekday' | 'saturday'): ClassPeriod[] => {
  const schedule = bellSchedules.find(s => s.dayType === dayType);
  return schedule ? schedule.periods : [];
};
