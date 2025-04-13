
export type DayType = 'weekday' | 'saturday';

export type ClassPeriod = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
};

export type BellSchedule = {
  id: number;
  dayType: DayType;
  periods: ClassPeriod[];
};

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

export type Tab = {
  id: string;
  label: string;
  icon: string;
};
