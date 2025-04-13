
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Calendar, User, Users, FileBarChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/contexts/ThemeContext';
import { students, getAbsentStudents, getDutyAssignments, getGroups, getStudentsByGroup } from '@/data/mockData';
import { ReportFilter, ReportType, Student } from '@/types';

const AdminReports = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const [activeTab, setActiveTab] = useState<ReportType>('individual');
  const [filter, setFilter] = useState<ReportFilter>({
    dateFrom: format(new Date(), 'yyyy-MM-dd'),
    dateTo: format(new Date(), 'yyyy-MM-dd'),
  });
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

  const groups = getGroups();
  const studentsInGroup = selectedGroup 
    ? getStudentsByGroup(selectedGroup) 
    : students;

  const handleGenerateReport = () => {
    console.log('Generating report with filters:', {
      type: activeTab,
      studentId: selectedStudent,
      group: selectedGroup,
      dateFrom: filter.dateFrom,
      dateTo: filter.dateTo,
    });
    // In a real application, this would trigger an API request to generate the report
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return format(date, 'dd.MM.yyyy', { locale: ru });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Отчеты</h1>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ReportType)} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Индивидуальный</span>
          </TabsTrigger>
          <TabsTrigger value="group" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Группа</span>
          </TabsTrigger>
          <TabsTrigger value="absences" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Отсутствия</span>
          </TabsTrigger>
          <TabsTrigger value="duties" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            <span>Дежурства</span>
          </TabsTrigger>
        </TabsList>

        {/* Individual Student Report */}
        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Отчет по студенту
              </CardTitle>
              <CardDescription>
                Создание индивидуального отчета по выбранному студенту
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Группа</label>
                    <Select 
                      value={selectedGroup} 
                      onValueChange={(value) => {
                        setSelectedGroup(value);
                        setSelectedStudent(undefined);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите группу" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Студент</label>
                    <Select 
                      value={selectedStudent?.toString()} 
                      onValueChange={(value) => setSelectedStudent(parseInt(value))}
                      disabled={!selectedGroup}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите студента" />
                      </SelectTrigger>
                      <SelectContent>
                        {studentsInGroup.map(student => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Период с</label>
                    <DatePicker
                      date={filter.dateFrom ? new Date(filter.dateFrom) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateFrom: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Период по</label>
                    <DatePicker
                      date={filter.dateTo ? new Date(filter.dateTo) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateTo: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilter({
                      dateFrom: format(new Date(), 'yyyy-MM-dd'),
                      dateTo: format(new Date(), 'yyyy-MM-dd'),
                    })}
                  >
                    Сбросить
                  </Button>
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={!selectedStudent}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Сформировать отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Group Report */}
        <TabsContent value="group">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Отчет по группе
              </CardTitle>
              <CardDescription>
                Создание отчета по всей группе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Группа</label>
                  <Select 
                    value={selectedGroup} 
                    onValueChange={setSelectedGroup}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите группу" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map(group => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Период с</label>
                    <DatePicker
                      date={filter.dateFrom ? new Date(filter.dateFrom) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateFrom: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Период по</label>
                    <DatePicker
                      date={filter.dateTo ? new Date(filter.dateTo) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateTo: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilter({
                      dateFrom: format(new Date(), 'yyyy-MM-dd'),
                      dateTo: format(new Date(), 'yyyy-MM-dd'),
                    })}
                  >
                    Сбросить
                  </Button>
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={!selectedGroup}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Сформировать отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Absences Report */}
        <TabsContent value="absences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Отчет по отсутствиям
              </CardTitle>
              <CardDescription>
                Создание отчета по отсутствующим студентам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Группа (опционально)</label>
                    <Select 
                      value={selectedGroup} 
                      onValueChange={setSelectedGroup}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Все группы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все группы</SelectItem>
                        {groups.map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Период с</label>
                    <DatePicker
                      date={filter.dateFrom ? new Date(filter.dateFrom) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateFrom: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Период по</label>
                    <DatePicker
                      date={filter.dateTo ? new Date(filter.dateTo) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateTo: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedGroup(undefined);
                      setFilter({
                        dateFrom: format(new Date(), 'yyyy-MM-dd'),
                        dateTo: format(new Date(), 'yyyy-MM-dd'),
                      });
                    }}
                  >
                    Сбросить
                  </Button>
                  <Button onClick={handleGenerateReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Сформировать отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Duties Report */}
        <TabsContent value="duties">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" /> Отчет по дежурствам
              </CardTitle>
              <CardDescription>
                Создание отчета по дежурствам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Группа (опционально)</label>
                    <Select 
                      value={selectedGroup} 
                      onValueChange={setSelectedGroup}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Все группы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все группы</SelectItem>
                        {groups.map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Статус</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Статус дежурства" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все дежурства</SelectItem>
                        <SelectItem value="completed">Выполненные</SelectItem>
                        <SelectItem value="pending">Невыполненные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Период с</label>
                    <DatePicker
                      date={filter.dateFrom ? new Date(filter.dateFrom) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateFrom: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Период по</label>
                    <DatePicker
                      date={filter.dateTo ? new Date(filter.dateTo) : undefined}
                      onSelect={(date) => 
                        setFilter({...filter, dateTo: date ? format(date, 'yyyy-MM-dd') : undefined})
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedGroup(undefined);
                      setFilter({
                        dateFrom: format(new Date(), 'yyyy-MM-dd'),
                        dateTo: format(new Date(), 'yyyy-MM-dd'),
                      });
                    }}
                  >
                    Сбросить
                  </Button>
                  <Button onClick={handleGenerateReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Сформировать отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for date selection
const DatePicker = ({ date, onSelect }: { date?: Date, onSelect: (date?: Date) => void }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left"
        >
          {date ? format(date, 'dd.MM.yyyy', { locale: ru }) : "Выберите дату"}
          <Calendar className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default AdminReports;
