import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Home />
      <Footer />
    </AuthProvider>
  );
}

export default App;
