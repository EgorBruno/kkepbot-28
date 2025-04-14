
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupManagement from './GroupManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
        <p className="text-muted-foreground">
          Управление настройками системы
        </p>
      </div>
      
      <Tabs defaultValue="groups">
        <TabsList className="mb-4">
          <TabsTrigger value="groups">Группы</TabsTrigger>
          <TabsTrigger value="system">Система</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
        </TabsList>
        
        <TabsContent value="groups" className="space-y-4">
          <GroupManagement />
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Системные настройки</CardTitle>
              <CardDescription>
                Настройки системы и сервера
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Системные настройки будут доступны в следующих обновлениях.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки внешнего вида</CardTitle>
              <CardDescription>
                Персонализация интерфейса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Настройки внешнего вида будут доступны в следующих обновлениях.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
