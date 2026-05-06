import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  // Since I'm using Vanilla CSS, I'll use class names that I define in index.css or just style objects if needed.
  // Wait, I should probably stick to the design system in index.css.
  
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input 
        className={`form-input ${error ? 'border-error' : ''}`}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export const Loader = ({ size = 'md' }) => {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className="loader-spinner"></div>
    </div>
  );
};
