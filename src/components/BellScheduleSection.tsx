
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { weekdaySchedule, saturdaySchedule } from '../data/bellSchedule';
import { Card, CardContent } from './ui/card';

const BellScheduleSection = () => {
  const [activeTab, setActiveTab] = useState<'weekday' | 'saturday'>('weekday');
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <Tabs defaultValue="weekday" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekday">Будни</TabsTrigger>
            <TabsTrigger value="saturday">Суббота</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekday" className="space-y-2">
            {weekdaySchedule.map((period) => (
              <div key={period.id} className="flex justify-between p-3 border rounded-md">
                <div className="font-medium">{period.name}</div>
                <div>{period.startTime} - {period.endTime}</div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="saturday" className="space-y-2">
            {saturdaySchedule.map((period) => (
              <div key={period.id} className="flex justify-between p-3 border rounded-md">
                <div className="font-medium">{period.name}</div>
                <div>{period.startTime} - {period.endTime}</div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BellScheduleSection;
