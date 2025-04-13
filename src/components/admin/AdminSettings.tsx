
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Users, FileText, ShieldAlert } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Настройки сохранены",
      description: `Раздел "${section}" успешно обновлен`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Настройки</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Общие</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Пользователи</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Отчеты</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Безопасность</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>
                Управление основными параметрами системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="college-name">Название колледжа</Label>
                <Input id="college-name" defaultValue="Технический колледж №1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email администратора</Label>
                <Input id="admin-email" type="email" defaultValue="admin@college.edu" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Описание системы</Label>
                <Textarea id="site-description" defaultValue="Система управления колледжем" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="semester-start">Начало семестра</Label>
                <Input id="semester-start" type="date" defaultValue="2025-01-13" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester-end">Конец семестра</Label>
                <Input id="semester-end" type="date" defaultValue="2025-05-30" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Общие настройки")}>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Настройки пользователей</CardTitle>
              <CardDescription>
                Управление параметрами пользователей системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-group">Группа по умолчанию</Label>
                <Input id="default-group" defaultValue="ИС-31" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-role">Роль по умолчанию</Label>
                <Input id="default-role" defaultValue="Студент" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duty-schedule">Расписание дежурств</Label>
                <Select>
                  <option value="random">Случайное</option>
                  <option value="alphabetical">По алфавиту</option>
                  <option value="role">По роли</option>
                  <option value="manual" selected>Ручное назначение</option>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Настройки пользователей")}>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Настройки отчетов</CardTitle>
              <CardDescription>
                Управление параметрами отчетов системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-logo">Логотип для отчетов</Label>
                <Input id="report-logo" type="file" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-header">Заголовок отчета</Label>
                <Input id="report-header" defaultValue="Технический колледж №1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-footer">Подпись отчета</Label>
                <Textarea id="report-footer" defaultValue="© 2025 Технический колледж №1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-format">Формат отчета по умолчанию</Label>
                <Select>
                  <option value="pdf" selected>PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Настройки отчетов")}>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
              <CardDescription>
                Управление параметрами безопасности системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Текущий пароль администратора</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Время сессии (минуты)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Максимальное количество попыток входа</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Настройки безопасности")}>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Simple select component for the settings
const Select = ({ children }: { children: React.ReactNode }) => {
  return (
    <select className="w-full p-2 border border-input rounded-md bg-background">
      {children}
    </select>
  );
};

export default AdminSettings;
