import { create } from 'zustand';
import { 
  GameState, 
  GameStage, 
  AnamnesisQuestion, 
  ChatMessage, 
  PhysicalExamType, 
  PenunjangType, 
  DiagnosisChoice, 
  ManagementChoice 
} from '../types/game';

const INITIAL_QUESTIONS: AnamnesisQuestion[] = [
  {
    id: 'q1',
    question: 'Kapan saja dirasakan gemetar?',
    answer: 'Saat aktivitas dan saat istirahat dok, jadi terus-terusan gemetarnya.',
    asked: false,
  },
  {
    id: 'q2',
    question: 'Apakah ada kekakuan sendi?',
    answer: 'Ada dok, lengan kiri dan kedua kaki saya kaku kalau digerakkan.',
    asked: false,
  },
  {
    id: 'q3',
    question: 'Apakah terdapat gangguan berjalan?',
    answer: 'Jalan saya jadi pendek-pendek dok, telapak kaki lengket ke lantai kayak ke lem.',
    asked: false,
  },
  {
    id: 'q4',
    question: 'Apakah ada riwayat jatuh?',
    answer: 'Tidak pernah jatuh dok.',
    asked: false,
  },
  {
    id: 'q5',
    question: 'Apakah ada riwayat penyakit lain?',
    answer: 'Saya hipertensi 10 tahun dok, tapi minum obat teratur.',
    asked: false,
  },
];

const INITIAL_PHYSICAL: Record<PhysicalExamType, {
  id: PhysicalExamType;
  title: string;
  subtitle: string;
  isCardinal: boolean;
  points: number;
  completed: boolean;
  summary: string;
}> = {
  tremor: {
    id: 'tremor',
    title: 'Tremor',
    subtitle: 'Resting & Re-emergent tremor evaluation',
    isCardinal: true,
    points: 15,
    completed: false,
    summary: 'Resting pill-rolling tremor tangan kiri (+) 4-6 Hz, re-emergent tremor (+) setelah jeda postural.',
  },
  motorik: {
    id: 'motorik',
    title: 'Motorik',
    subtitle: 'Pemeriksaan kekuatan ekstremitas',
    isCardinal: false,
    points: 5,
    completed: false,
    summary: 'Kekuatan motorik 5/5 keempat ekstremitas, dalam batas normal.',
  },
  rigiditas: {
    id: 'rigiditas',
    title: 'Rigiditas',
    subtitle: 'Tonus otot & fenomena cogwheel',
    isCardinal: true,
    points: 15,
    completed: false,
    summary: 'Rigiditas (+) cogwheel pada lengan kiri dan kedua tungkai.',
  },
  akinesia: {
    id: 'akinesia',
    title: 'Akinesia / Bradikinesia',
    subtitle: 'Finger tapping & toe tapping sequence',
    isCardinal: true,
    points: 15,
    completed: false,
    summary: 'Bradykinesia (+) pada lengan dan tungkai dengan penurunan amplitudo dan kecepatan progresif.',
  },
  instabilitas: {
    id: 'instabilitas',
    title: 'Instabilitas Postural',
    subtitle: 'Pull test / retropulsion test',
    isCardinal: true,
    points: 15,
    completed: false,
    summary: 'Retropulsion Test Positif - Instabilitas postural (+). Pasien mundur 3-4 langkah tidak stabil.',
  },
  sensorik: {
    id: 'sensorik',
    title: 'Sensorik',
    subtitle: 'Sensibilitas taktil & nosiseptif',
    isCardinal: false,
    points: 0,
    completed: false,
    summary: 'Sensorik dalam batas normal.',
  },
};

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  trust: 100,
  currentStage: 'anamnesis',
  caseNumber: 1,
  totalCases: 1,

  questions: INITIAL_QUESTIONS,
  chatHistory: [
    {
      id: 'system-intro',
      sender: 'patient',
      text: 'Selamat pagi dok, tangan kiri saya gemetar sudah 6 tahun terakhir, belakangan makin mengganggu...',
      timestamp: '08:00',
    },
  ],
  isTyping: false,

  physicalExams: INITIAL_PHYSICAL,
  skippedCardinalWarning: false,

  selectedPenunjang: null,
  examinedPenunjang: [],
  tambahDataCount: 0,
  penunjangBaseAwarded: false,

  diagnosisAttempts: 0,
  diagnosisSolved: false,

  managementSolved: false,
  selectedManagement: null,
  managementFeedback: null,

  toastMessage: null,

  clearToast: () => set({ toastMessage: null }),

  askQuestion: async (questionId: string) => {
    const { questions, chatHistory, isTyping } = get();
    if (isTyping) return;

    const q = questions.find((item) => item.id === questionId);
    if (!q || q.asked) return;

    // Doctor speaks
    const docMsg: ChatMessage = {
      id: `doc-${Date.now()}`,
      sender: 'doctor',
      text: q.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set({
      chatHistory: [...chatHistory, docMsg],
      isTyping: true,
      questions: questions.map((item) => (item.id === questionId ? { ...item, asked: true } : item)),
    });

    // Typing delay 800ms
    await new Promise((resolve) => setTimeout(resolve, 800));

    const patMsg: ChatMessage = {
      id: `pat-${Date.now()}`,
      sender: 'patient',
      text: q.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, patMsg],
      isTyping: false,
    }));
  },

  proceedToPhysical: () => {
    const { questions } = get();
    const allAsked = questions.every((q) => q.asked);
    if (!allAsked) {
      set({
        toastMessage: {
          text: 'Harap selesaikan semua 5 pertanyaan anamnesis terlebih dahulu.',
          type: 'warning',
        },
      });
      return false;
    }

    set({
      currentStage: 'physical',
      toastMessage: {
        text: 'Tahap Anamnesis selesai! Lanjut ke Pemeriksaan Fisik Neurologi (+70 Poin).',
        type: 'info',
      },
    });
    return true;
  },

  completePhysicalExam: (examId: PhysicalExamType) => {
    const { physicalExams, score } = get();
    const current = physicalExams[examId];
    if (current.completed) return;

    const newScore = score + current.points;
    set({
      score: newScore,
      physicalExams: {
        ...physicalExams,
        [examId]: { ...current, completed: true },
      },
      toastMessage: {
        text: `${current.title} selesai: +${current.points} poin!`,
        type: 'success',
      },
    });
  },

  proceedToPenunjang: () => {
    const { physicalExams, score, trust } = get();
    // Check cardinal 4: tremor, rigiditas, akinesia, instabilitas
    const cardinalKeys: PhysicalExamType[] = ['tremor', 'rigiditas', 'akinesia', 'instabilitas'];
    const skippedAny = cardinalKeys.some((k) => !physicalExams[k].completed);

    let updatedScore = score;
    let updatedTrust = trust;
    let showWarn = false;

    if (skippedAny) {
      updatedScore = Math.max(0, updatedScore - 20);
      updatedTrust = Math.max(0, updatedTrust - 10);
      showWarn = true;
      set({
        score: updatedScore,
        trust: updatedTrust,
        skippedCardinalWarning: true,
        toastMessage: {
          text: 'Peringatan: Pemeriksaan kardinal Parkinson tidak lengkap (-20 Poin penalty).',
          type: 'error',
        },
        currentStage: 'penunjang',
      });
    } else {
      set({
        currentStage: 'penunjang',
        toastMessage: {
          text: 'Pemeriksaan fisik lengkap! Lanjut ke Pemeriksaan Penunjang.',
          type: 'success',
        },
      });
    }

    return true;
  },

  selectPenunjang: (choice: PenunjangType) => {
    const { score, examinedPenunjang, penunjangBaseAwarded } = get();
    const alreadyExamined = examinedPenunjang.includes(choice);

    let pointDelta = 0;
    let feedback = '';

    if (!penunjangBaseAwarded) {
      if (choice === 'ct_non_kontras' || choice === 'mri') {
        pointDelta = 50;
        feedback = 'Tepat! Pilihan pemeriksaan penunjang lini pertama untuk menyingkirkan etiologi sekunder (+50 Poin).';
      } else if (choice === 'ct_kontras') {
        pointDelta = 35; // 50 - 15 penalty
        feedback = 'CT Kontras: Kontras tidak diperlukan pada skrining awal Parkinson, menambah biaya & risiko radiasi/alergi (+35 Poin, -15 penalty).';
      } else if (choice === 'rontgen') {
        pointDelta = 35; // 50 - 15 penalty
        feedback = 'Rontgen: Hasil normal, namun tidak relevan untuk evaluasi sindrom Parkinson (+35 Poin, -15 penalty).';
      }
    }

    set({
      selectedPenunjang: choice,
      penunjangBaseAwarded: true,
      score: score + pointDelta,
      examinedPenunjang: alreadyExamined ? examinedPenunjang : [...examinedPenunjang, choice],
      toastMessage: feedback ? { text: feedback, type: pointDelta >= 50 ? 'success' : 'warning' } : null,
    });
  },

  requestMoreData: () => {
    const { tambahDataCount, score, trust } = get();
    const newCount = tambahDataCount + 1;
    let newScore = score;
    let newTrust = trust;
    let msg = 'Kembali ke menu penunjang untuk memeriksa modalitas lain.';

    if (newCount > 2) {
      newScore = Math.max(0, newScore - 5);
      newTrust = Math.max(0, newTrust - 10);
      msg = `Pemeriksaan penunjang berlebih (>2x): Penalti -5 Poin, Kepercayaan Pasien -10%!`;
      set({
        tambahDataCount: newCount,
        selectedPenunjang: null,
        score: newScore,
        trust: newTrust,
        toastMessage: { text: msg, type: 'warning' },
      });
    } else {
      set({
        tambahDataCount: newCount,
        selectedPenunjang: null,
        toastMessage: { text: msg, type: 'info' },
      });
    }
  },

  proceedToDiagnosis: () => {
    const { penunjangBaseAwarded } = get();
    if (!penunjangBaseAwarded) {
      set({
        toastMessage: {
          text: 'Pilihlah setidaknya 1 pemeriksaan penunjang terlebih dahulu.',
          type: 'warning',
        },
      });
      return;
    }
    set({
      currentStage: 'diagnosis',
      toastMessage: {
        text: 'Masuk ke tahap Penegakan Diagnosis (+50 Poin).',
        type: 'info',
      },
    });
  },

  submitDiagnosis: (choice: DiagnosisChoice) => {
    const { score, trust, diagnosisAttempts } = get();
    const nextAttempts = diagnosisAttempts + 1;

    if (choice === 'parkinson_disease') {
      const pointsDelta = nextAttempts === 1 ? 50 : 25;
      const newScore = score + pointsDelta;
      set({
        score: newScore,
        diagnosisAttempts: nextAttempts,
        diagnosisSolved: true,
        toastMessage: {
          text: 'Tepat! Ini Parkinson Disease klinis (+50 Poin).',
          type: 'success',
        },
      });
      return {
        correct: true,
        message: 'Tepat! Ini Parkinson Disease klinis.',
        pointsDelta,
      };
    } else {
      // Wrong diagnosis: Parkinsonism
      const newScore = Math.max(0, score - 20);
      const newTrust = Math.max(0, trust - 30);
      set({
        score: newScore,
        trust: newTrust,
        diagnosisAttempts: nextAttempts,
        toastMessage: {
          text: 'Kurang Tepat. -20 Poin, Pasien cemas (-30% Trust).',
          type: 'error',
        },
      });
      return {
        correct: false,
        message: 'Kurang Tepat. Gejala asimetris, progresif gradual 6 tahun, 4 kardinal (+), penunjang normal = Parkinson Disease. Coba lagi.',
        pointsDelta: -20,
      };
    }
  },

  proceedToManagement: () => {
    const { diagnosisSolved } = get();
    if (!diagnosisSolved) {
      set({
        toastMessage: {
          text: 'Selesaikan diagnosis terlebih dahulu sebelum tatalaksana.',
          type: 'warning',
        },
      });
      return;
    }
    set({
      currentStage: 'management',
      toastMessage: {
        text: 'Tahap Tatalaksana Pasien (+30 Poin).',
        type: 'info',
      },
    });
  },

  submitManagement: (choice: ManagementChoice) => {
    const { score, trust } = get();
    let pointDelta = 0;
    let trustDelta = 0;
    let feedback = '';
    let correct = false;

    if (choice === 'rawat_jalan') {
      correct = true;
      pointDelta = 30;
      feedback = 'Tepat. SKDI 3A: Pasien Parkinson Disease stabil ditatalaksana rawat jalan di Poli Saraf dengan medikamentosa (Levodopa/Dopamin Agonis) dan edukasi.';
    } else if (choice === 'rawat_inap_neuro') {
      correct = false;
      pointDelta = -10;
      feedback = 'Tidak perlu rawat inap. Pasien kondisi klinis stabil tanpa kegawatdaruratan neurologi.';
    } else {
      correct = false;
      pointDelta = -20;
      trustDelta = -20;
      feedback = 'Salah indikasi: Rawat inap non-neurologi tidak tepat dan merugikan pasien.';
    }

    const newScore = Math.max(0, score + pointDelta);
    const newTrust = Math.max(0, trust + trustDelta);

    set({
      score: newScore,
      trust: newTrust,
      selectedManagement: choice,
      managementSolved: correct,
      managementFeedback: feedback,
      toastMessage: {
        text: feedback,
        type: correct ? 'success' : 'error',
      },
    });

    return { correct, feedback, pointsDelta: pointDelta };
  },

  proceedToEducation: () => {
    set({
      currentStage: 'education',
      toastMessage: {
        text: 'Simulasi selesai! Menampilkan Evaluasi & Ringkasan Edukasi Klinis.',
        type: 'info',
      },
    });
  },

  resetGame: () => {
    set({
      score: 0,
      trust: 100,
      currentStage: 'anamnesis',
      questions: INITIAL_QUESTIONS.map((q) => ({ ...q, asked: false })),
      chatHistory: [
        {
          id: 'system-intro-reset',
          sender: 'patient',
          text: 'Selamat pagi dok, tangan kiri saya gemetar sudah 6 tahun terakhir, belakangan makin mengganggu...',
          timestamp: '08:00',
        },
      ],
      isTyping: false,
      physicalExams: Object.fromEntries(
        Object.entries(INITIAL_PHYSICAL).map(([k, v]) => [k, { ...v, completed: false }])
      ) as Record<PhysicalExamType, typeof INITIAL_PHYSICAL[PhysicalExamType]>,
      skippedCardinalWarning: false,
      selectedPenunjang: null,
      examinedPenunjang: [],
      tambahDataCount: 0,
      penunjangBaseAwarded: false,
      diagnosisAttempts: 0,
      diagnosisSolved: false,
      managementSolved: false,
      selectedManagement: null,
      managementFeedback: null,
      toastMessage: {
        text: 'Kasus telah direset ke awal. Selamat bertugas!',
        type: 'info',
      },
    });
  },
}));
