
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { students, absences } from '../data/mockData';
import { Absence, Student } from '../types';
import { Button } from './ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const today = format(new Date(), 'yyyy-MM-dd');

const AbsenceList = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentAbsences, setCurrentAbsences] = useState(absences.filter(a => a.date === today));
  
  const formatDisplayDate = (date: string) => {
    return format(new Date(date), 'd MMMM yyyy', { locale: ru });
  };
  
  const isAbsent = (studentId: number) => {
    return currentAbsences.some(absence => absence.studentId === studentId);
  };
  
  const addAbsence = (student: Student, reason: string) => {
    const newAbsence: Absence = {
      id: Date.now(),
      studentId: student.id,
      date: selectedDate,
      reason,
    };
    
    setCurrentAbsences(prev => [...prev, newAbsence]);
  };
  
  const removeAbsence = (studentId: number) => {
    setCurrentAbsences(prev => prev.filter(absence => absence.studentId !== studentId));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Отсутствующие</h2>
        <div className="text-sm text-gray-500">{formatDisplayDate(selectedDate)}</div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-4">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <span className="font-medium">Всего в группе:</span>
            <span>{students.length}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">Отсутствует:</span>
            <span>{currentAbsences.length}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">Присутствует:</span>
            <span>{students.length - currentAbsences.length}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {students.map((student) => {
          const absent = isAbsent(student.id);
          const absence = currentAbsences.find(a => a.studentId === student.id);
          
          return (
            <div 
              key={student.id} 
              className={`p-4 rounded-lg border flex justify-between items-center ${
                absent ? 'bg-rose-50 border-rose-200' : 'bg-white'
              }`}
            >
              <div>
                <div className="font-medium">{student.name}</div>
                {absent && (
                  <div className="text-sm text-gray-500">
                    Причина: {absence?.reason}
                  </div>
                )}
              </div>
              
              {absent ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeAbsence(student.id)}
                  className="text-schedule-red"
                >
                  <XCircle size={18} className="mr-1" />
                  Присутствует
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-schedule-gray">
                      <CheckCircle2 size={18} className="mr-1" />
                      Отметить
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Отметить отсутствующего</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="mb-4">{student.name}</p>
                      <Select onValueChange={(value) => addAbsence(student, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите причину" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Болезнь">Болезнь</SelectItem>
                          <SelectItem value="Семейные обстоятельства">Семейные обстоятельства</SelectItem>
                          <SelectItem value="Соревнования">Соревнования</SelectItem>
                          <SelectItem value="Олимпиада">Олимпиада</SelectItem>
                          <SelectItem value="Другое">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AbsenceList;
