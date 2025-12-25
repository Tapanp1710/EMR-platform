import React, { useState } from 'react';
import './AuthModal.css';
import { useAuth } from '../../context/AuthContext';
import authData from '../../data/authModal.json';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: ''
  });
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formData.email, name: formData.name });

    const message = isSignUp
      ? authData.signUp.successMessage
      : authData.signIn.successMessage;

    setSuccessMessage(message);

    setTimeout(() => {
    setSuccessMessage('');
    onClose();
  }, 500);
  };

  const currentMode = isSignUp ? authData.signUp : authData.signIn;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2>{currentMode.title}</h2>

        {successMessage && (
          <div className="auth-success-message">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Sign Up only fields */}
          {isSignUp && authData.signUpOnly.fields.map((field) => (
            <div key={field.id} className='form-group'>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}

          {/* Common fields (email, password) */}
          {authData.common.fields.map((field) => (
            <div key={field.id} className='form-group'>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}

          {/* Sign Up only organization field (after common fields)
          {isSignUp && (
            <div className='form-group'>
              <label>{authData.signUpOnly.fields[1].label}</label>
              <input
                type={authData.signUpOnly.fields[1].type}
                name={authData.signUpOnly.fields[1].name}
                value={formData.organization}
                onChange={handleChange}
                placeholder={authData.signUpOnly.fields[1].placeholder}
                required={authData.signUpOnly.fields[1].required}
              />
            </div>
          )} */}

          <button type='submit' className='auth-submit-btn'>
            {currentMode.buttonText}
          </button>
        </form>

        <div className='auth-switch'>
          {isSignUp ? (
            <p>
              {authData.signUp.switchText.split('?')[0]}?{' '}
              <span onClick={() => { setIsSignUp(false); setSuccessMessage(''); }}>
                {authData.signUp.switchText.split('?')[1]}
              </span>
            </p>
          ) : (
            <p>
              {authData.signIn.switchText.split('?')[0]}?{' '}
              <span onClick={() => { setIsSignUp(true); setSuccessMessage(''); }}>
                {authData.signIn.switchText.split('?')[1]}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
