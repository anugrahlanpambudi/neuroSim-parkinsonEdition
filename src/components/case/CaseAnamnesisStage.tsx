'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { ChatBubble, TypingIndicator } from '../game/ChatBubble';
import { MessageSquare, ArrowRight, Lock, CheckCircle2, AlertCircle, Sparkles, User, FileText } from 'lucide-react';

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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-700 text-xs font-bold uppercase tracking-wider">
              Tahap 1 • Anamnesis
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
              0 Poin (Fase Eksplorasi Klinis)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Anamnesis - Gali Keluhan Utama &amp; Riwayat Pasien</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl text-pretty">
            Tanyakan seluruh pertanyaan kepada pasien untuk menggali kronologi keluhan, gejala motorik, dan riwayat komorbiditas klinis pasien.
          </p>
        </div>

        {/* Progress Bar & Unlock Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 py-2 shrink-0">
          <div className="w-full sm:w-44 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Kelengkapan Data:</span>
              <span className="text-teal-300 font-bold font-mono">{completedCount}/5 Pertanyaan</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-teal-500"
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
                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-950'
                : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Lanjut ke Pemeriksaan Fisik</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Left (Patient Card), Right (Chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Patient Profile & Record */}
        <div className="lg:col-span-5 flex flex-col h-auto lg:h-[580px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Top section: Patient Photo with Clear Identity Bar */}
          <div className="relative h-64 shrink-0 bg-slate-950">
            <Image
              src={currentCase.patientInfo.image}
              alt="Foto Klinis Pasien"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-base block leading-tight">{currentCase.patientInfo.name}</span>
                <span className="text-slate-300 text-xs font-medium">{currentCase.patientInfo.occupation}</span>
              </div>
              <span className="text-teal-300 font-mono text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-teal-800 font-bold shrink-0">
                {currentCase.patientInfo.age} th • {currentCase.patientInfo.gender}
              </span>
            </div>
          </div>

          {/* Bottom section: Medical Record & Vitals (Non-nested flat hierarchy) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 border-t border-slate-800">
            {/* Resume Kasus */}
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
                <FileText className="w-4 h-4 text-teal-400" />
                <span>Resume Kasus &amp; Keluhan Pasien</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed text-pretty">
                {currentCase.patientInfo.summary}
              </p>
            </div>

            {/* Tanda-Tanda Vital (TTV) - Clean Table without nested cards */}
            {currentCase.patientInfo.vitalSigns && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  Tanda-Tanda Vital (TTV)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs divide-y sm:divide-y-0">
                  <div className="py-1">
                    <span className="text-slate-400 block text-xs">Tekanan Darah</span>
                    <span className="text-white font-mono font-bold text-sm">{currentCase.patientInfo.vitalSigns.bp}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-400 block text-xs">Denyut Nadi</span>
                    <span className="text-teal-300 font-mono font-bold text-sm">{currentCase.patientInfo.vitalSigns.hr}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-400 block text-xs">Laju Napas</span>
                    <span className="text-indigo-300 font-mono font-bold text-sm">{currentCase.patientInfo.vitalSigns.rr}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-400 block text-xs">Suhu Axilla</span>
                    <span className="text-amber-300 font-mono font-bold text-sm">{currentCase.patientInfo.vitalSigns.temp}</span>
                  </div>
                  <div className="py-1 col-span-2 sm:col-span-2">
                    <span className="text-slate-400 block text-xs">Saturasi O2 (SpO2)</span>
                    <span className="text-emerald-300 font-mono font-bold text-sm">{currentCase.patientInfo.vitalSigns.spo2}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clinical Interaction */}
        <div className="lg:col-span-7 flex flex-col h-[580px] bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Percakapan Klinis Interaktif</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Poli Saraf RSUD</span>
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
          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-300 mb-2 font-medium flex items-center justify-between">
              <span>Pilih Pertanyaan Dokter ({questionsState.filter(q => !q.asked).length} tersisa):</span>
              {isComplete && (
                <span className="text-emerald-300 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Anamnesis Selesai
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {questionsState.map((q) => (
                <button
                  key={q.id}
                  onClick={() => askQuestion(q.id)}
                  disabled={q.asked || isTyping}
                  className={`text-left p-3 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-2.5 ${
                    q.asked
                      ? 'text-slate-500 line-through cursor-not-allowed opacity-60'
                      : 'hover:bg-slate-800 text-slate-200 hover:text-white border-b border-slate-800/80'
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
  );
};
