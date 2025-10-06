import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');  // Clear login state
    navigate('/login');  // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
