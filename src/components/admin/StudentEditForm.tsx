import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Student } from '@/types';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface StudentEditFormProps {
  student?: Student;
  onSubmit: (data: Student | Omit<Student, 'id'>) => void;
  existingGroups: string[];
}

const studentFormSchema = z.object({
  name: z.string().min(2, { message: 'ФИО должно содержать минимум 2 символа' }),
  group: z.string().min(1, { message: 'Выберите группу' }),
  email: z.string().email({ message: 'Введите действительный email' }).optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[0-9()\s-]{7,20}$/, { message: 'Введите действительный номер телефона' }).optional().or(z.literal('')),
  role: z.enum(['student', 'leader', 'admin'], { required_error: 'Выберите роль' }),
  totalDutyCount: z.number().int().min(0, { message: 'Число дежурств не может быть отрицательным' }),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

const StudentEditForm: React.FC<StudentEditFormProps> = ({ student, onSubmit, existingGroups }) => {
  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || '',
      group: student?.group || existingGroups[0] || '',
      email: student?.email || '',
      phone: student?.phone || '',
      role: student?.role || 'student',
      totalDutyCount: student?.totalDutyCount || 0,
    },
  });

  const handleSubmit = (values: StudentFormValues) => {
    const groupValue = values.group === "new-group" && isCreatingNewGroup ? newGroupName : values.group;
    
    if (student) {
      onSubmit({
        id: student.id,
        name: values.name,
        group: groupValue,
        totalDutyCount: values.totalDutyCount,
        email: values.email || undefined,
        phone: values.phone || undefined,
        role: values.role,
      });
    } else {
      onSubmit({
        name: values.name,
        group: groupValue,
        totalDutyCount: values.totalDutyCount,
        email: values.email || undefined,
        phone: values.phone || undefined,
        role: values.role,
      });
    }
  };

  const handleGroupChange = (value: string) => {
    if (value === "new-group") {
      setIsCreatingNewGroup(true);
      setNewGroupName('');
    } else {
      setIsCreatingNewGroup(false);
      form.setValue('group', value);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Фамилия Имя Отчество" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Группа</FormLabel>
                {!isCreatingNewGroup ? (
                  <Select
                    onValueChange={handleGroupChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите группу" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {existingGroups.map((group) => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                      <SelectItem value="new-group">+ Новая группа</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="space-y-2">
                    <Input 
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Введите название новой группы"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsCreatingNewGroup(false);
                          form.setValue('group', existingGroups[0] || 'default');
                        }}
                      >
                        Отмена
                      </Button>
                      <Button 
                        type="button" 
                        size="sm"
                        onClick={() => {
                          if (newGroupName) {
                            form.setValue('group', newGroupName);
                          }
                        }}
                        disabled={!newGroupName}
                      >
                        Добавить
                      </Button>
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="leader">Староста</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="email@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+7 (900) 123-45-67" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalDutyCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество дежурств</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => form.reset()}>Отмена</Button>
          <Button type="submit">{student ? 'Сохранить' : 'Добавить'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StudentEditForm;
