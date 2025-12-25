import React, { useState } from 'react';
import './Pricing.css';
import ScheduleModal from './ScheduleModal';
import pricingData from '../../data/pricing.json';

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  // Calculate price with 20% discount for annual (no decimals)
  const getPrice = (planName) => {
    const basePrice = pricingData.basePrices[planName.toLowerCase()];
    if (basePrice === 'Custom') return 'Custom';
    return isAnnual ? Math.floor(basePrice * (1 - pricingData.discountPercentage)) : basePrice;
  };

  // Get billing period text
  const getBillingPeriod = (plan) => {
    if (plan.customPeriod) return plan.customPeriod;
    return isAnnual ? 'per month (billed annually)' : 'per month';
  };

  // Calculate annual savings without decimals
  const getAnnualSavings = (planName) => {
    const basePrice = pricingData.basePrices[planName.toLowerCase()];
    return Math.floor(basePrice * 12 * pricingData.discountPercentage);
  };

  return (
    <div className="pricing-page">
      {/* Pricing Header */}
      <section className="pricing-header">
        <h1>{pricingData.header.title}</h1>
        <p>{pricingData.header.subtitle}</p>
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>{pricingData.header.billingToggle.monthly}</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className="slider"></span>
          </label>
          <span className={isAnnual ? 'active' : ''}>
            {pricingData.header.billingToggle.annual}
            {isAnnual && <span className="discount-badge">{pricingData.header.billingToggle.discountBadge}</span>}
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="pricing-cards-container">
          {pricingData.plans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              {plan.highlighted && <div className="popular-badge">{plan.popularBadge}</div>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="amount">
                  {getPrice(plan.name) === 'Custom' ? 'Custom' : `$${getPrice(plan.name)}`}
                </span>
                <span className="period">
                  /{getBillingPeriod(plan)}
                </span>
              </div>
              {isAnnual && plan.name !== 'Enterprise' && (
                <p className="savings-text">
                  Save ${getAnnualSavings(plan.name)}/year
                </p>
              )}
              <p className="plan-description">{plan.description}</p>
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`plan-button ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta-section">
        <h2>{pricingData.cta.title}</h2>
        <p>{pricingData.cta.subtitle}</p>
        <button className="cta-button" onClick={() => setIsModalOpen(true)}>
          {pricingData.cta.buttonText}
        </button>
      </section>

      <ScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Pricing;
