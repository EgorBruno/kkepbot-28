
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FileText, Download, Calendar, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTheme } from '../contexts/ThemeContext';

const ReportsList = () => {
  const { theme, getThemeBasedClass } = useTheme();
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, 'dd.MM.yyyy', { locale: ru });
  };

  const getDateRangeText = () => {
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
    }
    return "Выбрать период";
  };

  const reportTypes = [
    {
      id: 'absence',
      title: 'Отчет по отсутствующим',
      description: 'Список отсутствующих студентов за выбранный период',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
      progress: 87,
    },
    {
      id: 'duty',
      title: 'Отчет по дежурствам',
      description: 'История дежурств за выбранный период',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
      progress: 65,
    },
    {
      id: 'general',
      title: 'Общий отчет',
      description: 'Сводный отчет по посещаемости и дежурствам',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
      progress: 100,
    },
  ];

  const handleSelectPeriod = (reportId: string) => {
    setSelectedReportId(reportId);
    setIsOpen(true);
  };

  const handleSaveRange = () => {
    setIsOpen(false);
    // Here you would implement the logic to generate the report with the selected date range
    console.log(`Generating ${selectedReportId} report for period:`, dateRange);
  };

  // Theme-based classes
  const getCardBgClass = () => {
    return getThemeBasedClass({
      light: 'bg-white',
      dark: 'bg-gray-800',
      defaultClass: 'bg-white'
    });
  };
  
  const getIconBgClass = () => {
    return getThemeBasedClass({
      light: 'bg-schedule-lightPurple',
      dark: 'bg-gray-700',
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
    });
  };
  
  const getIconColor = () => {
    return getThemeBasedClass({
      light: 'text-schedule-purple',
      dark: 'text-schedule-purple',
      blue: 'text-schedule-darkBlue',
      green: 'text-schedule-green',
      purple: 'text-schedule-purple',
    });
  };
  
  const getTextClass = () => {
    return getThemeBasedClass({
      light: 'text-gray-500',
      dark: 'text-gray-400',
      defaultClass: 'text-gray-500'
    });
  };

  return (
    <div className="pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Отчеты</h2>
        <p className={`text-sm ${getTextClass()}`}>
          Создавайте и скачивайте отчеты в формате PDF
        </p>
      </div>

      <div className="space-y-4">
        {reportTypes.map((report) => (
          <Card key={report.id} className={`p-4 card-hover card-shadow appear-smooth ${getCardBgClass()}`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 p-2 ${getIconBgClass()} rounded-full`}>
                <FileText className={`h-6 w-6 ${getIconColor()}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{report.title}</h3>
                <p className={`text-sm ${getTextClass()} mb-3 line-clamp-2`}>{report.description}</p>
                
                {report.progress < 100 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Прогресс</span>
                      <span>{report.progress}%</span>
                    </div>
                    <Progress value={report.progress} className="h-1.5" />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => handleSelectPeriod(report.id)}
                  >
                    <Calendar className="mr-1.5 h-4 w-4" />
                    Выбрать период
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <Download className="mr-1.5 h-4 w-4" />
                    Скачать PDF
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Выберите период для отчета</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 items-center">
              <div className="w-full sm:w-auto">
                <p className="mb-2 text-sm font-medium">С даты:</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {dateRange.from ? formatDate(dateRange.from) : "Выберите дату"}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => 
                        setDateRange({ ...dateRange, from: date || undefined })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="w-full sm:w-auto">
                <p className="mb-2 text-sm font-medium">По дату:</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {dateRange.to ? formatDate(dateRange.to) : "Выберите дату"}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => 
                        setDateRange({ ...dateRange, to: date || undefined })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <p className={`text-sm ${getTextClass()}`}>
                Выбранный период: <span className="font-medium">{getDateRangeText()}</span>
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveRange}>
              Применить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsList;
