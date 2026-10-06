'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { PenunjangType } from '../../types/game';
import { 
  FileText, 
  RotateCcw, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const PenunjangStage: React.FC = () => {
  const { 
    selectedPenunjang, 
    examinedPenunjang, 
    tambahDataCount, 
    selectPenunjang, 
    requestMoreData, 
    proceedToDiagnosis 
  } = useGameStore();

  const [ctSubMenuOpen, setCtSubMenuOpen] = useState<boolean>(false);

  const penunjangDetails: Record<PenunjangType, {
    title: string;
    badge: string;
    image: string;
    findings: string;
    interpretation: string;
    pointsText: string;
    penaltyText?: string;
  }> = {
    ct_non_kontras: {
      title: 'CT-Scan Kepala Non-Kontras',
      badge: 'Lini Pertama Skrining',
      image: '/images/ct-brain-normal.jpg',
      findings: 'CT Kepala Non-Kontras: Tidak tampak perdarahan, lesi hipodens/hiperdens basal ganglia, massa, hidrosefalus. Kesan: Dalam batas normal.',
      interpretation: 'Tepat! CT Non-Kontras cukup untuk menyingkirkan lesi struktural mayor, stroke vaskular, ataupun tumor intrakranial.',
      pointsText: '+50 Poin (Pilihan Efektif & Tepat)',
    },
    ct_kontras: {
      title: 'CT-Scan Kepala Dengan Kontras',
      badge: 'Pemeriksaan Berlebih',
      image: '/images/ct-brain-normal.jpg',
      findings: 'CT Kontras: Tidak tampak enhancing lesion intrakranial.',
      interpretation: 'Kontras tidak diperlukan pada evaluasi klinis awal sindrom Parkinson, menambah biaya serta risiko alergi dan nefropati kontras.',
      pointsText: '+35 Poin (+50 dikurangi Penalti -15)',
      penaltyText: 'Penalti: -15 Poin (Invasive / Unnecessary contrast)',
    },
    mri: {
      title: 'MRI Kepala (T1 / T2 / FLAIR)',
      badge: 'Gold Standard Neuroimaging',
      image: '/images/mri-brain-normal.jpg',
      findings: 'MRI T1/T2/FLAIR: Tidak tampak infark, perdarahan, massa di basal ganglia. Tidak ada tanda stroke/tumor/NPH. Atrofi ringan sesuai usia 60th. Kesan: Dalam batas normal untuk menyingkirkan Parkinsonism sekunder.',
      interpretation: 'Sangat baik! MRI mengevaluasi struktur ganglia basalis secara detail guna menyingkirkan Parkinsonism Sekunder atau Parkinson-Plus Syndrome.',
      pointsText: '+50 Poin (Pilihan Akurat)',
    },
    rontgen: {
      title: 'Rontgen Kepala & Thorax',
      badge: 'Tidak Relevan',
      image: '/images/xray-normal.jpg',
      findings: 'Rontgen Kepala & Thorax dalam batas normal, tidak relevan.',
      interpretation: 'Rontgen tidak mampu mengevaluasi parenkim otak maupun ganglia basalis untuk keluhan tremor dan kekakuan.',
      pointsText: '+35 Poin (+50 dikurangi Penalti -15)',
      penaltyText: 'Penalti: -15 Poin (Modalitas tidak relevan)',
    },
  };

  const currentResult = selectedPenunjang ? penunjangDetails[selectedPenunjang] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 3 • Pemeriksaan Penunjang
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              50 Poin Dasar
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Pemeriksaan Penunjang Radiologi</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilihlah modalitas pencitraan yang paling tepat dan hemat biaya untuk menyingkirkan diagnosis banding sekunder.
          </p>
        </div>

        {/* Counter indicator */}
        <div className="flex items-center gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Riwayat Tambah Data:</span>
            <span className={`text-sm font-bold font-mono ${tambahDataCount > 2 ? 'text-rose-400' : 'text-teal-400'}`}>
              {tambahDataCount} Kali
            </span>
          </div>
          {tambahDataCount > 2 && (
            <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              Penalti Berlebih Aktif!
            </div>
          )}
        </div>
      </div>

      {/* Main Container: Mode Selection or Result Modal Display */}
      {!selectedPenunjang ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: CT Scan Kepala (With Sub options) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">CT-Scan Kepala</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Pencitraan aksial computed tomography untuk menyingkirkan perdarahan intrakranial, infark luas, atau hidrosefalus.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Pilih Protokol Kontras:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => selectPenunjang('ct_non_kontras')}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-teal-600 hover:text-white border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
                >
                  Non-Kontras
                </button>
                <button
                  onClick={() => selectPenunjang('ct_kontras')}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-600 hover:text-white border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
                >
                  Dengan Kontras
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: MRI Kepala */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">MRI Kepala (T1/T2/FLAIR)</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Pencitraan resonansi magnetik resolusi tinggi untuk memvisualisasikan struktur ganglia basalis, substantia nigra, dan menyingkirkan NPH / vaskular.
              </p>
            </div>

            <button
              onClick={() => selectPenunjang('mri')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
            >
              Pilih MRI Kepala →
            </button>
          </div>

          {/* Card 3: Rontgen */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rontgen Kepala & Thorax</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Pemeriksaan foto polos radiografi konvensional calvaria tengkorak dan toraks.
              </p>
            </div>

            <button
              onClick={() => selectPenunjang('rontgen')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              Pilih Rontgen →
            </button>
          </div>
        </div>
      ) : (
        /* Result Modal / Viewer */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Result Header */}
          <div className="p-6 bg-slate-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-white">{currentResult?.title}</h2>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">
                    {currentResult?.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Lembar Hasil Pemeriksaan Radiologi RSUD</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                {currentResult?.pointsText}
              </span>
            </div>
          </div>

          {/* Result Body: Image on left, Clinical findings on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
            {/* Film Image */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                {currentResult?.image && (
                  <Image
                    src={currentResult.image}
                    alt={currentResult.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-3">
                Citra Diagnostik Digital PACS RSUD • Axial Slice
              </span>
            </div>

            {/* Findings & Notes */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Official Findings */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-2">
                    Ekspertise Radiologi:
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-mono">
                    &ldquo;{currentResult?.findings}&rdquo;
                  </p>
                </div>

                {/* Interpretation */}
                <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
                  <div className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    Analisis Klinis:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentResult?.interpretation}
                  </p>
                </div>

                {/* Penalty notice if applicable */}
                {currentResult?.penaltyText && (
                  <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-2xl text-xs text-amber-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{currentResult.penaltyText}</span>
                  </div>
                )}
              </div>

              {/* Looping Control Buttons: [Selesai - Lanjut Diagnosis] & [Tambah Data - Kembali] */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={requestMoreData}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tambah Data - Kembali</span>
                </button>

                <button
                  onClick={proceedToDiagnosis}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Selesai - Lanjut Diagnosis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
