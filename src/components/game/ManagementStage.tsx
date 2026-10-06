'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { ManagementChoice } from '../../types/game';
import {
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Home,
  Building2,
  AlertTriangle,
  Pill,
  UserCheck,
  BookOpenCheck,
} from 'lucide-react';

export const ManagementStage: React.FC = () => {
  const { selectedManagement, managementFeedback, managementSolved, submitManagement, proceedToEducation } = useGameStore();

  const choices: {
    id: ManagementChoice;
    label: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
  }[] = [
    {
      id: 'rawat_jalan',
      label: 'Rawat Jalan Poli Saraf',
      subtitle: 'SKDI 3A — Penatalaksanaan Lini Pertama',
      description:
        'Pasien stabil secara klinis, tanpa tanda kegawatdaruratan neurologis. Tatalaksana rawat jalan dengan medikamentosa Levodopa/Dopamin Agonis (Pramipexole), fisioterapi, dan edukasi pasien & keluarga.',
      icon: <Home className="w-6 h-6 text-teal-400" />,
      color: 'bg-teal-500/10 hover:bg-teal-500/20',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
    },
    {
      id: 'rawat_inap_neuro',
      label: 'Rawat Inap Bangsal Neurologi',
      subtitle: 'Indikasi: Dekompensasi Berat / Status Kritis',
      description:
        'Rawat inap neurologi dipertimbangkan jika ada kegawatdaruratan: Parkinson Crisis (akinetic crisis), aspirasi pneumonia, atau komplikasi berat medikamentosa. Kondisi pasien saat ini stabil.',
      icon: <Building2 className="w-6 h-6 text-amber-400" />,
      color: 'bg-amber-500/10 hover:bg-amber-500/20',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
    },
    {
      id: 'rawat_inap_non_neuro',
      label: 'Rawat Inap Non-Neurologi',
      subtitle: 'Bangsal Penyakit Dalam / Umum',
      description:
        'Tidak tepat — pasien dengan sindrom Parkinson memerlukan penanganan spesialistik neurologi. Rawat di bangsal non-neurologi tanpa indikasi komorbiditas berat aktif tidak sesuai standar pelayanan.',
      icon: <AlertTriangle className="w-6 h-6 text-rose-400" />,
      color: 'bg-rose-500/10 hover:bg-rose-500/20',
      borderColor: 'border-rose-500/30 hover:border-rose-400',
    },
  ];

  const medicationItems = [
    { drug: 'Levodopa / Carbidopa', dose: '3 × 100/25 mg', note: 'Lini pertama usia >65 thn / disabilitas fungsional' },
    { drug: 'Pramipexole (Dopamin Agonis)', dose: '3 × 0.25–1 mg', note: 'Pertimbangkan pada pasien lebih muda <65 thn' },
    { drug: 'Trihexyphenidyl (Antikolinergik)', dose: '3 × 2 mg', note: 'Jika tremor dominan, hati-hati pada lansia' },
    { drug: 'Selegiline (MAO-B Inhibitor)', dose: '1 × 5–10 mg', note: 'Adjuvan neuroprotektif / early PD' },
  ];

  const handleChoose = (choice: ManagementChoice) => {
    if (selectedManagement) return;
    submitManagement(choice);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 5 • Tatalaksana
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              +30 Poin (Pilihan Tepat)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Tatalaksana & Rencana Terapi Pasien</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Diagnosis telah ditegakkan: <strong className="text-teal-300">Parkinson Disease Idiopatik</strong>. Tentukan rencana tatalaksana yang paling tepat.
          </p>
        </div>

        {managementSolved && (
          <button
            onClick={proceedToEducation}
            className="px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all shrink-0"
          >
            <span>Lihat Evaluasi & Edukasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Management Choices */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Pilih Rencana Tatalaksana:</span>
            </div>
            <p className="text-xs text-slate-400">
              Pertimbangkan kondisi klinis pasien, SKDI (Standar Kompetensi Dokter Indonesia), dan panduan terapi Parkinson Disease.
            </p>
          </div>

          <div className="space-y-3">
            {choices.map((c) => (
              <motion.button
                key={c.id}
                whileHover={{ scale: selectedManagement ? 1 : 1.01 }}
                whileTap={{ scale: selectedManagement ? 1 : 0.99 }}
                onClick={() => handleChoose(c.id)}
                disabled={!!selectedManagement}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${c.color} ${c.borderColor} ${
                  selectedManagement === c.id ? 'ring-2 ring-teal-400/50' : ''
                } ${selectedManagement ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-white">{c.label}</h3>
                      {selectedManagement === c.id && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          Dipilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{c.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {managementFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border ${
                  managementSolved
                    ? 'bg-emerald-950/60 border-emerald-500/50'
                    : 'bg-rose-950/60 border-rose-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {managementSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className={`text-sm font-bold mb-1 ${managementSolved ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {managementSolved ? 'Tatalaksana Tepat! (+30 Poin)' : 'Tatalaksana Kurang Tepat'}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{managementFeedback}</p>
                  </div>
                </div>

                {managementSolved && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={proceedToEducation}
                    className="mt-4 w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Lihat Evaluasi & Ringkasan Edukasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Medication Reference */}
        <div className="lg:col-span-5 space-y-4">
          {/* Pharmacotherapy Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Panduan Farmakoterapi PD</h4>
                <p className="text-[11px] text-slate-400">Referensi Obat Lini 1–2 (2024 Guidelines)</p>
              </div>
            </div>

            <div className="space-y-2">
              {medicationItems.map((med, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{med.drug}</span>
                    <span className="font-mono text-teal-300 text-[11px]">{med.dose}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{med.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-pharmacological */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Non-Farmakologi</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 shrink-0 mt-0.5">✓</span>
                <span><strong>Fisioterapi</strong>: latihan keseimbangan, gaya berjalan, fleksibilitas, LSVT BIG therapy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 shrink-0 mt-0.5">✓</span>
                <span><strong>Terapi Wicara</strong>: LSVT LOUD untuk hipofonia & disartria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 shrink-0 mt-0.5">✓</span>
                <span><strong>Edukasi Keluarga</strong>: modifikasi lingkungan rumah, pencegahan jatuh, dukungan psikososial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 shrink-0 mt-0.5">✓</span>
                <span><strong>Nutrisi & Aktivitas</strong>: diet protein, olahraga aerobik rutin, aktivitas sosial</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
