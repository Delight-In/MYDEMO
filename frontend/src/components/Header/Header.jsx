import React from 'react';
import './Header.css';

const Header = ({ setCurrentView, user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="logo">MyApp</div>
      <nav>
        {!user ? (
          <>
            <button onClick={() => setCurrentView('landing')}>Home</button>
            <button onClick={() => setCurrentView('login')}>Login</button>
            <button onClick={() => setCurrentView('register')}>Register</button>
          </>
        ) : (
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;