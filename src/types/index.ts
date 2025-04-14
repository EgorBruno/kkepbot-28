
export type DayType = 'weekday' | 'saturday' | 'sunday';

export type Student = {
  id: number;
  name: string;
  group: string;
  email?: string;
  phone?: string;
  totalDutyCount: number;
  role?: 'student' | 'leader' | 'admin';
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

export type ReportType = 'individual' | 'group' | 'absences' | 'duties';

export type ReportFilter = {
  studentId?: number;
  group?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: ReportType;
};

export type GroupManagementProps = {
  onGroupsChange?: (groups: string[]) => void;
}
