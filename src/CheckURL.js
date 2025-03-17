import React from 'react';
import { Navigate } from 'react-router-dom';

const CheckURL = ({ children }) => {
  // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    // Ha nincs bejelentkezve, átirányítjuk a bejelentkezési oldalra
    return <Navigate to="/Login" replace />;
  }
  
  // Ha be van jelentkezve, megjelenítjük a védett tartalmat
  return children;
};

export default CheckURL;