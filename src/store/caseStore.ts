import { create } from 'zustand';
import { CASES_DATA, ClinicalCase } from '../data/cases';
import { DiagnosisChoice, ManagementChoice, GameStage, ChatMessage } from '../types/game';

export interface CaseStoreState {
  currentCaseId: number;
  currentCase: ClinicalCase;
  caseScores: Record<number, number>;
  
  // Game progression per case
  currentStage: GameStage;
  score: number;
  trust: number;
  
  // Anamnesis
  questionsState: Array<{ id: string; question: string; answer: string; asked: boolean }>;
  chatHistory: ChatMessage[];
  isTyping: boolean;
  
  // Physical Exam
  completedExamIds: string[];
  activeExamId: string | null;
  
  // Penunjang
  selectedPenunjangId: string | null;
  examinedPenunjangIds: string[];
  tambahDataCount: number;
  penunjangBaseAwarded: boolean;
  
  // Diagnosis
  diagnosisAttempts: number;
  diagnosisSolved: boolean;
  wrongDiagnosisPopup: { show: boolean; explanation: string } | null;
  
  // Management
  selectedManagement: ManagementChoice | null;
  managementSolved: boolean;
  
  // Toast notifications & UI modals
  toastMessage: { text: string; type: 'success' | 'warning' | 'error' | 'info' } | null;
  isCaseMenuOpen: boolean;
  
  // Actions
  loadScoresFromStorage: () => void;
  openCaseMenu: () => void;
  closeCaseMenu: () => void;
  selectCase: (caseId: number) => boolean;
  isCaseUnlocked: (caseId: number) => boolean;
  
  askQuestion: (questionId: string) => Promise<void>;
  proceedToPhysical: () => boolean;
  
  openExamModal: (examId: string) => void;
  closeExamModal: () => void;
  completeExam: (examId: string) => void;
  proceedToPenunjang: () => boolean;
  
  selectPenunjang: (penunjangId: string) => void;
  requestMoreData: () => void;
  proceedToDiagnosis: () => boolean;
  
  submitDiagnosis: (choice: DiagnosisChoice) => { correct: boolean; pointsDelta: number; message: string };
  dismissWrongDiagnosisPopup: () => void;
  proceedToManagement: () => boolean;
  
  submitManagement: (choice: ManagementChoice) => { correct: boolean; pointsDelta: number; feedback: string };
  proceedToEducation: () => void;
  
  resetCase: () => void;
  clearToast: () => void;
}

const getStoredScores = (): Record<number, number> => {
  if (typeof window === 'undefined') return { 1: 0 };
  try {
    const raw = localStorage.getItem('neurosim_scores');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse neurosim_scores', e);
  }
  return { 1: 0 };
};

const saveScoresToStorage = (scores: Record<number, number>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('neurosim_scores', JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save neurosim_scores', e);
  }
};

export const useCaseStore = create<CaseStoreState>((set, get) => {
  const initialCase = CASES_DATA[0];

  return {
    currentCaseId: 1,
    currentCase: initialCase,
    caseScores: { 1: 0 },
    
    currentStage: 'anamnesis',
    score: 0,
    trust: 100,
    
    questionsState: initialCase.questions.map((q) => ({ ...q, asked: false })),
    chatHistory: [
      {
        id: `intro-${initialCase.id}`,
        sender: 'patient',
        text: initialCase.patientInfo.chiefComplaint,
        timestamp: '08:00',
      },
    ],
    isTyping: false,
    
    completedExamIds: [],
    activeExamId: null,
    
    selectedPenunjangId: null,
    examinedPenunjangIds: [],
    tambahDataCount: 0,
    penunjangBaseAwarded: false,
    
    diagnosisAttempts: 0,
    diagnosisSolved: false,
    wrongDiagnosisPopup: null,
    
    selectedManagement: null,
    managementSolved: false,
    
    toastMessage: null,
    isCaseMenuOpen: false,

    loadScoresFromStorage: () => {
      const scores = getStoredScores();
      set({ caseScores: scores });
    },

    openCaseMenu: () => set({ isCaseMenuOpen: true }),
    closeCaseMenu: () => set({ isCaseMenuOpen: false }),

    isCaseUnlocked: (caseId: number) => {
      if (caseId === 1) return true;
      const { caseScores } = get();
      const prevScore = caseScores[caseId - 1] ?? 0;
      return prevScore >= 100;
    },

    selectCase: (caseId: number) => {
      const { isCaseUnlocked } = get();
      if (!isCaseUnlocked(caseId)) {
        set({
          toastMessage: {
            text: `Kasus ${caseId} terkunci! Anda harus meraih minimal 100 Poin pada Kasus ${caseId - 1}.`,
            type: 'warning',
          },
        });
        return false;
      }

      const found = CASES_DATA.find((c) => c.id === caseId) || CASES_DATA[0];

      set({
        currentCaseId: found.id,
        currentCase: found,
        currentStage: 'anamnesis',
        score: 0,
        trust: 100,
        questionsState: found.questions.map((q) => ({ ...q, asked: false })),
        chatHistory: [
          {
            id: `intro-${found.id}-${Date.now()}`,
            sender: 'patient',
            text: found.patientInfo.chiefComplaint,
            timestamp: '08:00',
          },
        ],
        isTyping: false,
        completedExamIds: [],
        activeExamId: null,
        selectedPenunjangId: null,
        examinedPenunjangIds: [],
        tambahDataCount: 0,
        penunjangBaseAwarded: false,
        diagnosisAttempts: 0,
        diagnosisSolved: false,
        wrongDiagnosisPopup: null,
        selectedManagement: null,
        managementSolved: false,
        isCaseMenuOpen: false,
        toastMessage: {
          text: `Memulai ${found.title}. Selamat bertugas, Dokter!`,
          type: 'info',
        },
      });

      return true;
    },

    askQuestion: async (questionId: string) => {
      const { questionsState, chatHistory, isTyping } = get();
      if (isTyping) return;

      const q = questionsState.find((item) => item.id === questionId);
      if (!q || q.asked) return;

      const docMsg: ChatMessage = {
        id: `doc-${Date.now()}`,
        sender: 'doctor',
        text: q.question,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      set({
        chatHistory: [...chatHistory, docMsg],
        isTyping: true,
        questionsState: questionsState.map((item) => (item.id === questionId ? { ...item, asked: true } : item)),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

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
      const { questionsState } = get();
      const allAsked = questionsState.every((q) => q.asked);
      if (!allAsked) {
        set({
          toastMessage: {
            text: 'Harap selesaikan seluruh 5 pertanyaan anamnesis terlebih dahulu.',
            type: 'warning',
          },
        });
        return false;
      }

      set({
        currentStage: 'physical',
        toastMessage: {
          text: 'Anamnesis lengkap! Lanjut ke Pemeriksaan Fisik (+70 Poin Maksimal).',
          type: 'info',
        },
      });
      return true;
    },

    openExamModal: (examId: string) => set({ activeExamId: examId }),
    closeExamModal: () => set({ activeExamId: null }),

    completeExam: (examId: string) => {
      const { completedExamIds, currentCase, score } = get();
      if (completedExamIds.includes(examId)) return;

      const examDef = currentCase.physicalExams.find((e) => e.id === examId);
      const points = examDef ? examDef.points : 10;

      set({
        completedExamIds: [...completedExamIds, examId],
        score: score + points,
        activeExamId: null,
        toastMessage: {
          text: `${examDef?.title || 'Pemeriksaan'} selesai: +${points} Poin!`,
          type: 'success',
        },
      });
    },

    proceedToPenunjang: () => {
      set({
        currentStage: 'penunjang',
        toastMessage: {
          text: 'Pemeriksaan fisik selesai! Lanjut ke Pemeriksaan Penunjang (+50 Poin).',
          type: 'info',
        },
      });
      return true;
    },

    selectPenunjang: (penunjangId: string) => {
      const { currentCase, examinedPenunjangIds, score, penunjangBaseAwarded } = get();
      const option = currentCase.penunjang.find((p) => p.id === penunjangId);
      if (!option) return;

      const alreadyExamined = examinedPenunjangIds.includes(penunjangId);
      let pointDelta = 0;

      if (!penunjangBaseAwarded) {
        pointDelta = option.pointsAwarded;
      }

      set({
        selectedPenunjangId: penunjangId,
        penunjangBaseAwarded: true,
        score: score + pointDelta,
        examinedPenunjangIds: alreadyExamined ? examinedPenunjangIds : [...examinedPenunjangIds, penunjangId],
        toastMessage: {
          text: option.feedback,
          type: option.isCorrect ? 'success' : 'warning',
        },
      });
    },

    requestMoreData: () => {
      const { tambahDataCount, score, trust } = get();
      const nextCount = tambahDataCount + 1;
      let newScore = score;
      let newTrust = trust;
      let msg = 'Kembali ke menu penunjang untuk memeriksa modalitas tambahan.';

      if (nextCount > 2) {
        newScore = Math.max(0, score - 5);
        newTrust = Math.max(0, trust - 10);
        msg = `Pemeriksaan penunjang berlebih (>2x): Penalti -5 Poin, Kepercayaan Pasien -10%!`;
      }

      set({
        tambahDataCount: nextCount,
        selectedPenunjangId: null,
        score: newScore,
        trust: newTrust,
        toastMessage: { text: msg, type: nextCount > 2 ? 'warning' : 'info' },
      });
    },

    proceedToDiagnosis: () => {
      const { penunjangBaseAwarded } = get();
      if (!penunjangBaseAwarded) {
        set({
          toastMessage: {
            text: 'Harap periksa setidaknya 1 pemeriksaan penunjang terlebih dahulu.',
            type: 'warning',
          },
        });
        return false;
      }

      set({
        currentStage: 'diagnosis',
        selectedPenunjangId: null,
        toastMessage: {
          text: 'Tahap Penegakan Diagnosis (+50 Poin). Analisis seluruh temuan klinis!',
          type: 'info',
        },
      });
      return true;
    },

    submitDiagnosis: (choice: DiagnosisChoice) => {
      const { currentCase, diagnosisAttempts, score, trust } = get();
      const isCorrect = choice === currentCase.diagnosis.correctChoice;
      const nextAttempts = diagnosisAttempts + 1;

      if (isCorrect) {
        // First correct = +50, second correct = +25
        const pointsDelta = nextAttempts === 1 ? 50 : 25;
        const newScore = score + pointsDelta;

        set({
          score: newScore,
          diagnosisAttempts: nextAttempts,
          diagnosisSolved: true,
          wrongDiagnosisPopup: null,
          toastMessage: {
            text: `Tepat! Diagnosis benar (+${pointsDelta} Poin).`,
            type: 'success',
          },
        });

        return {
          correct: true,
          pointsDelta,
          message: currentCase.diagnosis.correctExplanation,
        };
      } else {
        // Wrong diagnosis: -20 score, -30% trust, popup "Kurang Tepat" with [Ulangi]
        const newScore = Math.max(0, score - 20);
        const newTrust = Math.max(0, trust - 30);

        set({
          score: newScore,
          trust: newTrust,
          diagnosisAttempts: nextAttempts,
          wrongDiagnosisPopup: {
            show: true,
            explanation: currentCase.diagnosis.wrongExplanation,
          },
          toastMessage: {
            text: 'Kurang Tepat! -20 Poin, Kepercayaan Pasien -30%. Silakan ulangi diagnosis.',
            type: 'error',
          },
        });

        return {
          correct: false,
          pointsDelta: -20,
          message: currentCase.diagnosis.wrongExplanation,
        };
      }
    },

    dismissWrongDiagnosisPopup: () => {
      set({ wrongDiagnosisPopup: null });
    },

    proceedToManagement: () => {
      const { diagnosisSolved } = get();
      if (!diagnosisSolved) {
        set({
          toastMessage: {
            text: 'Selesaikan penegakan diagnosis terlebih dahulu sebelum menentukan tatalaksana.',
            type: 'warning',
          },
        });
        return false;
      }

      set({
        currentStage: 'management',
        toastMessage: {
          text: 'Tahap Tatalaksana Pasien (+30 Poin). Tentukan penanganan yang paling tepat!',
          type: 'info',
        },
      });
      return true;
    },

    submitManagement: (choice: ManagementChoice) => {
      const { currentCase, score, trust } = get();
      const option = currentCase.management.options.find((o) => o.id === choice);
      const isCorrect = choice === currentCase.management.correctChoice;

      const pointsDelta = option ? option.points : isCorrect ? 30 : -10;
      const newScore = Math.max(0, score + pointsDelta);
      const newTrust = isCorrect ? trust : Math.max(0, trust - 15);

      set({
        selectedManagement: choice,
        managementSolved: isCorrect,
        score: newScore,
        trust: newTrust,
        toastMessage: {
          text: option?.feedback || (isCorrect ? 'Tepat!' : 'Kurang tepat'),
          type: isCorrect ? 'success' : 'error',
        },
      });

      return {
        correct: isCorrect,
        pointsDelta,
        feedback: option?.feedback || currentCase.management.correctFeedback,
      };
    },

    proceedToEducation: () => {
      const { score, currentCaseId, caseScores } = get();
      const updatedScores = {
        ...caseScores,
        [currentCaseId]: Math.max(caseScores[currentCaseId] ?? 0, score),
      };

      saveScoresToStorage(updatedScores);

      set({
        currentStage: 'education',
        caseScores: updatedScores,
        toastMessage: {
          text: `Kasus Selesai! Skor akhir: ${score}/200 Poin. Skor disimpan ke rekam medis.`,
          type: 'success',
        },
      });
    },

    resetCase: () => {
      const { currentCase } = get();
      set({
        currentStage: 'anamnesis',
        score: 0,
        trust: 100,
        questionsState: currentCase.questions.map((q) => ({ ...q, asked: false })),
        chatHistory: [
          {
            id: `intro-${currentCase.id}-reset-${Date.now()}`,
            sender: 'patient',
            text: currentCase.patientInfo.chiefComplaint,
            timestamp: '08:00',
          },
        ],
        isTyping: false,
        completedExamIds: [],
        activeExamId: null,
        selectedPenunjangId: null,
        examinedPenunjangIds: [],
        tambahDataCount: 0,
        penunjangBaseAwarded: false,
        diagnosisAttempts: 0,
        diagnosisSolved: false,
        wrongDiagnosisPopup: null,
        selectedManagement: null,
        managementSolved: false,
        toastMessage: {
          text: 'Kasus direset kembali ke awal. Selamat bertugas!',
          type: 'info',
        },
      });
    },

    clearToast: () => set({ toastMessage: null }),
  };
});
