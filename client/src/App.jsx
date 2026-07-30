import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getDecision, getQuestions } from './api';
import './styles.css';

const initialOptions = { optionA: '', optionB: '' };

function VideoBackground({ src }) {
  const videoRef = useRef(null);
  const opacityRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setOpacity = (value) => {
      opacityRef.current = value;
      if (videoRef.current) videoRef.current.style.opacity = value;
    };

    const fadeTo = (target, duration = 700) => {
      const start = opacityRef.current;
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        setOpacity(start + (target - start) * t);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onCanPlay = () => {
      video.play().catch(() => {});
      fadeTo(1);
    };

    video.addEventListener('canplay', onCanPlay);
    return () => {
      video.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      style={{ opacity: 0 }}
      className="bg-video"
    />
  );
}

function App() {
  const [step, setStep] = useState('options');
  const [options, setOptions] = useState(initialOptions);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoMode, setDemoMode] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  useEffect(() => {
    if (step === 'questions' && textareaRef.current) {
      textareaRef.current.focus({ preventScroll: true });
    }
  }, [step, questionIndex]);

  const currentAnswer = answers[questionIndex] || '';
  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;

  const recommendationLabel = useMemo(() => {
    if (!result) return '';
    return result.finalRecommendation === 'A' ? options.optionA : options.optionB;
  }, [result, options]);

  const updateOption = (key, value) => {
    setOptions((current) => ({ ...current, [key]: value }));
    setError('');
  };

  async function beginDecision(event) {
    event.preventDefault();
    if (options.optionA.trim().length < 2 || options.optionB.trim().length < 2) {
      setError('Enter two clear options first.');
      return;
    }
    if (options.optionA.trim().toLowerCase() === options.optionB.trim().toLowerCase()) {
      setError('Your two options need to be different.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getQuestions(options.optionA.trim(), options.optionB.trim());
      setQuestions(data.questions);
      setAnswers(Array(data.questions.length).fill(''));
      setQuestionIndex(0);
      setDemoMode(Boolean(data.demoMode));
      setStep('questions');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function setAnswer(value) {
    setAnswers((current) => current.map((answer, index) => index === questionIndex ? value : answer));
    setError('');
  }

  async function nextQuestion() {
    if (!currentAnswer.trim()) {
      setError('Write an answer, or type “Not sure”.');
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const payload = {
        ...options,
        answers: questions.map((question, index) => ({ question, answer: answers[index] })),
      };
      const data = await getDecision(payload);
      setResult(data.result);
      setDemoMode(Boolean(data.demoMode));
      setStep('result');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep('options');
    setOptions(initialOptions);
    setQuestions([]);
    setAnswers([]);
    setResult(null);
    setQuestionIndex(0);
    setError('');
    setDemoMode(false);
  }

  return (
    <main className="app-shell">
      <VideoBackground src="/videos/bg.mp4" />
      <div className="bg-wash" />

      <header className="brand-bar">
        <button className="brand" onClick={reset} aria-label="Return home">
          <span className="brand-mark">↗</span>
          <span>Between Two</span>
        </button>
        <span className="brand-note">Logic meets instinct</span>
      </header>

      <AnimatePresence mode="wait">
        {step === 'options' && (
          <motion.section key="options" className="screen hero-screen" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="eyebrow">AI decision coach</div>
            <h1>Stuck between<br /><em>two choices?</em></h1>
            <p className="intro">Answer five questions, one at a time, no pressure. We'll separate the practical from the emotional and leave you with a single clear choice.</p>

            <form className="option-form" onSubmit={beginDecision}>
              <label className="option-field option-a">
                <span className="option-tag">A</span>
                <span className="label-copy">First option</span>
                <input value={options.optionA} onChange={(event) => updateOption('optionA', event.target.value)} placeholder="e.g. Buy the laptop now" maxLength="120" />
              </label>
              <div className="versus">or</div>
              <label className="option-field option-b">
                <span className="option-tag">B</span>
                <span className="label-copy">Second option</span>
                <input value={options.optionB} onChange={(event) => updateOption('optionB', event.target.value)} placeholder="e.g. Wait for a better deal" maxLength="120" />
              </label>
              {error && <p className="error-message">{error}</p>}
              <button className="primary-button" disabled={loading}>{loading ? 'Preparing your questions…' : 'Help me decide'}<span>→</span></button>
            </form>
          </motion.section>
        )}

        {step === 'questions' && (
          <motion.section key="questions" className="screen question-screen" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="decision-mini">
              <span><b>A</b>{options.optionA}</span><i>vs</i><span><b>B</b>{options.optionB}</span>
            </div>
            <div className="progress-row"><span>Question {questionIndex + 1} of {questions.length}</span><span>{Math.round(progress)}%</span></div>
            <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${progress}%` }} /></div>

            <AnimatePresence mode="wait">
              <motion.div key={questionIndex} className="question-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <span className="question-number">0{questionIndex + 1}</span>
                <h2>{questions[questionIndex]}</h2>
                <textarea ref={textareaRef} value={currentAnswer} onChange={(event) => setAnswer(event.target.value)} placeholder="Be honest—there is no perfect answer." maxLength="1000" />
                <div className="answer-hint"><span>{currentAnswer.length}/1000</span><button type="button" onClick={() => setAnswer('Not sure')}>I’m not sure</button></div>
              </motion.div>
            </AnimatePresence>

            {error && <p className="error-message centered">{error}</p>}
            <div className="question-actions">
              <button className="secondary-button" disabled={questionIndex === 0 || loading} onClick={() => setQuestionIndex((index) => index - 1)}>← Back</button>
              <button className="primary-button compact" disabled={loading} onClick={nextQuestion}>{loading ? 'Thinking…' : questionIndex === questions.length - 1 ? 'Get my decision' : 'Next question'}<span>→</span></button>
            </div>
          </motion.section>
        )}

        {step === 'result' && result && (
          <motion.section key="result" className="screen result-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="eyebrow">Your decision</div>
            <h1 className="result-title">Choose <em>{recommendationLabel}</em></h1>
            <p className="clarity-line">Decision clarity <strong>{Math.round(result.confidence)}%</strong></p>
            <div className="clarity-track"><motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} transition={{ duration: 0.9 }} /></div>

            <div className="score-grid">
              <ScoreCard title="Logic" icon="⌁" score={result.logicScore} winner={result.logicWinner} options={options} />
              <ScoreCard title="Heart" icon="♡" score={result.heartScore} winner={result.heartWinner} options={options} />
            </div>

            <article className="reason-card">
              <span className="section-label">Why this choice</span>
              <p>{result.reasoning}</p>
            </article>

            <div className="detail-grid">
              <article className="detail-card"><span className="section-label">The trade-off</span><p>{result.tradeoff}</p></article>
              <article className="detail-card"><span className="section-label">Keep in mind</span><ul>{result.thingsToConsider.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>

            {result.safetyNote && <aside className="safety-note"><strong>Important:</strong> {result.safetyNote}</aside>}
            {demoMode && <aside className="demo-note">Demo mode is active. Add a Groq API key to the server for personalised AI analysis.</aside>}

            <button className="primary-button restart" onClick={reset}>Make another decision <span>↻</span></button>
          </motion.section>
        )}
      </AnimatePresence>

      <footer>Built for thoughtful choices—not perfect certainty.</footer>
    </main>
  );
}

function ScoreCard({ title, icon, score, winner, options }) {
  const winnerLabel = winner === 'A' ? options.optionA : options.optionB;
  return (
    <motion.article className="score-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: title === 'Heart' ? 0.18 : 0.06 }}>
      <div className="score-heading"><span>{icon}</span><div><small>{title} winner</small><h3>{winnerLabel}</h3></div></div>
      <div className="score-comparison">
        <ScoreLine label="A" value={score.A} active={winner === 'A'} />
        <ScoreLine label="B" value={score.B} active={winner === 'B'} />
      </div>
    </motion.article>
  );
}

function ScoreLine({ label, value, active }) {
  return <div className={`score-line ${active ? 'active' : ''}`}><span>{label}</span><div><i style={{ width: `${value * 10}%` }} /></div><strong>{value}/10</strong></div>;
}

export default App;