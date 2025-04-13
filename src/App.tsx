
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Absences from "./pages/Absences";
import Duty from "./pages/Duty";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`mobile-container ${theme}`}>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/absences" element={<Absences />} />
          <Route path="/duty" element={<Duty />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
