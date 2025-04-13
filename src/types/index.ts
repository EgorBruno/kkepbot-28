
export type DayType = 'weekday' | 'saturday' | 'sunday';

export type Student = {
  id: number;
  name: string;
  group: string;
  totalDutyCount: number;
};

export type Absence = {
  id: number;
  studentId: number;
  date: string;
  reason: string;
};

export type DutyAssignment = {
  id: number;
  studentId: number;
  date: string;
  completed: boolean;
};

export type ClassPeriod = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
};

export type BellSchedule = {
  id: number;
  dayType: 'weekday' | 'saturday';
  periods: ClassPeriod[];
};

export type Lesson = {
  id: number;
  periodId: number;
  subject: string;
  teacher: string;
  classroom: string;
};
