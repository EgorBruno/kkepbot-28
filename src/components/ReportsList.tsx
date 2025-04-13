
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FileText, Download, Calendar } from 'lucide-react';

const ReportsList = () => {
  const reportTypes = [
    {
      id: 'absence',
      title: 'Отчет по отсутствующим',
      description: 'Список отсутствующих студентов за выбранный период',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
    },
    {
      id: 'duty',
      title: 'Отчет по дежурствам',
      description: 'История дежурств за выбранный период',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
    },
    {
      id: 'general',
      title: 'Общий отчет',
      description: 'Сводный отчет по посещаемости и дежурствам',
      icon: <FileText className="h-6 w-6 text-schedule-purple" />,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Отчеты</h2>
        <p className="text-gray-500 text-sm">
          Создавайте и скачивайте отчеты в формате PDF
        </p>
      </div>

      <div className="space-y-4">
        {reportTypes.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex items-start">
              <div className="mr-4 mt-1">{report.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Выбрать период
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
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
