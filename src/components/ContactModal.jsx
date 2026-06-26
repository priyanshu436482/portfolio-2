import { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    setSubmitted(true);
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
                    <p className="text-sm font-medium text-[#111827]"><a href="mailto:hi@umeshpatel.com" className="hover:text-[var(--accent-1)] transition-colors">hi@umeshpatel.com</a></p>
                  </div>
                </div>
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
                <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" aria-label="Dribbble"><i className="fa-brands fa-dribbble"></i></a>
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
                    style={error ? { background: 'linear-gradient(135deg, #dc2626, #b91c1c)' } : {}}
                  >
                    <span>{error || 'Send Message'}</span>
                    <i className="fa-solid fa-arrow-right"></i>
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
