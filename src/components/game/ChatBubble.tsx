'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope } from 'lucide-react';

interface ChatBubbleProps {
  sender: 'doctor' | 'patient';
  text: string;
  timestamp: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text, timestamp }) => {
  const isDoctor = sender === 'doctor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2.5 my-2.5 ${isDoctor ? 'justify-end' : 'justify-start'}`}
    >
      {!isDoctor && (
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mb-1">
          <User className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-md text-sm leading-relaxed ${
          isDoctor
            ? 'bg-teal-700 text-teal-50 rounded-br-xs border border-teal-600/50'
            : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/80'
        }`}
      >
        <div className="text-[10px] font-semibold tracking-wider uppercase mb-1 opacity-70">
          {isDoctor ? 'Dokter (Anda)' : 'Ibu Ny. S (60 th)'}
        </div>
        <div className="font-normal whitespace-pre-wrap">{text}</div>
        <div className="text-[10px] opacity-60 text-right mt-1.5">{timestamp}</div>
      </div>

      {isDoctor && (
        <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shrink-0 mb-1">
          <Stethoscope className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
};

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 my-2 justify-start"
    >
      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
        <User className="w-4 h-4" />
      </div>
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl rounded-bl-xs px-4 py-3 shadow-md flex items-center gap-1.5">
        <span className="text-xs text-slate-400 mr-1">Pasien sedang berbicara</span>
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
};
