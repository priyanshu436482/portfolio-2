import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { REGION } from '../data/config';

export default function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id.replace('form', '').toLowerCase()]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formState;
    if (!name || !email || !subject || !message) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 2000);
      return;
    }
    
    setLoading(true);
    
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      {
        name: name,
        email: email,
        subject: subject,
        message: message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
    )
    .then((result) => {
        console.log(result.text);
        setSubmitted(true);
        setLoading(false);
    }, (error) => {
        console.log(error.text);
        setError('Failed to send message. Please try again.');
        setLoading(false);
        setTimeout(() => setError(''), 3000);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content" data-lenis-prevent>
        <div className="modal-grid">
          <div className="modal-info">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="logo-mark text-xs !w-8 !h-8">UP</span>
                <span className="font-semibold text-[#111827]">Umesh Patel</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-2">Let's talk</h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Have a project in mind or just want to connect? Fill out the form and I'll get back to you within 24 hours.
              </p>
              <div className="space-y-1">
              <div className="modal-info-item">
                 <div className="modal-info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-[#111827]"><a href="mailto:umeshmca.kadi@gmail.com" className="hover:text-[var(--accent-1)] transition-colors">umeshmca.kadi@gmail.com</a></p>
                </div>
              </div>
              {REGION === 'canada' && (
                <div className="modal-info-item">
                   <div className="modal-info-icon"><i className="fa-solid fa-phone"></i></div>
                  <div>
                    <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Canada Phone</p>
                    <p className="text-sm font-medium text-[#111827] mt-1">
                      <a href={`tel:${import.meta.env.VITE_PHONE_CANADA?.replace(/\D/g, '')}`} className="hover:text-[var(--accent-1)] transition-colors">
                        <span className="text-[#64748B] mr-2">🇨🇦</span>{import.meta.env.VITE_PHONE_CANADA}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {REGION === 'india' && (
                <div className="modal-info-item">
                   <div className="modal-info-icon"><i className="fa-solid fa-phone"></i></div>
                  <div>
                    <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">India Phone</p>
                    <p className="text-sm font-medium text-[#111827] mt-1">
                      <a href={`tel:${import.meta.env.VITE_PHONE_INDIA?.replace(/\D/g, '')}`} className="hover:text-[var(--accent-1)] transition-colors">
                        <span className="text-[#64748B] mr-2">🇮🇳</span>{import.meta.env.VITE_PHONE_INDIA}
                      </a>
                    </p>
                  </div>
                </div>
              )}
                <div className="modal-info-item">
                  <div className="modal-info-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div>
                    <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-[#111827]">Remote / Worldwide</p>
                  </div>
                </div>
                <div className="modal-info-item">
                  <div className="modal-info-icon"><i className="fa-solid fa-clock"></i></div>
                  <div>
                    <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Response Time</p>
                    <p className="text-sm font-medium text-[#111827]">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-3">Connect</p>
              <div className="modal-social flex gap-2.5">
                <a href="https://github.com/Umeshp9099" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/umesh-patel-kadi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
 
          <div className="modal-form-wrap">
            {!submitted ? (
              <>
                <h4 className="text-lg font-bold text-[#111827] mb-1">Send a message</h4>
                <p className="text-xs text-[#64748B] mb-6">All fields are required</p>
                <form onSubmit={handleSubmit} noValidate>
                  {['Name', 'Email', 'Subject'].map((field) => (
                    <div key={field} className="form-group">
                      <label htmlFor={`form${field}`} className="form-label">{(field === 'Email' ? 'Email address' : field === 'Name' ? 'Full name' : field)}</label>
                      <input
                        type={field === 'Email' ? 'email' : 'text'}
                        id={`form${field}`}
                        className="form-input"
                        value={formState[field.toLowerCase()]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label htmlFor="formMessage" className="form-label">Message</label>
                    <textarea
                      id="formMessage"
                      className="form-textarea"
                      value={formState.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="form-submit"
                    disabled={loading}
                    style={error ? { background: 'linear-gradient(135deg, #dc2626, #b91c1c)' } : {}}
                  >
                    <span>{error || (loading ? 'Sending...' : 'Send Message')}</span>
                    {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-arrow-right"></i>}
                  </button>
                </form>
              </>
            ) : (
              <div className="form-success show">
                <div className="form-success-icon"><i className="fa-solid fa-check"></i></div>
                <h4 className="text-lg font-bold text-[#111827] mb-1">Message sent!</h4>
                <p className="text-sm text-[#475569]">Thanks for reaching out. I'll respond within 24 hours.</p>
                <button
                  className="btn-outline !mt-6 !py-2.5 !px-6 text-sm"
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
