import React, { useState } from 'react';
import './Contact.css';
import contactData from '../../data/contact.json';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(contactData.form.successMessage);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <section className="contact-header">
        <h1>{contactData.header.title}</h1>
        <p>{contactData.header.subtitle}</p>
      </section>

      {/* Contact Form and Info */}
      <section className="contact-main-section">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>{contactData.form.title}</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              {contactData.form.fields.map((field) => (
                <div key={field.id} className="form-group">
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      rows={field.rows}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="submit-button">
                {contactData.form.submitButton}
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="contact-details-wrapper">
            <h2>{contactData.contactInfo.title}</h2>
            
            <div className="contact-info-card">
              {contactData.contactInfo.items.map((item) => (
                <div key={item.id} className="info-item">
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h3>{contactData.social.title}</h3>
              <div className="social-icons">
                {contactData.social.links.map((link) => (
                  <a key={link.id} href={link.href} className="social-icon">
                    {link.icon} {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      {/* <section className="office-locations-section">
        <h2>Our Offices</h2>
        <div className="offices-grid">
          {contactData.offices.map((office) => (
            <div key={office.id} className="office-card">
              <h3>{office.city}</h3>
              <p className="office-address">📍 {office.address}</p>
              <p className="office-phone">📞 {office.phone}</p>
              <p className="office-email">📧 {office.email}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="contact-cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Schedule a free demo and see how our platform can transform your practice</p>
        <button className="cta-button">Schedule Demo</button>
      </section> */}
    </div>
  );
};

export default Contact;
