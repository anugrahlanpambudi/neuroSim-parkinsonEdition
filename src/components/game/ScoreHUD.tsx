'use client';

import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Activity, Heart, ShieldAlert, Award, RefreshCw, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScoreHUD: React.FC = () => {
  const { score, trust, currentStage, caseNumber, totalCases, resetGame, toastMessage, clearToast } = useGameStore();

  const stageTitles: Record<string, string> = {
    anamnesis: '1. Anamnesis Keluhan',
    physical: '2. Pemeriksaan Fisik',
    penunjang: '3. Pemeriksaan Penunjang',
    diagnosis: '4. Penegakan Diagnosis',
    management: '5. Tatalaksana Kasus',
    education: '6. Edukasi & Evaluasi',
  };

  const trustColor = 
    trust >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
    trust >= 50 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
    'text-rose-400 bg-rose-500/10 border-rose-500/30';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Location */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 border border-teal-400/30">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base md:text-lg">NeuroSim</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 font-medium">
                  RSUD Poli Saraf
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Kasus #{caseNumber} dari {totalCases}</span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-400 font-semibold">{stageTitles[currentStage]}</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Score */}
            <div className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Skor Klinis</div>
                <div className="text-sm md:text-base font-extrabold text-indigo-300 flex items-baseline gap-1">
                  <span>{score}</span>
                  <span className="text-xs font-normal text-slate-500">/ 200</span>
                </div>
              </div>
            </div>

            {/* Patient Trust */}
            <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-3 ${trustColor}`}>
              <div className="p-1.5 rounded-lg bg-current/10">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold opacity-80 tracking-wider">Patient Trust</div>
                <div className="text-sm md:text-base font-extrabold flex items-baseline gap-1">
                  <span>{trust}%</span>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={resetGame}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
              title="Reset Kasus"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Global Toast Alert Banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="mt-2.5 overflow-hidden"
            >
              <div
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center justify-between shadow-lg border ${
                  toastMessage.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                    : toastMessage.type === 'error'
                    ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                    : toastMessage.type === 'warning'
                    ? 'bg-amber-950/80 border-amber-500/40 text-amber-200'
                    : 'bg-teal-950/80 border-teal-500/40 text-teal-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>{toastMessage.text}</span>
                </div>
                <button
                  onClick={clearToast}
                  className="ml-3 text-xs opacity-75 hover:opacity-100 underline shrink-0"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
