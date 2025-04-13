
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { dutyAssignments, getStudentById, getPresentStudents } from '../data/mockData';
import { DutyAssignment, Student } from '../types';
import { Button } from './ui/button';
import { CheckCircle, CircleCheck, ClipboardList, AlertCircle, Lock, Unlock, Trash2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const today = format(new Date(), 'yyyy-MM-dd');

const DutyList = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [isLocked, setIsLocked] = useState(true);
  const [assignments, setAssignments] = useState(
    dutyAssignments
      .filter(duty => duty.date === today)
      .map(duty => {
        const student = getStudentById(duty.studentId);
        return { ...duty, student: student!, reason: '' };
      })
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reasonInput, setReasonInput] = useState('');
  const [currentDutyId, setCurrentDutyId] = useState<number | null>(null);
  
  const formatDisplayDate = (date: string) => {
    return format(new Date(date), 'd MMMM yyyy', { locale: ru });
  };
  
  const toggleDutyStatus = (dutyId: number) => {
    if (isLocked) return;
    
    const duty = assignments.find(d => d.id === dutyId);
    if (duty?.completed) {
      // If it's already completed, just toggle it back
      setAssignments(prev => 
        prev.map(duty => 
          duty.id === dutyId ? { ...duty, completed: false } : duty
        )
      );
    } else {
      // If it's not completed, open the dialog to ask for reason or just mark as completed
      setCurrentDutyId(dutyId);
      setDialogOpen(true);
    }
  };
  
  const handleCompleteWithReason = (completed: boolean) => {
    if (currentDutyId === null) return;
    
    setAssignments(prev => 
      prev.map(duty => 
        duty.id === currentDutyId ? { 
          ...duty, 
          completed, 
          reason: !completed ? reasonInput : '' 
        } : duty
      )
    );
    
    setReasonInput('');
    setDialogOpen(false);
    setCurrentDutyId(null);
  };
  
  const assignNewDuty = (student: Student) => {
    if (isLocked) return;
    
    const newDuty: DutyAssignment & { student: Student, reason: string } = {
      id: Date.now(),
      studentId: student.id,
      date: selectedDate,
      completed: false,
      student,
      reason: '',
    };
    
    setAssignments(prev => [...prev, newDuty]);
  };
  
  const removeDuty = (dutyId: number) => {
    if (isLocked) return;
    setAssignments(prev => prev.filter(duty => duty.id !== dutyId));
  };
  
  const calculateNextDutyStudents = () => {
    const presentStudents = getPresentStudents(selectedDate);
    
    if (presentStudents.length < 2) {
      return [];
    }
    
    // Sort by total duty count (ascending) to find students with fewest duties
    return [...presentStudents]
      .sort((a, b) => a.totalDutyCount - b.totalDutyCount)
      .slice(0, 2);
  };
  
  const recommendedStudents = calculateNextDutyStudents();
  
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Дежурство</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsLocked(!isLocked)}
          className={`${isLocked ? 'text-red-500' : 'text-green-500'}`}
        >
          {isLocked ? (
            <>
              <Lock className="mr-1.5 h-4 w-4" />
              Разблокировать
            </>
          ) : (
            <>
              <Unlock className="mr-1.5 h-4 w-4" />
              Заблокировать
            </>
          )}
        </Button>
      </div>
      
      <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
        <p>{formatDisplayDate(selectedDate)}</p>
        <p className="mt-1">{isLocked ? 'Редактирование заблокировано' : 'Редактирование разблокировано'}</p>
      </div>
      
      {recommendedStudents.length > 0 && (
        <Card className="mb-6 card-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <ClipboardList className="mr-2 text-schedule-purple" size={16} />
              Рекомендуемые дежурные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedStudents.map(student => (
                <div key={student.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">
                      Количество дежурств: {student.totalDutyCount}
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => assignNewDuty(student)}
                    disabled={isLocked}
                  >
                    Назначить
                  </Button>
                </div>
              ))}
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
                duty.completed 
                  ? 'bg-green-50 border-green-200' 
                  : duty.reason 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white'
              } card-hover`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{duty.student.name}</div>
                  <div className="text-sm text-gray-500">
                    Всего дежурств: {duty.student.totalDutyCount}
                  </div>
                  {duty.reason && (
                    <div className="mt-2 text-sm text-red-500 flex items-start gap-1">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{duty.reason}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={duty.completed ? "default" : duty.reason ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => toggleDutyStatus(duty.id)}
                    disabled={isLocked}
                    className={duty.completed ? "bg-schedule-green" : ""}
                  >
                    {duty.completed ? (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Выполнено
                      </>
                    ) : duty.reason ? (
                      <>
                        <XCircle size={16} className="mr-1" />
                        Не выполнено
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Отметить
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDuty(duty.id)}
                    disabled={isLocked}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          Нет назначенных дежурных на этот день
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Статус дежурства</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex gap-2">
              <Button 
                variant="default" 
                className="flex-1 bg-schedule-green" 
                onClick={() => handleCompleteWithReason(true)}
              >
                <CheckCircle size={16} className="mr-1.5" />
                Выполнено
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1" 
                onClick={() => setReasonInput(prev => prev || 'Не выполнено')}
              >
                <XCircle size={16} className="mr-1.5" />
                Не выполнено
              </Button>
            </div>
            
            {reasonInput && (
              <div className="space-y-2">
                <p className="text-sm">Укажите причину невыполнения:</p>
                <Textarea 
                  value={reasonInput} 
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="Причина невыполнения дежурства..."
                  rows={3}
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {
              setDialogOpen(false);
              setReasonInput('');
            }}>
              Отмена
            </Button>
            {reasonInput && (
              <Button 
                variant="default" 
                onClick={() => handleCompleteWithReason(false)}
              >
                Сохранить
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-6" disabled={isLocked}>
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
