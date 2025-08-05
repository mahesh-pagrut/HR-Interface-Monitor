import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the main dashboard
  return <Navigate to="/" replace />;
};

export default Index;
