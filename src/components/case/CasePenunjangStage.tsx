'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { 
  FileText, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Microscope,
  Activity,
  FileSpreadsheet
} from 'lucide-react';
import { DicomViewer } from './DicomViewer';
import { LabReportViewer } from './LabReportViewer';

export const CasePenunjangStage: React.FC = () => {
  const { 
    currentCase, 
    selectedPenunjangId, 
    examinedPenunjangIds, 
    selectPenunjang, 
    requestMoreData, 
    proceedToDiagnosis 
  } = useCaseStore();

  const selectedOption = currentCase.penunjang.find((p) => p.id === selectedPenunjangId);

  const getNeutralDescription = (title: string, category: string) => {
    if (category === 'CT') {
      return 'Pencitraan computed tomography aksial kepala untuk evaluasi struktur parenkim otak, ventrikel, dan eksklusi lesi fokal struktural / vaskular.';
    }
    if (category === 'MRI') {
      return 'Pencitraan resonansi magnetik multi-sekuens (T1, T2, FLAIR, DWI) untuk evaluasi resolusi tinggi struktur substansia nigra, ganglia basalis, dan batang otak.';
    }
    if (category === 'Rontgen') {
      return 'Pemeriksaan radiografi proyeksi polos untuk evaluasi tulang cranium dan cavum thorax.';
    }
    return 'Pemeriksaan laboratorium patologi klinik dan profil biokimia darah / cairan serebrospinal.';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 3 • Pemeriksaan Penunjang
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              50 Poin Maksimal
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">
            Pemeriksaan Penunjang & Neuroimaging
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilihlah modalitas pemeriksaan yang paling tepat dan efisien untuk menegakkan diagnosis pasien.
          </p>
        </div>

        {/* Action Controls: [Selesai -> Diagnosis] and Modality Counter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right sm:text-left mr-2">
            <div className="text-[11px] text-slate-400">Modalitas Diperiksa:</div>
            <div className="text-xs font-mono font-bold text-teal-400">
              {examinedPenunjangIds.length} dari {currentCase.penunjang.length} Modalitas
            </div>
          </div>

          <button
            onClick={proceedToDiagnosis}
            disabled={examinedPenunjangIds.length === 0}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
              examinedPenunjangIds.length > 0
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/25'
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <span>Selesai & Lanjut ke Diagnosis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container: Selection Menu or Result Inspector */}
      {!selectedOption ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Pilih Modalitas Pemeriksaan:</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Pilih modalitas yang relevan secara klinis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCase.penunjang.map((opt) => {
              const alreadyViewed = examinedPenunjangIds.includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => selectPenunjang(opt.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    alreadyViewed
                      ? 'bg-slate-900/90 border-slate-700/80 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 hover:shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold font-mono uppercase border ${
                        opt.category === 'Laboratorium'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-slate-800 text-teal-300 border-slate-700'
                      }`}>
                        {opt.category}
                      </span>
                      {alreadyViewed ? (
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Telah Diperiksa
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Belum Diperiksa</span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {getNeutralDescription(opt.title, opt.category)}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-teal-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Periksa Hasil Pemeriksaan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-500 text-[11px]">Klik untuk membuka</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Detailed Result Inspector View */
        <div className="space-y-4">
          {/* Navigation Bar to switch modalities */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sedang Melihat:</span>
              <span className="text-xs font-bold text-white bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                {selectedOption.title}
              </span>
            </div>
            <button
              onClick={requestMoreData}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-teal-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ganti / Tambah Modalitas Lain</span>
            </button>
          </div>

          {selectedOption.category === 'Laboratorium' ? (
            /* Dedicated Clinical Pathology Lab Report Viewer */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <LabReportViewer
                  option={selectedOption}
                  caseId={currentCase.id}
                  patientName={currentCase.patientInfo.name}
                  patientAge={currentCase.patientInfo.age}
                  patientGender={currentCase.patientInfo.gender}
                />
              </div>

              {/* Expert Interpretation Side Card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 font-mono block">
                    Interpretasi Klinis & Diagnostik
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {selectedOption.findings}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">
                      Rekomendasi Medis:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedOption.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Radiology DICOM PACS Viewer */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: DICOM Workstation */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <DicomViewer
                  option={selectedOption}
                  patientName={currentCase.patientInfo.name}
                  patientAge={currentCase.patientInfo.age}
                  caseId={currentCase.id}
                />
              </div>

              {/* Right Column: Expert Findings */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 font-mono block">
                        Hasil Ekspertise Radiologi
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{selectedOption.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      Status: Dibaca
                    </span>
                  </div>

                  {/* Findings */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-400" />
                      <span>Temuan Pemeriksaan:</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                      {selectedOption.findings}
                    </p>
                  </div>

                  {/* Clinical Interpretation */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Microscope className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Kesan & Catatan Klinisi:</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                      {selectedOption.interpretation}
                    </p>
                  </div>

                  {/* Feedback / Clue */}
                  <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-xs text-slate-400">
                    <strong className="text-slate-300">Poin Diagnostik: </strong>
                    {selectedOption.feedback}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
