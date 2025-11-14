import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'USER';
  if (!token) return <Navigate to="/" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}