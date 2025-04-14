
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Toaster } from '@/components/ui/sonner';

const Admin = () => {
  // Проверка аутентификации - можно будет заменить на более надежную систему позже
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    // Перенаправление на страницу входа, если пользователь не аутентифицирован
    return <Navigate to="/admin/login" />;
  }
  
  return (
    <>
      <AdminLayout />
      <Toaster position="bottom-right" />
    </>
  );
};

export default Admin;
