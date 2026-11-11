'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { ChatBubble, TypingIndicator } from '../game/ChatBubble';
import { MessageSquare, ArrowRight, Lock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const CaseAnamnesisStage: React.FC = () => {
  const { 
    currentCase, 
    questionsState, 
    chatHistory, 
    isTyping, 
    askQuestion, 
    proceedToPhysical 
  } = useCaseStore();

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const completedCount = questionsState.filter((q) => q.asked).length;
  const isComplete = completedCount === questionsState.length;
  const progressPercent = (completedCount / questionsState.length) * 100;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 1 • Anamnesis
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-mono">
              0 Poin (Fase Eksplorasi Klinis)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Anamnesis - Gali Keluhan Utama & Riwayat Pasien</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Tanyakan seluruh pertanyaan kepada pasien untuk menggali kronologi keluhan, gejala motorik, dan riwayat komorbiditas.
          </p>
        </div>

        {/* Progress Bar & Unlock Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="w-full sm:w-44 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">Kelengkapan Data:</span>
              <span className="text-teal-400 font-bold font-mono">{completedCount}/5 Pertanyaan</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <button
            onClick={proceedToPhysical}
            disabled={!isComplete}
            className={`px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 scale-[1.02]'
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <span>Lanjut ke Pemeriksaan Fisik</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Left (Patient Avatar), Middle (Chat), Right (Question Bank) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient Visual Profile */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="relative h-72 lg:h-[460px] rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <Image
              src={currentCase.patientInfo.image}
              alt="Foto Klinis Pasien"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-xs text-slate-300 shadow-xl">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-sm">{currentCase.patientInfo.name}</span>
                  <span className="text-slate-400 text-[11px] block">{currentCase.patientInfo.occupation}</span>
                </div>
                <span className="text-teal-400 font-mono text-[11px] px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
                  {currentCase.patientInfo.age} th • {currentCase.patientInfo.gender}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 mb-2">
                {currentCase.patientInfo.summary}
              </p>

              {/* Tanda Vital (Clinical Vitals HUD) */}
              {currentCase.patientInfo.vitalSigns && (
                <div className="pt-2 border-t border-slate-700/60 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                  <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 block text-[9px]">TD:</span>
                    <span className="text-slate-200 font-bold">{currentCase.patientInfo.vitalSigns.bp}</span>
                  </div>
                  <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 block text-[9px]">HR:</span>
                    <span className="text-teal-300 font-bold">{currentCase.patientInfo.vitalSigns.hr}</span>
                  </div>
                  <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 block text-[9px]">RR:</span>
                    <span className="text-indigo-300 font-bold">{currentCase.patientInfo.vitalSigns.rr}</span>
                  </div>
                  <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 block text-[9px]">Suhu:</span>
                    <span className="text-amber-300 font-bold">{currentCase.patientInfo.vitalSigns.temp}</span>
                  </div>
                  <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80 col-span-2">
                    <span className="text-slate-500 block text-[9px]">SpO2:</span>
                    <span className="text-emerald-300 font-bold">{currentCase.patientInfo.vitalSigns.spo2}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Clinical Interaction */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Chat Container */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col h-[380px] lg:h-[460px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>Percakapan Klinis Interaktif</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Poli Saraf RSUD</span>
            </div>

            {/* Scrollable messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {chatHistory.map((msg) => (
                <ChatBubble 
                  key={msg.id} 
                  sender={msg.sender} 
                  text={msg.text} 
                  timestamp={msg.timestamp} 
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={chatBottomRef} />
            </div>

            {/* Question selection chips */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400 mb-2 font-medium flex items-center justify-between">
                <span>Pilih Pertanyaan Dokter ({questionsState.filter(q => !q.asked).length} tersisa):</span>
                {isComplete && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Anamnesis Selesai
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                {questionsState.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => askQuestion(q.id)}
                    disabled={q.asked || isTyping}
                    className={`text-left p-2.5 rounded-xl text-xs transition-all border flex items-start gap-2 ${
                      q.asked
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-500 line-through cursor-not-allowed'
                        : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-teal-500/50 hover:text-white shadow-sm'
                    }`}
                  >
                    <span className="font-mono text-teal-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="line-clamp-2 leading-relaxed">{q.question}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
