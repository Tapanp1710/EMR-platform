import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import DemoModal from '../DemoModal/DemoModal';
import Features from '../Features/Features';
import Pricing from '../Pricing/Pricing';
import Contact from '../Contact/Contact';
import homeData from '../../data/home.json';

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPosition = useRef(0);

  const handleScheduleDemo = () => {
    if (isLoggedIn) {
      setIsDemoModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Ultra-smooth auto-scroll with requestAnimationFrame
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isPaused = false;
    const scrollSpeed = 0.3;

    const smoothScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition.current += scrollSpeed;
        
        if (scrollPosition.current >= scrollContainer.scrollWidth / 2) {
          scrollPosition.current = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition.current;
      }
      
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="home-page">
      {/* HOME SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{homeData.hero.title}</h1>
            <p className="hero-description">{homeData.hero.description}</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleScheduleDemo}>
                {homeData.hero.buttonText}
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">🏥</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>{homeData.benefits.header.title}</h2>
          <p>{homeData.benefits.header.subtitle}</p>
        </div>

        <div className="benefits-grid">
          {homeData.benefits.cards.map((benefit) => (
            <div key={benefit.id} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <div className="benefit-stat">{benefit.stat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {homeData.stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="trusted-partners-section">
        <div className="section-header">
          <h2>{homeData.partners.header.title}</h2>
          <p>{homeData.partners.header.subtitle}</p>
        </div>
        
        <div ref={scrollRef} className="partners-grid">
          {/* First set */}
          {homeData.partners.logos.map((partner) => (
            <div key={partner.id} className="partner-logo">
              {partner.icon} {partner.name}
            </div>
          ))}
          
          {/* Duplicate for seamless infinite loop */}
          {homeData.partners.logos.map((partner) => (
            <div key={`dup-${partner.id}`} className="partner-logo">
              {partner.icon} {partner.name}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>{homeData.testimonials.header.title}</h2>
          <p>{homeData.testimonials.header.subtitle}</p>
        </div>

        <div className="testimonials-carousel-wrapper">
          <div className="testimonials-carousel">
            {homeData.testimonials.reviews.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-text">"{testimonial.text}"</div>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>{homeData.cta.title}</h2>
          <p>{homeData.cta.subtitle}</p>
          <div className="cta-buttons">
            <button className="btn-primary-large" onClick={handleScheduleDemo}>
              {homeData.cta.primaryButton}
            </button>
            <button className="btn-secondary-large" onClick={handleScheduleDemo}>
              {homeData.cta.secondaryButton}
            </button>
          </div>
          <p className="cta-note">{homeData.cta.note}</p>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Home;
