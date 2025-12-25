import React, { useState } from 'react';
import './ScheduleModal.css';
import modalData from '../../data/scheduleModal.json';

function ScheduleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    onClose();
  };

  // Separate date and time fields from other fields for form-row layout
  const regularFields = modalData.form.fields.filter(field => 
    field.type !== 'date' && field.type !== 'time'
  );
  const dateField = modalData.form.fields.find(field => field.type === 'date');
  const timeField = modalData.form.fields.find(field => field.type === 'time');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2>{modalData.modal.title}</h2>
        <p className="modal-subtitle">{modalData.modal.subtitle}</p>

        <form onSubmit={handleSubmit}>
          {/* Regular fields (name, email, phone) */}
          {regularFields.map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Date and Time in form-row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={dateField.id}>{dateField.label}</label>
              <input
                type={dateField.type}
                id={dateField.id}
                name={dateField.name}
                value={formData[dateField.name]}
                onChange={handleChange}
                required={dateField.required}
              />
            </div>

            <div className="form-group">
              <label htmlFor={timeField.id}>{timeField.label}</label>
              <input
                type={timeField.type}
                id={timeField.id}
                name={timeField.name}
                value={formData[timeField.name]}
                onChange={handleChange}
                required={timeField.required}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            {modalData.form.submitButton}
          </button>
        </form>

        <div className="contact-divider">
          <span>{modalData.divider.text}</span>
        </div>

        <div className="direct-contact">
          <h3>{modalData.directContact.title}</h3>
          <div className="contact-info">
            {modalData.directContact.contactInfo.map((contact) => (
              <div key={contact.id} className="contact-item">
                <span className="material-symbols-outlined">{contact.icon}</span>
                <a href={`${contact.type}:${contact.value}`}>{contact.display}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;
