import React from 'react';
import './Footer.css';
import footerData from '../../data/footer.json';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{footerData.company.name}</h3>
          <p>{footerData.company.description}</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {footerData.quickLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>{footerData.contact.title}</h4>
          {footerData.contact.info.map((contact) => (
            <p key={contact.id}>
              {contact.label}: <a href={contact.type === 'email' ? `mailto:${contact.value}` : `tel:${contact.value.replace(/\s/g, '')}`}>{contact.value}</a>
            </p>
          ))}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p dangerouslySetInnerHTML={{ __html: footerData.copyright.text }}></p>
      </div>
    </footer>
  );
};

export default Footer;
