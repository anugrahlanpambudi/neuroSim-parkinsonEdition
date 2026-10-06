export type GameStage = 
  | 'anamnesis' 
  | 'physical' 
  | 'penunjang' 
  | 'diagnosis' 
  | 'management' 
  | 'education';

export interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  timestamp: string;
}

export interface AnamnesisQuestion {
  id: string;
  question: string;
  answer: string;
  asked: boolean;
}

export type PhysicalExamType = 
  | 'tremor' 
  | 'motorik' 
  | 'rigiditas' 
  | 'akinesia' 
  | 'instabilitas' 
  | 'sensorik';

export interface PhysicalExamItem {
  id: PhysicalExamType;
  title: string;
  subtitle: string;
  isCardinal: boolean;
  points: number;
  completed: boolean;
  summary: string;
}

export type PenunjangType = 'ct_non_kontras' | 'ct_kontras' | 'mri' | 'rontgen';

export interface PenunjangItem {
  id: PenunjangType;
  title: string;
  category: 'CT' | 'MRI' | 'Rontgen';
  subOption?: string;
  pointsAwarded: number;
  penalty: number;
  feedback: string;
  findings: string;
  image: string;
}

export type DiagnosisChoice = 'parkinson_disease' | 'parkinsonism';
export type ManagementChoice = 'rawat_jalan' | 'rawat_inap_neuro' | 'rawat_inap_non_neuro';

export interface GameState {
  score: number;
  trust: number;
  currentStage: GameStage;
  caseNumber: number;
  totalCases: number;
  
  // Anamnesis
  questions: AnamnesisQuestion[];
  chatHistory: ChatMessage[];
  isTyping: boolean;
  
  // Physical exam
  physicalExams: Record<PhysicalExamType, PhysicalExamItem>;
  skippedCardinalWarning: boolean;
  
  // Penunjang
  selectedPenunjang: PenunjangType | null;
  examinedPenunjang: PenunjangType[];
  tambahDataCount: number;
  penunjangBaseAwarded: boolean;
  
  // Diagnosis
  diagnosisAttempts: number;
  diagnosisSolved: boolean;
  
  // Management
  managementSolved: boolean;
  selectedManagement: ManagementChoice | null;
  managementFeedback: string | null;
  
  // Logs & notifications
  toastMessage: { text: string; type: 'success' | 'warning' | 'error' | 'info' } | null;
  
  // Actions
  askQuestion: (questionId: string) => Promise<void>;
  proceedToPhysical: () => boolean;
  completePhysicalExam: (examId: PhysicalExamType) => void;
  proceedToPenunjang: () => boolean;
  selectPenunjang: (choice: PenunjangType) => void;
  requestMoreData: () => void;
  proceedToDiagnosis: () => void;
  submitDiagnosis: (choice: DiagnosisChoice) => { correct: boolean; message: string; pointsDelta: number };
  proceedToManagement: () => void;
  submitManagement: (choice: ManagementChoice) => { correct: boolean; feedback: string; pointsDelta: number };
  proceedToEducation: () => void;
  resetGame: () => void;
  clearToast: () => void;
}
