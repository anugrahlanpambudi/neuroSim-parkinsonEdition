'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, Hand, Award, CheckCircle2, ShieldAlert } from 'lucide-react';

interface GCSExamProps {
  eye?: number;
  verbal?: number;
  motor?: number;
  onComplete?: () => void;
}

export const GCS_Exam: React.FC<GCSExamProps> = ({
  eye = 3,
  verbal = 4,
  motor = 5,
  onComplete,
}) => {
  const [testedEye, setTestedEye] = useState<boolean>(false);
  const [testedVerbal, setTestedVerbal] = useState<boolean>(false);
  const [testedMotor, setTestedMotor] = useState<boolean>(false);

  const allTested = testedEye && testedVerbal && testedMotor;

  const totalGCS = eye + verbal + motor;

  return (
    <div className="flex flex-col p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Pemeriksaan Tingkat Kesadaran (Glasgow Coma Scale - GCS)
          </span>
          <p className="text-xs text-slate-400">
            Evaluasi respon membuka mata (E), verbal (V), dan motorik (M)
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>Total Skor: GCS {totalGCS} (E{eye}V{verbal}M{motor})</span>
        </div>
      </div>

      {/* Interactive 3-Domain Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Eye Opening (E3) */}
        <div
          onClick={() => setTestedEye(true)}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            testedEye
              ? 'bg-teal-500/10 border-teal-500/40'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Eye className="w-4 h-4 text-teal-400" />
              <span>Respon Buka Mata (Eye)</span>
            </div>
            <span className="text-xs font-mono font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/20">
              E{eye}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setTestedEye(true);
            }}
            className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors mb-2"
          >
            🔊 Panggil Suara: "Ibu, buka matanya!"
          </button>

          {testedEye ? (
            <div className="p-2 bg-slate-900/90 rounded-xl border border-teal-500/20 text-[11px] text-teal-300 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Membuka Mata terhadap Suara (E3)</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                Pasien memejamkan mata secara pasif, namun membuka mata saat dipanggil dengan suara keras.
              </p>
            </div>
          ) : (
            <p className="text-[10px] text-slate-500 italic">Klik tombol untuk menguji respon suara...</p>
          )}
        </div>

        {/* Verbal Response (V4) */}
        <div
          onClick={() => setTestedVerbal(true)}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            testedVerbal
              ? 'bg-amber-500/10 border-amber-500/40'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Respon Bicara (Verbal)</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/20">
              V{verbal}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setTestedVerbal(true);
            }}
            className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors mb-2"
          >
            💬 Ajak Bicara: "Ibu sedang di mana sekarang?"
          </button>

          {testedVerbal ? (
            <div className="p-2 bg-slate-900/90 rounded-xl border border-amber-500/20 text-[11px] text-amber-300 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bicara Kacau / Disorientasi (V4)</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                Pasien menjawab: <em>"Di pasar... mau beli beras... eh ini jam berapa ya dok..."</em> (Bicara membingungkan / bingung waktu dan tempat).
              </p>
            </div>
          ) : (
            <p className="text-[10px] text-slate-500 italic">Klik tombol untuk menguji respon verbal...</p>
          )}
        </div>

        {/* Motor Response (M5) */}
        <div
          onClick={() => setTestedMotor(true)}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            testedMotor
              ? 'bg-indigo-500/10 border-indigo-500/40'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Hand className="w-4 h-4 text-indigo-400" />
              <span>Respon Gerak (Motorik)</span>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/20">
              M{motor}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setTestedMotor(true);
            }}
            className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors mb-2"
          >
            ⚡ Beri Rangsang Nyeri: Tekanan kuku / trapezius
          </button>

          {testedMotor ? (
            <div className="p-2 bg-slate-900/90 rounded-xl border border-indigo-500/20 text-[11px] text-indigo-300 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Melokalisir Nyeri (M5)</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                Pasien mengangkat kedua tangan menepis tangan pemeriksa di area stimulasi nyeri (mampu melokalisir nyeri di atas klavikula).
              </p>
            </div>
          ) : (
            <p className="text-[10px] text-slate-500 italic">Klik tombol untuk menguji respon motorik...</p>
          )}
        </div>
      </div>

      {/* Clinical Summary */}
      <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl text-xs space-y-1">
        <div className="font-semibold text-teal-300 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Kesimpulan Status Kesadaran: Somnolen (GCS 12: E3M5V4)</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Pasien mengalami penurunan kesadaran derajat somnolen dengan disorientasi fluktuatif akibat ensefalopati metabolik (toksin uremikum / CKD Stadium V). Kondisi ini bukan tanda motorik ekstrapiramidal murni, melainkan kegawatdaruratan metabolik sistemik.
        </p>
      </div>
    </div>
  );
};
