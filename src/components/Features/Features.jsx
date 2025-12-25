import React from 'react';
import './Features.css';
import featuresData from '../../data/features.json';

const Features = () => {
  return (
    <div className="features-page">
      {/* Hero Section - Compact */}
      <section className="features-hero">
        <h1>{featuresData.hero.title}</h1>
        <p>{featuresData.hero.subtitle}</p>
      </section>

      {/* Features Grid - Compact Cards */}
      <section className="features-grid-section">
        <div className="features-grid">
          {featuresData.features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-details">
                {feature.details.map((detail, i) => (
                  <li key={i}>✓ {detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation - Compact */}
      <section className="implementation-compact">
        <h2>{featuresData.implementation.title}</h2>
        <div className="steps-compact">
          {featuresData.implementation.steps.map((step) => (
            <div key={step.id} className="step-compact">
              <span className="step-num">{step.number}</span>
              <h4>{step.title}</h4>
              <p className='step-discription'>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA
      <section className="cta-section">
        <h2>Ready to Transform Your Practice?</h2>
        <p>Schedule a demo to see how our platform works for you</p>
        <button className="cta-button">Schedule a Demo</button>
      </section> */}
    </div>
  );
};

export default Features;
