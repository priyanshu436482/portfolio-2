import { useState, useEffect, useRef } from 'react';

const PHRASES = [
  "Let me walk you through this project...",
  "This is an AI-powered platform built with modern architecture...",
  "The frontend uses React with Tailwind CSS for a responsive UI...",
  "On the backend, it leverages a robust API layer...",
  "Key features include real-time data processing and cloud integration...",
  "The system handles thousands of users with sub-second response times...",
  "Security is handled through JWT authentication and role-based access...",
  "The project has received excellent feedback from clients...",
];

const SPEAKING_DURATION = 8000;

export default function VoiceModal({ project, isOpen, onClose }) {
  const [phase, setPhase] = useState('speaking');
  const [transcriptWords, setTranscriptWords] = useState([]);
  const timerRef = useRef(null);
  const phraseTimerRef = useRef(null);
  const wordTimerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    let phraseIdx = 0;
    const advancePhrase = () => {
      if (phraseIdx < PHRASES.length) {
        const words = PHRASES[phraseIdx].split(' ');
        let wIdx = 0;
        setTranscriptWords([]);
        wordTimerRef.current = setInterval(() => {
          if (wIdx < words.length) {
            setTranscriptWords((prev) => [...prev, words[wIdx]]);
            wIdx++;
          } else {
            clearInterval(wordTimerRef.current);
            phraseIdx++;
            if (phraseIdx < PHRASES.length) {
              phraseTimerRef.current = setTimeout(advancePhrase, 400);
            }
          }
        }, 80);
      }
    };

    phraseTimerRef.current = setTimeout(advancePhrase, 600);

    timerRef.current = setTimeout(() => {
      setPhase('ending');
      clearInterval(wordTimerRef.current);
      clearTimeout(phraseTimerRef.current);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, SPEAKING_DURATION);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(phraseTimerRef.current);
      clearInterval(wordTimerRef.current);
      setPhase('speaking');
      setTranscriptWords([]);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div
      className={`voice-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="AI voice narration"
    >
      <div className={`voice-modal-container ${phase === 'ending' ? 'voice-ending' : ''}`}>
        <div className="voice-modal-card">
          <button className="voice-modal-close" onClick={onClose} aria-label="Close voice narration">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="voice-modal-header">
            <span className="voice-modal-emoji">{project.emoji}</span>
            <div>
              <div className="voice-modal-project-name">{project.title}</div>
              <div className="voice-modal-badge">{project.category}</div>
            </div>
          </div>

          <div className="voice-waveform-wrap">
            <div className={`voice-waveform ${phase === 'ending' ? 'voice-waveform-stopped' : ''}`}>
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className="voice-bar"
                  style={{
                    '--i': i,
                    '--delay': `${i * 0.08}s`,
                    animationDuration: `${0.5 + (i % 3) * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="voice-status-row">
            {phase === 'speaking' ? (
              <>
                <span className="voice-status-dot"></span>
                <span className="voice-status-text">Speaking</span>
              </>
            ) : (
              <span className="voice-status-text" style={{ color: '#64748B' }}>Done</span>
            )}
          </div>

          <div className="voice-transcript">
            <span className="voice-phrase-text">
              {transcriptWords.join(' ')}
              {phase === 'speaking' && <span className="voice-cursor">|</span>}
            </span>
          </div>

          {phase === 'speaking' && (
            <button className="voice-skip-btn" onClick={onClose}>
              <i className="fa-solid fa-stop"></i> Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
