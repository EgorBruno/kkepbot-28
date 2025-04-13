
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const CampusNavigation = () => {
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

  return (
    <Card className="mb-4 card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <MapPin className="mr-2 text-schedule-purple" size={20} />
          Навигация по колледжу
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${mapBgClass} rounded-md h-40 flex items-center justify-center`}>
          <p className={textClass}>План колледжа</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/campus-map" target="_blank" rel="noopener noreferrer">
            Открыть полную карту
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampusNavigation;
