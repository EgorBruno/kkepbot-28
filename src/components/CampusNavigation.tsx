
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const CampusNavigation = () => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <MapPin className="mr-2 text-schedule-purple" size={20} />
          Навигация по колледжу
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center">
          <p className="text-gray-500">План колледжа</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Открыть полную карту</Button>
      </CardFooter>
    </Card>
  );
};

export default CampusNavigation;
