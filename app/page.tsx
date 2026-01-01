"use client";

import { useState, useEffect, useRef } from "react";

// Brain rot quiz questions - add image field (optional) for each question
// To add an image, add: image: "/your-image.png" or image: "https://example.com/image.jpg"
const brainRotQuiz: {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string; // Optional image URL
}[] = [
    {
      id: "sixseven",
      question: "Complete the dialogue: 'How tall are you?' '...'",
      options: ["5'11\"", "6' 7\"", "6 foot", "I don't know"],
      correct: 1,
      explanation: "The legendary '6-7' response that broke the internet 📏",
      image: "/images/67.webp", // Add your image here
    },
    {
      id: "franklin",
      question: "In the GTA 5 lore explanation meme, what does Franklin eventually do?",
      options: [
        "Rob the casino",
        "Call Michael",
        "Show up to defend his home",
        "Hack the mainframe"
      ],
      correct: 2,
      explanation: "Franklin will eventually show up to defend his home 🏠🎮",
      image: "/images/franklin.webp", // Add your image here
    },
    {
      id: "tungtung",
      question: "Who is this?",
      options: [
        "Moo Deng",
        "Tung Tung Sahur",
        "Skibidi bop bop",
        "Clavicular"
      ],
      correct: 1,
      explanation: "TUNG TUNG TUNG TUNG TUNG TUNG TUNG TUNG SAHUR 🥁",
      image: "/images/tungtung.png", // Add your image here
    },
    {
      id: "youngboy",
      question: "Can this rapper sing?",
      options: [
        "Yes he has a glorious voice",
        "No he can't sing",
      ],
      correct: 0,
      explanation: "He is young boy the best opera singer in the world",
      image: "/images/youngboy.png", // Add your image here
    },

    {
      id: "ironmouse",
      question: "Can this rapper sing?",
      options: [
        "Yes she has a glorious voice",
        "No she can't sing",
      ],
      correct: 1,
      explanation: "No she can't sing, she's too scared",
      image: "/images/ironmouse.png", // Add your image here
    },

    {
      id: "esdeee",
      question: "Blacked out like a?",
      options: [
        "Marty Supreme",
        "phantom",
        "ts is so tuff",
        "ESDEEEEEE"
      ],
      correct: 1,
      explanation: "You're so fricking tuff twin",
      image: "/images/esdeee.jpg", // Add your image here
    },
    {
      id: "dog",
      question: "He made a statement so good his gang?",
      options: [
        "praised him",
        "went to the gym",
        "got a new job",
        "got a new car"
      ],
      correct: 0,
      explanation: "He said a statement so good his whole gang celebrated him! 💕",
      image: "/images/dog.webp", // Add your image here
    },
    {
      id: "gta6",
      question: "2026 came out before what game?",
      options: [
        "GTA 6",
        "Cyberpunk 2077",
        "The Witcher 4",
        "Elder Scrolls 6"
      ],
      correct: 0,
      explanation: "2026 came out before GTA 6 🎮",
      // image: "/images/gta6.png", // Add your image here
    },
  ];

export default function CursedNewYear() {
  // State for all our cursed features
  const [stage, setStage] = useState<"cookie" | "age" | "captcha" | "datepicker" | "tos" | "loading" | "main">("cookie");
  const [cookieScroll, setCookieScroll] = useState(0);
  const [ageVerified, setAgeVerified] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [yearError, setYearError] = useState("");
  const [tosChecked, setTosChecked] = useState(false);
  const [tosScrolled, setTosScrolled] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(100);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showClippy, setShowClippy] = useState(false);
  const [clippyMessage, setClippyMessage] = useState("");
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number }[]>([]);
  const [celebrationClicks, setCelebrationClicks] = useState(0);
  const [volumePosition, setVolumePosition] = useState({ x: 50, y: 50 });
  const [runAwayPosition, setRunAwayPosition] = useState({ x: 0, y: 0 });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [resolutionInput, setResolutionInput] = useState("");
  const [resolutions, setResolutions] = useState<string[]>([]);
  const [showResolutionReject, setShowResolutionReject] = useState(false);

  // Brain rot quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [brainRotLevel, setBrainRotLevel] = useState("");

  const tosRef = useRef<HTMLDivElement>(null);
  const celebrateButtonRef = useRef<HTMLButtonElement>(null);

  // Progress steps for unlocking the quiz
  const getStepNumber = () => {
    const steps = ["cookie", "age", "captcha", "datepicker", "tos", "loading"];
    return steps.indexOf(stage) + 1;
  };

  // Cookie consent text
  const cookieText = `
    🍪 COOKIE POLICY FOR BRAIN ROT CERTIFICATION 🍪
    
    By clicking "Accept", you agree that we may:
    
    1. Store cookies on your device for the next 2,847 years
    2. Track your brain rot levels in real-time
    3. Read your TikTok watch history (for "research purposes")
    4. Access your webcam to measure your reaction to memes
    5. Use your speakers to play "Tung Tung Sahur" at random intervals
    6. Share your brain rot score with 47,293 third-party partners
    7. Remember every meme you've ever seen
    8. Predict which brain rot content you'll consume next
    9. Calculate your compatibility with 2026 meme culture
    10. Store the exact moment your brain rotted
    
    SECTION 2: DATA RETENTION
    We retain your brain rot data until the heat death of the universe, or until you touch grass.
    
    SECTION 3: YOUR RIGHTS
    You have the right to:
    - Complain (but we won't listen)
    - Request your brain rot score (in binary)
    - Touch grass (not recommended)
    
    SECTION 4: COOKIE TYPES
    - Essential cookies (skibidi flavored)
    - Brain rot cookies (extra rotted)
    - Meme cookies (6'7" sized)
    - Surveillance cookies (Lester approved)
    
    SECTION 5: LEGAL STUFF
    This policy supersedes all previous agreements. By proceeding, you accept that your brain will be certified for rot.
    
    SCROLL DOWN TO UNLOCK THE BRAIN ROT QUIZ...
    
    Keep scrolling...
    
    Almost there...
    
    A little more...
    
    Just a bit further...
    
    Are you still reading this?
    
    Wow, dedication to brain rot!
    
    OK fine, the button is below.
  `.trim();

  // Terms of Service
  const tosText = `
    📜 TERMS OF SERVICE FOR NEW YEAR'S CELEBRATION 📜
    
    ARTICLE I: CELEBRATION REQUIREMENTS
    1.1 You must celebrate with at least 73% enthusiasm
    1.2 Confetti must be appreciated, not complained about
    1.3 You waive your right to a quiet evening
    1.4 You must pass the Brain Rot Certification Quiz
    
    ARTICLE II: COUNTDOWN OBLIGATIONS  
    2.1 You must count backwards from 10, not forwards
    2.2 "Happy New Year" must be shouted, not whispered
    2.3 Kissing at midnight is optional but heavily encouraged by our sponsors
    2.4 Screaming "TUNG TUNG TUNG SAHUR" is acceptable
    
    ARTICLE III: RESOLUTION BINDING AGREEMENT
    3.1 All resolutions made on this site are legally binding
    3.2 Failure to keep resolutions results in 52 weeks of mild disappointment
    3.3 "Lose weight" and "exercise more" are trademarked and require licensing fees
    3.4 "Touch grass" is a valid resolution
    
    ARTICLE IV: CONFETTI LIABILITY WAIVER
    4.1 We are not responsible for confetti in your keyboard
    4.2 We are not responsible for confetti in your coffee
    4.3 We are not responsible for confetti achieving sentience
    4.4 Skibidi toilets may appear in confetti
    
    ARTICLE V: FIREWORKS SAFETY DISCLAIMER
    5.1 Virtual fireworks may cause actual excitement
    5.2 Side effects include: joy, nostalgia, and existential dread about the passage of time
    5.3 Brain rot level may increase
    
    YOU MUST SCROLL TO THE BOTTOM AND CHECK THE BOX TO PROCEED...
    
    (Keep scrolling, we'll know if you didn't read it all)
    
    ...
    
    ...
    
    ...
    
    Still here? Great! The checkbox awaits below!
  `.trim();

  // Clippy messages with brain rot
  const clippyMessages = [
    "It looks like you're trying to celebrate New Year's! Would you like help with that?",
    "Did you know? 2026 is just 2025's New Game+",
    "I see you haven't made any resolutions yet. That's statistically the best way to keep them!",
    "Fun fact: The ball drop in Times Square weighs 11,875 pounds. That's a lot of disco balls!",
    "Would you like me to remind you of your failed 2025 resolutions?",
    "TUNG TUNG TUNG TUNG TUNG TUNG TUNG TUNG SAHUR 🥁",
    "How tall are you? ... 6' 7\" 📏",
    "Very demure, very mindful, very celebration 💅",
    "Lester will eventually show up to defend his home 🏠",
    "Skibidi dop dop dop yes yes 🚽",
    "Your brain rot level has increased! 🧠💀",
  ];

  // Calculate countdown to 2026
  useEffect(() => {
    if (stage !== "main") return;

    const target = new Date("2026-01-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  // Spawn confetti
  useEffect(() => {
    if (stage !== "main") return;

    const spawnConfetti = () => {
      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
      const newConfetti = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
      }));
      setConfetti(prev => [...prev, ...newConfetti]);

      // Remove old confetti
      setTimeout(() => {
        setConfetti(prev => prev.filter(c => !newConfetti.find(n => n.id === c.id)));
      }, 5000);
    };

    const interval = setInterval(spawnConfetti, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Show Clippy randomly
  useEffect(() => {
    if (stage !== "main") return;

    const showClippyTimeout = setTimeout(() => {
      setClippyMessage(clippyMessages[Math.floor(Math.random() * clippyMessages.length)]);
      setShowClippy(true);
    }, 5000);

    const interval = setInterval(() => {
      setClippyMessage(clippyMessages[Math.floor(Math.random() * clippyMessages.length)]);
      setShowClippy(true);
    }, 30000);

    return () => {
      clearTimeout(showClippyTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Exit intent popup
  useEffect(() => {
    if (stage !== "main") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [stage]);

  // Newsletter popup
  useEffect(() => {
    if (stage !== "main") return;

    const timeout = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 15000);

    return () => clearTimeout(timeout);
  }, [stage]);

  // Handle run-away button
  const handleCelebrateHover = () => {
    if (celebrationClicks < 5) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 200;
      setRunAwayPosition({ x, y });
    }
  };

  // Loading bar that goes backwards
  useEffect(() => {
    if (stage !== "loading") return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev <= 0) {
          setStage("main");
          return 0;
        }
        // Sometimes go backwards
        if (Math.random() < 0.01) {
          return Math.min(100, prev + 5);
        }
        return prev - 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [stage]);

  // Check TOS scroll position
  const handleTosScroll = () => {
    if (tosRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tosRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setTosScrolled(true);
      }
    }
  };

  // Validate year input (must be spelled out)
  const validateYearInput = () => {
    const normalized = yearInput.toLowerCase().trim();
    const valid = [
      "two thousand twenty six",
      "two thousand and twenty six",
      "twenty twenty six",
      "two thousand twenty-six",
      "2026",
    ];

    if (normalized === "2026") {
      setYearError("Nice try! But you must SPELL OUT the year in WORDS. No numbers allowed!");
      return false;
    }

    if (valid.some(v => normalized.includes(v.replace("-", " ")) || normalized === v)) {
      setYearError("");
      return true;
    }

    setYearError("Incorrect! Please type the year 2026 in WORDS (e.g., 'two thousand twenty six')");
    return false;
  };

  // Handle resolution submission with rejection
  const handleResolutionSubmit = () => {
    if (resolutionInput.trim()) {
      setShowResolutionReject(true);
    }
  };

  const acceptResolution = () => {
    setResolutions([...resolutions, resolutionInput]);
    setResolutionInput("");
    setShowResolutionReject(false);
  };

  // Quiz functions
  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswerFeedback(true);

    setTimeout(() => {
      setQuizAnswers([...quizAnswers, answerIndex]);
      setSelectedAnswer(null);
      setShowAnswerFeedback(false);

      if (currentQuestion < brainRotQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate results
        const correct = quizAnswers.filter((a, i) => a === brainRotQuiz[i].correct).length +
          (answerIndex === brainRotQuiz[currentQuestion].correct ? 1 : 0);
        const percentage = (correct / brainRotQuiz.length) * 100;

        if (percentage >= 80) {
          setBrainRotLevel("🧠💀 TERMINAL BRAIN ROT - You are chronically online and ready for 2026!");
        } else if (percentage >= 60) {
          setBrainRotLevel("🧠😵 SEVERE BRAIN ROT - Your For You Page has corrupted your mind!");
        } else if (percentage >= 40) {
          setBrainRotLevel("🧠😰 MODERATE BRAIN ROT - You've touched grass recently but not enough!");
        } else if (percentage >= 20) {
          setBrainRotLevel("🧠🤔 MILD BRAIN ROT - Are you sure you were on the internet in 2025?");
        } else {
          setBrainRotLevel("🧠✨ BRAIN ROT FREE - Touch grass? No, you ARE the grass!");
        }

        setShowQuizResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setQuizAnswers([]);
    setShowQuizResult(false);
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
    setBrainRotLevel("");
  };

  // Render different stages
  // Progress bar component for unlocking steps
  const ProgressBar = () => (
    <div className="mb-4">
      <p className="text-center text-yellow-300 text-sm mb-2 comic-sans">
        🔓 UNLOCKING BRAIN ROT QUIZ: Step {getStepNumber()} of 6
      </p>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${(getStepNumber() / 6) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderCookieConsent = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-lg max-w-2xl w-full construction-border">
        <div className="bg-white p-6 rounded-lg">
          <div className="bg-purple-900 rounded-lg p-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-300 comic-sans cursed-shadow">
              🧠 2026 BRAIN ROT CERTIFICATION 🧠
            </h1>
            <p className="text-center text-pink-300 text-sm mt-2">
              Complete the verification to unlock the ultimate brain rot quiz!
            </p>
            <ProgressBar />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-600 comic-sans">
            🍪 Step 1: Cookie Consent 🍪
          </h2>
          <div
            className="h-48 overflow-y-auto bg-gradient-to-b from-yellow-100 to-pink-100 p-4 border-4 border-dashed border-purple-500 text-black whitespace-pre-wrap comic-sans text-sm"
            onScroll={(e) => setCookieScroll((e.target as HTMLDivElement).scrollTop)}
          >
            {cookieText}
          </div>
          <div className="mt-4 flex flex-col items-center gap-4">
            <p className="text-red-500 blink font-bold text-sm">
              ⬇️ SCROLL TO UNLOCK ⬇️
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => cookieScroll > 800 && setStage("age")}
                disabled={cookieScroll < 800}
                className={`px-8 py-3 rounded-lg font-bold text-xl transition-all ${cookieScroll > 800
                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                ✅ Accept & Continue
              </button>
              <button
                onClick={() => alert("THERE IS NO ESCAPE FROM BRAIN ROT 🧠💀")}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-xl"
              >
                ❌ Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgeVerification = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-r from-cyan-400 to-yellow-400 p-1 rounded-lg max-w-md w-full">
        <div className="bg-purple-900 p-8 rounded-lg text-center">
          <ProgressBar />
          <h2 className="text-2xl font-bold text-yellow-300 mb-4 comic-sans">
            🔞 Step 2: Age Verification 🔞
          </h2>
          <p className="text-white mb-6 comic-sans">
            Are you old enough to have experienced brain rot?
          </p>
          <div className="grid gap-3">
            <button
              onClick={() => setStage("captcha")}
              className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105"
            >
              ✅ Yes, my brain is thoroughly rotted
            </button>
            <button
              onClick={() => setStage("captcha")}
              className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105"
            >
              ✅ Yes, I know what Skibidi means
            </button>
            <button
              onClick={() => setStage("captcha")}
              className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105"
            >
              ✅ Yes, I&apos;ve seen the Tung Tung Sahur
            </button>
            <button
              onClick={() => alert("IMPOSSIBLE. Everyone has brain rot. Try again.")}
              className="w-full p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold text-lg transition-all"
            >
              ❌ No, I touch grass regularly
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCaptcha = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full border-8 border-blue-500">
        <div className="bg-purple-900 rounded-lg p-3 mb-4">
          <ProgressBar />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 comic-sans">
          🤖 Step 3: Human Verification 🤖
        </h2>
        <p className="text-gray-600 mb-4 text-center comic-sans">
          Prove you&apos;re not a bot trying to steal brain rot:
        </p>
        <div className="bg-gray-100 p-6 rounded-lg text-center mb-4">
          <p className="text-xl font-mono text-purple-600 font-bold">
            What is 2025 + 1?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Hint: It&apos;s the year we&apos;re celebrating)
          </p>
        </div>
        <input
          type="text"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full p-4 rounded-lg text-center text-xl mb-4"
        />
        <button
          onClick={() => {
            if (captchaAnswer.trim() === "2026") {
              setStage("datepicker");
            } else {
              alert("WRONG! Are you sure you're not a robot? 🤖");
            }
          }}
          className="w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-xl"
        >
          VERIFY I&apos;M HUMAN
        </button>
      </div>
    </div>
  );

  const renderDatePicker = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-400 to-blue-500 p-1 rounded-lg max-w-lg w-full">
        <div className="bg-gray-900 p-8 rounded-lg text-center">
          <ProgressBar />
          <h2 className="text-2xl font-bold text-green-400 mb-4 comic-sans">
            📅 Step 4: Year Confirmation 📅
          </h2>
          <p className="text-white mb-4 comic-sans">
            Type the year we&apos;re celebrating IN WORDS:
          </p>
          <div className="bg-yellow-300 p-3 rounded-lg mb-4 text-black">
            <p className="font-bold text-sm">⚠️ NO NUMBERS ALLOWED ⚠️</p>
          </div>
          <input
            type="text"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            placeholder="e.g. two thousand twenty six"
            className="w-full p-4 rounded-lg text-center text-xl mb-2"
          />
          {yearError && (
            <p className="text-red-400 mb-4 font-bold text-sm">{yearError}</p>
          )}
          <button
            onClick={() => {
              if (validateYearInput()) {
                setStage("tos");
              }
            }}
            className="w-full px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-xl mt-4"
          >
            SUBMIT YEAR
          </button>
        </div>
      </div>
    </div>
  );

  const renderTOS = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="bg-purple-900 rounded-lg p-3 mb-4">
          <ProgressBar />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-red-600 comic-sans">
          📜 Step 5: Terms of Brain Rot 📜
        </h2>
        <div
          ref={tosRef}
          onScroll={handleTosScroll}
          className="h-48 overflow-y-auto bg-yellow-50 p-4 border-4 border-red-500 text-black whitespace-pre-wrap comic-sans text-sm"
        >
          {tosText}
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-3 cursor-pointer justify-center">
            <input
              type="checkbox"
              checked={tosChecked}
              onChange={(e) => tosScrolled && setTosChecked(e.target.checked)}
              disabled={!tosScrolled}
              className="w-6 h-6"
            />
            <span className={`comic-sans text-sm ${tosScrolled ? "text-black" : "text-gray-400"}`}>
              I accept responsibility for my brain rot
            </span>
          </label>
          {!tosScrolled && (
            <p className="text-red-500 text-center mt-2 text-sm">
              ⬇️ Scroll to unlock ⬇️
            </p>
          )}
        </div>
        <button
          onClick={() => tosChecked && setStage("loading")}
          disabled={!tosChecked}
          className={`w-full mt-4 px-8 py-3 rounded-lg font-bold text-xl ${tosChecked
            ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          UNLOCK BRAIN ROT QUIZ
        </button>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 comic-sans cursed-shadow text-center">
        🧠 UNLOCKING BRAIN ROT QUIZ 🧠
      </h2>
      <p className="text-yellow-300 mb-6 text-center comic-sans">
        Step 6 of 6: Final Preparation
      </p>
      <div className="w-full max-w-lg bg-gray-700 rounded-full h-8 overflow-hidden border-4 border-yellow-400">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-100"
          style={{ width: `${100 - loadingProgress}%` }}
        />
      </div>
      <p className="text-white mt-4 text-xl comic-sans">
        {loadingProgress > 50 ? "Calibrating brain rot detector..." :
          loadingProgress > 25 ? "Loading meme database..." :
            loadingProgress > 10 ? "Preparing quiz questions..." :
              "Almost unlocked!"}
      </p>
      <p className="text-pink-400 mt-2 text-sm">
        {100 - loadingProgress}% complete (may occasionally regress)
      </p>
    </div>
  );

  const renderBrainRotQuiz = () => {
    const question = brainRotQuiz[currentQuestion];

    if (showQuizResult) {
      const correct = quizAnswers.filter((a, i) => a === brainRotQuiz[i].correct).length;
      return (
        <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-lg p-6 mb-8 border-4 border-yellow-400">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6 comic-sans cursed-shadow">
            🧠 BRAIN ROT CERTIFICATION RESULTS 🧠
          </h2>
          <div className="text-center">
            <p className="text-6xl mb-4">{correct >= 6 ? "🏆" : correct >= 4 ? "🥈" : "💀"}</p>
            <p className="text-2xl text-white mb-4">
              You got <span className="text-yellow-300 font-bold">{correct}/{brainRotQuiz.length}</span> correct!
            </p>
            <p className="text-xl text-pink-300 mb-6 comic-sans">
              {brainRotLevel}
            </p>
            <button
              onClick={resetQuiz}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-lg text-xl hover:scale-105 transition-transform"
            >
              🔄 Take Quiz Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-lg p-6 mb-8 border-4 border-yellow-400">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-2 comic-sans">
          🧠 BRAIN ROT CERTIFICATION QUIZ 🧠
        </h2>
        <p className="text-center text-pink-300 mb-4 text-sm">
          Prove you&apos;re ready for 2026 by identifying these 2024-2025 memes!
        </p>

        <div className="bg-black/50 rounded-lg p-4 mb-4">
          <p className="text-gray-400 text-sm mb-2">Question {currentQuestion + 1} of {brainRotQuiz.length}</p>
          <p className="text-xl text-white font-bold comic-sans">{question.question}</p>
          {question.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={question.image}
                alt="Quiz question image"
                className="max-w-full max-h-64 rounded-lg border-4 border-yellow-400 object-contain"
              />
            </div>
          )}
        </div>

        <div className="grid gap-3">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === question.correct;
            const showFeedback = showAnswerFeedback && isSelected;

            return (
              <button
                key={i}
                onClick={() => !showAnswerFeedback && handleQuizAnswer(i)}
                disabled={showAnswerFeedback}
                className={`p-4 rounded-lg text-left font-bold transition-all ${showFeedback
                  ? isCorrect
                    ? "bg-green-500 text-white scale-105"
                    : "bg-red-500 text-white shake"
                  : showAnswerFeedback && isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-white/90 text-gray-800 hover:bg-yellow-300 hover:scale-102"
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showAnswerFeedback && (
          <div className={`mt-4 p-4 rounded-lg text-center ${selectedAnswer === question.correct ? "bg-green-500/50" : "bg-red-500/50"
            }`}>
            <p className="text-white font-bold">
              {selectedAnswer === question.correct ? "✅ CORRECT!" : "❌ WRONG!"}
            </p>
            <p className="text-yellow-300 text-sm mt-2">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const renderMain = () => (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti text-4xl"
          style={{
            left: `${c.left}%`,
            top: "-50px",
            animationDuration: `${3 + c.delay}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {["🎊", "🎉", "✨", "🎆", "🎇", "🥳"][Math.floor(Math.random() * 6)]}
        </div>
      ))}

      {/* Marquee */}
      <div className="bg-red-600 text-yellow-300 py-2 text-xl font-bold overflow-hidden whitespace-nowrap">
        <div className="marquee inline-block">
          🎉🎊 HAPPY NEW YEAR 2026!!! 🎊🎉 GOODBYE 2025!!! 🚀 TUNG TUNG TUNG SAHUR!!! 🥁 THIS WEBSITE HAS BEEN VISITED BY {Math.floor(Math.random() * 9999999) + 1000000} PEOPLE!!! 🎉🎊 LESTER WILL DEFEND HIS HOME!!! 🏠 67!!! 📏
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center cursed-shadow papyrus text-white mb-4 bounce">
          🧠 BRAIN ROT CERTIFICATION 🧠
        </h1>
        <p className="text-center text-yellow-300 text-xl mb-2 comic-sans">
          New Year 2026 Edition
        </p>
        <p className="text-center text-pink-300 mb-8 comic-sans">
          How rotted is your brain? Find out below! 💀
        </p>

        {/* Countdown */}
        <div className="bg-black/50 rounded-lg p-6 mb-8 border-8 border-yellow-400 construction-border">
          <h2 className="text-2xl text-center text-yellow-300 mb-4 comic-sans">
            ⏰ COUNTDOWN TO 2026 (in your probably wrong timezone) ⏰
          </h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINS" },
              { value: countdown.seconds, label: "SECS" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-purple-600 to-pink-600 rounded-lg p-4">
                <div className="text-5xl md:text-6xl font-bold text-white spin" style={{ animationDuration: `${10 + i * 5}s` }}>
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-yellow-300 font-bold mt-2 comic-sans">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brain Rot Quiz Section - Main Feature! */}
        {!quizStarted ? (
          <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-lg p-6 mb-8 border-4 border-yellow-400 text-center">
            <div className="text-6xl mb-4">🎉🧠🎉</div>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4 comic-sans cursed-shadow">
              QUIZ UNLOCKED!
            </h2>
            <p className="text-white mb-4 text-lg">
              You survived the verification gauntlet!
            </p>
            <p className="text-pink-300 mb-6">
              Now prove your brain rot level with {brainRotQuiz.length} questions about 2024-2025 memes!
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-lg text-xl hover:scale-105 transition-transform"
            >
              🎮 BEGIN CERTIFICATION 🎮
            </button>
          </div>
        ) : (
          renderBrainRotQuiz()
        )}

        {/* Celebrate button that runs away */}
        <div className="text-center mb-8 h-32 relative">
          <button
            ref={celebrateButtonRef}
            onMouseEnter={handleCelebrateHover}
            onClick={() => {
              setCelebrationClicks(prev => prev + 1);
              if (celebrationClicks >= 4) {
                alert("🎉🎊 CONGRATULATIONS! YOU CAUGHT THE BUTTON! 🎊🎉\n\nYou've unlocked: MAXIMUM BRAIN ROT MODE!\n\nTUNG TUNG TUNG TUNG SAHUR!!!");
                setRunAwayPosition({ x: 0, y: 0 });
              }
            }}
            className="absolute left-1/2 top-1/2 px-12 py-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white text-2xl font-bold rounded-full transition-all duration-100 comic-sans hover:scale-110"
            style={{
              transform: `translate(calc(-50% + ${runAwayPosition.x}px), calc(-50% + ${runAwayPosition.y}px))`,
            }}
          >
            🎉 CLICK TO CELEBRATE! 🎉
          </button>
          {celebrationClicks < 5 && celebrationClicks > 0 && (
            <p className="absolute bottom-0 left-0 right-0 text-white comic-sans">
              Attempts: {celebrationClicks}/5 (the button is scared of you)
            </p>
          )}
        </div>

        {/* Resolution input with rejection */}
        <div className="bg-white/90 rounded-lg p-6 mb-8 slight-rotate-neg">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-4 comic-sans">
            📝 SUBMIT YOUR 2026 RESOLUTION 📝
          </h2>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              value={resolutionInput}
              onChange={(e) => setResolutionInput(e.target.value)}
              placeholder="Type your resolution here... (touching grass is valid)"
              className="flex-1 p-4 rounded-lg min-w-64"
            />
            <button
              onClick={handleResolutionSubmit}
              className="px-6 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
            >
              SUBMIT
            </button>
          </div>
          {resolutions.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-green-600">Your resolutions (legally binding):</p>
              <ul className="list-disc list-inside text-gray-700">
                {resolutions.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Volume slider */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-center text-white mb-4 comic-sans">
            🔊 CELEBRATION VOLUME SLIDER 🔊
          </h2>
          <p className="text-yellow-300 text-center mb-4 text-sm">
            (Drag the slider through the maze to set volume)
          </p>
          <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-yellow-500">
            {/* Maze walls */}
            <div className="absolute top-0 left-1/4 w-2 h-3/4 bg-red-500"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-3/4 bg-red-500"></div>
            <div className="absolute top-0 left-3/4 w-2 h-3/4 bg-red-500"></div>
            {/* Slider ball */}
            <div
              className="absolute w-8 h-8 bg-yellow-400 rounded-full cursor-grab flex items-center justify-center text-xl"
              style={{ left: `${volumePosition.x}%`, top: `${volumePosition.y}%` }}
              draggable
              onDrag={(e) => {
                if (e.clientX === 0) return;
                const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                if (rect) {
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setVolumePosition({ x: Math.max(0, Math.min(95, x)), y: Math.max(0, Math.min(85, y)) });
                }
              }}
            >
              🔈
            </div>
          </div>
          <p className="text-white text-center mt-2">
            Current volume: {Math.floor(volumePosition.x)}%
          </p>
        </div>

        {/* Visitor counter */}
        <div className="text-center mb-8">
          <div className="inline-block visitor-counter text-xl">
            You are visitor #00{Math.floor(Math.random() * 99999) + 10000}
          </div>
        </div>

        {/* Under construction */}
        <div className="text-center text-white comic-sans">
          <p className="text-xl blink">🚧 THIS SITE IS ALWAYS UNDER CONSTRUCTION 🚧</p>
          <p className="text-sm mt-2">Best viewed in Internet Explorer 6 at 800x600 resolution</p>
          <p className="text-sm mt-2 text-yellow-300">Now with 100% more brain rot! 🧠💀</p>
          <p className="text-xs mt-4">© 2025-2026 Cursed New Year Inc. All rights reserved. Lester approved. 6-7 certified.</p>
        </div>
      </div>

      {/* Resolution rejection popup */}
      {showResolutionReject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-center shake-subtle">
            <h3 className="text-2xl font-bold text-red-600 mb-4 comic-sans">⚠️ ARE YOU SURE? ⚠️</h3>
            <p className="text-gray-700 mb-4">
              You want to commit to: <strong>&quot;{resolutionInput}&quot;</strong>?
            </p>
            <p className="text-red-500 mb-6">
              Statistics show 67% of resolutions fail. Are you ready to be disappointed?
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={acceptResolution}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg"
              >
                Yes, I&apos;m optimistic
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to cancel? This will delete your resolution.")) {
                    if (confirm("Really really sure?")) {
                      if (confirm("Last chance! Final answer?")) {
                        setShowResolutionReject(false);
                        setResolutionInput("");
                      }
                    }
                  }
                }}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg"
              >
                No, I give up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clippy */}
      {showClippy && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-yellow-100 border-2 border-gray-400 rounded-lg p-4 max-w-xs shadow-lg relative">
            <button
              onClick={() => setShowClippy(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm font-bold"
            >
              X
            </button>
            <div className="flex gap-3 items-start">
              <span className="text-4xl">📎</span>
              <p className="text-gray-700 text-sm comic-sans">{clippyMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Exit popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 popup-overlay">
          <div className="bg-gradient-to-br from-red-500 to-pink-500 p-1 rounded-lg max-w-md w-full">
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-red-600 mb-4 comic-sans shake-subtle">
                🚨 WAIT!!! 🚨
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Are you REALLY going to leave before 2026?!
              </p>
              <p className="text-gray-600 mb-6">
                If you leave now, you&apos;ll miss:
              </p>
              <ul className="text-left text-gray-600 mb-6 list-disc list-inside">
                <li>Confetti (it&apos;s free!)</li>
                <li>The countdown (very exciting!)</li>
                <li>Brain rot certification</li>
                <li>TUNG TUNG TUNG SAHUR</li>
              </ul>
              <button
                onClick={() => setShowExitPopup(false)}
                className="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg text-xl mb-3"
              >
                STAY AND CELEBRATE! 🎉
              </button>
              <button
                onClick={() => {
                  alert("Fine, but 2026 will remember this betrayal. Lester is disappointed.");
                  setShowExitPopup(false);
                }}
                className="w-full px-6 py-2 bg-gray-300 text-gray-600 rounded-lg text-sm"
              >
                Leave anyway (Lester disapproves)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter popup */}
      {showNewsletterPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-center slight-rotate">
            <h3 className="text-2xl font-bold text-purple-600 mb-4 comic-sans">
              📧 SUBSCRIBE TO OUR NEWSLETTER! 📧
            </h3>
            <p className="text-gray-600 mb-4">
              Get daily brain rot updates and resolution failure reminders!
              <br />
              <span className="text-xs">(100% skibidi content guaranteed)</span>
            </p>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your-real-email@definitely.com"
              className="w-full p-4 rounded-lg mb-4"
            />
            <button
              onClick={() => {
                alert("Thanks! You'll receive 47 brain rot memes per day starting now!\n\nTUNG TUNG TUNG SAHUR!!!");
                setShowNewsletterPopup(false);
              }}
              className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg mb-3"
            >
              SIGN ME UP FOR BRAIN ROT!
            </button>
            <button
              onClick={() => setShowNewsletterPopup(false)}
              className="text-gray-400 text-xs hover:text-gray-600"
            >
              No thanks, I touch grass
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {stage === "cookie" && renderCookieConsent()}
      {stage === "age" && renderAgeVerification()}
      {stage === "captcha" && renderCaptcha()}
      {stage === "datepicker" && renderDatePicker()}
      {stage === "tos" && renderTOS()}
      {stage === "loading" && renderLoading()}
      {stage === "main" && renderMain()}
    </>
  );
}
