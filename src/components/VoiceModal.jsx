import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export default function VoiceModal({ project, isOpen, onClose }) {
  const [phase, setPhase] = useState('connecting'); // 'connecting', 'speaking', 'ending'
  const [transcriptWords, setTranscriptWords] = useState([]);
  const vapiRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !project) return;

    setPhase('connecting');
    setTranscriptWords([]);

    const VapiClient = Vapi.default || Vapi;
    const vapiInstance = new VapiClient(import.meta.env.VITE_VAPI_PUBLIC_KEY);
    vapiRef.current = vapiInstance;

    const onCallStart = () => {
      setPhase('speaking');
    };
    const onCallEnd = () => {
      setPhase('ending');
      setTimeout(onClose, 1200);
    };
    const onError = (e) => {
      console.error('Vapi Error:', e);
      setPhase('ending');
      setTimeout(onClose, 1200);
    };
    const onMessage = (msg) => {
      if (msg.type === 'transcript' && msg.transcriptType === 'partial' && msg.role === 'assistant') {
        setTranscriptWords(msg.transcript.split(' '));
      } else if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.role === 'assistant') {
        setTranscriptWords(msg.transcript.split(' '));
      }
    };

    vapiInstance.on('call-start', onCallStart);
    vapiInstance.on('call-end', onCallEnd);
    vapiInstance.on('error', onError);
    vapiInstance.on('message', onMessage);

    const startCall = async () => {
      try {
        await vapiInstance.start(import.meta.env.VITE_VAPI_ASSISTANT_ID, {
          firstMessage: `Hi! Let me introduce you to ${project.title}. ${project.summary} It's built using ${project.tech.join(', ')}.`
        });
      } catch (err) {
        console.error('Failed to start call', err);
        setPhase('ending');
        setTimeout(onClose, 1200);
      }
    };

    startCall();

    return () => {
      vapiInstance.stop();
      vapiInstance.off('call-start', onCallStart);
      vapiInstance.off('call-end', onCallEnd);
      vapiInstance.off('error', onError);
      vapiInstance.off('message', onMessage);
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

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
