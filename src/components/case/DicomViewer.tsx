'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sun, 
  Crosshair, 
  Ruler, 
  Eye, 
  Maximize2 
} from 'lucide-react';
import { CasePenunjangOption } from '../../data/cases';

interface DicomViewerProps {
  option: CasePenunjangOption;
  patientName: string;
  patientAge: number;
  caseId: number;
}

export const DicomViewer: React.FC<DicomViewerProps> = ({
  option,
  patientName,
  patientAge,
  caseId,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [windowPreset, setWindowPreset] = useState<'standard' | 'contrast' | 'invert'>('standard');
  const [showCrosshairs, setShowCrosshairs] = useState<boolean>(false);
  const [showCaliper, setShowCaliper] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  const handleReset = () => {
    setZoomLevel(1);
    setWindowPreset('standard');
    setShowCrosshairs(false);
    setShowCaliper(false);
  };

  const getModalityMeta = () => {
    if (option.category === 'CT') {
      return {
        series: 'Axial Brain 2.5mm',
        kv: '120 kVp',
        ma: '280 mA',
        window: windowPreset === 'contrast' ? 'W: 140 L: 45' : 'W: 80 L: 40 (Brain)',
        thickness: '2.5 mm',
      };
    }
    if (option.category === 'MRI') {
      return {
        series: 'Axial T2 / FLAIR Multi-Slice',
        kv: '3.0 Tesla MR',
        ma: 'TR: 4800 / TE: 95',
        window: 'Brain Parenchyma Contrast',
        thickness: '3.0 mm',
      };
    }
    return {
      series: 'Plain Radiography PA Proj',
      kv: '90 kVp',
      ma: '160 mA',
      window: 'Thorax / Skeletal Window',
      thickness: 'Standard PA',
    };
  };

  const meta = getModalityMeta();

  return (
    <div className="relative rounded-2xl bg-black border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans select-none">
      {/* PACS Top Control Toolbar */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-20 text-xs">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-teal-400">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-bold">DICOM PACS VIEWER</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{option.category} WORKSTATION</span>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Perbesar (Zoom In)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Perkecil (Zoom Out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-800 mx-0.5" />
          <button
            onClick={() => setWindowPreset(
              windowPreset === 'standard' ? 'contrast' : windowPreset === 'contrast' ? 'invert' : 'standard'
            )}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              windowPreset !== 'standard' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Ganti Mode Kontras / Invert"
          >
            <Sun className="w-3 h-3" />
            <span>{windowPreset === 'standard' ? 'Std' : windowPreset === 'contrast' ? 'High' : 'Inv'}</span>
          </button>
          <button
            onClick={() => setShowCrosshairs(!showCrosshairs)}
            className={`p-1.5 rounded transition-colors ${
              showCrosshairs ? 'bg-teal-500/20 text-teal-300' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tampilkan Crosshairs / Koordinat"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowCaliper(!showCaliper)}
            className={`p-1.5 rounded transition-colors ${
              showCaliper ? 'bg-teal-500/20 text-teal-300' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Alat Ukur Jarak / Caliper"
          >
            <Ruler className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset Tampilan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative w-full h-80 sm:h-96 md:h-[440px] bg-black flex items-center justify-center overflow-hidden">
        {/* Patient Demographics HUD - Top Left */}
        <div className="absolute top-3 left-3 z-10 text-[10px] font-mono text-emerald-400/90 leading-tight pointer-events-none drop-shadow-md">
          <div className="font-bold text-white text-[11px]">{patientName.toUpperCase()}</div>
          <div>ID: RM-{100000 + caseId * 4129} • {patientAge}Y</div>
          <div>STUDY: {option.category} BRAIN AXIAL</div>
          <div>SERIES: {meta.series}</div>
        </div>

        {/* Technical HUD - Top Right */}
        <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-emerald-400/90 text-right leading-tight pointer-events-none drop-shadow-md">
          <div>RSUD DR. SOETOMO</div>
          <div>{meta.kv} • {meta.ma}</div>
          <div>THK: {meta.thickness}</div>
          <div className="text-teal-300">{meta.window}</div>
        </div>

        {/* Anatomical Orientation Markers (A, P, R, L) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-[11px] font-mono font-bold text-teal-400/80 pointer-events-none">
          [ A - Anterior ]
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[11px] font-mono font-bold text-teal-400/80 pointer-events-none">
          [ P - Posterior ]
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-mono font-bold text-teal-400/80 pointer-events-none">
          [ R - Dextra ]
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[11px] font-mono font-bold text-teal-400/80 pointer-events-none">
          [ L - Sinistra ]
        </div>

        {/* Zoom & Window Level HUD - Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono text-slate-400 pointer-events-none">
          <div>ZOOM: {zoomLevel.toFixed(1)}x</div>
          <div>FOV: 220 mm</div>
        </div>

        {/* Crosshair Overlay */}
        {showCrosshairs && (
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="w-full h-px bg-teal-400/30" />
            <div className="h-full w-px bg-teal-400/30 absolute" />
            <div className="w-8 h-8 rounded-full border border-teal-400/40 absolute" />
          </div>
        )}

        {/* Caliper Measurement Overlay */}
        {showCaliper && (
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="relative w-40 h-24 border-b-2 border-r-2 border-dashed border-amber-400/80 flex items-end justify-end p-1">
              <span className="bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold border border-amber-500/40">
                18.4 mm
              </span>
            </div>
          </div>
        )}

        {/* Actual Radiologic Image with Zoom & Filter applied */}
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={option.image}
            alt={option.title}
            fill
            className={`object-contain transition-all duration-300 ${
              windowPreset === 'contrast'
                ? 'contrast-150 brightness-110'
                : windowPreset === 'invert'
                ? 'invert hue-rotate-180 brightness-95'
                : 'contrast-105'
            }`}
            priority
          />
        </motion.div>
      </div>

      {/* Bottom Modality Status Bar */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="truncate">Modalitas: <strong className="text-slate-200">{option.title}</strong></span>
        <span className="font-mono text-[11px] text-teal-400/80">Kualitas Resolusi: 512×512 DICOM Lossless</span>
      </div>
    </div>
  );
};

