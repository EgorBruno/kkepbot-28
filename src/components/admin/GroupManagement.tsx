
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, Users2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Временные данные групп для демонстрации
const initialGroups = [
  { id: '1', name: 'БПИ-221', studentsCount: 21 },
  { id: '2', name: 'ИКБ-222', studentsCount: 18 },
  { id: '3', name: 'БИБ-224', studentsCount: 23 },
  { id: '4', name: 'БПИ-213', studentsCount: 16 }
];

type Group = {
  id: string;
  name: string;
  studentsCount: number;
};

interface GroupManagementProps {
  onGroupsChange?: (groups: Group[]) => void;
}

const GroupManagement: React.FC<GroupManagementProps> = ({ onGroupsChange }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Загрузка групп из localStorage или использование начальных данных
    const savedGroups = localStorage.getItem('adminGroups');
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      setGroups(initialGroups);
    }
  }, []);

  useEffect(() => {
    // Сохранение групп в localStorage при их изменении
    if (groups.length > 0) {
      localStorage.setItem('adminGroups', JSON.stringify(groups));
      if (onGroupsChange) onGroupsChange(groups);
    }
  }, [groups, onGroupsChange]);

  const handleAddGroup = () => {
    if (newGroupName.trim() === '') return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      studentsCount: 0
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setIsDialogOpen(false);
    
    toast({
      title: "Группа добавлена",
      description: `Группа "${newGroupName}" успешно добавлена.`
    });
  };

  const handleEditGroup = () => {
    if (!editingGroup || newGroupName.trim() === '') return;

    const updatedGroups = groups.map(group => 
      group.id === editingGroup.id ? { ...group, name: newGroupName } : group
    );

    setGroups(updatedGroups);
    setNewGroupName('');
    setEditingGroup(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Группа изменена",
      description: `Группа успешно переименована в "${newGroupName}".`
    });
  };

  const handleDeleteGroup = (id: string) => {
    const groupToDelete = groups.find(g => g.id === id);
    if (!groupToDelete) return;
    
    const updatedGroups = groups.filter(group => group.id !== id);
    setGroups(updatedGroups);

    toast({
      title: "Группа удалена",
      description: `Группа "${groupToDelete.name}" успешно удалена.`,
      variant: "destructive"
    });
  };

  const openEditDialog = (group: Group) => {
    setEditingGroup(group);
    setNewGroupName(group.name);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingGroup(null);
    setNewGroupName('');
    setIsDialogOpen(true);
  };

  const filteredGroups = searchQuery
    ? groups.filter(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : groups;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Управление группами</CardTitle>
            <CardDescription>Добавляйте, редактируйте и удаляйте группы студентов</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus size={16} className="mr-2" />
                Добавить группу
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingGroup ? 'Редактировать группу' : 'Добавить новую группу'}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="groupName">Название группы</Label>
                <Input
                  id="groupName"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Например: БПИ-221"
                  className="mt-1"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={editingGroup ? handleEditGroup : handleAddGroup}>
                  {editingGroup ? 'Сохранить' : 'Добавить'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2">
          <Input
            placeholder="Поиск групп..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <Users2 className="mr-3 text-gray-500" size={18} />
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-xs text-gray-500">
                      {group.studentsCount} студентов
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(group)}>
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'Группы не найдены' : 'Нет добавленных групп'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupManagement;
