
import React, { useState } from 'react';
import { ArrowLeft, Building, Layers, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from '../contexts/ThemeContext';

const buildings = [
  { id: 'main', name: 'Главный корпус' },
  { id: 'east', name: 'Восточный корпус' },
  { id: 'west', name: 'Западный корпус' },
];

const floors = [
  { id: '1', name: '1 этаж' },
  { id: '2', name: '2 этаж' },
  { id: '3', name: '3 этаж' },
  { id: '4', name: '4 этаж' },
];

// Mock data for rooms
const roomsData = {
  main: {
    '1': [
      { number: '101', type: 'Аудитория', teacher: 'Иванов И.И.' },
      { number: '102', type: 'Лаборатория', teacher: 'Петров П.П.' },
      { number: '103', type: 'Кабинет', teacher: 'Сидоров С.С.' },
    ],
    '2': [
      { number: '201', type: 'Аудитория', teacher: 'Смирнов А.А.' },
      { number: '202', type: 'Компьютерный класс', teacher: 'Кузнецов В.В.' },
    ],
    '3': [
      { number: '301', type: 'Аудитория', teacher: 'Николаев Н.Н.' },
      { number: '302', type: 'Лекционный зал', teacher: 'Морозов М.М.' },
    ],
    '4': [
      { number: '401', type: 'Административный кабинет', teacher: 'Директор' },
      { number: '402', type: 'Конференц-зал', teacher: '' },
    ],
  },
  east: {
    '1': [
      { number: 'E101', type: 'Мастерская', teacher: 'Алексеев А.А.' },
      { number: 'E102', type: 'Лаборатория', teacher: 'Григорьев Г.Г.' },
    ],
    '2': [
      { number: 'E201', type: 'Аудитория', teacher: 'Федоров Ф.Ф.' },
    ],
  },
  west: {
    '1': [
      { number: 'W101', type: 'Спортзал', teacher: 'Тренер Т.Т.' },
      { number: 'W102', type: 'Раздевалка', teacher: '' },
    ],
    '2': [
      { number: 'W201', type: 'Столовая', teacher: '' },
      { number: 'W202', type: 'Библиотека', teacher: 'Библиотекарь' },
    ],
  },
};

const CampusMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | undefined>();
  const [selectedFloor, setSelectedFloor] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTeachers, setShowTeachers] = useState(true);
  const { theme, getThemeBasedClass } = useTheme();

  const mapBgClass = getThemeBasedClass({
    light: 'bg-gray-100',
    dark: 'bg-gray-800',
    defaultClass: 'bg-gray-100'
  });
  
  const textClass = getThemeBasedClass({
    light: 'text-gray-500',
    dark: 'text-gray-400',
    defaultClass: 'text-gray-500'
  });

  const cardBgClass = getThemeBasedClass({
    light: 'bg-background',
    dark: 'bg-gray-900',
    defaultClass: 'bg-background'
  });

  const resetSelection = () => {
    setSelectedBuilding(undefined);
    setSelectedFloor(undefined);
  };

  const handleBuildingChange = (value: string) => {
    setSelectedBuilding(value);
    setSelectedFloor(undefined);
  };

  const handleFloorChange = (value: string) => {
    setSelectedFloor(value);
  };

  const getFilteredRooms = () => {
    if (!selectedBuilding || !selectedFloor) return [];
    
    const rooms = roomsData[selectedBuilding as keyof typeof roomsData]?.[selectedFloor];
    
    if (!rooms) return [];
    
    if (searchQuery) {
      return rooms.filter(room => 
        room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (showTeachers && room.teacher && room.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return rooms;
  };

  const filteredRooms = getFilteredRooms();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-[800px] mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => window.close()} className="flex items-center gap-2">
            <ArrowLeft size={18} />
            <span>Назад</span>
          </Button>
          <h1 className="text-xl font-bold">План колледжа</h1>
          <div className="w-[72px]"></div> {/* Placeholder for alignment */}
        </div>

        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Поиск кабинета или преподавателя"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <Select value={selectedBuilding} onValueChange={handleBuildingChange}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <SelectValue placeholder="Выберите корпус" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {buildings.map(building => (
                    <SelectItem key={building.id} value={building.id}>{building.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[160px]">
              <Select 
                value={selectedFloor} 
                onValueChange={handleFloorChange}
                disabled={!selectedBuilding}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <SelectValue placeholder="Выберите этаж" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {floors.map(floor => (
                    <SelectItem key={floor.id} value={floor.id}>{floor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedBuilding && selectedFloor) && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetSelection} 
                className="flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Map display */}
        <div className="mb-6">
          <div className={`${mapBgClass} rounded-lg p-4 ${selectedBuilding && selectedFloor ? 'h-[400px]' : 'h-64'} flex items-center justify-center`}>
            {!selectedBuilding && (
              <p className={textClass}>Выберите корпус для просмотра плана</p>
            )}
            {selectedBuilding && !selectedFloor && (
              <p className={textClass}>Выберите этаж для просмотра плана</p>
            )}
            {selectedBuilding && selectedFloor && (
              <div className="w-full h-full flex items-center justify-center">
                <p className={textClass}>
                  План {
                    buildings.find(b => b.id === selectedBuilding)?.name
                  }, {
                    floors.find(f => f.id === selectedFloor)?.name
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Room information */}
        {selectedBuilding && selectedFloor && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Информация о кабинетах</h2>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="show-teachers" 
                  checked={showTeachers}
                  onCheckedChange={(checked) => setShowTeachers(checked as boolean)} 
                />
                <label htmlFor="show-teachers" className="text-sm cursor-pointer">
                  Показать преподавателей
                </label>
              </div>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRooms.map((room) => (
                  <Card key={room.number} className={cardBgClass}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold">{room.number}</h3>
                        <span className="text-sm text-muted-foreground">{room.type}</span>
                      </div>
                      {showTeachers && room.teacher && (
                        <p className="text-sm text-muted-foreground">Преподаватель: {room.teacher}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">
                Нет доступных кабинетов или совпадений по поиску
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusMap;
