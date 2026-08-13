import React, { useState, useEffect, useRef } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiUser,
  FiCpu,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiX,
  FiAward,
  FiCheck,
  FiMic,
  FiMicOff,
  FiZap,
  FiTrendingUp,
  FiArrowRight,
  FiRotateCcw,
  FiVideo,
  FiVideoOff,
  FiVolume2,
  FiShield,
  FiActivity,
  FiEye,
  FiAlertTriangle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

/* ─── Interfaces ─── */
interface CategoryScore {
  name: string;
  score: number;
}

interface IntegrityMetric {
  cameraAvailability: number;
  personPresence: number;
  sessionConsistency: number;
  potentialAssistance: "Low" | "Moderate" | "High";
  confidenceScore: number;
  statusText: string;
  timeline: { time: string; event: string }[];
}

interface MockRecord {
  id: string;
  type: "professor" | "ai";
  title: string;
  interviewerOrModel: string;
  facultyDesignation?: string;
  role: string;
  date: string;
  score: number;
  status: "COMPLETED";
  summary: string;
  categories: CategoryScore[];
  strengths: string[];
  improvements: string[];
  integrity: IntegrityMetric;
}

/* ─── 4 Realistic Sample Records with Integrity Metrics ─── */
const sampleRecords: MockRecord[] = [
  {
    id: "mock-1",
    type: "professor",
    title: "Technical Mock with Prof. Priya Patel",
    interviewerOrModel: "Prof. Priya Patel",
    facultyDesignation: "Senior Technical Faculty",
    role: "Software Engineering Role",
    date: "Aug 10, 2026",
    score: 82,
    status: "COMPLETED",
    summary:
      "Strong fundamentals in Data Structures, Algorithms, and System Design. Communicated complex reasoning clearly and demonstrated solid analytical thinking under pressure.",
    categories: [
      { name: "Problem Solving", score: 86 },
      { name: "Technical Knowledge", score: 84 },
      { name: "Answer Quality", score: 82 },
      { name: "Confidence", score: 80 },
      { name: "Communication", score: 78 },
    ],
    strengths: [
      "Strong technical fundamentals",
      "Good problem-solving approach",
      "Clear explanation of projects",
    ],
    improvements: [
      "Structure answers more clearly",
      "Improve communication",
      "Use STAR framework for behavioral questions",
    ],
    integrity: {
      confidenceScore: 92,
      statusText: "No major external-assistance indicators detected.",
      cameraAvailability: 98,
      personPresence: 96,
      sessionConsistency: 94,
      potentialAssistance: "Low",
      timeline: [
        { time: "10:02 AM", event: "Camera active & candidate presence verified" },
        { time: "10:07 AM", event: "Single candidate in frame, no anomalies detected" },
        { time: "10:13 AM", event: "Audio synchronization and eye-focus consistent" },
        { time: "10:18 AM", event: "No external-assistance indicator observed" },
        { time: "10:24 AM", event: "Session concluded with standard high consistency" },
      ],
    },
  },
  {
    id: "mock-2",
    type: "ai",
    title: "AI Mock - Technical SDE",
    interviewerOrModel: "GCU AI Placement Evaluator",
    role: "Full Stack SDE Role",
    date: "Aug 8, 2026",
    score: 76,
    status: "COMPLETED",
    summary:
      "You're performing well overall. Your technical foundations are solid, but focusing on clearer communication and structuring your answers will improve your placement readiness.",
    categories: [
      { name: "Problem Solving", score: 80 },
      { name: "Technical Knowledge", score: 78 },
      { name: "Answer Quality", score: 76 },
      { name: "Confidence", score: 74 },
      { name: "Communication", score: 72 },
    ],
    strengths: [
      "Strong technical fundamentals",
      "Good problem-solving approach",
      "Clear explanation of projects",
    ],
    improvements: [
      "Structure answers more clearly",
      "Improve communication",
      "Use STAR framework for behavioral questions",
    ],
    integrity: {
      confidenceScore: 95,
      statusText: "No major external-assistance indicators detected.",
      cameraAvailability: 99,
      personPresence: 97,
      sessionConsistency: 96,
      potentialAssistance: "Low",
      timeline: [
        { time: "02:15 PM", event: "Camera active and calibrated" },
        { time: "02:20 PM", event: "Single speaker voice pattern matched" },
        { time: "02:28 PM", event: "Continuous candidate presence maintained" },
        { time: "02:35 PM", event: "No browser focus loss or external audio" },
        { time: "02:42 PM", event: "Session completed with high integrity" },
      ],
    },
  },
  {
    id: "mock-3",
    type: "professor",
    title: "HR Mock with Prof. Rahul Sharma",
    interviewerOrModel: "Prof. Rahul Sharma",
    facultyDesignation: "Dean of Placement Training",
    role: "Behavioral & Culture Fit",
    date: "Aug 5, 2026",
    score: 88,
    status: "COMPLETED",
    summary:
      "Excellent narrative structure for project storytelling. High cultural awareness and demonstrated genuine alignment with engineering team values.",
    categories: [
      { name: "Problem Solving", score: 85 },
      { name: "Technical Knowledge", score: 84 },
      { name: "Answer Quality", score: 89 },
      { name: "Confidence", score: 90 },
      { name: "Communication", score: 92 },
    ],
    strengths: [
      "Articulate conflict resolution examples and teamwork mindset",
      "Active listening and thoughtful pauses before replying",
      "Clear explanation of projects and leadership responsibilities",
    ],
    improvements: [
      "Define 3-year professional goals with more quantitative targets",
      "Elaborate further on trade-offs during capstone decisions",
    ],
    integrity: {
      confidenceScore: 94,
      statusText: "No major external-assistance indicators detected.",
      cameraAvailability: 97,
      personPresence: 95,
      sessionConsistency: 93,
      potentialAssistance: "Low",
      timeline: [
        { time: "11:00 AM", event: "Video connection established" },
        { time: "11:10 AM", event: "Steady eye contact and clear speech pattern" },
        { time: "11:20 AM", event: "Standard interaction flow verified" },
        { time: "11:30 AM", event: "Interview concluded successfully" },
      ],
    },
  },
  {
    id: "mock-4",
    type: "ai",
    title: "AI Mock - General Aptitude & Core CS",
    interviewerOrModel: "GCU AI Aptitude & CS Benchmark",
    role: "Campus Placement Round 1 Prep",
    date: "Jul 29, 2026",
    score: 91,
    status: "COMPLETED",
    summary:
      "Outstanding logical deduction, quantitative problem-solving speed, and operating systems memory management concepts.",
    categories: [
      { name: "Problem Solving", score: 94 },
      { name: "Technical Knowledge", score: 92 },
      { name: "Answer Quality", score: 90 },
      { name: "Confidence", score: 88 },
      { name: "Communication", score: 86 },
    ],
    strengths: [
      "Fast mental math and logic puzzles execution",
      "Accurate answers on OS scheduling and concurrency",
      "Quick identification of edge cases in algorithm queries",
    ],
    improvements: [
      "Review network packet routing protocols and TCP handshakes",
      "Refine speed when walking through database indexing concepts",
    ],
    integrity: {
      confidenceScore: 96,
      statusText: "No major external-assistance indicators detected.",
      cameraAvailability: 99,
      personPresence: 98,
      sessionConsistency: 95,
      potentialAssistance: "Low",
      timeline: [
        { time: "04:00 PM", event: "Camera & mic initialized" },
        { time: "04:12 PM", event: "Single user presence detected throughout" },
        { time: "04:25 PM", event: "High answer-timing consistency" },
        { time: "04:30 PM", event: "Report generated with 96% integrity confidence" },
      ],
    },
  },
];

/* ─── AI Questions Mock Data ─── */
const aiQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your experience with robotics or core software projects.",
    hint: "Highlight your role, key technologies used, problem statement, and quantified outcome.",
  },
  {
    id: 2,
    question: "How would you optimize a high-traffic database query experiencing slow response times?",
    hint: "Discuss indexing, execution plans, query refactoring, and caching strategies.",
  },
  {
    id: 3,
    question: "Describe a situation where you encountered a major technical disagreement in a team. How did you resolve it?",
    hint: "Use the STAR framework (Situation, Task, Action, Result) with an emphasis on data-driven consensus.",
  },
];

export default function MockInterviews() {
  // Modal & Flow States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAIConfigModalOpen, setIsAIConfigModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MockRecord | null>(null);
  const [showIntegrityTimeline, setShowIntegrityTimeline] = useState(false);

  // Camera & Mic Check Stage
  const [isMediaCheckActive, setIsMediaCheckActive] = useState(false);
  const [targetInterviewType, setTargetInterviewType] = useState<"ai" | "professor">("ai");
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [isCheckingMedia, setIsCheckingMedia] = useState(false);

  // In-session AI Interview Experience
  const [isAISessionActive, setIsAISessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerMode, setAnswerMode] = useState<"speak" | "type">("speak");
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(1800); // 30 minutes in seconds
  const [integrityConfidenceScore, setIntegrityConfidenceScore] = useState(94);
  const [snapshotCount, setSnapshotCount] = useState(3);

  // AI Configuration State
  const [selectedTrack, setSelectedTrack] = useState("Software Engineer (SDE)");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Standard (Campus Rounds)");

  // Professor Booking State
  const [selectedFaculty, setSelectedFaculty] = useState("Prof. Priya Patel (SDE & System Design)");
  const [selectedSlot, setSelectedSlot] = useState("Aug 15 • 10:00 AM");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Video and Media Stream References
  const checkVideoRef = useRef<HTMLVideoElement | null>(null);
  const sessionVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Timer effect for AI session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAISessionActive && sessionTimer > 0) {
      interval = setInterval(() => {
        setSessionTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAISessionActive, sessionTimer]);

  // Periodic Snapshot & Integrity Monitoring Simulation
  useEffect(() => {
    let snapshotInterval: NodeJS.Timeout;
    if (isAISessionActive) {
      snapshotInterval = setInterval(() => {
        setSnapshotCount((prev) => prev + 1);
      }, 15000); // Periodic snapshot every 15s
    }
    return () => clearInterval(snapshotInterval);
  }, [isAISessionActive]);

  // Cleanup media streams on unmount or session exit
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  /* ─── Media Setup & Camera Stream Handling ─── */
  const startMediaCheck = (type: "ai" | "professor") => {
    setTargetInterviewType(type);
    setIsMediaCheckActive(true);
    setIsCheckingMedia(true);

    // Request Camera & Mic
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          setCameraPermissionGranted(true);
          setMicPermissionGranted(true);
          setIsCheckingMedia(false);
          if (checkVideoRef.current) {
            checkVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Camera/Mic permission unavailable or denied, using friendly fallback:", err);
          // Friendly fallback state so interview experience never breaks
          setCameraPermissionGranted(true);
          setMicPermissionGranted(true);
          setIsCheckingMedia(false);
        });
    } else {
      setCameraPermissionGranted(true);
      setMicPermissionGranted(true);
      setIsCheckingMedia(false);
    }
  };

  const handleLaunchSession = () => {
    setIsMediaCheckActive(false);
    setIsAISessionActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setSessionTimer(1800);

    // Attach stream to in-session video if active
    setTimeout(() => {
      if (sessionVideoRef.current && mediaStreamRef.current) {
        sessionVideoRef.current.srcObject = mediaStreamRef.current;
      }
    }, 200);
  };

  /* ─── Text-to-Speech: Listen to Question ─── */
  const handlePlayQuestionAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (isSpeakingQuestion) {
        setIsSpeakingQuestion(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeakingQuestion(true);
      utterance.onend = () => setIsSpeakingQuestion(false);
      utterance.onerror = () => setIsSpeakingQuestion(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Audio playback: " + text);
    }
  };

  /* ─── Speech-to-Text: Live Voice Recording ─── */
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      setIsRecording(true);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript) {
              setUserAnswer((prev) => (prev ? prev + " " + transcript : transcript));
            }
          };

          recognition.onerror = () => {
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognitionRef.current = recognition;
          recognition.start();
        } catch (e) {
          // Simulation fallback for voice recognition
          simulateVoiceInput();
        }
      } else {
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = () => {
    const samplePhrases = [
      "In my capstone project, I designed a microservices architecture using Node.js and PostgreSQL.",
      "To optimize database performance, I established composite indexing on query keys and introduced Redis caching.",
      "I led a team of four engineers, facilitated code reviews, and reduced API latency by 35%.",
    ];
    const phrase = samplePhrases[currentQuestionIndex % samplePhrases.length];
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx <= phrase.length) {
        setUserAnswer((prev) => (charIdx === 0 ? phrase.slice(0, charIdx) : phrase.slice(0, charIdx)));
        charIdx += 4;
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 80);
  };

  const handleSubmitAnswer = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingQuestion(false);
    setIsRecording(false);

    if (currentQuestionIndex < aiQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      // Completed all questions -> Open the evaluation result with integrity report
      setIsAISessionActive(false);
      setSelectedResult(sampleRecords[1]); // AI Mock SDE result
    }
  };

  const handleSkipQuestion = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingQuestion(false);
    setIsRecording(false);

    if (currentQuestionIndex < aiQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setIsAISessionActive(false);
      setSelectedResult(sampleRecords[1]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookModalOpen(false);
      // Trigger camera setup for professor mock
      startMediaCheck("professor");
    }, 1200);
  };

  /* ════════════════════════════════════════════════════════════════
     1. CAMERA & MICROPHONE PERMISSION / SETUP CHECK SCREEN
     ════════════════════════════════════════════════════════════════ */
  if (isMediaCheckActive) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "800px",
          margin: "20px auto 60px",
          padding: "0 16px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#fff7ed",
              color: "#c2410c",
              border: "1px solid #fed7aa",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            <FiShield size={13} />
            <span>Interview Readiness & Integrity Check</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#381c0f", margin: "0 0 8px" }}>
            Camera & Microphone Check
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
            Your camera and microphone are required for this mock interview. We verify video feeds, audio clarity, and automated session integrity before beginning.
          </p>
        </div>

        {/* Video Preview Card */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Camera View Box */}
          <div
            style={{
              width: "100%",
              height: "360px",
              background: "#111827",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mediaStreamRef.current ? (
              <video
                ref={checkVideoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#9ca3af", padding: "20px" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "#1f2937",
                    color: "#ea580c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                    border: "2px solid #374151",
                  }}
                >
                  <FiUser size={36} />
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>
                  Live Camera Preview Active
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                  Candidate Face Centered • Lighting Optimal
                </p>
              </div>
            )}

            {/* Video Status Overlay Pill */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(17, 24, 39, 0.8)",
                backdropFilter: "blur(4px)",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 700,
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <span>SYSTEM READY</span>
            </div>
          </div>

          {/* Device Checklist */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              background: "#fafafa",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #f3f4f6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiVideo size={16} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>CAMERA</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>HD Ready</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiMic size={16} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>MICROPHONE</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Audio Active</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fff7ed", color: "#c2410c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiShield size={16} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, display: "block" }}>INTEGRITY</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#9a3412" }}>Monitoring On</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: "18px" }}>
            <button
              onClick={() => setIsMediaCheckActive(false)}
              style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, color: "#6b7280", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", cursor: "pointer" }}
            >
              Cancel
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handleLaunchSession}
                style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, color: "#374151", background: "white", border: "1px solid #d1d5db", borderRadius: "8px", cursor: "pointer" }}
              >
                Continue without camera
              </button>
              <button
                onClick={handleLaunchSession}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 26px",
                  background: "#381c0f",
                  border: "1px solid #381c0f",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(56, 28, 15, 0.2)",
                }}
              >
                <span>Start Interview Now</span>
                <FiArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     2. ACTIVE AI / VIDEO INTERVIEW SESSION EXPERIENCE
     ════════════════════════════════════════════════════════════════ */
  if (isAISessionActive) {
    const currentQ = aiQuestions[currentQuestionIndex];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "1240px",
          margin: "0 auto",
          paddingBottom: "56px",
        }}
      >
        {/* Compact Session Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#ffedd5",
                color: "#c2410c",
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #fed7aa",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ea580c" }} />
              <span>LIVE INTERVIEW</span>
            </div>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: 0 }}>
                {targetInterviewType === "professor" ? "Professor Mock Interview" : "AI Mock Simulation"}
              </h1>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                {selectedTrack} • {selectedDifficulty}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Status pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f9fafb", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "12px", fontWeight: 600, color: "#4b5563" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#15803d" }}>
                <FiVideo size={13} /> Camera active
              </span>
              <span style={{ color: "#d1d5db" }}>|</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#15803d" }}>
                <FiMic size={13} /> Mic active
              </span>
            </div>

            {/* Timer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#381c0f",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              <FiClock size={15} style={{ color: "#ea580c" }} />
              <span>{formatTimer(sessionTimer)}</span>
            </div>

            <button
              onClick={() => setIsAISessionActive(false)}
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#6b7280",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Exit Session
            </button>
          </div>
        </div>

        {/* Main 2-Column Video Interview Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "62fr 38fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* ── Left Column: Question & Answer Experience ── */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "24px 26px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            {/* Question Progress & Listen Action */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#ea580c",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Question {currentQuestionIndex + 1} of 10
                </span>
                {/* Dot Progress Indicator */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {aiQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background:
                          idx < currentQuestionIndex
                            ? "#15803d"
                            : idx === currentQuestionIndex
                            ? "#ea580c"
                            : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Text-to-Speech Audio Playback Button */}
              <button
                type="button"
                onClick={() => handlePlayQuestionAudio(currentQ.question)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: isSpeakingQuestion ? "#fff7ed" : "#f9fafb",
                  color: isSpeakingQuestion ? "#ea580c" : "#374151",
                  border: isSpeakingQuestion ? "1px solid #fed7aa" : "1px solid #d1d5db",
                  transition: "all 0.15s ease",
                }}
              >
                <FiVolume2 size={15} style={{ color: isSpeakingQuestion ? "#ea580c" : "#6b7280" }} />
                <span>{isSpeakingQuestion ? "Speaking Question..." : "Listen to Question"}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2
              style={{
                fontSize: "21px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
                lineHeight: 1.4,
                letterSpacing: "-0.3px",
              }}
            >
              "{currentQ.question}"
            </h2>

            {/* Evaluator Tip Box */}
            <div
              style={{
                background: "#fffaf5",
                border: "1px solid #fed7aa",
                borderRadius: "8px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <FiZap size={16} style={{ color: "#ea580c", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "2px" }}>
                  Evaluator Focus Tip
                </span>
                <p style={{ fontSize: "12px", color: "#78350f", margin: 0, lineHeight: 1.4 }}>
                  {currentQ.hint}
                </p>
              </div>
            </div>

            {/* Answer Input Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Answer Mode Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => setAnswerMode("speak")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: 700,
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: answerMode === "speak" ? "#381c0f" : "#f3f4f6",
                      color: answerMode === "speak" ? "white" : "#4b5563",
                      border: "none",
                    }}
                  >
                    <FiMic size={13} />
                    <span>Speak Answer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswerMode("type")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: 700,
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: answerMode === "type" ? "#381c0f" : "#f3f4f6",
                      color: answerMode === "type" ? "white" : "#4b5563",
                      border: "none",
                    }}
                  >
                    <span>Type Answer</span>
                  </button>
                </div>

                {answerMode === "speak" && (
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      background: isRecording ? "#fef2f2" : "#fff7ed",
                      color: isRecording ? "#dc2626" : "#c2410c",
                      border: isRecording ? "1px solid #fecaca" : "1px solid #fed7aa",
                      animation: isRecording ? "pulse 1.5s infinite" : "none",
                    }}
                  >
                    <FiMic size={14} style={{ color: isRecording ? "#dc2626" : "#ea580c" }} />
                    <span>{isRecording ? "Recording Live (Click to Stop)..." : "Start Speaking"}</span>
                  </button>
                )}
              </div>

              {/* Transcript / Textarea Area */}
              <div style={{ position: "relative" }}>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={
                    answerMode === "speak"
                      ? "Click 'Start Speaking' and state your answer. Your spoken speech will transcribe automatically here..."
                      : "Type your answer clearly here..."
                  }
                  rows={8}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "14px",
                    color: "#111827",
                    background: "#fafafa",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    outline: "none",
                    resize: "none",
                    lineHeight: 1.5,
                    boxSizing: "border-box",
                  }}
                />
                {userAnswer && (
                  <button
                    type="button"
                    onClick={() => setUserAnswer("")}
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6b7280",
                      background: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #f3f4f6",
                paddingTop: "16px",
              }}
            >
              <button
                type="button"
                onClick={handleSkipQuestion}
                style={{
                  padding: "9px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4b5563",
                  background: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Skip Question
              </button>

              <button
                type="button"
                onClick={handleSubmitAnswer}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 24px",
                  background: "#381c0f",
                  border: "1px solid #381c0f",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <span>
                  {currentQuestionIndex === aiQuestions.length - 1
                    ? "Finish & View Evaluation Report"
                    : "Submit Answer"}
                </span>
                <FiArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* ── Right Column: Live Camera Feed & Monitoring Panel ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Live Camera Feed Card */}
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Candidate Video Feed
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803d" }}>LIVE</span>
                </div>
              </div>

              {/* Video Stream Element */}
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  background: "#111827",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {mediaStreamRef.current ? (
                  <video
                    ref={sessionVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#9ca3af" }}>
                    <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#1f2937", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <FiUser size={28} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "white" }}>
                      Live Camera Feed
                    </span>
                  </div>
                )}

                {/* Overlaid Snapshot Counter */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "rgba(17, 24, 39, 0.8)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Snapshots taken: {snapshotCount}
                </div>
              </div>
            </div>

            {/* Session Integrity Monitor Box */}
            <div
              style={{
                background: "#fffaf5",
                border: "1px solid #fed7aa",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiShield size={14} style={{ color: "#ea580c" }} /> Integrity Confidence
                </span>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#ea580c" }}>
                  {integrityConfidenceScore}%
                </span>
              </div>

              <div style={{ width: "100%", background: "#fed7aa", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ background: "#ea580c", height: "100%", width: `${integrityConfidenceScore}%`, borderRadius: "3px" }} />
              </div>

              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", color: "#78350f" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiCheck size={12} style={{ color: "#15803d" }} />
                  <span>Single speaker voice detected</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiCheck size={12} style={{ color: "#15803d" }} />
                  <span>Face positioning centered</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiCheck size={12} style={{ color: "#15803d" }} />
                  <span>Browser window focus steady</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     3. MAIN MOCK INTERVIEWS DASHBOARD
     ════════════════════════════════════════════════════════════════ */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "1240px",
        margin: "0 auto",
        paddingBottom: "56px",
      }}
    >
      {/* ─── Header Row ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#381c0f",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Practice Makes Perfect
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px", maxWidth: "780px", lineHeight: 1.4 }}>
            Practice with professors or simulate real interviews with AI before your placement drive. Build confidence, test camera readiness, and identify areas for improvement.
          </p>
        </div>

        <button
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#6b7280",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
          title="Notifications"
        >
          <FiBell size={17} />
        </button>
      </div>

      {/* ─── Hero Cards (Two Equal-Width Cards) ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left Card: Professor Mock Interview */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "270px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div>
            {/* Header with Icon Container */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "#e0f2fe",
                  color: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FiUser size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>
                  Professor Mock Interview
                </h2>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  Practice with placement faculty and professors
                </p>
              </div>
            </div>

            {/* Features List */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "11px", fontSize: "13px", color: "#374151" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Faculty-led 1-on-1 video interview</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Real interview environment & camera setup</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Personalized professor feedback & guidance</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Role-specific technical & HR prep</span>
              </li>
            </ul>
          </div>

          {/* Primary Dark-Brown Filled Button */}
          <button
            type="button"
            onClick={() => setIsBookModalOpen(true)}
            style={{
              width: "100%",
              marginTop: "22px",
              padding: "12px",
              borderRadius: "8px",
              background: "#381c0f",
              border: "1px solid #381c0f",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px rgba(56, 28, 15, 0.15)",
            }}
          >
            Book Professor Mock
          </button>
        </div>

        {/* Right Card: AI Mock Interview */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "270px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div>
            {/* Header with Icon Container */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "#ffedd5",
                  color: "#ea580c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FiCpu size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>
                  AI Mock Interview
                </h2>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  Practice anytime with camera & speech simulation
                </p>
              </div>
            </div>

            {/* Features List */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "11px", fontSize: "13px", color: "#374151" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>AI voice question playback & oral speech response</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Live camera & integrity monitoring</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Technical + HR adaptive questions</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheck style={{ color: "#ea580c", strokeWidth: 3 }} size={15} />
                <span>Instant performance & integrity confidence report</span>
              </li>
            </ul>
          </div>

          {/* Orange Outline Button */}
          <button
            type="button"
            onClick={() => setIsAIConfigModalOpen(true)}
            style={{
              width: "100%",
              marginTop: "22px",
              padding: "12px",
              borderRadius: "8px",
              background: "white",
              border: "1.5px solid #ea580c",
              color: "#ea580c",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
          >
            Start AI Mock
          </button>
        </div>
      </div>

      {/* ─── My Mock Interviews History Section ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 }}>
            My Mock Interviews
          </h2>
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>
            4 records completed
          </span>
        </div>

        {/* History List */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          {sampleRecords.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                borderTop: index > 0 ? "1px solid #f3f4f6" : "none",
                transition: "background 0.15s ease",
              }}
              className="hover:bg-orange-50/40"
            >
              {/* Left Column: Icon Container + Titles */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: item.type === "professor" ? "#e0f2fe" : "#ffedd5",
                    color: item.type === "professor" ? "#0284c7" : "#ea580c",
                  }}
                >
                  {item.type === "professor" ? <FiUser size={20} /> : <FiCpu size={20} />}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 3px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                    {item.date} • {item.role}
                  </p>
                </div>
              </div>

              {/* Right Column: Score + Completed Badge + View Result */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                {/* Score Pill */}
                <div style={{ background: "#f3f4f6", color: "#374151", fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                  Score: <span style={{ fontWeight: 800, color: "#381c0f" }}>{item.score}%</span>
                </div>

                {/* Status Badge */}
                <span style={{ background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.status}
                </span>

                {/* View Result Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedResult(item);
                    setShowIntegrityTimeline(false);
                  }}
                  style={{
                    padding: "7px 16px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  View Result
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL 1: BOOK PROFESSOR MOCK INTERVIEW
          ════════════════════════════════════════════════════════════════ */}
      {isBookModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "white", borderRadius: "12px", maxWidth: "540px", width: "100%", padding: "26px", position: "relative", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
            {/* Close Button */}
            <button
              onClick={() => setIsBookModalOpen(false)}
              style={{ position: "absolute", top: "20px", right: "20px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={16} />
            </button>

            {/* Modal Title & Subtitle */}
            <div style={{ marginBottom: "20px", paddingRight: "32px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Book Professor Mock Interview
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Select your placement faculty mentor and preferred video mock slot.
              </p>
            </div>

            {bookingSuccess ? (
              <div style={{ padding: "24px", textAlign: "center", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "8px" }}>
                <div style={{ width: "42px", height: "42px", background: "#d1fae5", color: "#047857", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <FiCheck size={24} />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#065f46", margin: "0 0 4px" }}>
                  Slot Reserved! Starting Media Check...
                </h4>
                <p style={{ fontSize: "13px", color: "#047857", margin: 0 }}>
                  Connecting camera and microphone setup for {selectedFaculty.split("(")[0]} on {selectedSlot}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Faculty Mentor Dropdown */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                    Select Faculty Mentor
                  </label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", fontSize: "13px", color: "#111827", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none" }}
                  >
                    <option>Prof. Priya Patel (SDE & System Design)</option>
                    <option>Prof. Rahul Sharma (HR & Culture Fit)</option>
                    <option>Prof. Ananya Sen (Data Science & Cloud)</option>
                    <option>Prof. Vikram Rao (Core Electronics & Embedded)</option>
                  </select>
                </div>

                {/* Available Slots */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                    Available Slots
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[
                      { slot: "Aug 15 • 10:00 AM", mode: "Video Call (Room 204)" },
                      { slot: "Aug 15 • 02:00 PM", mode: "Video Call (Room 204)" },
                      { slot: "Aug 16 • 11:30 AM", mode: "Online (Google Meet)" },
                      { slot: "Aug 16 • 04:00 PM", mode: "Online (Google Meet)" },
                    ].map((item) => (
                      <button
                        key={item.slot}
                        type="button"
                        onClick={() => setSelectedSlot(item.slot)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "6px",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                          background: selectedSlot === item.slot ? "#fff7ed" : "white",
                          border: selectedSlot === item.slot ? "1.5px solid #ea580c" : "1px solid #e5e7eb",
                        }}
                      >
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{item.slot}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280" }}>{item.mode}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Buttons */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #f3f4f6", paddingTop: "16px", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    style={{ padding: "9px 16px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "9px 22px", fontSize: "12px", fontWeight: 700, color: "white", background: "#381c0f", border: "1px solid #381c0f", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Confirm & Start Check
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL 2: CONFIGURE AI MOCK SIMULATION
          ════════════════════════════════════════════════════════════════ */}
      {isAIConfigModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "white", borderRadius: "12px", maxWidth: "560px", width: "100%", padding: "26px", position: "relative", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
            {/* Close Button */}
            <button
              onClick={() => setIsAIConfigModalOpen(false)}
              style={{ position: "absolute", top: "20px", right: "20px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={16} />
            </button>

            {/* Modal Title & Subtitle */}
            <div style={{ marginBottom: "20px", paddingRight: "32px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Configure AI Mock Simulation
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Select your target career track, evaluation rigor, and media settings.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Target Track */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                  Select Target Track
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {[
                    { name: "Software Engineer (SDE)", desc: "DSA & System Design" },
                    { name: "Data & Cloud Engineer", desc: "SQL, Cloud, Pipelines" },
                    { name: "Core Electronics / VLSI", desc: "Circuits & Embedded" },
                    { name: "HR & Management Trainee", desc: "Behavioral & Leadership" },
                  ].map((track) => (
                    <button
                      key={track.name}
                      type="button"
                      onClick={() => setSelectedTrack(track.name)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "6px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        background: selectedTrack === track.name ? "#fff7ed" : "white",
                        border: selectedTrack === track.name ? "1.5px solid #ea580c" : "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{track.name}</span>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{track.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                  Difficulty Level
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {[
                    { name: "Standard (Campus Rounds)", desc: "University placement rigor" },
                    { name: "Advanced (Product / Tier-1)", desc: "High rigor for top tier MNCs" },
                  ].map((level) => (
                    <button
                      key={level.name}
                      type="button"
                      onClick={() => setSelectedDifficulty(level.name)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "6px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        background: selectedDifficulty === level.name ? "#fff7ed" : "white",
                        border: selectedDifficulty === level.name ? "1.5px solid #ea580c" : "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{level.name}</span>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{level.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlighted Section: Camera + Voice Features */}
              <div style={{ background: "#fffaf5", border: "1px solid #fed7aa", borderRadius: "8px", padding: "14px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <FiVideo size={13} style={{ color: "#ea580c" }} /> Included Interactive AI & Integrity Capabilities
                </span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px", color: "#78350f" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#ea580c", fontWeight: "bold" }}>•</span>
                    <span>Live camera video preview</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#ea580c", fontWeight: "bold" }}>•</span>
                    <span>Audio TTS question playback</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#ea580c", fontWeight: "bold" }}>•</span>
                    <span>Live speech-to-text oral answers</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#ea580c", fontWeight: "bold" }}>•</span>
                    <span>Automated integrity confidence report</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsAIConfigModalOpen(false)}
                  style={{ padding: "9px 16px", fontSize: "12px", fontWeight: 600, color: "#4b5563", background: "white", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAIConfigModalOpen(false);
                    startMediaCheck("ai");
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 22px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                    background: "#381c0f",
                    border: "1px solid #381c0f",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <FiVideo size={14} />
                  <span>Start Camera & Voice Check</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL 3: MOCK EVALUATION RESULT + INTERVIEW INTEGRITY REPORT
          ════════════════════════════════════════════════════════════════ */}
      {selectedResult && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              padding: "26px 28px",
              position: "relative",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedResult(null)}
              style={{ position: "absolute", top: "22px", right: "22px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f4f6", border: "none", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <FiX size={16} />
            </button>

            {/* Header */}
            <div style={{ paddingRight: "32px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                {selectedResult.type === "professor"
                  ? "PROFESSOR MOCK INTERVIEW EVALUATION & INTEGRITY REPORT"
                  : "AI MOCK INTERVIEW EVALUATION & INTEGRITY REPORT"}
              </span>
              <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#111827", margin: "4px 0 2px" }}>
                {selectedResult.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                Evaluated by:{" "}
                <span style={{ fontWeight: 700, color: "#374151" }}>{selectedResult.interviewerOrModel}</span>
                {selectedResult.facultyDesignation && (
                  <span style={{ color: "#9ca3af" }}> — {selectedResult.facultyDesignation}</span>
                )}
              </p>
            </div>

            {/* Overall Readiness Score Banner */}
            <div style={{ background: "#fffaf5", border: "1px solid #fed7aa", borderRadius: "10px", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                  Overall Readiness Score
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "2px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 800, color: "#381c0f", lineHeight: 1 }}>
                    {selectedResult.score}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#9a3412" }}>
                    / 100
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "6px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", fontSize: "12px", fontWeight: 700 }}>
                <FiAward size={16} />
                <span>Placement Ready</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>
                Category Breakdown
              </h4>
              <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {selectedResult.categories.map((cat) => (
                  <div key={cat.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      <span>{cat.name}</span>
                      <span style={{ fontWeight: 700, color: "#381c0f" }}>{cat.score}%</span>
                    </div>
                    <div style={{ width: "100%", background: "#e5e7eb", height: "7px", borderRadius: "4px", overflow: "hidden" }}>
                      <div
                        style={{ background: "#ea580c", height: "100%", borderRadius: "4px", width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Assessment */}
            <div style={{ padding: "16px 18px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: "13px", color: "#4b5563", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: "#111827", display: "block", marginBottom: "4px" }}>
                {selectedResult.type === "professor" ? "Faculty Mentor Assessment" : "Final AI Assessment"}
              </span>
              "{selectedResult.summary}"
            </div>

            {/* Strengths & Improvements */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ padding: "16px", borderRadius: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <FiCheck size={14} style={{ color: "#059669" }} /> KEY STRENGTHS
                </span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#065f46" }}>
                  {selectedResult.strengths.map((str, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ color: "#059669", fontWeight: "bold" }}>•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: "16px", borderRadius: "8px", background: "#fffaf5", border: "1px solid #fed7aa" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <FiTrendingUp size={14} style={{ color: "#ea580c" }} /> RECOMMENDED FOCUS
                </span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#78350f" }}>
                  {selectedResult.improvements.map((imp, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ color: "#ea580c", fontWeight: "bold" }}>•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ═══════ DEDICATED INTERVIEW INTEGRITY SECTION ═══════ */}
            <div
              style={{
                background: "#ffffff",
                border: "1.5px solid #fed7aa",
                borderRadius: "10px",
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                boxShadow: "0 1px 3px rgba(234, 88, 12, 0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FiShield size={16} style={{ color: "#ea580c" }} />
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#381c0f", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    INTERVIEW INTEGRITY
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>
                    {selectedResult.integrity.confidenceScore}% Confidence
                  </span>
                </div>
              </div>

              <p style={{ fontSize: "12px", color: "#4b5563", margin: 0, fontWeight: 500 }}>
                Status: <strong style={{ color: "#15803d" }}>{selectedResult.integrity.statusText}</strong>
              </p>

              {/* 4 Integrity Confidence Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                <div style={{ background: "#f9fafb", padding: "10px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                    CAMERA AVAILABILITY
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginTop: "2px", display: "block" }}>
                    {selectedResult.integrity.cameraAvailability}%
                  </span>
                </div>

                <div style={{ background: "#f9fafb", padding: "10px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                    PERSON PRESENCE
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginTop: "2px", display: "block" }}>
                    {selectedResult.integrity.personPresence}%
                  </span>
                </div>

                <div style={{ background: "#f9fafb", padding: "10px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                    SESSION CONSISTENCY
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginTop: "2px", display: "block" }}>
                    {selectedResult.integrity.sessionConsistency}%
                  </span>
                </div>

                <div style={{ background: "#f9fafb", padding: "10px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                    POTENTIAL ASSISTANCE
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#15803d", marginTop: "2px", display: "block" }}>
                    {selectedResult.integrity.potentialAssistance}
                  </span>
                </div>
              </div>

              {/* View Monitoring Details Timeline Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowIntegrityTimeline(!showIntegrityTimeline)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ea580c",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <span>{showIntegrityTimeline ? "Hide Monitoring Details" : "View Monitoring Details"}</span>
                  {showIntegrityTimeline ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                </button>

                {showIntegrityTimeline && (
                  <div style={{ marginTop: "10px", padding: "12px", background: "#f9fafb", borderRadius: "6px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedResult.integrity.timeline.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "#4b5563" }}>
                        <span style={{ fontWeight: 700, color: "#ea580c", minWidth: "60px" }}>{item.time}</span>
                        <span style={{ color: "#d1d5db" }}>—</span>
                        <span>{item.event}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
              {selectedResult.type === "ai" ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedResult(null);
                      setIsAIConfigModalOpen(true);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "9px 18px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#c2410c",
                      background: "#fff7ed",
                      border: "1px solid #fed7aa",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <FiRotateCcw size={13} />
                    <span>Practice Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedResult(null)}
                    style={{
                      padding: "9px 22px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                      background: "#381c0f",
                      border: "1px solid #381c0f",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Full Report
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedResult(null);
                      setIsBookModalOpen(true);
                    }}
                    style={{
                      padding: "9px 18px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Book Follow-up Mock
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedResult(null)}
                    style={{
                      padding: "9px 22px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                      background: "#381c0f",
                      border: "1px solid #381c0f",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Close Report
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
