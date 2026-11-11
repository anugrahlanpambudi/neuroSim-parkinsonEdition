import { DiagnosisChoice, ManagementChoice } from '../types/game';

export interface CaseExamItem {
  id: string;
  title: string;
  subtitle: string;
  points: number;
  isCardinal?: boolean;
  summary: string;
  componentName: 'resting_reemergent' | 'motor_weakness' | 'postural_tremor' | 'gcs_exam' | 'arm_drop' | 'holmes_tremor' | 'rigidity' | 'akinesia' | 'retropulsion' | 'motor_general' | 'sensory_general' | 'reflex_general';
}

export interface CasePenunjangOption {
  id: string;
  title: string;
  category: 'CT' | 'MRI' | 'Rontgen' | 'Laboratorium';
  findings: string;
  interpretation: string;
  pointsAwarded: number;
  isCorrect: boolean;
  feedback: string;
  image: string;
}

export interface CaseManagementOption {
  id: ManagementChoice;
  label: string;
  subtitle: string;
  description: string;
  points: number;
  isCorrect: boolean;
  feedback: string;
}

export interface ClinicalCase {
  id: number;
  title: string;
  subtitle: string;
  categoryTag: string;
  patientInfo: {
    name: string;
    age: number;
    gender: 'Laki-laki' | 'Perempuan';
    occupation: string;
    chiefComplaint: string;
    summary: string;
    image: string;
    vitalSigns?: {
      bp: string;
      hr: string;
      rr: string;
      temp: string;
      spo2: string;
    };
  };
  questions: Array<{
    id: string;
    question: string;
    answer: string;
    asked: boolean;
  }>;
  physicalExams: CaseExamItem[];
  penunjang: CasePenunjangOption[];
  diagnosis: {
    correctChoice: DiagnosisChoice;
    correctLabel: string;
    correctExplanation: string;
    wrongExplanation: string;
    criteriaItems: Array<{ label: string; met: boolean }>;
  };
  management: {
    correctChoice: ManagementChoice;
    correctFeedback: string;
    options: CaseManagementOption[];
    medications: Array<{ drug: string; dose: string; note: string }>;
  };
  education: {
    diagnosisTitle: string;
    diseaseCategory: string;
    keyPoints: Array<{
      title: string;
      items: string[];
    }>;
  };
}

export const CASES_DATA: ClinicalCase[] = [
  // ==========================================
  // CASE 1: 60F - Idiopathic Parkinson Disease
  // ==========================================
  {
    id: 1,
    title: 'Kasus 1: Gemetar Tangan Kiri Kronis Progresif',
    subtitle: 'Wanita 60 Tahun • Poli Saraf RSUD',
    categoryTag: 'SKDI 3A • Gangguan Gerak',
    patientInfo: {
      name: 'Ny. Warsiti',
      age: 60,
      gender: 'Perempuan',
      occupation: 'Pensiunan Guru',
      chiefComplaint: 'Selamat pagi dok, tangan kiri saya gemetar sudah 6 tahun terakhir, belakangan makin mengganggu...',
      summary: 'Pasien datang dengan tremor tangan kiri istirahat sejak 6 tahun yang lalu, kaku pada lengan kiri & kedua tungkai, langkah berjalan pendek dan terseret. Riwayat hipertensi 10 tahun terkontrol.',
      image: '/images/patient-elderly-woman-60yo.jpg',
      vitalSigns: {
        bp: '135/85 mmHg',
        hr: '76 x/menit',
        rr: '18 x/menit',
        temp: '36.6 °C',
        spo2: '98%',
      },
    },
    questions: [
      {
        id: 'c1-q1',
        question: 'Kapan saja dirasakan gemetar?',
        answer: 'Saat aktivitas dan saat istirahat dok, jadi terus-terusan gemetarnya.',
        asked: false,
      },
      {
        id: 'c1-q2',
        question: 'Apakah ada kekakuan sendi?',
        answer: 'Ada dok, lengan kiri dan kedua kaki saya kaku kalau digerakkan.',
        asked: false,
      },
      {
        id: 'c1-q3',
        question: 'Apakah terdapat gangguan berjalan?',
        answer: 'Jalan saya jadi pendek-pendek dok, telapak kaki lengket ke lantai kayak ke lem.',
        asked: false,
      },
      {
        id: 'c1-q4',
        question: 'Apakah ada riwayat jatuh?',
        answer: 'Tidak pernah jatuh dok.',
        asked: false,
      },
      {
        id: 'c1-q5',
        question: 'Apakah ada riwayat penyakit lain?',
        answer: 'Saya hipertensi 10 tahun dok, tapi minum obat teratur.',
        asked: false,
      },
    ],
    physicalExams: [
      {
        id: 'c1-tremor',
        title: 'Tremor Istirahat & Postural',
        subtitle: 'Resting & Re-emergent tremor evaluation',
        points: 15,
        isCardinal: true,
        summary: 'Resting pill-rolling tremor tangan kiri (+) 4-6 Hz, re-emergent tremor (+) setelah jeda postural 2 detik.',
        componentName: 'resting_reemergent',
      },
      {
        id: 'c1-rigiditas',
        title: 'Rigiditas Sendi',
        subtitle: 'Tonus otot & fenomena cogwheel',
        points: 15,
        isCardinal: true,
        summary: 'Rigiditas (+) cogwheel pada lengan kiri dan kedua tungkai.',
        componentName: 'rigidity',
      },
      {
        id: 'c1-akinesia',
        title: 'Akinesia / Bradikinesia',
        subtitle: 'Finger tapping & toe tapping sequence',
        points: 15,
        isCardinal: true,
        summary: 'Bradykinesia (+) pada lengan dan tungkai dengan penurunan amplitudo dan kecepatan progresif.',
        componentName: 'akinesia',
      },
      {
        id: 'c1-instabilitas',
        title: 'Instabilitas Postural',
        subtitle: 'Pull test / retropulsion test',
        points: 15,
        isCardinal: true,
        summary: 'Retropulsion Test Positif - Instabilitas postural (+). Pasien mundur 3-4 langkah tidak stabil.',
        componentName: 'retropulsion',
      },
      {
        id: 'c1-motorik',
        title: 'Kekuatan Motorik',
        subtitle: 'Pemeriksaan MMT keempat ekstremitas',
        points: 5,
        isCardinal: false,
        summary: 'Kekuatan motorik 5/5 keempat ekstremitas simetris, tanpa parese fokal piramidal.',
        componentName: 'motor_general',
      },
      {
        id: 'c1-sensorik',
        title: 'Sensibilitas',
        subtitle: 'Raba halus, nyeri, proprioseptif',
        points: 5,
        isCardinal: false,
        summary: 'Sensibilitas taktil, nosiseptif, dan uji posisi sendi dalam batas normal.',
        componentName: 'sensory_general',
      },
    ],
    penunjang: [
      {
        id: 'c1-ct-non-kontras',
        title: 'CT-Scan Kepala Non-Kontras',
        category: 'CT',
        findings: 'CT Kepala Non-Kontras: Tidak tampak perdarahan, lesi hipodens/hiperdens basal ganglia, massa, maupun hidrosefalus. Kesan: Dalam batas normal.',
        interpretation: 'Tepat! Pilihan lini pertama skrining untuk menyingkirkan lesi struktural mayor / stroke sekunder.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! CT Non-Kontras efisien dan akurat untuk menyingkirkan lesi sekunder (+50 Poin).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c1-mri',
        title: 'MRI Kepala (T1/T2/FLAIR)',
        category: 'MRI',
        findings: 'MRI Kepala: Struktur ganglia basalis intak tanpa lesi vaskular, tumor, ataupun NPH. Atrofi ringan senilis.',
        interpretation: 'Sangat baik! Gold standard neuroimaging guna menyingkirkan Parkinsonism sekunder.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! MRI mengevaluasi struktur ganglia basalis detail (+50 Poin).',
        image: '/images/mri-brain-normal.jpg',
      },
      {
        id: 'c1-ct-kontras',
        title: 'CT-Scan Kepala Dengan Kontras',
        category: 'CT',
        findings: 'Tidak tampak enhancing lesion intrakranial.',
        interpretation: 'Kontras tidak diperlukan pada skrining awal Parkinson idiopatik (risiko radiasi & nefropati).',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'CT Kontras: Modalitas berlebih, risiko alergi/kontras (+35 Poin, -15 penalty).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c1-rontgen',
        title: 'Rontgen Kepala & Thorax',
        category: 'Rontgen',
        findings: 'Rontgen kepala dan thorax dalam batas normal.',
        interpretation: 'Modalitas tidak relevan untuk evaluasi parenkim otak atau sindrom Parkinson.',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'Rontgen: Tidak relevan untuk keluhan gerak/tremor (+35 Poin, -15 penalty).',
        image: '/images/xray-normal.jpg',
      },
    ],
    diagnosis: {
      correctChoice: 'parkinson_disease',
      correctLabel: 'Parkinson Disease (PD) Idiopatik',
      correctExplanation: 'Tepat! Gejala asimetris, kronis gradual 6 tahun, 4 tanda kardinal TRAP (+), tanpa red flags, neuroimaging normal → Memenuhi kriteria UK PD Brain Bank.',
      wrongExplanation: 'Kurang Tepat. Pasien tidak memiliki tanda red flags atau etiologi sekunder (tidak ada stroke fokal, tidak ada paparan obat, tidak ada disfungsi otonom berat dini). Ini adalah Parkinson Disease idiopatik.',
      criteriaItems: [
        { label: 'Onset asimetris (unilateral kiri)', met: true },
        { label: 'Resting pill-rolling tremor 4–6 Hz', met: true },
        { label: 'Rigiditas cogwheel (+)', met: true },
        { label: 'Bradikinesia progresif (+)', met: true },
        { label: 'Instabilitas postural (+)', met: true },
        { label: 'Neuroimaging normal (tanpa infark/tumor)', met: true },
      ],
    },
    management: {
      correctChoice: 'rawat_jalan',
      correctFeedback: 'Tepat. SKDI 3A: Pasien Parkinson Disease stabil ditatalaksana rawat jalan di Poli Saraf dengan medikamentosa (Levodopa/Carbidopa atau Dopamin Agonis), fisioterapi, dan edukasi.',
      options: [
        {
          id: 'rawat_jalan',
          label: 'Rawat Jalan Poli Saraf',
          subtitle: 'SKDI 3A — Tatalaksana Lini Pertama',
          description: 'Pasien stabil secara klinis. Terapi rawat jalan dengan medikamentosa Levodopa, fisioterapi, dan edukasi.',
          points: 30,
          isCorrect: true,
          feedback: 'Tepat! Pasien stabil ditatalaksana di Poli Saraf (+30 Poin).',
        },
        {
          id: 'rawat_inap_neuro',
          label: 'Rawat Inap Bangsal Neurologi',
          subtitle: 'Indikasi: Krisis / Komplikasi Berat',
          description: 'Rawat inap dipertimbangkan bila ada Parkinson Crisis atau aspirasi pneumonia. Saat ini pasien stabil.',
          points: -10,
          isCorrect: false,
          feedback: 'Tidak perlu rawat inap. Pasien kondisi klinis stabil tanpa kegawatdaruratan (-10 Poin).',
        },
        {
          id: 'rawat_inap_non_neuro',
          label: 'Rawat Inap Non-Neurologi',
          subtitle: 'Bangsal Penyakit Dalam / Umum',
          description: 'Salah indikasi: Pasien memerlukan tatalaksana spesifik neurologi rawat jalan.',
          points: -20,
          isCorrect: false,
          feedback: 'Salah indikasi: Tidak ada indikasi rawat inap non-neurologi (-20 Poin).',
        },
      ],
      medications: [
        { drug: 'Levodopa / Carbidopa', dose: '3 × 100/25 mg', note: 'Lini pertama usia >65 tahun / disabilitas fungsional' },
        { drug: 'Pramipexole (Dopamin Agonis)', dose: '3 × 0.25–1 mg', note: 'Pertimbangkan pada pasien lebih muda <65 thn' },
        { drug: 'Trihexyphenidyl', dose: '3 × 2 mg', note: 'Jika tremor dominan, hati-hati pada lansia' },
      ],
    },
    education: {
      diagnosisTitle: 'Parkinson Disease Idiopatik (SKDI 3A)',
      diseaseCategory: 'Idiopatik Neurodegeneratif',
      keyPoints: [
        {
          title: '4 Gejala Kardinal (TRAP)',
          items: [
            'Tremor istirahat (pill-rolling 4–6 Hz, unilateral/asimetris)',
            'Rigiditas sendi (cogwheel phenomenon)',
            'Akinesia / Bradikinesia (penurunan progresif kecepatan gerak)',
            'Postural instability (uji retropulsi abnormal)',
          ],
        },
        {
          title: 'Prinsip Tatalaksana Rawat Jalan',
          items: [
            'Pemberian dopaminergik disesuaikan dengan usia dan disabilitas fungsional',
            'Edukasi kepatuhan obat dan fisioterapi mencegah imobilitas',
          ],
        },
      ],
    },
  },

  // ==========================================
  // CASE 2: 47M - Vascular Parkinsonism + Acute Ischemic Stroke
  // ==========================================
  {
    id: 2,
    title: 'Kasus 2: Kelemahan Separuh Tubuh Akut & Kaku Tungkai',
    subtitle: 'Laki-laki 47 Tahun • UGD / Poli Saraf RSUD',
    categoryTag: 'SKDI 3B/4A • Vaskular Akut',
    patientInfo: {
      name: 'Tn. Hendra',
      age: 47,
      gender: 'Laki-laki',
      occupation: 'Wiraswasta',
      chiefComplaint: 'Selamat pagi dok, tubuh saya kaku dan mendadak tangan serta kaki kanan saya lemas sejak kemarin pagi...',
      summary: 'Laki-laki 47 tahun dengan progresif kaku tungkai 5 bulan terakhir dan kelemahan mendadak tangan/kaki kanan sejak 1 hari lalu. Tanpa tremor tangan. Riwayat hampir jatuh 3 bulan terakhir. Baru terdiagnosis Diabetes Melitus 1 bulan dan riwayat perokok berat.',
      image: '/images/patient-man-47yo.jpg',
      vitalSigns: {
        bp: '165/100 mmHg',
        hr: '84 x/menit',
        rr: '19 x/menit',
        temp: '36.8 °C',
        spo2: '97%',
      },
    },
    questions: [
      {
        id: 'c2-q1',
        question: 'Bagaimana awal mula kelemahan dan kekakuan dirasakan?',
        answer: 'Kekakuan kaki sudah sekitar 5 bulan perlahan dok, tapi tangan dan kaki kanan tiba-tiba terasa lemas dan berat sejak 1 hari lalu.',
        asked: false,
      },
      {
        id: 'c2-q2',
        question: 'Apakah ada gemetar (tremor) pada tangan atau kaki?',
        answer: 'Tidak ada gemetar sama sekali dok, cuma kaku dan lemas sebelah kanan.',
        asked: false,
      },
      {
        id: 'c2-q3',
        question: 'Bagian tubuh mana yang terasa paling kaku?',
        answer: 'Kaki kiri dan kedua tungkai saya kaku dok, kalau jalan seperti menyeret dan langkah pendek.',
        asked: false,
      },
      {
        id: 'c2-q4',
        question: 'Apakah ada riwayat jatuh atau hampir jatuh?',
        answer: 'Saya sering hampir jatuh tersandung dalam 3 bulan terakhir dok saat berjalan.',
        asked: false,
      },
      {
        id: 'c2-q5',
        question: 'Apakah ada riwayat penyakit gula, tekanan darah, atau kebiasaan merokok?',
        answer: 'Saya perokok aktif 1 bungkus sehari dok, dan 1 bulan lalu baru terdeteksi sakit gula (Diabetes Melitus).',
        asked: false,
      },
    ],
    physicalExams: [
      {
        id: 'c2-postural-tremor',
        title: 'Uji Tremor Postural',
        subtitle: 'Pemeriksaan tremor saat kedua tangan merentang',
        points: 10,
        isCardinal: false,
        summary: 'Tremor istirahat negatif. Tampak tremor postural halus simetris 8-10 Hz pada kedua tangan terentang.',
        componentName: 'postural_tremor',
      },
      {
        id: 'c2-motor-weakness',
        title: 'Pemeriksaan Paresis Motorik (Drift Test)',
        subtitle: 'Uji drift lengan & kekuatan otot piramidal',
        points: 20,
        isCardinal: true,
        summary: 'Hemiparesis Dextra (+): Pronator drift positif pada lengan kanan, kekuatan ekstremitas kanan 3/5 - 4/5, ekstremitas kiri 5/5.',
        componentName: 'motor_weakness',
      },
      {
        id: 'c2-rigiditas-tungkai',
        title: 'Rigiditas Tungkai Bawah',
        subtitle: 'Pemeriksaan tonus lead-pipe / spastik tungkai',
        points: 15,
        isCardinal: true,
        summary: 'Rigiditas nyata pada kedua tungkai bawah (Lower Body Parkinsonism), tonus lengan relatif minimal.',
        componentName: 'rigidity',
      },
      {
        id: 'c2-akinesia-tungkai',
        title: 'Akinesia / Bradikinesia Tungkai',
        subtitle: 'Toe tapping & evaluasi langkah jalan pendek',
        points: 15,
        isCardinal: true,
        summary: 'Bradikinesia tungkai (+) signifikan, gaya berjalan magnetic/shuffling gait pada tungkai bawah.',
        componentName: 'akinesia',
      },
      {
        id: 'c2-instabilitas-negatif',
        title: 'Instabilitas Postural (Pull Test)',
        subtitle: 'Uji tarikan bahu retropulsi',
        points: 10,
        isCardinal: true,
        summary: 'Pull test negatif (stabil): Pasien mampu mengoreksi keseimbangan dalam 1 langkah tanpa jatuh.',
        componentName: 'retropulsion',
      },
    ],
    penunjang: [
      {
        id: 'c2-ct-non-kontras',
        title: 'CT-Scan Kepala Non-Kontras',
        category: 'CT',
        findings: 'CT Non-Kontras: Tampak multiple lacunar infarcts pada ganglia basalis bilateral + area hipodens batas tegas pada corona radiata kiri sesuai infark serebri iskemik akut.',
        interpretation: 'Tepat! Mengonfirmasi infark iskemik akut pada corona radiata kiri serta infark lakunar kronis ganglia basalis (Vascular Parkinsonism).',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! CT Non-Kontras memperlihatkan infark lakunar multipel basal ganglia & infark akut corona radiata kiri (+50 Poin).',
        image: '/images/ct-brain-stroke.jpg',
      },
      {
        id: 'c2-mri',
        title: 'MRI Kepala (DWI / FLAIR)',
        category: 'MRI',
        findings: 'MRI Kepala: Tampak lesi restriksi difusi (DWI hiperintens) pada corona radiata kiri (infark akut <24 jam) serta multipel infark lakunar kronis di putamen & globus palidus.',
        interpretation: 'Sangat tepat! DWI sensitif membuktikan stroke iskemik akut yang mendasari hemiparesis kanan.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! MRI DWI membuktikan stroke iskemik akut corona radiata kiri dan lakunar basal ganglia (+50 Poin).',
        image: '/images/mri-brain-normal.jpg',
      },
      {
        id: 'c2-ct-kontras',
        title: 'CT-Scan Kepala Dengan Kontras',
        category: 'CT',
        findings: 'Tidak tampak lesi metastasis atau tumor intrakranial.',
        interpretation: 'Kontras tidak diindikasikan pada evaluasi awal stroke iskemik akut (risiko nefropati diabetik).',
        pointsAwarded: 40,
        isCorrect: false,
        feedback: 'CT Kontras: Tidak diindikasikan pada stroke akut awal, penalti (-10 Poin).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c2-rontgen',
        title: 'Rontgen Kepala & Thorax',
        category: 'Rontgen',
        findings: 'Cor dan pulmo dalam batas normal.',
        interpretation: 'Rontgen tidak mampu mengevaluasi jaringan parenkim otak atau etiologi stroke.',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'Rontgen: Tidak relevan untuk diagnosis neurologis akut (-15 Poin penalti).',
        image: '/images/xray-normal.jpg',
      },
    ],
    diagnosis: {
      correctChoice: 'parkinsonism',
      correctLabel: 'Parkinsonism Sekunder (Vascular Parkinsonism + Stroke Iskemik Akut)',
      correctExplanation: 'Tepat! Gejala dominan pada tubuh bawah (lower body parkinsonism), onset akut hemiparesis dextra 1 hari, tanpa resting tremor, dan CT/MRI membuktikan multiple lacunar infarcts basal ganglia + infark akut corona radiata kiri.',
      wrongExplanation: 'Kurang Tepat. Pasien mengalami defisit neurologis fokal akut hemiparesis kanan 1 hari, faktor risiko DM dan merokok, serta gambaran infark lakunar basal ganglia. Ini adalah Parkinsonism Vaskular (bukan PD idiopatik).',
      criteriaItems: [
        { label: 'Onset akut kelemahan separuh tubuh (1 hari)', met: true },
        { label: 'Lower body parkinsonism (kaku & gait dominan kaki)', met: true },
        { label: 'Tremor istirahat klasik (-) negatif', met: true },
        { label: 'Faktor risiko vaskular (DM, perokok aktif)', met: true },
        { label: 'CT/MRI: Multiple lacunar infarcts basal ganglia + infark corona radiata', met: true },
      ],
    },
    management: {
      correctChoice: 'rawat_inap_neuro',
      correctFeedback: 'Tepat! Stroke Iskemik Akut onset <7 hari adalah kegawatdaruratan neurologis yang WAJIB dirawat inap di Bangsal Neurologi / Stroke Unit untuk terapi antitrombotik, stabilisasi hemodinamik, monitoring defisit neurologis, dan tatalaksana komorbiditas.',
      options: [
        {
          id: 'rawat_inap_neuro',
          label: 'Rawat Inap Bangsal Neurologi / Stroke Unit',
          subtitle: 'Indikasi: Stroke Iskemik Akut <7 Hari',
          description: 'Pasien mengalami stroke iskemik akut baru 1 hari. Memerlukan rawat inap segera untuk trombolisis/antiplatelet, kontrol gula darah, dan monitoring ketat.',
          points: 30,
          isCorrect: true,
          feedback: 'Tepat! Pasien stroke akut onset 1 hari wajib rawat inap di Unit Neurologi (+30 Poin).',
        },
        {
          id: 'rawat_jalan',
          label: 'Rawat Jalan Poli Saraf',
          subtitle: 'Tidak Tepat — Berbahaya',
          description: 'Pasien berada dalam periode kritis stroke akut (<72 jam). Memulangkan pasien rawat jalan berisiko fatal perburukan infark.',
          points: -20,
          isCorrect: false,
          feedback: 'Salah Fatal: Pasien stroke akut onset 1 hari tidak boleh dipulangkan rawat jalan! (-20 Poin).',
        },
        {
          id: 'rawat_inap_non_neuro',
          label: 'Rawat Inap Non-Neurologi',
          subtitle: 'Bangsal Umum Tanpa Monitor Stroke',
          description: 'Stroke akut memerlukan penanganan spesifik dan protokol stroke unit oleh spesialis neurologi.',
          points: -20,
          isCorrect: false,
          feedback: 'Kurang tepat: Pasien memerlukan pemantauan neurologis komprehensif di bangsal saraf (-20 Poin).',
        },
      ],
      medications: [
        { drug: 'Aspirin (Antiplatelet)', dose: '1 × 160–320 mg loading, lalu 1 × 80 mg', note: 'Diberikan dalam 24-48 jam pertama stroke iskemik' },
        { drug: 'Atorvastatin', dose: '1 × 40–80 mg', note: 'Statin intensitas tinggi untuk stabilisasi plak' },
        { drug: 'Regulasi Glukosa Darah', dose: 'Insulin sliding scale', note: 'Target GDS 140-180 mg/dL pada stroke akut' },
      ],
    },
    education: {
      diagnosisTitle: 'Vascular Parkinsonism & Acute Ischemic Stroke',
      diseaseCategory: 'Parkinsonism Sekunder Vaskular',
      keyPoints: [
        {
          title: 'Karakteristik Vascular Parkinsonism (VP)',
          items: [
            'Dominan gejala ekstremitas bawah (Lower Body Parkinsonism)',
            'Langkah berjalan lebar/pendek (magnetic / shuffling gait)',
            'Tremor istirahat seringkali tidak dijumpai',
            'Respon terhadap Levodopa umumnya buruk atau minimal',
            'Berkorelasi kuat dengan penyakit pembuluh darah kecil subkortikal (microangiopathy)',
          ],
        },
        {
          title: 'Kegawatdaruratan Stroke Akut',
          items: [
            'Onset kelemahan motorik fokal <7 hari memerlukan rawat inap stroke unit',
            'Pencegahan komplikasi aspirasi, edema serebri, dan konversi perdarahan',
          ],
        },
      ],
    },
  },

  // ==========================================
  // CASE 3: 52F - Uremic Encephalopathy + Enhanced Physiological Tremor
  // ==========================================
  {
    id: 3,
    title: 'Kasus 3: Penurunan Kesadaran, Bicara Kacau & Tremor',
    subtitle: 'Wanita 52 Tahun • Rujukan Hemodialisis / UGD',
    categoryTag: 'SKDI 3B • Kegawatdaruratan Metabolik',
    patientInfo: {
      name: 'Ibu Ratna',
      age: 52,
      gender: 'Perempuan',
      occupation: 'Ibu Rumah Tangga',
      chiefComplaint: 'Selamat pagi dok, ibu saya dibawa ke sini karena bicaranya mulai melantur dan tangannya bergetar sejak beberapa hari ini...',
      summary: 'Wanita 52 tahun dengan penurunan kesadaran bertahap (somnolen) sejak 2 hari, bicara melantur dan tremor saat aktivitas sejak 3 hari. Riwayat Hipertensi 10 tahun dan CKD Stadium V rutin HD 5 bulan yang lalu, namun melewatkan 2 sesi cuci darah terakhir.',
      image: '/images/patient-woman-52yo.jpg',
      vitalSigns: {
        bp: '170/105 mmHg',
        hr: '98 x/menit',
        rr: '24 x/menit (Kussmaul)',
        temp: '37.1 °C',
        spo2: '96%',
      },
    },
    questions: [
      {
        id: 'c3-q1',
        question: 'Kapan mulai terjadi penurunan kesadaran atau perubahan perilaku?',
        answer: 'Keluarga: Sejak 2 hari terakhir ibu tampak sangat mengantuk, sulit diajak komunikasi teratur, dan bingung dok.',
        asked: false,
      },
      {
        id: 'c3-q2',
        question: 'Sejak kapan tampak gemetar dan bagaimana sifatnya?',
        answer: 'Keluarga: Sekitar 3 hari ini tangannya bergetar kalau mau ambil sendok atau mengangkat cangkir (saat aktivitas), tapi kalau lagi tidur tidak gemetar.',
        asked: false,
      },
      {
        id: 'c3-q3',
        question: 'Apakah ada kekakuan otot pada lengan atau tungkai?',
        answer: 'Tidak ada kaku sama sekali dok, badannya justru terasa lemas dan terkulai.',
        asked: false,
      },
      {
        id: 'c3-q4',
        question: 'Bagaimana pola bicaranya akhir-akhir ini?',
        answer: 'Bicaranya kacau melantur sejak kemarin dok, apalagi ibu kemarin sempat menunda jadwal cuci darahnya.',
        asked: false,
      },
      {
        id: 'c3-q5',
        question: 'Bagaimana riwayat penyakit ginjal dan hipertensi selama ini?',
        answer: 'Ibu punya hipertensi sudah 10 tahun dan gagal ginjal kronis (CKD Stadium V) 1 tahun, sudah rutin cuci darah (HD) 5 bulan terakhir dok.',
        asked: false,
      },
    ],
    physicalExams: [
      {
        id: 'c3-gcs-exam',
        title: 'Penilaian Tingkat Kesadaran (GCS)',
        subtitle: 'Evaluasi respon membuka mata, bicara, dan motorik',
        points: 20,
        isCardinal: true,
        summary: 'GCS 12 (E3M5V4): Buka mata terhadap suara (E3), bicara kacau/disorientasi (V4), melokalisir rangsang nyeri (M5) — Somnolen metabolik.',
        componentName: 'gcs_exam',
      },
      {
        id: 'c3-arm-drop',
        title: 'Arm Drop Test (Uji Jatuh Lengan)',
        subtitle: 'Mengevaluasi simetri tonus dan menyingkirkan lateralisasi paresis',
        points: 15,
        isCardinal: true,
        summary: 'Kedua lengan jatuh bersamaan simetris tanpa lateralisasi / hemiparesis. Refleks tonus metabolik flaksid difus.',
        componentName: 'arm_drop',
      },
      {
        id: 'c3-rigiditas-normal',
        title: 'Pemeriksaan Rigiditas Sendi',
        subtitle: 'Evaluasi tonus cogwheel / spastik',
        points: 10,
        isCardinal: false,
        summary: 'Rigiditas negatif: Tonus sendi lemas/hipotonik bilateral, tidak dijumpai rigiditas cogwheel maupun lead-pipe.',
        componentName: 'rigidity',
      },
      {
        id: 'c3-postural-tremor',
        title: 'Pemeriksaan Tremor Postural & Asterixis',
        subtitle: 'Uji tangan terentang (flapping tremor / asterixis)',
        points: 15,
        isCardinal: true,
        summary: 'Tampak enhanced physiological tremor frekuensi 8-10 Hz dan asterixis metabolik (flapping tremor) saat pergelangan tangan dorsofleksi.',
        componentName: 'postural_tremor',
      },
      {
        id: 'c3-refleks-fisiologis',
        title: 'Refleks Fisiologis & Primitif',
        subtitle: 'BPR, TPR, KPR, APR bilateral',
        points: 10,
        isCardinal: false,
        summary: 'Refleks fisiologis menurun simetris pada keempat ekstremitas (+1/+1), refleks patologis Babinski negatif.',
        componentName: 'reflex_general',
      },
    ],
    penunjang: [
      {
        id: 'c3-lab-darah',
        title: 'Pemeriksaan Laboratorium CITO (Fungsi Ginjal & Elektrolit)',
        category: 'Laboratorium',
        findings: 'Hasil Lab Darah CITO: Ureum 280 mg/dL (sangat meningkat), Kreatinin 12.5 mg/dL, eGFR 4 mL/min/1.73m², Kalium 6.2 mEq/L (Hiperkalemia), Bikarbonat 14 mEq/L (Asidosis metabolik).',
        interpretation: 'Tepat dan krusial! Membuktikan Ensefalopati Uremikum dan kegawatdaruratan hiperkalemia pada pasien gagal ginjal kronis.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! Pemeriksaan laboratorium fungsi ginjal & elektrolit adalah kunci diagnosis primer (+50 Poin).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c3-ct-non-kontras',
        title: 'CT-Scan Kepala Non-Kontras',
        category: 'CT',
        findings: 'CT Kepala: Tidak tampak lesi struktural fokal akut, perdarahan, ataupun lesi infark luas. Kesan: Otak dalam batas normal metabolik.',
        interpretation: 'Menyingkirkan stroke atau perdarahan intrakranial, namun bukan modalitas diagnostik utama.',
        pointsAwarded: 10,
        isCorrect: false,
        feedback: 'CT Kepala normal, menyingkirkan lesi fokal (+10 Poin). Lab darah adalah penunjang utama!',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c3-mri',
        title: 'MRI Kepala',
        category: 'MRI',
        findings: 'MRI Kepala dalam batas normal tanpa lesi fokal struktural.',
        interpretation: 'MRI tidak diperlukan darurat dan menunda penanganan hemodialisis cito.',
        pointsAwarded: 10,
        isCorrect: false,
        feedback: 'MRI tidak mendesak pada ensefalopati metabolik uremikum (+10 Poin).',
        image: '/images/mri-brain-normal.jpg',
      },
      {
        id: 'c3-rontgen',
        title: 'Rontgen Thorax AP',
        category: 'Rontgen',
        findings: 'Kardiomegali ringan, kongesti vaskular suprahilar minimal.',
        interpretation: 'Tanda overload cairan pada gagal ginjal.',
        pointsAwarded: 15,
        isCorrect: false,
        feedback: 'Rontgen thorax: Bukti sekunder fluid overload (+15 Poin).',
        image: '/images/xray-normal.jpg',
      },
    ],
    diagnosis: {
      correctChoice: 'parkinsonism',
      correctLabel: 'Parkinsonism Sekunder / Ensefalopati Uremikum + Enhanced Physiological Tremor',
      correctExplanation: 'Tepat! Penurunan kesadaran (GCS 12), tremor postural simetris/asterixis, tonus flaksid, dan kadar Ureum 280 mg/dL + Kreatinin 12.5 mg/dL mengonfirmasi Ensefalopati Uremikum metabolik, bukan penyakit Parkinson idiopatik.',
      wrongExplanation: 'Kurang Tepat. Pasien tidak menderita Parkinson Disease primer. Gejala tremor dan kebingungan ini disebabkan oleh intoksikasi uremik sistemik (Ensefalopati Uremikum).',
      criteriaItems: [
        { label: 'Penurunan kesadaran akut/subakut (GCS 12)', met: true },
        { label: 'Tremor postural simetris + asterixis flapping', met: true },
        { label: 'Tonus kaku cogwheel negatif (-)', met: true },
        { label: 'Laboratorium: Ureum 280 mg/dL & Kreatinin 12.5 mg/dL', met: true },
        { label: 'Riwayat CKD V dengan hemodialisis tertunda', met: true },
      ],
    },
    management: {
      correctChoice: 'rawat_inap_non_neuro',
      correctFeedback: 'Tepat! Pasien berada dalam kegawatdaruratan medis metabolik (Ensefalopati Uremikum + Hiperkalemia 6.2 mEq/L) yang memerlukan RAWAT INAP SEGERA di Divisi Penyakit Dalam / Nefrologi untuk Hemodialisis CITO (Cuci Darah Darurat)!',
      options: [
        {
          id: 'rawat_inap_non_neuro',
          label: 'Rawat Inap Non-Neurologi (IPD / Nefrologi - HD CITO)',
          subtitle: 'Indikasi: Ensefalopati Uremikum & Hiperkalemia Akut',
          description: 'Konsul CITO Nefrologi Penyakit Dalam untuk hemodialisis emergensi dan stabilisasi elektrolit di ruang rawat intensif.',
          points: 30,
          isCorrect: true,
          feedback: 'Tepat! Pasien wajib rawat inap IPD untuk Hemodialisis CITO segera (+30 Poin).',
        },
        {
          id: 'rawat_inap_neuro',
          label: 'Rawat Inap Bangsal Neurologi',
          subtitle: 'Kurang Tepat — Bukan Kasus Neurologi Primer',
          description: 'Etiologi primer adalah gagal ginjal terminal dengan uremia. Penanganan definitif berada di bawah departemen Nefrologi.',
          points: -10,
          isCorrect: false,
          feedback: 'Kurang tepat: Kasus ini membutuhkan tindakan hemodialisis cito oleh tim IPD/Nefrologi (-10 Poin).',
        },
        {
          id: 'rawat_jalan',
          label: 'Rawat Jalan Poli Saraf',
          subtitle: 'Salah Fatal — Berbahaya',
          description: 'Hiperkalemia 6.2 dan ensefalopati uremikum berisiko henti jantung fatal jika dipulangkan.',
          points: -20,
          isCorrect: false,
          feedback: 'Salah Fatal: Pasien dengan kalium 6.2 dan uremia berat dapat mengalami aritmia fatal jika rawat jalan (-20 Poin).',
        },
      ],
      medications: [
        { drug: 'Kalsium Glukonat 10%', dose: '1 ampul IV pelan dalam 5 menit', note: 'Kardioprotektif segera untuk hiperkalemia 6.2 mEq/L' },
        { drug: 'Insulin Cepat + Dekstrosa 40%', dose: '10 IU Regular Insulin + 50 ml D40%', note: 'Memasukkan kalium ke dalam sel' },
        { drug: 'Hemodialisis CITO', dose: 'Ultrafiltrasi & dialisis emergensi', note: 'Tatalaksana definitif eliminasi toksin uremik' },
      ],
    },
    education: {
      diagnosisTitle: 'Uremic Encephalopathy with Enhanced Physiological Tremor',
      diseaseCategory: 'Parkinsonism Metabolik / Ensefalopati Toksik',
      keyPoints: [
        {
          title: 'Karakteristik Tremor Metabolik Uremik',
          items: [
            'Enhanced Physiological Tremor: frekuensi tinggi 8–12 Hz simetris kedua tangan',
            'Asterixis (Negative Myoclonus): henti mendadak tonus otot postural (flapping tangan)',
            'Fluktuasi kesadaran dan disorientasi sesuai kadar toksin uremik',
            'Resolusi penuh setelah eliminasi toksin melalui Hemodialisis',
          ],
        },
        {
          title: 'Manajemen Emergensi',
          items: [
            'Prioritas penyelamatan jiwa: stabilitas jantung pada hiperkalemia',
            'Hemodialisis CITO adalah indikasi mutlak kegawatdaruratan nefrologi',
          ],
        },
      ],
    },
  },

  // ==========================================
  // CASE 4: 20M - Post-Meningitis Parkinsonism
  // ==========================================
  {
    id: 4,
    title: 'Kasus 4: Kekakuan Menyeluruh Pasca-Meningitis',
    subtitle: 'Laki-laki 20 Tahun • Poli Saraf RSUD',
    categoryTag: 'SKDI 3A • Parkinsonism Sekunder Pasca-Infeksi',
    patientInfo: {
      name: 'Sdr. Dimas',
      age: 20,
      gender: 'Laki-laki',
      occupation: 'Mahasiswa',
      chiefComplaint: 'Selamat siang dok, gerakan tubuh saya terasa sangat lambat dan kaku di kedua sisi sejak sembuh dari radang selaput otak...',
      summary: 'Laki-laki 20 tahun dengan keluhan kaku dan lambat bergerak simetris bilateral sejak 3 bulan terakhir. Riwayat dirawat di RS akibat Meningitis Bakterial 5 bulan yang lalu. Tremor tidak dominan. Langkah pendek simetris dan wajah topeng (hipomimia).',
      image: '/images/patient-youngman-20yo.jpg',
      vitalSigns: {
        bp: '120/80 mmHg',
        hr: '72 x/menit',
        rr: '16 x/menit',
        temp: '36.7 °C',
        spo2: '99%',
      },
    },
    questions: [
      {
        id: 'c4-q1',
        question: 'Kapan mulai dirasakan kekakuan dan perlambatan gerak?',
        answer: 'Sekitar 3 bulan ini dok, tangan dan kaki terasa kaku bersamaan di kanan maupun kiri setelah keluar RS.',
        asked: false,
      },
      {
        id: 'c4-q2',
        question: 'Apakah ada riwayat infeksi otak atau meningitis sebelumnya?',
        answer: 'Ya dok, 5 bulan lalu saya sempat dirawat 3 minggu di RS karena Meningitis Bakterial berat.',
        asked: false,
      },
      {
        id: 'c4-q3',
        question: 'Apakah ada keluhan tangan bergetar (tremor)?',
        answer: 'Tremor tidak dominan dok, hanya sedikit bergetar kalau cemas atau tegang, tapi yang paling mengganggu kaku dan lambat sekali.',
        asked: false,
      },
      {
        id: 'c4-q4',
        question: 'Bagaimana dengan ekspresi wajah dan cara berjalan?',
        answer: 'Keluarga bilang wajah saya jadi datar tanpa ekspresi (seperti topeng) dan langkah kaki saya lambat pendek-pendek.',
        asked: false,
      },
      {
        id: 'c4-q5',
        question: 'Apakah ada riwayat minum obat-obatan mual, muntah, atau penenang?',
        answer: 'Tidak pernah dok, hanya antibiotik rutin waktu dirawat meningitis dulu.',
        asked: false,
      },
    ],
    physicalExams: [
      {
        id: 'c4-rigiditas-bilateral',
        title: 'Pemeriksaan Rigiditas Bilateral',
        subtitle: 'Evaluasi tonus lead-pipe / cogwheel kedua sisi tubuh',
        points: 20,
        isCardinal: true,
        summary: 'Rigiditas bilateral simetris lead-pipe pada kedua lengan dan kedua tungkai bawah.',
        componentName: 'rigidity',
      },
      {
        id: 'c4-akinesia-bilateral',
        title: 'Akinesia / Bradikinesia Bilateral',
        subtitle: 'Uji finger tapping & ekspresi wajah (hipomimia)',
        points: 20,
        isCardinal: true,
        summary: 'Bradikinesia berat simetris pada kedua tangan, refleks kedip menurun (mask-like face / hipomimia).',
        componentName: 'akinesia',
      },
      {
        id: 'c4-tremor-ringan',
        title: 'Pemeriksaan Tremor',
        subtitle: 'Evaluasi tremor postural dan istirahat',
        points: 10,
        isCardinal: false,
        summary: 'Tremor istirahat minimal/ringan simetris, tidak dijumpai tremor pill-rolling kasar unilateral.',
        componentName: 'postural_tremor',
      },
      {
        id: 'c4-motorik-normal',
        title: 'Pemeriksaan Kekuatan Motorik',
        subtitle: 'MMT keempat ekstremitas',
        points: 10,
        isCardinal: false,
        summary: 'Kekuatan motorik 5/5 di keempat ekstremitas, tidak dijumpai kelemahan paresis piramidal.',
        componentName: 'motor_general',
      },
      {
        id: 'c4-kaku-kuduk-negatif',
        title: 'Tanda Rangsang Meningeal & Refleks',
        subtitle: 'Kaku kuduk, Brudzinski, Kernig sign',
        points: 10,
        isCardinal: false,
        summary: 'Kaku kuduk negatif (-), tanda Kernig & Brudzinski negatif (infeksi meningeal akut telah resolusi).',
        componentName: 'sensory_general',
      },
    ],
    penunjang: [
      {
        id: 'c4-mri-ct',
        title: 'MRI / CT-Scan Kepala',
        category: 'MRI',
        findings: 'MRI Kepala: Tampak atrofi serebri ringan pasca-meningitis, pelebaran sulki minimal, ventrikel normal tanpa hidrosefalus, struktur substansia nigra tanpa lesi kistik.',
        interpretation: 'Tepat! Menyingkirkan hidrosefalus pasca-meningitis atau abses serebri sekunder.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! Neuroimaging membuktikan tidak ada hidrosefalus komunikans atau lesi aktif (+50 Poin).',
        image: '/images/mri-brain-normal.jpg',
      },
      {
        id: 'c4-ct-kontras',
        title: 'CT-Scan Kepala Dengan Kontras',
        category: 'CT',
        findings: 'Tidak tampak meningeal enhancement aktif pasca-terapi antibiotik tuntas.',
        interpretation: 'Meningitis telah resolusi klinis, kontras tidak rutin diperlukan.',
        pointsAwarded: 40,
        isCorrect: false,
        feedback: 'CT Kontras: Kurang efisien, infeksi telah tuntas 5 bulan lalu (-10 Poin).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c4-rontgen',
        title: 'Rontgen Thorax',
        category: 'Rontgen',
        findings: 'Cor dan pulmo dalam batas normal.',
        interpretation: 'Tidak relevan untuk evaluasi sindrom ekstrapiramidal pasca-infeksi.',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'Rontgen: Tidak relevan untuk keluhan rigiditas post-meningitis (-15 Poin).',
        image: '/images/xray-normal.jpg',
      },
    ],
    diagnosis: {
      correctChoice: 'parkinsonism',
      correctLabel: 'Parkinsonism Sekunder Pasca-Meningitis (Post-Encephalitic / Post-Meningitis Parkinsonism)',
      correctExplanation: 'Tepat! Onset usia muda 20 tahun, riwayat meningitis bakterial 5 bulan lalu, gejala rigiditas dan akinesia simetris bilateral sejak awal, tanpa resting tremor asimetris klasik → Diagnosis: Parkinsonism Sekunder Pasca-Meningitis.',
      wrongExplanation: 'Kurang Tepat. Onset simetris pada usia 20 tahun pasca-infeksi meningitis bakterial adalah ciri klasik Parkinsonism Pasca-Infeksi (bukan penyakit degeneratif Parkinson Disease idiopatik).',
      criteriaItems: [
        { label: 'Riwayat infeksi meningitis bakterial berat 5 bulan lalu', met: true },
        { label: 'Kekakuan (rigiditas) simetris bilateral sejak onset', met: true },
        { label: 'Bradikinesia berat dengan hipomimia wajah', met: true },
        { label: 'Tremor istirahat pill-rolling tidak dominan', met: true },
        { label: 'Neuroimaging: Atrofi pasca-infeksi tanpa hidrosefalus', met: true },
      ],
    },
    management: {
      correctChoice: 'rawat_jalan',
      correctFeedback: 'Tepat! SKDI 3A: Pasien Parkinsonism Pasca-Meningitis dalam kondisi klinis stabil ditatalaksana rawat jalan di Poli Saraf dengan titrasi dopaminergik (Levodopa/Carbidopa) dosis rendah serta fisioterapi intensif.',
      options: [
        {
          id: 'rawat_jalan',
          label: 'Rawat Jalan Poli Saraf & Rehabilitasi Medik',
          subtitle: 'SKDI 3A — Tatalaksana Konservatif',
          description: 'Titrasi Levodopa/Carbidopa dosis rendah bertahap untuk menilai respon dopaminergik, disertai program fisioterapi motorik.',
          points: 30,
          isCorrect: true,
          feedback: 'Tepat! Pasien stabil ditatalaksana di Poli Saraf dengan terapi dopaminergik dan fisioterapi (+30 Poin).',
        },
        {
          id: 'rawat_inap_neuro',
          label: 'Rawat Inap Bangsal Neurologi',
          subtitle: 'Tidak Ada Indikasi Akut',
          description: 'Meningitis telah sembuh total dan tidak ada tanda peningkatan tekanan intrakranial atau kejang.',
          points: -10,
          isCorrect: false,
          feedback: 'Tidak perlu rawat inap: Kondisi pasien stabil tanpa kegawatdaruratan (-10 Poin).',
        },
        {
          id: 'rawat_inap_non_neuro',
          label: 'Rawat Inap Non-Neurologi',
          subtitle: 'Bangsal Umum / Infeksi',
          description: 'Infeksi telah sembuh 5 bulan lalu, penanganan saat ini adalah rehabilitasi neurologis.',
          points: -20,
          isCorrect: false,
          feedback: 'Salah indikasi: Pasien memerlukan evaluasi neurologi poliklinik (-20 Poin).',
        },
      ],
      medications: [
        { drug: 'Levodopa / Carbidopa', dose: '3 × 50/12.5 mg titrasi naik bertahap', note: 'Evaluasi sensitivitas respon reseptor pasca-infeksi' },
        { drug: 'Amantadine', dose: '1–2 × 100 mg', note: 'Dapat membantu rigiditas dan bradikinesia sekunder' },
        { drug: 'Fisioterapi & Latihan Keseimbangan', dose: '2-3 kali seminggu', note: 'Penting untuk mencegah kontraktur sendi' },
      ],
    },
    education: {
      diagnosisTitle: 'Post-Meningitis / Post-Infectious Parkinsonism',
      diseaseCategory: 'Parkinsonism Sekunder Pasca-Infeksi',
      keyPoints: [
        {
          title: 'Patofisiologi Parkinsonism Pasca-Infeksi',
          items: [
            'Inflamasi basal ganglia atau vaskulitis obliterans pasca-meningitis',
            'Sering bermanifestasi sebagai rigiditas simetris bilateral',
            'Respon terhadap Levodopa dapat bervariasi (parsial hingga moderat)',
          ],
        },
        {
          title: 'Prognosis & Edukasi',
          items: [
            'Kondisi non-progresif atau progresif lambat dibanding PD degeneratif',
            'Rehabilitasi fisik dan latihan gait sangat menentukan kemandirian aktivitas',
          ],
        },
      ],
    },
  },

  // ==========================================
  // CASE 5: 40M - Juvenile / Young-Onset Parkinson Disease
  // ==========================================
  {
    id: 5,
    title: 'Kasus 5: Gemetar Kasar & Kaku Pada Usia Muda',
    subtitle: 'Laki-laki 40 Tahun • Poli Saraf RSUD',
    categoryTag: 'SKDI 3A • Young-Onset PD (YOPD)',
    patientInfo: {
      name: 'Tn. Arya',
      age: 40,
      gender: 'Laki-laki',
      occupation: 'Arsitek',
      chiefComplaint: 'Selamat siang dok, tangan kiri saya gemetar hebat dan gerakan saya melambat sejak usia 38 tahun...',
      summary: 'Laki-laki 40 tahun dengan resting tremor dominan sisi kiri sejak 5 bulan lalu yang mulai menjalar bilateral, disertai langkah pendek 2 tahun dan ayunan lengan kiri berkurang nyata. Bahu kiri kaku. Riwayat paman kandung menderita keluhan serupa di usia muda.',
      image: '/images/patient-man-40yo.jpg',
      vitalSigns: {
        bp: '125/80 mmHg',
        hr: '78 x/menit',
        rr: '18 x/menit',
        temp: '36.5 °C',
        spo2: '98%',
      },
    },
    questions: [
      {
        id: 'c5-q1',
        question: 'Kapan pertama kali gemetar muncul dan bagaimana perkembangannya?',
        answer: 'Dimulai di jari tangan kiri saat istirahat sejak 5 bulan lalu dok, sekarang mulai dirasakan juga di sisi kanan.',
        asked: false,
      },
      {
        id: 'c5-q2',
        question: 'Apakah ada keluhan langkah berjalan memendek atau terseret?',
        answer: 'Ya dok, sudah 2 tahun terakhir langkah saya makin pendek dan kaki kiri sering terseret.',
        asked: false,
      },
      {
        id: 'c5-q3',
        question: 'Bagaimana dengan ayunan lengan saat berjalan?',
        answer: 'Istri saya memperhatikan lengan kiri saya hampir tidak berayun sama sekali saat berjalan santai.',
        asked: false,
      },
      {
        id: 'c5-q4',
        question: 'Apakah ada rasa kaku di leher, bahu, atau tungkai?',
        answer: 'Bahu dan lengan kiri saya kaku sekali dok, terutama saat bangun tidur pagi.',
        asked: false,
      },
      {
        id: 'c5-q5',
        question: 'Apakah ada anggota keluarga yang punya keluhan serupa di usia muda?',
        answer: 'Paman saya dari pihak ibu juga pernah mengalami tremor dan kekakuan serupa di usia 40-an dok.',
        asked: false,
      },
    ],
    physicalExams: [
      {
        id: 'c5-holmes-tremor',
        title: 'Pemeriksaan Holmes Tremor / Tremor Kasar',
        subtitle: 'Uji tremor saat istirahat, postural, dan gerakan intensional',
        points: 20,
        isCardinal: true,
        summary: 'Tampak tremor istirahat dan postural kasar beramplitudo besar (2–4 Hz) dominan pada tangan kiri.',
        componentName: 'holmes_tremor',
      },
      {
        id: 'c5-rigiditas-kiri',
        title: 'Pemeriksaan Rigiditas Ekstremitas',
        subtitle: 'Tonus sendi bahu, siku, dan pergelangan tangan',
        points: 15,
        isCardinal: true,
        summary: 'Rigiditas cogwheel nyata pada sendi bahu dan siku kiri (asimetris dominan kiri).',
        componentName: 'rigidity',
      },
      {
        id: 'c5-akinesia-asimetris',
        title: 'Akinesia / Bradikinesia Progresif',
        subtitle: 'Finger tapping sequence & penurunan arm swing',
        points: 15,
        isCardinal: true,
        summary: 'Bradikinesia nyata bilateral dengan asimetri berat pada sisi kiri, ayunan lengan kiri berkurang drastis.',
        componentName: 'akinesia',
      },
      {
        id: 'c5-instabilitas-positif',
        title: 'Instabilitas Postural (Pull Test)',
        subtitle: 'Uji retropulsi keseimbangan',
        points: 20,
        isCardinal: true,
        summary: 'Pull test positif: Pasien melangkah mundur 3 langkah tidak stabil dan memerlukan bantuan tangkapan.',
        componentName: 'retropulsion',
      },
    ],
    penunjang: [
      {
        id: 'c5-mri',
        title: 'MRI Kepala 3-Tesla',
        category: 'MRI',
        findings: 'MRI 3T Kepala: Struktur substansia nigra dan ganglia basalis intak tanpa lesi sekunder, tidak ada deposisi tembaga/besi (menyingkirkan Wilson Disease atau NBIA), tidak ada stroke lakunar.',
        interpretation: 'Tepat! Gold standard untuk mengeksklusi etiologi sekunder (Wilson disease, Huntington, lesi struktural) pada kasus Parkinson onset muda.',
        pointsAwarded: 50,
        isCorrect: true,
        feedback: 'Tepat! MRI 3T normal mengonfirmasi etiologi neurodegeneratif primer dan menyingkirkan kelainan metabolik/Wilson (+50 Poin).',
        image: '/images/mri-brain-normal.jpg',
      },
      {
        id: 'c5-ct-non-kontras',
        title: 'CT-Scan Kepala Non-Kontras',
        category: 'CT',
        findings: 'CT Scan Kepala dalam batas normal.',
        interpretation: 'CT kurang sensitif dibandingkan MRI untuk evaluasi penyakit degeneratif onset muda.',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'CT Non-Kontras normal, namun MRI lebih dianjurkan untuk menyingkirkan etiologi onset muda (+35 Poin).',
        image: '/images/ct-brain-normal.jpg',
      },
      {
        id: 'c5-rontgen',
        title: 'Rontgen Kepala & Thorax',
        category: 'Rontgen',
        findings: 'Rontgen dalam batas normal.',
        interpretation: 'Tidak relevan untuk evaluasi sindrom Parkinson usia muda.',
        pointsAwarded: 35,
        isCorrect: false,
        feedback: 'Rontgen: Tidak relevan untuk diagnosis tremor usia muda (-15 Poin penalti).',
        image: '/images/xray-normal.jpg',
      },
    ],
    diagnosis: {
      correctChoice: 'parkinson_disease',
      correctLabel: 'Parkinson Disease Juvenile / Young-Onset (YOPD)',
      correctExplanation: 'Tepat! Onset klinis pada usia 40 tahun (usia muda <50 tahun), gejala asimetris gradual, 4 tanda kardinal TRAP lengkap (+), riwayat familial (+), dan penunjang MRI normal mengonfirmasi diagnosis Young-Onset Parkinson Disease (YOPD).',
      wrongExplanation: 'Kurang Tepat. Gejala klinis memenuhi seluruh kriteria UK Brain Bank untuk Parkinson Disease idiopatik. Onset usia 40 tahun diklasifikasikan sebagai Young-Onset Parkinson Disease (bukan parkinsonism sekunder).',
      criteriaItems: [
        { label: 'Onset usia muda 40 tahun (Young-Onset PD)', met: true },
        { label: 'Asimetri persisten (dominan sisi kiri)', met: true },
        { label: '4 Tanda Kardinal TRAP positif lengkap', met: true },
        { label: 'Riwayat tremor familial (paman kandung)', met: true },
        { label: 'MRI normal (menyingkirkan Wilson disease / NBIA)', met: true },
      ],
    },
    management: {
      correctChoice: 'rawat_jalan',
      correctFeedback: 'Tepat! SKDI 3A: Pasien Young-Onset Parkinson Disease stabil ditatalaksana rawat jalan di Poli Saraf. Strategi farmakoterapi usia muda berfokus pada "Levodopa-sparing strategy" menggunakan Dopamin Agonis (Pramipexole) atau MAO-B Inhibitor terlebih dahulu untuk menunda komplikasi diskinesia dan fluktuasi motorik jangka panjang.',
      options: [
        {
          id: 'rawat_jalan',
          label: 'Rawat Jalan Poli Saraf (Levodopa-Sparing Strategy)',
          subtitle: 'SKDI 3A — Terapi Lini Pertama Usia Muda',
          description: 'Inisiasi Dopamin Agonis (Pramipexole) atau MAO-B Inhibitor untuk menghemat levodopa pada usia muda, guna meminimalkan risiko diskinesia dini.',
          points: 30,
          isCorrect: true,
          feedback: 'Tepat! Pasien muda ditatalaksana rawat jalan dengan strategi hemat levodopa (+30 Poin).',
        },
        {
          id: 'rawat_inap_neuro',
          label: 'Rawat Inap Bangsal Neurologi',
          subtitle: 'Tidak Ada Indikasi Rawat',
          description: 'Pasien tidak memiliki kegawatdaruratan neurologis.',
          points: -10,
          isCorrect: false,
          feedback: 'Tidak perlu rawat inap: Kondisi pasien stabil tanpa komplikasi akut (-10 Poin).',
        },
        {
          id: 'rawat_inap_non_neuro',
          label: 'Rawat Inap Non-Neurologi',
          subtitle: 'Bangsal Umum',
          description: 'Salah indikasi: Pasien memerlukan tata laksana spesialis neurologi rawat jalan.',
          points: -20,
          isCorrect: false,
          feedback: 'Salah indikasi: Tidak ada indikasi rawat non-neurologi (-20 Poin).',
        },
      ],
      medications: [
        { drug: 'Pramipexole (Dopamin Agonis)', dose: '3 × 0.125–0.5 mg titrasi lambat', note: 'Pilihan utama usia muda <50 tahun untuk menunda diskinesia' },
        { drug: 'Rasagiline / Selegiline (MAO-B Inhibitor)', dose: '1 × 1 mg', note: 'Neuroprotektif dan monoterapi early PD' },
        { drug: 'Fisioterapi & Olahraga Aerobik Rutin', dose: 'Lari santai / renang 150 menit/minggu', note: 'Terbukti meningkatkan plastisitas sinaps dopaminergik' },
      ],
    },
    education: {
      diagnosisTitle: 'Young-Onset Parkinson Disease (YOPD)',
      diseaseCategory: 'Parkinson Disease Degeneratif Onset Muda',
      keyPoints: [
        {
          title: 'Karakteristik Young-Onset Parkinson Disease (<50 tahun)',
          items: [
            'Progresi penyakit cenderung lebih lambat dibanding late-onset PD',
            'Fungsi kognitif relatif lebih terjaga dalam jangka panjang',
            'Risiko tinggi komplikasi motorik (diskinesia dan motor fluctuations) jika levodopa dimulai terlalu dini dengan dosis tinggi',
            'Komponen genetik familial (PRKN, PINK1, DJ1) sering berperan pada kasus muda',
          ],
        },
        {
          title: 'Strategi Terapi Levodopa-Sparing',
          items: [
            'Mulai dengan Dopamin Agonis atau MAO-B inhibitor selama fungsi harian masih memadai',
            'Levodopa ditambahkan bertahap saat disabilitas kerja mulai mengganggu',
          ],
        },
      ],
    },
  },
];
