'use client';

import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ScoreHUD } from '../components/game/ScoreHUD';
import { AnamnesisStage } from '../components/game/AnamnesisStage';
import { PhysicalExamStage } from '../components/game/PhysicalExamStage';
import { PenunjangStage } from '../components/game/PenunjangStage';
import { DiagnosisStage } from '../components/game/DiagnosisStage';
import { ManagementStage } from '../components/game/ManagementStage';
import { EducationStage } from '../components/game/EducationStage';
import { AnimatePresence, motion } from 'framer-motion';

export default function GamePage() {
  const { currentStage } = useGameStore();

  const renderStage = () => {
    switch (currentStage) {
      case 'anamnesis':
        return <AnamnesisStage key="anamnesis" />;
      case 'physical':
        return <PhysicalExamStage key="physical" />;
      case 'penunjang':
        return <PenunjangStage key="penunjang" />;
      case 'diagnosis':
        return <DiagnosisStage key="diagnosis" />;
      case 'management':
        return <ManagementStage key="management" />;
      case 'education':
        return <EducationStage key="education" />;
      default:
        return <AnamnesisStage key="anamnesis-default" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Sticky Top Navigation HUD */}
      <ScoreHUD />

      {/* Stage Progress Breadcrumb */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {[
              { key: 'anamnesis', label: 'Anamnesis', num: 1 },
              { key: 'physical', label: 'Fisik', num: 2 },
              { key: 'penunjang', label: 'Penunjang', num: 3 },
              { key: 'diagnosis', label: 'Diagnosis', num: 4 },
              { key: 'management', label: 'Tatalaksana', num: 5 },
              { key: 'education', label: 'Evaluasi', num: 6 },
            ].map((stage, idx, arr) => {
              const stages = ['anamnesis', 'physical', 'penunjang', 'diagnosis', 'management', 'education'];
              const currentIdx = stages.indexOf(currentStage);
              const stageIdx = stages.indexOf(stage.key);
              const isActive = currentStage === stage.key;
              const isCompleted = stageIdx < currentIdx;

              return (
                <React.Fragment key={stage.key}>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-600'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isCompleted ? '✓' : stage.num}
                    </span>
                    <span className="hidden sm:inline">{stage.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <span className={`text-slate-700 shrink-0 ${isCompleted ? 'text-slate-600' : ''}`}>›</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-3 text-center">
        <p className="text-[11px] text-slate-600 font-mono">
          NeuroSim v1.0 • Simulasi Klinis Parkinson Disease • RSUD Poli Saraf • Untuk Keperluan Edukasi Medis
        </p>
      </footer>
    </div>
  );
}
