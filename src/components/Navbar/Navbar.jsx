import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import './Navbar.css';
import navbarData from '../../data/navbar.json';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isLoggedIn, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = navbarData.navLinks.map(link => link.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <a 
            href={navbarData.logo.link} 
            className='navbar-logo' 
            onClick={(e) => { 
              e.preventDefault(); 
              scrollToSection('home'); 
            }}
          >
            {navbarData.logo.text}
          </a>

          <div className='menu-icon' onClick={toggleMenu}>
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
          </div>

          <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
            {navbarData.navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={activeSection === link.sectionId ? 'nav-link active-link' : 'nav-link'}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection(link.sectionId); 
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          
          {!isLoggedIn ? (
            <button 
              className='nav-signin-btn' 
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              {navbarData.auth.signInButton}
            </button>
          ) : (
            <li className='user-menu'>
              <span className='user-name'>
               {user?.name || navbarData.auth.defaultUserName}
              </span>
              <button className='logout-btn' onClick={logout}>
                {navbarData.auth.logoutButton}
              </button>
            </li>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
