
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FileText, Download, Calendar, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ReportsList = () => {
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

  return (
    <div className="pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Отчеты</h2>
        <p className="text-gray-500 text-sm">
          Создавайте и скачивайте отчеты в формате PDF
        </p>
      </div>

      <div className="space-y-4">
        {reportTypes.map((report) => (
          <Card key={report.id} className="p-4 card-hover card-shadow appear-smooth">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-schedule-lightPurple rounded-full">
                {report.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{report.description}</p>
                
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
                  <Button variant="outline" size="sm" className="flex items-center">
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
    </div>
  );
};

export default ReportsList;
