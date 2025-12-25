import React, { useState } from 'react';
import './DemoModal.css';
import demoData from '../../data/demoModal.json';

const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo scheduled:', formData);
    alert(demoData.modal.successMessage);
    onClose();
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content demo-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2>{demoData.modal.title}</h2>
        <p className='modal-subtitle'>{demoData.modal.subtitle}</p>

        <form onSubmit={handleSubmit}>
          {demoData.form.fields.map((field) => (
            <div key={field.id} className='form-group'>
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                >
                  {field.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={field.rows}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                />
              )}
            </div>
          ))}

          <button type='submit' className='demo-submit-btn'>
            {demoData.modal.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoModal;
