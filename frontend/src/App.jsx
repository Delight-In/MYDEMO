import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('landing');
  const { user, logout } = useAuth();

  return (
    <div className="App">
      <Header 
        setCurrentView={setCurrentView} 
        user={user} 
        onLogout={logout} 
      />
      <main>
        {user ? (
          <Dashboard user={user} logout={logout} />
        ) : (
          <>
            {currentView === 'landing' && <LandingPage setCurrentView={setCurrentView} />}
            {currentView === 'login' && <LoginForm />}
            {currentView === 'register' && <RegisterForm />}
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;