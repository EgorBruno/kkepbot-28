
import React from 'react';
import ClassTimer from '../components/ClassTimer';
import DailyScheduleCard from '../components/DailyScheduleCard';
import BellScheduleSection from '../components/BellScheduleSection';
import CampusNavigation from '../components/CampusNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Расписание</h1>
      <ClassTimer />
      
      <Tabs defaultValue="today" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="today">На сегодня</TabsTrigger>
          <TabsTrigger value="bells">Расписание звонков</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <DailyScheduleCard />
        </TabsContent>
        
        <TabsContent value="bells">
          <BellScheduleSection />
        </TabsContent>
      </Tabs>
      
      <CampusNavigation />
    </div>
  );
};

export default Home;
