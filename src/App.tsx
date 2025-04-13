
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Absences from "./pages/Absences";
import Duty from "./pages/Duty";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CampusMap from "./pages/CampusMap";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Check if we're on the map page or admin pages to hide navigation
  const hideNavigation = location.pathname === '/campus-map' || 
                        location.pathname.startsWith('/admin');
  
  return (
    <div className={`mobile-container ${theme}`}>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/absences" element={<Absences />} />
          <Route path="/duty" element={<Duty />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavigation && <BottomNavigation />}
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
