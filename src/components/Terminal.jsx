import { useState, useEffect, useRef, useCallback } from 'react';

const commands = {
  help: {
    desc: 'Show available commands',
    fn: () => [
      '',
      '  \x1b[33mAvailable commands\x1b[0m',
      '  \x1b[90m──────────────────\x1b[0m',
      '',
      '  \x1b[36mwhoami\x1b[0m        \x1b[90m— Who is Umesh?\x1b[0m',
      '  \x1b[36mabout\x1b[0m         \x1b[90m— About me\x1b[0m',
      '  \x1b[36mskills\x1b[0m        \x1b[90m— Technical skills\x1b[0m',
      '  \x1b[36mprojects\x1b[0m      \x1b[90m— List projects\x1b[0m',
      '  \x1b[36mexperience\x1b[0m    \x1b[90m— Work experience\x1b[0m',
      '  \x1b[36meducation\x1b[0m     \x1b[90m— Education\x1b[0m',
      '  \x1b[36mcontact\x1b[0m       \x1b[90m— Contact info\x1b[0m',
      '  \x1b[36msocial\x1b[0m        \x1b[90m— Social links\x1b[0m',
      '  \x1b[36mclear\x1b[0m         \x1b[90m— Clear terminal\x1b[0m',
      '  \x1b[36mhelp\x1b[0m          \x1b[90m— Show this help\x1b[0m',
      '',
    ],
  },
  whoami: {
    desc: 'Who is Umesh?',
    fn: () => [
      '',
      '  \x1b[33mUmesh Patel\x1b[0m',
      '  \x1b[90m─────────────────────\x1b[0m',
      '  \x1b[37mSenior Full Stack Developer\x1b[0m',
      '  \x1b[90m10+ years of experience building enterprise-grade\x1b[0m',
      '  \x1b[90mdigital products, from AI-powered platforms to\x1b[0m',
      '  \x1b[90mfull-stack web and mobile solutions used by\x1b[0m',
      '  \x1b[90mthousands worldwide.\x1b[0m',
      '',
      '  \x1b[90mlocation:\x1b[0m  \x1b[37mRemote / Worldwide\x1b[0m',
      '  \x1b[90memail:\x1b[0m     \x1b[37mhi@umeshpatel.com\x1b[0m',
      '  \x1b[90mwebsite:\x1b[0m   \x1b[36mhttps://umeshpatel.com\x1b[0m',
      '',
    ],
  },
  about: {
    desc: 'About me',
    fn: () => [
      '',
      '  \x1b[33mAbout\x1b[0m',
      '  \x1b[90m─────\x1b[0m',
      '  \x1b[37mI architect and build enterprise-grade digital\x1b[0m',
      '  \x1b[37mproducts. I specialize in full-stack development\x1b[0m',
      '  \x1b[37mwith React, Vue.js, Angular, Node.js, PHP, Laravel,\x1b[0m',
      '  \x1b[37mWordPress, Python, .NET Core, Flutter, and cloud\x1b[0m',
      '  \x1b[37mtechnologies. I\'ve delivered 50+ projects across AI,\x1b[0m',
      '  \x1b[37mSaaS, booking, legal, health, EdTech, and more.\x1b[0m',
      '',
      '  \x1b[90mI turn complex problems into simple, elegant\x1b[0m',
      '  \x1b[90msolutions that users love.\x1b[0m',
      '',
    ],
  },
  skills: {
    desc: 'Technical skills',
    fn: () => [
      '',
      '  \x1b[33mTechnical Skills\x1b[0m',
      '  \x1b[90m─────────────────\x1b[0m',
      '',
      '  \x1b[36mFrontend:\x1b[0m      \x1b[37mReact, Next.js, Vue.js, Angular, TypeScript,\x1b[0m',
      '                \x1b[37mTailwind CSS\x1b[0m',
      '  \x1b[36mBackend:\x1b[0m       \x1b[37m.NET Core 6/8, Node.js, Express, Python,\x1b[0m',
      '                \x1b[37mPHP, Laravel, WordPress\x1b[0m',
      '  \x1b[36mDatabase:\x1b[0m      \x1b[37mPostgreSQL, SQL Server, MongoDB, MySQL\x1b[0m',
      '  \x1b[36mCloud & DevOps:\x1b[0m \x1b[37mAzure, AWS, Docker, CI/CD\x1b[0m',
      '  \x1b[36mAuth & Real-time:\x1b[0m\x1b[37mJWT, OAuth, Socket.IO\x1b[0m',
      '  \x1b[36mPayments:\x1b[0m      \x1b[37mStripe, In-App Purchases\x1b[0m',
      '  \x1b[36mMobile:\x1b[0m        \x1b[37mFlutter, React Native\x1b[0m',
      '',
    ],
  },
  projects: {
    desc: 'List projects',
    fn: () => [
      '',
      '  \x1b[33mProjects (16)\x1b[0m',
      '  \x1b[90m──────────────\x1b[0m',
      '',
      '  \x1b[33m 1.\x1b[0m \x1b[37mArtigan AI\x1b[0m           \x1b[90mAI SaaS for invoice management\x1b[0m',
      '  \x1b[33m 2.\x1b[0m \x1b[37mShear Brilliance\x1b[0m      \x1b[90mMulti-platform salon booking\x1b[0m',
      '  \x1b[33m 3.\x1b[0m \x1b[37mHoescape\x1b[0m              \x1b[90mVacation rental platform\x1b[0m',
      '  \x1b[33m 4.\x1b[0m \x1b[37mAmerican Legal Office\x1b[0m  \x1b[90mLegal consultation portal\x1b[0m',
      '  \x1b[33m 5.\x1b[0m \x1b[37mHealth Web Guru\x1b[0m        \x1b[90mHealth tips & wellness app\x1b[0m',
      '  \x1b[33m 6.\x1b[0m \x1b[37mTess\x1b[0m                  \x1b[90mHR management platform\x1b[0m',
      '  \x1b[33m 7.\x1b[0m \x1b[37mOpenTalent\x1b[0m            \x1b[90mE-learning platform\x1b[0m',
      '  \x1b[33m 8.\x1b[0m \x1b[37mMakestaff\x1b[0m             \x1b[90mStaffing platform\x1b[0m',
      '  \x1b[33m 9.\x1b[0m \x1b[37mInvoixy\x1b[0m               \x1b[90mInvoice generator\x1b[0m',
      '  \x1b[33m10.\x1b[0m \x1b[37mClover\x1b[0m               \x1b[90mDating app\x1b[0m',
      '  \x1b[33m11.\x1b[0m \x1b[37mDental Care\x1b[0m           \x1b[90mDental practice management\x1b[0m',
      '  \x1b[33m12.\x1b[0m \x1b[37mSurveil\x1b[0m              \x1b[90mAdmin panel\x1b[0m',
      '  \x1b[33m13.\x1b[0m \x1b[37mSurveil API\x1b[0m           \x1b[90mREST API\x1b[0m',
      '  \x1b[33m14.\x1b[0m \x1b[37mSchool Management\x1b[0m     \x1b[90mSchool admin system\x1b[0m',
      '  \x1b[33m15.\x1b[0m \x1b[37mE-Commerce Platform\x1b[0m   \x1b[90mFull e-commerce solution\x1b[0m',
      '  \x1b[33m16.\x1b[0m \x1b[37mUtility Apps\x1b[0m          \x1b[90mProductivity tools\x1b[0m',
      '',
    ],
  },
  experience: {
    desc: 'Work experience',
    fn: () => [
      '',
      '  \x1b[33mExperience\x1b[0m',
      '  \x1b[90m────────────\x1b[0m',
      '',

      '  \x1b[37mFull Stack Engineer\x1b[0m',
      '  \x1b[90mCreative Guild | Dec 2022 — Present\x1b[0m',
      '  \x1b[90m  Architect & deploy full-stack SaaS apps\x1b[0m',
      '  \x1b[90m  Skills: Docker, AWS, Laravel, Vue.js\x1b[0m',
      '',
      '  \x1b[37mSolution Technology Architect\x1b[0m',
      '  \x1b[90mIT Path Solutions | May 2022 — Sep 2022\x1b[0m',
      '  \x1b[90m  Led architecture for 8+ enterprise projects\x1b[0m',
      '  \x1b[90m  Optimized 100+ database queries\x1b[0m',
      '  \x1b[90m  Skills: Team Management, Project Management\x1b[0m',
      '',
      '  \x1b[37mLead Technology Architect\x1b[0m',
      '  \x1b[90mIT Path Solutions | Dec 2017 — Apr 2022\x1b[0m',
      '  \x1b[90m  Architected 15+ backend solutions for SaaS\x1b[0m',
      '  \x1b[90m  Skills: Laravel, WordPress, Architecture\x1b[0m',
      '',
      '  \x1b[37mSr. PHP Developer\x1b[0m',
      '  \x1b[90mKaira Software | Sep 2016 — Dec 2017\x1b[0m',
      '  \x1b[90m  Developed apps with third-party APIs\x1b[0m',
      '  \x1b[90m  Refactored codebase for scalability\x1b[0m',
      '  \x1b[90m  Skills: Laravel, CodeIgniter, API integration\x1b[0m',
      '',
      '  \x1b[37mPHP Developer\x1b[0m',
      '  \x1b[90mTriState Technology | Jul 2014 — Aug 2016\x1b[0m',
      '  \x1b[90m  Developed custom PHP & WordPress web apps\x1b[0m',
      '  \x1b[90m  Skills: PHP, WordPress, Web Development\x1b[0m',
      '',
    ],
  },
  education: {
    desc: 'Education',
    fn: () => [
      '',
      '  \x1b[33mEducation\x1b[0m',
      '  \x1b[90m───────────\x1b[0m',
      '',
      '  \x1b[37mB.S. in Computer Science\x1b[0m',
      '  \x1b[90mGujarat University | 2012 — 2016\x1b[0m',
      '  \x1b[90m  Focus on software engineering & web tech\x1b[0m',
      '  \x1b[90m  Active in hackathons & coding competitions\x1b[0m',
      '',
    ],
  },
  contact: {
    desc: 'Contact info',
    fn: () => [
      '',
      '  \x1b[33mContact\x1b[0m',
      '  \x1b[90m─────────\x1b[0m',
      '',
      '  \x1b[90memail:\x1b[0m   \x1b[36mhi@umeshpatel.com\x1b[0m',
      '  \x1b[90mwebsite:\x1b[0m \x1b[36mhttps://umeshpatel.com\x1b[0m',
      '  \x1b[90mgithub:\x1b[0m  \x1b[36mhttps://github.com/umeshpatel\x1b[0m',
      '  \x1b[90mlinkedin:\x1b[0m\x1b[36mhttps://linkedin.com/in/umeshpatel\x1b[0m',
      '',
    ],
  },
  social: {
    desc: 'Social links',
    fn: () => [
      '',
      '  \x1b[33mSocial Links\x1b[0m',
      '  \x1b[90m──────────────\x1b[0m',
      '',
      '  \x1b[90mGitHub:\x1b[0m    \x1b[36mhttps://github.com/umeshpatel\x1b[0m',
      '  \x1b[90mLinkedIn:\x1b[0m   \x1b[36mhttps://linkedin.com/in/umeshpatel\x1b[0m',
      '  \x1b[90mTwitter:\x1b[0m   \x1b[36mhttps://twitter.com/umeshpatel\x1b[0m',
      '  \x1b[90mDribbble:\x1b[0m  \x1b[36mhttps://dribbble.com/umeshpatel\x1b[0m',
      '',
    ],
  },
};

function parseANSI(text) {
  const esc = String.fromCharCode(27);
  const parts = text.split(new RegExp('(' + esc + '\\[[\\d;]+m)', 'g'));
  const result = [];
  let currentStyle = {};
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const match = part.match(new RegExp('^' + esc + '\\[([\\d;]+)m$'));
    if (match) {
      const codes = match[1].split(';');
      for (const c of codes) {
        if (c === '0') currentStyle = {};
        else if (c === '90') currentStyle = { ...currentStyle, color: '#9ca3af' };
        else if (c === '33') currentStyle = { ...currentStyle, color: '#f5c842' };
        else if (c === '36') currentStyle = { ...currentStyle, color: '#5bc0de' };
        else if (c === '37') currentStyle = { ...currentStyle, color: '#e5e7eb' };
        else if (c === '34') currentStyle = { ...currentStyle, color: '#60a5fa' };
        else if (c === '31') currentStyle = { ...currentStyle, color: '#f87171' };
        else if (c === '32') currentStyle = { ...currentStyle, color: '#86efac' };
      }
    } else if (part) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      if (urlRegex.test(part)) {
        const subparts = part.split(urlRegex);
        subparts.forEach((sp, idx) => {
          if (urlRegex.test(sp)) {
            result.push(
              <a
                key={result.length + '-' + idx}
                href={sp}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link-cli"
              >
                {sp}
              </a>
            );
          } else if (sp) {
            result.push(<span key={result.length + '-' + idx} style={currentStyle}>{sp}</span>);
          }
        });
      } else {
        result.push(<span key={result.length} style={currentStyle}>{part}</span>);
      }
    }
  }
  return result.length ? result : null;
}

function renderLine(line, i) {
  if (!line) return <div key={i} className="tl">&nbsp;</div>;
  return <div key={i} className="tl">{parseANSI(line)}</div>;
}

export default function Terminal({ isOpen, onOpenChange }) {
  const [lines, setLines] = useState(() => [
    '',
    '  \x1b[33mWelcome to Umesh\'s Terminal\x1b[0m',
    '  \x1b[90m═══════════════════════════════\x1b[0m',
    '',
    '  \x1b[90mType \x1b[36mhelp\x1b[90m to see available commands.\x1b[0m',
    '',
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, `\x1b[33m$\x1b[0m ${cmd}`];
    setHistory((prev) => [...prev, cmd]);
    setHistIdx(-1);

    if (trimmed === 'clear') {
      setLines([
        '',
        '  \x1b[33mWelcome to Umesh\'s Terminal\x1b[0m',
        '  \x1b[90m═══════════════════════════════\x1b[0m',
        '',
        '  \x1b[90mType \x1b[36mhelp\x1b[90m to see available commands.\x1b[0m',
        '',
      ]);
      return;
    }

    const matchedKey = Object.keys(commands).find(
      (k) => trimmed === k || (k === 'whoami' && (trimmed === 'who i am' || trimmed === 'whoami'))
    );

    if (matchedKey) {
      setLines([...newLines, ...commands[matchedKey].fn()]);
    } else {
      setLines([...newLines, '', `  \x1b[31mcommand not found:\x1b[0m \x1b[37m${cmd}\x1b[0m`, `  \x1b[90mType \x1b[36mhelp\x1b[90m to see available commands.\x1b[0m`, '']);
    }
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx >= 0) {
        const newIdx = histIdx + 1;
        if (newIdx >= history.length) {
          setHistIdx(-1);
          setInput('');
        } else {
          setHistIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    }
  };

  const close = () => {
    onOpenChange(false);
  };

  const toggleOpen = () => {
    onOpenChange((prev) => !prev);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  return (
    <>
      <button className="term-toggle" onClick={toggleOpen} aria-label="Toggle terminal" title="Terminal">
        <i className="fa-solid fa-terminal"></i>
      </button>

      <div className={`term-overlay ${isOpen ? 'term-overlay-open' : ''}`} onClick={close}>
        <div className={`term-window ${isOpen ? 'term-window-open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="tw-header">
            <div className="tw-dots">
              <span className="tw-dot tw-dot-close" onClick={close}></span>
              <span className="tw-dot tw-dot-min"></span>
              <span className="tw-dot tw-dot-max"></span>
            </div>
            <span className="tw-title">umesh — zsh</span>
            <div className="tw-spacer"></div>
          </div>
          <div className="tw-body">
            <div className="tw-content" ref={outputRef} data-lenis-prevent>
              {lines.map((line, i) => renderLine(line, i))}
            </div>
            <div className="tw-input-row">
              <span className="tw-prompt"><span style={{ color: '#f5c842' }}>$</span></span>
              <input
                ref={inputRef}
                type="text"
                className="tw-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                placeholder="type help"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
