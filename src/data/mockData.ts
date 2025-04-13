
import { Student, Absence, DutyAssignment, Lesson } from '../types';

export const students: Student[] = [
  { id: 1, name: 'Иванов Иван', group: 'ИС-31', totalDutyCount: 3, email: 'ivanov@example.com', phone: '+7 (900) 123-45-67', role: 'student' },
  { id: 2, name: 'Петрова Мария', group: 'ИС-31', totalDutyCount: 2, email: 'petrova@example.com', phone: '+7 (900) 234-56-78', role: 'student' },
  { id: 3, name: 'Сидоров Алексей', group: 'ИС-31', totalDutyCount: 4, email: 'sidorov@example.com', phone: '+7 (900) 345-67-89', role: 'leader' },
  { id: 4, name: 'Козлова Анна', group: 'ИС-31', totalDutyCount: 1, email: 'kozlova@example.com', phone: '+7 (900) 456-78-90', role: 'student' },
  { id: 5, name: 'Новиков Дмитрий', group: 'ИС-31', totalDutyCount: 2, email: 'novikov@example.com', phone: '+7 (900) 567-89-01', role: 'student' },
  { id: 6, name: 'Морозова Елена', group: 'ИС-31', totalDutyCount: 3, email: 'morozova@example.com', phone: '+7 (900) 678-90-12', role: 'student' },
  { id: 7, name: 'Волков Кирилл', group: 'ИС-31', totalDutyCount: 2, email: 'volkov@example.com', phone: '+7 (900) 789-01-23', role: 'student' },
  { id: 8, name: 'Лебедева Ольга', group: 'ИС-31', totalDutyCount: 1, email: 'lebedeva@example.com', phone: '+7 (900) 890-12-34', role: 'student' },
  { id: 9, name: 'Соколов Михаил', group: 'ИС-31', totalDutyCount: 3, email: 'sokolov@example.com', phone: '+7 (900) 901-23-45', role: 'student' },
  { id: 10, name: 'Павлова Татьяна', group: 'ИС-31', totalDutyCount: 2, email: 'pavlova@example.com', phone: '+7 (900) 012-34-56', role: 'student' },
  { id: 11, name: 'Орлов Андрей', group: 'ИС-32', totalDutyCount: 1, email: 'orlov@example.com', phone: '+7 (901) 234-56-78', role: 'leader' },
  { id: 12, name: 'Федорова Екатерина', group: 'ИС-32', totalDutyCount: 2, email: 'fedorova@example.com', phone: '+7 (901) 345-67-89', role: 'student' },
  { id: 13, name: 'Николаев Сергей', group: 'ИС-32', totalDutyCount: 3, email: 'nikolaev@example.com', phone: '+7 (901) 456-78-90', role: 'student' },
  { id: 14, name: 'Макарова Юлия', group: 'ИС-32', totalDutyCount: 2, email: 'makarova@example.com', phone: '+7 (901) 567-89-01', role: 'student' },
  { id: 15, name: 'Захаров Артем', group: 'ИС-32', totalDutyCount: 1, email: 'zaharov@example.com', phone: '+7 (901) 678-90-12', role: 'student' },
];

export const absences: Absence[] = [
  { id: 1, studentId: 3, date: '2025-04-13', reason: 'Болезнь' },
  { id: 2, studentId: 5, date: '2025-04-13', reason: 'Семейные обстоятельства' },
  { id: 3, studentId: 8, date: '2025-04-13', reason: 'Соревнования' },
  { id: 4, studentId: 1, date: '2025-04-12', reason: 'Болезнь' },
  { id: 5, studentId: 3, date: '2025-04-12', reason: 'Болезнь' },
  { id: 6, studentId: 12, date: '2025-04-13', reason: 'Олимпиада' },
];

export const dutyAssignments: DutyAssignment[] = [
  { id: 1, studentId: 1, date: '2025-04-13', completed: true },
  { id: 2, studentId: 6, date: '2025-04-13', completed: false },
  { id: 3, studentId: 2, date: '2025-04-14', completed: false },
  { id: 4, studentId: 7, date: '2025-04-14', completed: false },
  { id: 5, studentId: 11, date: '2025-04-13', completed: true },
  { id: 6, studentId: 13, date: '2025-04-13', completed: true },
  { id: 7, studentId: 14, date: '2025-04-14', completed: false },
];

export const dailyLessons: Lesson[] = [
  { id: 1, periodId: 1, subject: 'Математика', teacher: 'Петрова А.В.', classroom: '301' },
  { id: 2, periodId: 2, subject: 'Информатика', teacher: 'Сидоров И.П.', classroom: '412' },
  { id: 3, periodId: 3, subject: 'Английский язык', teacher: 'Иванова Е.А.', classroom: '205' },
  { id: 4, periodId: 4, subject: 'Физика', teacher: 'Кузнецов Д.С.', classroom: '308' },
  { id: 5, periodId: 5, subject: 'Программирование', teacher: 'Смирнов К.Л.', classroom: '401' },
  { id: 6, periodId: 6, subject: 'Базы данных', teacher: 'Морозов Н.А.', classroom: '402' },
];

export const getAbsentStudents = (date: string): Student[] => {
  const absentIds = absences
    .filter(absence => absence.date === date)
    .map(absence => absence.studentId);
  
  return students.filter(student => absentIds.includes(student.id));
};

export const getPresentStudents = (date: string): Student[] => {
  const absentIds = absences
    .filter(absence => absence.date === date)
    .map(absence => absence.studentId);
  
  return students.filter(student => !absentIds.includes(student.id));
};

export const getDutyAssignments = (date: string): (DutyAssignment & { student: Student })[] => {
  return dutyAssignments
    .filter(duty => duty.date === date)
    .map(duty => {
      const student = students.find(s => s.id === duty.studentId);
      return {
        ...duty,
        student: student!
      };
    });
};

export const getStudentById = (id: number): Student | undefined => {
  return students.find(student => student.id === id);
};

export const getLessonByPeriodId = (periodId: number): Lesson | undefined => {
  return dailyLessons.find(lesson => lesson.periodId === periodId);
};

export const getGroups = (): string[] => {
  return Array.from(new Set(students.map(student => student.group))).sort();
};

export const getStudentsByGroup = (group: string): Student[] => {
  return students.filter(student => student.group === group);
};

export const getStudentAbsences = (studentId: number): Absence[] => {
  return absences.filter(absence => absence.studentId === studentId);
};

export const getStudentDuties = (studentId: number): DutyAssignment[] => {
  return dutyAssignments.filter(duty => duty.studentId === studentId);
};
