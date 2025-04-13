
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { dutyAssignments, getStudentById, getPresentStudents } from '../data/mockData';
import { DutyAssignment, Student } from '../types';
import { Button } from './ui/button';
import { CheckCircle, CircleCheck, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const today = format(new Date(), 'yyyy-MM-dd');

const DutyList = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [assignments, setAssignments] = useState(
    dutyAssignments
      .filter(duty => duty.date === today)
      .map(duty => {
        const student = getStudentById(duty.studentId);
        return { ...duty, student: student! };
      })
  );
  
  const formatDisplayDate = (date: string) => {
    return format(new Date(date), 'd MMMM yyyy', { locale: ru });
  };
  
  const toggleDutyStatus = (dutyId: number) => {
    setAssignments(prev => 
      prev.map(duty => 
        duty.id === dutyId ? { ...duty, completed: !duty.completed } : duty
      )
    );
  };
  
  const assignNewDuty = (student: Student) => {
    const newDuty: DutyAssignment & { student: Student } = {
      id: Date.now(),
      studentId: student.id,
      date: selectedDate,
      completed: false,
      student,
    };
    
    setAssignments(prev => [...prev, newDuty]);
  };
  
  const calculateNextDutyStudent = () => {
    const presentStudents = getPresentStudents(selectedDate);
    
    if (presentStudents.length === 0) {
      return null;
    }
    
    // Sort by total duty count (ascending) to find students with fewest duties
    return [...presentStudents].sort((a, b) => a.totalDutyCount - b.totalDutyCount)[0];
  };
  
  const recommendedStudent = calculateNextDutyStudent();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Дежурство</h2>
        <div className="text-sm text-gray-500">{formatDisplayDate(selectedDate)}</div>
      </div>
      
      {recommendedStudent && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <ClipboardList className="mr-2 text-schedule-purple" size={16} />
              Рекомендуемый дежурный
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{recommendedStudent.name}</div>
                <div className="text-sm text-gray-500">
                  Количество дежурств: {recommendedStudent.totalDutyCount}
                </div>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => assignNewDuty(recommendedStudent)}
              >
                Назначить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {assignments.length > 0 ? (
        <div className="space-y-3">
          {assignments.map((duty) => (
            <div
              key={duty.id}
              className={`p-4 rounded-lg border ${
                duty.completed ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{duty.student.name}</div>
                  <div className="text-sm text-gray-500">
                    Всего дежурств: {duty.student.totalDutyCount}
                  </div>
                </div>
                <Button
                  variant={duty.completed ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDutyStatus(duty.id)}
                  className={duty.completed ? "bg-schedule-green" : ""}
                >
                  <CheckCircle size={18} className="mr-1" />
                  {duty.completed ? "Выполнено" : "Отметить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          Нет назначенных дежурных на этот день
        </div>
      )}
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-6">
            Назначить дежурного
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выбрать дежурного</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[400px] overflow-y-auto">
            {getPresentStudents(selectedDate).map(student => (
              <div
                key={student.id}
                className="p-3 border rounded-md mb-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => assignNewDuty(student)}
              >
                <div>
                  <div>{student.name}</div>
                  <div className="text-sm text-gray-500">
                    Дежурств: {student.totalDutyCount}
                  </div>
                </div>
                <CircleCheck size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DutyList;
