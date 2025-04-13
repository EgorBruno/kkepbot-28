
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeOption = {
  id: string;
  name: string;
  color: string;
  bodyClass: string;
};

export const themeOptions: ThemeOption[] = [
  { id: 'light', name: 'Светлая', color: '#ffffff', bodyClass: '' },
  { id: 'dark', name: 'Темная', color: '#1E1E1E', bodyClass: 'dark' },
  { id: 'purple', name: 'Фиолетовая', color: '#9b87f5', bodyClass: 'theme-purple' },
  { id: 'blue', name: 'Голубая', color: '#0EA5E9', bodyClass: 'theme-blue' },
  { id: 'green', name: 'Зеленая', color: '#5EB85E', bodyClass: 'theme-green' },
];

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  getCurrentThemeOption: () => ThemeOption;
  getThemeBasedClass: (options: {
    light?: string;
    dark?: string;
    purple?: string;
    blue?: string;
    green?: string;
    defaultClass?: string;
  }) => string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    // Загружаем тему из localStorage при инициализации
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    // Находим выбранную тему
    const selectedTheme = themeOptions.find(t => t.id === themeId);
    if (!selectedTheme) return;

    // Удаляем все классы тем
    document.body.classList.remove('dark', 'theme-purple', 'theme-blue', 'theme-green');
    
    // Добавляем новый класс темы, если он не пустой
    if (selectedTheme.bodyClass) {
      document.body.classList.add(selectedTheme.bodyClass);
    }
    
    // Сохраняем предпочтение темы
    localStorage.setItem('selectedTheme', themeId);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const getCurrentThemeOption = (): ThemeOption => {
    return themeOptions.find(t => t.id === theme) || themeOptions[0];
  };
  
  // Helper function to get the appropriate class based on current theme
  const getThemeBasedClass = (options: {
    light?: string;
    dark?: string;
    purple?: string;
    blue?: string;
    green?: string;
    defaultClass?: string;
  }): string => {
    switch (theme) {
      case 'dark':
        return options.dark || options.defaultClass || '';
      case 'purple':
        return options.purple || options.defaultClass || '';
      case 'blue':
        return options.blue || options.defaultClass || '';
      case 'green':
        return options.green || options.defaultClass || '';
      default: // light
        return options.light || options.defaultClass || '';
    }
  };

  const value = {
    theme,
    setTheme: handleThemeChange,
    getCurrentThemeOption,
    getThemeBasedClass
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
