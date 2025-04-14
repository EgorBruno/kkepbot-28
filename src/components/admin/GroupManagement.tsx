
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getGroups } from '@/data/mockData';

const GroupManagement = () => {
  const [groups, setGroups] = useState<string[]>(getGroups());
  const [newGroup, setNewGroup] = useState('');
  const [editGroup, setEditGroup] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (newGroup.trim() === '') {
      toast({
        title: "Ошибка",
        description: "Название группы не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    if (groups.includes(newGroup)) {
      toast({
        title: "Ошибка",
        description: "Группа с таким названием уже существует",
        variant: "destructive"
      });
      return;
    }

    setGroups([...groups, newGroup]);
    setNewGroup('');
    setIsAddDialogOpen(false);
    toast({
      title: "Группа добавлена",
      description: `Группа "${newGroup}" успешно добавлена`,
    });
  };

  const handleEditGroup = () => {
    if (editGroup.trim() === '') {
      toast({
        title: "Ошибка",
        description: "Название группы не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    if (groups.includes(editGroup) && editGroup !== currentGroup) {
      toast({
        title: "Ошибка",
        description: "Группа с таким названием уже существует",
        variant: "destructive"
      });
      return;
    }

    setGroups(groups.map(g => g === currentGroup ? editGroup : g));
    setEditGroup('');
    setCurrentGroup('');
    setIsEditDialogOpen(false);
    toast({
      title: "Группа изменена",
      description: `Группа "${currentGroup}" переименована в "${editGroup}"`,
    });
  };

  const handleDeleteGroup = () => {
    setGroups(groups.filter(g => g !== currentGroup));
    setCurrentGroup('');
    setIsDeleteDialogOpen(false);
    toast({
      title: "Группа удалена",
      description: `Группа "${currentGroup}" успешно удалена`,
    });
  };

  const openEditDialog = (group: string) => {
    setCurrentGroup(group);
    setEditGroup(group);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (group: string) => {
    setCurrentGroup(group);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Управление группами</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить группу
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{group}</CardTitle>
              <CardDescription>
                Группа студентов
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-2 pt-0">
              <Button variant="outline" size="sm" onClick={() => openEditDialog(group)}>
                <Edit className="h-4 w-4 mr-1" />
                Изменить
              </Button>
              <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(group)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Удалить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Group Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Добавить новую группу</DialogTitle>
            <DialogDescription>
              Введите название новой учебной группы
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="Название группы"
              className="mb-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAddGroup}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Group Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Изменить название группы</DialogTitle>
            <DialogDescription>
              Введите новое название для группы "{currentGroup}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={editGroup}
              onChange={(e) => setEditGroup(e.target.value)}
              placeholder="Новое название группы"
              className="mb-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleEditGroup}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Group Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Удаление группы</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить группу "{currentGroup}"? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupManagement;
