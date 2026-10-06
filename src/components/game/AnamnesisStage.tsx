'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { ChatBubble, TypingIndicator } from './ChatBubble';
import { MessageSquare, ArrowRight, Lock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const AnamnesisStage: React.FC = () => {
  const { questions, chatHistory, isTyping, askQuestion, proceedToPhysical } = useGameStore();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const completedCount = questions.filter((q) => q.asked).length;
  const isComplete = completedCount === questions.length;
  const progressPercent = (completedCount / questions.length) * 100;

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
            Tanyakan seluruh pertanyaan kepada pasien untuk menggali kronologi tremor, rigiditas, gangguan berjalan, dan riwayat komorbiditas.
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
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/25 scale-[1.02]'
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-75'
            }`}
          >
            {isComplete ? (
              <>
                <span>Lanjut ke Pemeriksaan Fisik</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Lanjut Fisik (Terkunci {completedCount}/5)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Patient Illustration, Right Chat & Interactive Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient Portrait & Clinical Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Patient Card with Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="relative h-80 sm:h-96 w-full bg-slate-950">
              <Image
                src="/images/patient-elderly-woman-60yo.jpg"
                alt="Pasien Wanita 60 Tahun - Poli Saraf RSUD"
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                Sedang Berkonsultasi
              </div>

              {/* Overlay Identification */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xl font-black">Ny. Sugiarti, 60 Tahun</div>
                <div className="text-xs text-teal-300 font-medium flex items-center gap-2 mt-0.5">
                  <span>No. RM: 08-29-1964</span>
                  <span>•</span>
                  <span>Keluhan: Tremor Tangan Kiri 6 Tahun</span>
                </div>
              </div>
            </div>

            {/* Quick Medical Summary Table */}
            <div className="p-5 space-y-3 bg-slate-900/90 text-xs">
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Keluhan Utama</span>
                  <span className="font-bold text-white">Gemetar tangan kiri (6 thn)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Karakteristik</span>
                  <span className="font-bold text-white">Asimetris, gradual memburuk</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  Instruksi Anamnesis:
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  Klik seluruh 5 opsi pertanyaan di sebelah kanan untuk mendengarkan keluhan spesifik pasien secara mendalam sebelum melanjutkan ke pemeriksaan fisik.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chat History & Question Buttons (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Chat Messenger Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[520px] overflow-hidden">
            {/* Chat Header */}
            <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transkrip Anamnesis Poli Saraf</h4>
                  <p className="text-[11px] text-slate-400">Komunikasi Dokter - Pasien</p>
                </div>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                {completedCount}/5 Terjawab
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-950/60">
              <AnimatePresence>
                {chatHistory.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    sender={msg.sender}
                    text={msg.text}
                    timestamp={msg.timestamp}
                  />
                ))}
                {isTyping && <TypingIndicator key="typing" />}
              </AnimatePresence>
              <div ref={chatBottomRef} />
            </div>

            {/* Questions Selection Tray */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Pilihan Pertanyaan Anamnesis:</span>
                <span className="text-teal-400 font-normal">Klik untuk menanyakan</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => askQuestion(q.id)}
                    disabled={q.asked || isTyping}
                    className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between gap-3 transition-all ${
                      q.asked
                        ? 'bg-slate-800/40 text-slate-500 border border-slate-800/60 cursor-default'
                        : isTyping
                        ? 'bg-slate-800/60 text-slate-400 border border-slate-700/50 cursor-wait'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 hover:border-teal-500/50 shadow hover:shadow-teal-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        q.asked ? 'bg-slate-700 text-slate-400' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-medium">{q.question}</span>
                    </div>

                    {q.asked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 shrink-0">
                        Tanyakan
                      </span>
                    )}
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
