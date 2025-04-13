
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Student } from '@/types';
import { students as initialStudents, getGroups } from '@/data/mockData';
import StudentEditForm from './StudentEditForm';

const AdminStudentsList = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const groups = getGroups();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
                         (student.phone?.includes(searchTerm) ?? false);
    const matchesGroup = selectedGroup ? student.group === selectedGroup : true;
    return matchesSearch && matchesGroup;
  });

  const handleAddStudent = (student: Omit<Student, 'id'>) => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    const newStudent = { ...student, id: newId };
    setStudents([...students, newStudent]);
    setIsAddDialogOpen(false);
    toast({
      title: "Студент добавлен",
      description: `${student.name} успешно добавлен в систему`,
    });
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Данные обновлены",
      description: `Информация о ${updatedStudent.name} успешно обновлена`,
    });
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      setStudents(students.filter(student => student.id !== selectedStudent.id));
      toast({
        title: "Студент удален",
        description: `${selectedStudent.name} был удален из системы`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Управление студентами</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить студента
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск по имени, email, телефону"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Фильтр по группе" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все группы</SelectItem>
              {groups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Группа</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Дежурств</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.group}</TableCell>
                <TableCell>{student.email || '-'}</TableCell>
                <TableCell>{student.phone || '-'}</TableCell>
                <TableCell>
                  {student.role === 'leader' ? 'Староста' : 
                   student.role === 'admin' ? 'Администратор' : 'Студент'}
                </TableCell>
                <TableCell>{student.totalDutyCount}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(student)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(student)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Студенты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Добавить нового студента</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом студенте
            </DialogDescription>
          </DialogHeader>
          <StudentEditForm 
            onSubmit={handleAddStudent} 
            existingGroups={groups}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Редактировать информацию</DialogTitle>
            <DialogDescription>
              Обновите информацию о студенте
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentEditForm 
              student={selectedStudent} 
              onSubmit={handleEditStudent} 
              existingGroups={groups}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Подтвердите удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить студента {selectedStudent?.name}? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudentsList;
