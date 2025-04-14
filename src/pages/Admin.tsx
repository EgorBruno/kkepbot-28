
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';

const Admin = () => {
  // Simple authentication check - can be replaced with a proper auth system later
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin/login" />;
  }
  
  return <AdminLayout />;
};

export default Admin;
