
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Users, FileText, ShieldAlert } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSave = (section: string) => {
    toast({
      title: "Настройки сохранены",
      description: `Раздел "${section}" успешно обновлен`,
    });
  };

  const tabOptions = [
    { value: 'general', label: 'Общие', icon: <Settings className="h-4 w-4" /> },
    { value: 'users', label: 'Пользователи', icon: <Users className="h-4 w-4" /> },
    { value: 'reports', label: 'Отчеты', icon: <FileText className="h-4 w-4" /> },
    { value: 'security', label: 'Безопасность', icon: <ShieldAlert className="h-4 w-4" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
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
        );
      case 'users':
        return (
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
                <Select defaultValue="manual">
                  <SelectTrigger id="duty-schedule">
                    <SelectValue placeholder="Выберите тип расписания" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Случайное</SelectItem>
                    <SelectItem value="alphabetical">По алфавиту</SelectItem>
                    <SelectItem value="role">По роли</SelectItem>
                    <SelectItem value="manual">Ручное назначение</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Настройки пользователей")}>Сохранить</Button>
            </CardFooter>
          </Card>
        );
      case 'reports':
        return (
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
                <Select defaultValue="pdf">
                  <SelectTrigger id="default-format">
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("Настройки отчетов")}>Сохранить</Button>
            </CardFooter>
          </Card>
        );
      case 'security':
        return (
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
        );
      default:
        return null;
    }
  };

  // Mobile view with Drawer for tabs
  const renderMobileTabs = () => (
    <div className="lg:hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Настройки</h1>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="px-3">
              {tabOptions.find(tab => tab.value === activeTab)?.label} <span className="ml-1">▼</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 pt-0">
              <div className="mt-4 space-y-2">
                {tabOptions.map(tab => (
                  <Button 
                    key={tab.value} 
                    variant={activeTab === tab.value ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(tab.value);
                      setIsDrawerOpen(false);
                    }}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {renderTabContent()}
    </div>
  );

  // Desktop view with regular tabs
  const renderDesktopTabs = () => (
    <div className="hidden lg:block">
      <h1 className="text-2xl font-semibold mb-6">Настройки</h1>
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            {tabOptions.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            {renderTabContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div>
      {renderMobileTabs()}
      {renderDesktopTabs()}
    </div>
  );
};

export default AdminSettings;
