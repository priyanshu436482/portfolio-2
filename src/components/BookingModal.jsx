import { useState, useMemo, useRef } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

function generateMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay();
    const isPast = date < today;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isFullyBooked = [5, 12, 19, 26].includes(d) || [8, 15, 22, 29].includes(d);
    const isAvailable = !isPast && !isWeekend && !isFullyBooked;
    const slotsLeft = isAvailable ? 2 + Math.floor(Math.random() * 6) : 0;
    days.push({ day: d, date, isPast, isWeekend, isAvailable, slotsLeft, isFullyBooked });
  }
  return days;
}

function getTimeSlotStatus(slotIndex) {
  const bookedIndices = [1, 3, 5, 8, 10, 14];
  const isBooked = bookedIndices.includes(slotIndex);
  const isSoon = slotIndex <= 2;
  return { isBooked, isSoon };
}

const VOICE_BOOKING_PHRASES = [
  "Hello! I'm here to help you book a 30-minute discovery call with Umesh.",
  "Let me check the available slots...",
  "I have several openings this week. What date works best for you?",
  "Great choice! I've noted the date.",
  "Now, what time works best — morning or afternoon?",
  "Perfect! Locking that in.",
  "Almost done — what's your full name?",
  "Thanks! And your email address so I can send the calendar invite?",
  "Excellent! Let me confirm everything and send you the invite...",
];

export default function BookingModal({ isOpen, onClose }) {
  const today = useMemo(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }, []);

  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());

  const [mode, setMode] = useState('form');
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [confirmed, setConfirmed] = useState(false);
  const [formError, setFormError] = useState('');

  const [voicePhase, setVoicePhase] = useState('idle');

  const [transcriptWords, setTranscriptWords] = useState([]);
  const voiceTimerRef = useRef(null);
  const voiceWordTimerRef = useRef(null);

  const days = useMemo(() => generateMonthDays(viewYear, viewMonth), [viewYear, viewMonth]);

  const goToStep = (s) => { setStep(s); setFormError(''); };
  const reset = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: '', email: '', message: '' });
    setConfirmed(false);
    setFormError('');
    setMode('form');
    setVoicePhase('idle');

    setTranscriptWords([]);
  };

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    if (newMode === 'voice') {
      startVoiceBooking();
    } else {
      setVoicePhase('idle');

      setTranscriptWords([]);
      clearTimeout(voiceTimerRef.current);
      clearInterval(voiceWordTimerRef.current);
    }
  };

  const startVoiceBooking = () => {
    setVoicePhase('listening');

    setTranscriptWords([]);

    let pIdx = 0;

    const advancePhrase = () => {
      if (pIdx >= VOICE_BOOKING_PHRASES.length) {
        const firstAvail = days.find((d) => d?.isAvailable);
        if (firstAvail) setSelectedDate(firstAvail);
        const firstTime = { label: TIME_SLOTS.find((_, i) => !getTimeSlotStatus(i).isBooked) || TIME_SLOTS[0], isBooked: false };
        setSelectedTime(firstTime);
        setForm({ name: 'Alex Johnson', email: 'alex@example.com', message: '' });
        setVoicePhase('confirming');
        setTimeout(() => {
          setConfirmed(true);
          setVoicePhase('done');
        }, 1800);
        return;
      }


      const words = VOICE_BOOKING_PHRASES[pIdx].split(' ');
      setTranscriptWords([]);
      let wIdx = 0;
      clearInterval(voiceWordTimerRef.current);
      voiceWordTimerRef.current = setInterval(() => {
        if (wIdx < words.length) {
          setTranscriptWords((prev) => [...prev, words[wIdx]]);
          wIdx++;
        } else {
          clearInterval(voiceWordTimerRef.current);

          if (pIdx === 2) {
            const firstAvail = days.find((d) => d?.isAvailable);
            if (firstAvail) setSelectedDate(firstAvail);
          }
          if (pIdx === 4) {
            const firstTime = { label: TIME_SLOTS.find((_, i) => !getTimeSlotStatus(i).isBooked) || TIME_SLOTS[0], isBooked: false };
            setSelectedTime(firstTime);
          }
          if (pIdx === 7) {
            setForm({ name: 'Alex Johnson', email: 'alex@example.com', message: '' });
          }

          pIdx++;
          voiceTimerRef.current = setTimeout(advancePhrase, 900);
        }
      }, 55);
    };

    voiceTimerRef.current = setTimeout(advancePhrase, 800);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const cantGoBack = viewYear === today.year && viewMonth === today.month;

  const handleSelectDate = (d) => {
    if (!d.isAvailable) return;
    setSelectedDate(d);
    setSelectedTime(null);
  };

  const handleSelectTime = (slot) => {
    if (slot.isBooked) return;
    setSelectedTime(slot);
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setFormError('Please fill in your name and email');
      setTimeout(() => setFormError(''), 2500);
      return;
    }
    if (!form.email.includes('@')) {
      setFormError('Please enter a valid email address');
      setTimeout(() => setFormError(''), 2500);
      return;
    }
    setConfirmed(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
    >
      <div className="modal-container booking-modal">
        <button className="modal-close" onClick={() => { onClose(); reset(); }} aria-label="Close booking">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content" data-lenis-prevent>
          <div className="booking-modal-grid">
            {/* ── Left panel: info sidebar ── */}
            <div className="booking-modal-info">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="logo-mark text-xs !w-8 !h-8">UP</span>
                  <span className="font-semibold text-[#111827]">Umesh Patel</span>
                </div>
                <div className="booking-modal-badge">
                  <i className="fa-regular fa-calendar-check"></i> Free Discovery Call
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">Book a time that works for you</h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  Pick a slot below and I'll send you a calendar invite with a Google Meet link right after.
                </p>
                <div className="space-y-1">
                  <div className="modal-info-item">
                    <div className="modal-info-icon"><i className="fa-regular fa-clock"></i></div>
                    <div>
                      <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Duration</p>
                      <p className="text-sm font-medium text-[#111827]">30 minutes</p>
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-icon"><i className="fa-regular fa-comments"></i></div>
                    <div>
                      <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">What we'll cover</p>
                      <p className="text-sm font-medium text-[#111827]">Your idea, tech fit, timeline & next steps</p>
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-icon"><i className="fa-regular fa-circle-check"></i></div>
                    <div>
                      <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">No commitment</p>
                      <p className="text-sm font-medium text-[#111827]">Free, no-strings-attached chat</p>
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-icon"><i className="fa-solid fa-video"></i></div>
                    <div>
                      <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Meeting</p>
                      <p className="text-sm font-medium text-[#111827]">Google Meet (link in invite)</p>
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Booking summary when steps progress */}
              {selectedDate && !confirmed && (
                <div className="mt-4 pt-4 border-t border-slate-200 booking-mini-summary">
                  <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-2">Your selection</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#111827]">
                    <i className="fa-regular fa-calendar text-[#3B82F6] text-xs"></i>
                    <span>{selectedDate.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  {selectedTime && (
                    <div className="flex items-center gap-2 text-sm font-medium text-[#111827] mt-1">
                      <i className="fa-regular fa-clock text-[#3B82F6] text-xs"></i>
                      <span>{selectedTime.label}</span>
                    </div>
                  )}
                </div>
              )}
 
              <div className="mt-auto pt-6 border-t border-slate-200">
                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-3">Prefer email first?</p>
                <a href="mailto:umeshmca.kadi@gmail.com" className="text-sm font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors">
                  umeshmca.kadi@gmail.com <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
 
            {/* ── Right panel: booking flow ── */}
            <div className="booking-modal-flow">
              {/* ── Mode toggle ── */}
              {!confirmed && (
                <div className="booking-mode-toggle">
                  <button
                    className={`booking-mode-btn ${mode === 'form' ? 'active' : ''}`}
                    onClick={() => switchMode('form')}
                  >
                    <i className="fa-regular fa-keyboard"></i> Manual
                  </button>
                  <button
                    className={`booking-mode-btn ${mode === 'voice' ? 'active' : ''}`}
                    onClick={() => switchMode('voice')}
                  >
                    <i className="fa-solid fa-microphone"></i> AI Voice
                  </button>
                </div>
              )}
 
              {confirmed ? (
                /* ── Step 4: Confirmation ── */
                <div className="booking-step-content">
                  <div className="booking-confirmed-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mt-4">You're booked!</h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                    A calendar invite with a Google Meet link is on its way to <strong className="text-[#111827]">{form.email}</strong>.
                  </p>
                  <div className="booking-confirmed-details mt-6">
                    <div className="booking-confirmed-row">
                      <i className="fa-regular fa-calendar text-[#3B82F6]"></i>
                      <div>
                        <p className="text-xs text-[#64748B]">Date</p>
                        <p className="text-sm font-semibold text-[#111827]">
                          {selectedDate.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="booking-confirmed-row">
                      <i className="fa-regular fa-clock text-[#3B82F6]"></i>
                      <div>
                        <p className="text-xs text-[#64748B]">Time</p>
                        <p className="text-sm font-semibold text-[#111827]">{selectedTime.label} (30 min)</p>
                      </div>
                    </div>
                    <div className="booking-confirmed-row">
                      <i className="fa-solid fa-video text-[#3B82F6]"></i>
                      <div>
                        <p className="text-xs text-[#64748B]">Meeting</p>
                        <p className="text-sm font-semibold text-[#111827]">Google Meet</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] mt-6">Please check your spam folder if you don't see the invite within 5 minutes.</p>
                  <button
                    className="form-submit mt-6"
                    onClick={() => { onClose(); reset(); }}
                  >
                    Close <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              ) : mode === 'voice' ? (
                /* ── Voice booking panel ── */
                <div className="voice-booking-panel">
                  <div className="voice-booking-waveform-wrap">
                    <div className={`voice-waveform ${voicePhase === 'done' || voicePhase === 'confirming' ? 'voice-waveform-stopped' : ''}`}>
                      {Array.from({ length: 28 }).map((_, i) => (
                        <span
                          key={i}
                          className="voice-bar"
                          style={{
                            '--i': i,
                            '--delay': `${i * 0.1}s`,
                            animationDuration: `${0.5 + (i % 4) * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
 
                  <div className="voice-booking-status-row">
                    {voicePhase === 'listening' && (
                      <><span className="voice-status-dot"></span><span className="voice-booking-status-text">Speaking</span></>
                    )}
                    {voicePhase === 'confirming' && (
                      <><span className="voice-booking-status-dot-confirming"></span><span className="voice-booking-status-text" style={{ color: '#2563EB' }}>Confirming</span></>
                    )}
                    {voicePhase === 'done' && (
                      <span className="voice-booking-status-text" style={{ color: '#22c55e' }}>Booked!</span>
                    )}
                  </div>
 
                  <div className="voice-booking-transcript">
                    <span className="voice-booking-phrase">
                      {transcriptWords.join(' ')}
                      {voicePhase !== 'done' && voicePhase !== 'confirming' && <span className="voice-cursor">|</span>}
                    </span>
                  </div>
 
                  {voicePhase !== 'done' && voicePhase !== 'confirming' && (
                    <button className="voice-booking-cancel-btn" onClick={() => switchMode('form')}>
                      <i className="fa-solid fa-xmark"></i> Cancel Voice
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* ── Step indicator ── */}
                  <div className="booking-step-indicator">
                    {['Select Date', 'Select Time', 'Your Details'].map((label, i) => (
                      <div key={i} className={`booking-step-dot-wrap ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
                        <div className="booking-step-dot">
                          {step > i + 1 ? <i className="fa-solid fa-check"></i> : i + 1}
                        </div>
                        <span className="booking-step-label">{label}</span>
                      </div>
                    ))}
                    <div className="booking-step-line"></div>
                  </div>
 
                  {/* ── Step 1: Pick a date ── */}
                  {step === 1 && (
                    <div className="booking-step-content">
                      <div className="flex items-center justify-between mb-5">
                        <button
                          className={`booking-month-nav ${cantGoBack ? 'opacity-20 pointer-events-none' : ''}`}
                          onClick={handlePrevMonth}
                          aria-label="Previous month"
                        >
                          <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <span className="text-sm font-bold text-[#111827]">
                          {MONTHS[viewMonth]} {viewYear}
                        </span>
                        <button
                          className="booking-month-nav"
                          onClick={handleNextMonth}
                          aria-label="Next month"
                        >
                          <i className="fa-solid fa-chevron-right"></i>
                        </button>
                      </div>
 
                      <div className="booking-calendar-grid">
                        {WEEKDAYS.map((d) => (
                          <div key={d} className="booking-calendar-weekday">{d}</div>
                        ))}
                        {days.map((d, i) => (
                          <div key={i} className="booking-calendar-cell-wrap">
                            {d ? (
                              <button
                                className={`booking-calendar-day ${d.isPast || d.isWeekend ? 'past' : ''} ${d.isFullyBooked ? 'booked' : ''} ${d.isAvailable ? 'available' : ''} ${selectedDate?.day === d.day ? 'selected' : ''}`}
                                onClick={() => handleSelectDate(d)}
                                disabled={!d.isAvailable}
                                aria-label={`${d.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${d.isAvailable ? ` — ${d.slotsLeft} slots available` : d.isFullyBooked ? ' — fully booked' : ''}`}
                              >
                                <span className="booking-day-num">{d.day}</span>
                                {d.isAvailable && (
                                  <span className="booking-day-slots">{d.slotsLeft}</span>
                                )}
                              </button>
                            ) : (
                              <div className="booking-calendar-empty"></div>
                            )}
                          </div>
                        ))}
                      </div>
 
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-4 text-xs text-[#64748B]">
                          <span><span className="inline-block w-3 h-3 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 align-middle mr-1"></span> Available</span>
                          <span><span className="inline-block w-3 h-3 rounded-full bg-slate-200 border border-slate-300 align-middle mr-1"></span> Booked</span>
                        </div>
                        <button
                          className={`booking-next-btn ${!selectedDate ? 'opacity-40 pointer-events-none' : ''}`}
                          onClick={() => goToStep(2)}
                          disabled={!selectedDate}
                        >
                          Next <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
 
                  {/* ── Step 2: Pick a time ── */}
                  {step === 2 && (
                    <div className="booking-step-content">
                      <p className="text-xs text-[#475569] mb-4">
                        <i className="fa-regular fa-calendar mr-1"></i>
                        {selectedDate.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        <button className="ml-2 text-[#3B82F6] hover:text-[#2563EB] underline text-xs" onClick={() => goToStep(1)}>Change</button>
                      </p>
                      <div className="booking-times-grid">
                        {TIME_SLOTS.map((label, i) => {
                          const { isBooked, isSoon } = getTimeSlotStatus(i);
                          const slot = { label, isBooked, isSoon };
                          return (
                            <button
                              key={i}
                              className={`booking-time-slot ${isBooked ? 'booked' : ''} ${selectedTime?.label === label ? 'selected' : ''}`}
                              onClick={() => handleSelectTime(slot)}
                              disabled={isBooked}
                              aria-label={`${label}${isBooked ? ' — booked' : ''}`}
                            >
                              <span className="booking-time-label">{label}</span>
                              {isBooked && <span className="booking-time-status">Booked</span>}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200">
                        <button className="booking-back-btn" onClick={() => goToStep(1)}>
                          <i className="fa-solid fa-arrow-left"></i> Back
                        </button>
                        <button
                          className={`booking-next-btn ${!selectedTime ? 'opacity-40 pointer-events-none' : ''}`}
                          onClick={() => goToStep(3)}
                          disabled={!selectedTime}
                        >
                          Next <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
 
                  {/* ── Step 3: Your details ── */}
                  {step === 3 && (
                    <div className="booking-step-content">
                      <p className="text-xs text-[#475569] mb-4">
                        <i className="fa-regular fa-calendar mr-1"></i>
                        {selectedDate.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedTime?.label}
                        <button className="ml-2 text-[#3B82F6] hover:text-[#2563EB] underline text-xs" onClick={() => goToStep(2)}>Change</button>
                      </p>
                      <form onSubmit={handleConfirm} noValidate>
                        <div className="form-group">
                          <label htmlFor="bkName" className="form-label">Full name</label>
                          <input
                            type="text"
                            id="bkName"
                            name="name"
                            className="form-input"
                            value={form.name}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bkEmail" className="form-label">Email address</label>
                          <input
                            type="email"
                            id="bkEmail"
                            name="email"
                            className="form-input"
                            value={form.email}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bkMessage" className="form-label">What are you looking for? (optional)</label>
                          <textarea
                            id="bkMessage"
                            name="message"
                            className="form-textarea"
                            value={form.message}
                            onChange={handleFormChange}
                            rows={3}
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="form-submit"
                          style={formError ? { background: 'linear-gradient(135deg, #dc2626, #b91c1c)' } : {}}
                        >
                          <span>{formError || 'Confirm Booking'}</span>
                          <i className="fa-regular fa-circle-check"></i>
                        </button>
                      </form>
                      <button className="booking-back-btn mt-3" onClick={() => goToStep(2)}>
                        <i className="fa-solid fa-arrow-left"></i> Back to time selection
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
