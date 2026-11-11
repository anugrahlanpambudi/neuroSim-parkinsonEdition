'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  QrCode, 
  ShieldCheck, 
  Info,
  Maximize2
} from 'lucide-react';
import { CasePenunjangOption } from '../../data/cases';

interface LabReportViewerProps {
  option: CasePenunjangOption;
  caseId: number;
  patientName: string;
  patientAge: number;
  patientGender: string;
}

export const LabReportViewer: React.FC<LabReportViewerProps> = ({
  option,
  caseId,
  patientName,
  patientAge,
  patientGender,
}) => {
  const [slitLampBeam, setSlitLampBeam] = useState<'slit' | 'diffuse'>('slit');
  const [slitLampAngle, setSlitLampAngle] = useState<number>(45);

  // Generate structured lab rows based on case and test ID
  const getLabRows = () => {
    switch (caseId) {
      case 1:
        // Case 1: Ny Warsiti - Idiopathic Parkinson - Lab Darah Lengkap & Kimia
        return [
          { param: 'Hemoglobin (Hb)', result: '13.8', ref: '12.0 - 15.5', unit: 'g/dL', status: 'normal' },
          { param: 'Leukosit', result: '6.400', ref: '4.000 - 10.000', unit: '/uL', status: 'normal' },
          { param: 'Trombosit', result: '245.000', ref: '150.000 - 450.000', unit: '/uL', status: 'normal' },
          { param: 'Hematokrit', result: '41.2', ref: '37.0 - 47.0', unit: '%', status: 'normal' },
          { param: 'Ureum Darah', result: '24.0', ref: '15.0 - 43.0', unit: 'mg/dL', status: 'normal' },
          { param: 'Kreatinin Serum', result: '0.8', ref: '0.6 - 1.1', unit: 'mg/dL', status: 'normal' },
          { param: 'Gula Darah Sewaktu (GDS)', result: '105', ref: '< 140', unit: 'mg/dL', status: 'normal' },
          { param: 'Natrium (Na+)', result: '140', ref: '136 - 145', unit: 'mEq/L', status: 'normal' },
          { param: 'Kalium (K+)', result: '4.2', ref: '3.5 - 5.1', unit: 'mEq/L', status: 'normal' },
        ];
      case 2:
        // Case 2: Tn Budi - Vascular Parkinsonism - Profil Lipid & Glukosa
        return [
          { param: 'Kolesterol Total', result: '260', ref: '< 200', unit: 'mg/dL', status: 'high' },
          { param: 'Kolesterol LDL', result: '175', ref: '< 100', unit: 'mg/dL', status: 'high' },
          { param: 'Kolesterol HDL', result: '38', ref: '> 40', unit: 'mg/dL', status: 'low' },
          { param: 'Trigliserida', result: '210', ref: '< 150', unit: 'mg/dL', status: 'high' },
          { param: 'Gula Darah Sewaktu (GDS)', result: '198', ref: '< 140', unit: 'mg/dL', status: 'high' },
          { param: 'HbA1c', result: '8.2', ref: '< 5.7', unit: '%', status: 'high' },
          { param: 'Ureum Darah', result: '32.0', ref: '15.0 - 43.0', unit: 'mg/dL', status: 'normal' },
          { param: 'Kreatinin Serum', result: '1.0', ref: '0.7 - 1.3', unit: 'mg/dL', status: 'normal' },
          { param: 'INR (International Normalized Ratio)', result: '1.02', ref: '0.85 - 1.15', unit: '-', status: 'normal' },
        ];
      case 3:
        // Case 3: Ny Suryati - Uremic Encephalopathy - Ginjal Cito & Elektrolit
        return [
          { param: 'Ureum Darah Cito', result: '215.0', ref: '15.0 - 43.0', unit: 'mg/dL', status: 'critical' },
          { param: 'Kreatinin Serum Cito', result: '11.8', ref: '0.6 - 1.1', unit: 'mg/dL', status: 'critical' },
          { param: 'eGFR (CKD-EPI)', result: '4.2', ref: '> 90.0', unit: 'mL/min/1.73m²', status: 'critical' },
          { param: 'Kalium Serum (K+)', result: '5.8', ref: '3.5 - 5.1', unit: 'mEq/L', status: 'high' },
          { param: 'Natrium Serum (Na+)', result: '132', ref: '136 - 145', unit: 'mEq/L', status: 'low' },
          { param: 'Klorida (Cl-)', result: '98', ref: '98 - 107', unit: 'mEq/L', status: 'normal' },
          { param: 'pH Darah Arteri (BGA)', result: '7.28', ref: '7.35 - 7.45', unit: '-', status: 'low' },
          { param: 'HCO3- (Bikarbonat)', result: '15.2', ref: '22.0 - 26.0', unit: 'mEq/L', status: 'low' },
          { param: 'Base Excess (BE)', result: '-9.4', ref: '-2.0 - +2.0', unit: 'mEq/L', status: 'low' },
        ];
      case 4:
        // Case 4: Tn Reza - Post-Encephalitic - Analisis LCS (Cairan Serebrospinal)
        return [
          { param: 'Makroskopis LCS: Kejernihan', result: 'Jernih Tidak Berwarna', ref: 'Jernih', unit: '-', status: 'normal' },
          { param: 'Tekanan Pembukaan (Opening Pressure)', result: '130', ref: '70 - 180', unit: 'mmH2O', status: 'normal' },
          { param: 'Hitung Sel Leukosit LCS', result: '2', ref: '0 - 5', unit: '/uL', status: 'normal' },
          { param: 'Hitung Jenis (MN / PMN)', result: '100% MN / 0% PMN', ref: 'Mononuklear', unit: '%', status: 'normal' },
          { param: 'Protein LCS', result: '38.0', ref: '15.0 - 45.0', unit: 'mg/dL', status: 'normal' },
          { param: 'Glukosa LCS', result: '62.0', ref: '40.0 - 70.0', unit: 'mg/dL', status: 'normal' },
          { param: 'Rasio Glukosa LCS / Darah', result: '0.64', ref: '> 0.60', unit: '-', status: 'normal' },
          { param: 'Pewarnaan Gram / Ziehl-Neelsen', result: 'Negatif / Tidak Ditemukan Kuman', ref: 'Negatif', unit: '-', status: 'normal' },
          { param: 'PCR Multiplex Meningoensefalitis', result: 'Non-Reaktif (HSV, Enterovirus, VZV)', ref: 'Non-Reaktif', unit: '-', status: 'normal' },
        ];
      case 5:
        // Case 5: Tn Hendra - Wilson Disease - Ceruloplasmin, Cu Urin & Slit Lamp
        return [
          { param: 'Serum Ceruloplasmin', result: '8.2', ref: '20.0 - 35.0', unit: 'mg/dL', status: 'critical' },
          { param: 'Ekskresi Tembaga (Cu) Urin 24 Jam', result: '142.5', ref: '< 40.0', unit: 'mcg/24h', status: 'critical' },
          { param: 'Serum Copper (Tembaga Bebas)', result: '28.4', ref: '< 10.0', unit: 'mcg/dL', status: 'high' },
          { param: 'SGOT / AST', result: '68', ref: '< 35', unit: 'U/L', status: 'high' },
          { param: 'SGPT / ALT', result: '82', ref: '< 45', unit: 'U/L', status: 'high' },
          { param: 'Bilirubin Total', result: '1.8', ref: '< 1.1', unit: 'mg/dL', status: 'high' },
          { param: 'Biomikroskopi Slit-Lamp Kornea', result: 'Kayser-Fleischer Ring (+)', ref: 'Negatif', unit: '-', status: 'critical' },
        ];
      default:
        return [
          { param: 'Pemeriksaan Rutin', result: 'Dalam Batas Normal', ref: 'Normal', unit: '-', status: 'normal' },
        ];
    }
  };

  const rows = getLabRows();

  return (
    <div className="space-y-4">
      {/* Official Clinical Pathology Report Sheet */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Hospital Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-teal-400 font-bold">
                RSUD DR. SOETOMO • INSTALASI PATOLOGI KLINIK
              </div>
              <h2 className="text-sm md:text-base font-bold text-white tracking-tight">
                LEMBAR HASIL PEMERIKSAAN LABORATORIUM
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              TERVERIFIKASI SISTEM LIS
            </span>
          </div>
        </div>

        {/* Patient Demographics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Nama Pasien:</div>
            <div className="font-bold text-slate-200 truncate">{patientName}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">No. Rekam Medis:</div>
            <div className="font-mono font-semibold text-teal-300">RM-{100000 + caseId * 4129}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Umur / Gender:</div>
            <div className="text-slate-300 font-medium">{patientAge} Tahun / {patientGender}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Dokter Pengirim:</div>
            <div className="text-slate-300 font-medium truncate">dr. Spesialis Saraf, Sp.N</div>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] uppercase font-mono text-slate-400">
                <th className="py-2.5 px-4 font-semibold">Parameter Uji</th>
                <th className="py-2.5 px-4 font-semibold">Hasil Pasien</th>
                <th className="py-2.5 px-4 font-semibold">Nilai Rujukan</th>
                <th className="py-2.5 px-4 font-semibold">Satuan</th>
                <th className="py-2.5 px-4 font-semibold text-center">Status Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {rows.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-850/50 transition-colors ${
                    row.status === 'critical' 
                      ? 'bg-rose-950/20' 
                      : row.status === 'high' || row.status === 'low'
                      ? 'bg-amber-950/15'
                      : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-medium text-slate-200">
                    {row.param}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold">
                    <span className={
                      row.status === 'critical'
                        ? 'text-rose-400'
                        : row.status === 'high' || row.status === 'low'
                        ? 'text-amber-400'
                        : 'text-slate-200'
                    }>
                      {row.result}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-400">
                    {row.ref}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">
                    {row.unit}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {row.status === 'critical' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 inline-flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        KRITIS ({row.status.toUpperCase()})
                      </span>
                    ) : row.status === 'high' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        TINGGI [H]
                      </span>
                    ) : row.status === 'low' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        RENDAH [L]
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800 text-slate-400">
                        NORMAL
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Clinical Note & Validator */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Catatan Ekspertise Patologi Klinik:</span>
            <p className="text-slate-300 italic">{option.interpretation}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Penanggung Jawab Validasi:</div>
            <div className="font-bold text-slate-300">dr. Rahmawati, Sp.PK(K)</div>
            <div className="text-[10px] font-mono text-teal-400/80">SIP: 503/419/Dinkes/2024</div>
          </div>
        </div>
      </div>

      {/* Special Interactive Sub-Viewer for Case 5 (Wilson Disease - Slit-Lamp Biomicroscopy) */}
      {caseId === 5 && (
        <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Biomikroskopi Slit-Lamp Oftalmologi: Evaluasi Cincin Kayser-Fleischer
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSlitLampBeam(slitLampBeam === 'slit' ? 'diffuse' : 'slit')}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
              >
                Mode Lampu: <strong>{slitLampBeam === 'slit' ? 'Sinar Celah (Slit-Beam)' : 'Difus'}</strong>
              </button>
            </div>
          </div>

          {/* Interactive Slit-lamp Visual Canvas */}
          <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Eye Background Graphic */}
            <div className="relative w-56 h-56 rounded-full border-4 border-slate-800 bg-gradient-to-tr from-slate-900 via-stone-900 to-slate-900 flex items-center justify-center shadow-2xl">
              {/* Sclera */}
              <div className="absolute inset-0 rounded-full bg-slate-900 border border-slate-700 shadow-inner" />
              
              {/* Cornea / Iris Circle */}
              <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-amber-950 via-stone-800 to-amber-950 border border-amber-900/60 shadow-xl flex items-center justify-center overflow-hidden">
                {/* Iris radial pattern */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,transparent_30%,#78350f_90%)]" />

                {/* THE KAYSER-FLEISCHER RING (Golden-brown / greenish copper band on Descemet membrane) */}
                <motion.div 
                  animate={{ 
                    opacity: slitLampBeam === 'slit' ? [0.85, 1, 0.85] : 0.6,
                    scale: slitLampBeam === 'slit' ? [0.99, 1.01, 0.99] : 1
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute inset-1.5 rounded-full border-[7px] border-amber-600/90 shadow-[0_0_15px_rgba(217,119,6,0.6)]"
                  title="Cincin Kayser-Fleischer (Deposisi Tembaga pada Membran Descemet)"
                />

                {/* Pupil */}
                <div className="w-16 h-16 rounded-full bg-black border border-stone-800 shadow-2xl flex items-center justify-center">
                  {/* Light Reflection */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white/70 -mt-3 -ml-3 blur-[0.5px]" />
                </div>

                {/* Slit-Lamp Light Beam Overlay */}
                {slitLampBeam === 'slit' && (
                  <motion.div 
                    animate={{ x: [-40, 40, -40] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent blur-[1px] rotate-12 pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* Diagnostic Marker Callout */}
            <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-[11px] text-amber-300 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cincin Kayser-Fleischer (K-F Ring): <strong>POSITIF (+)</strong></span>
            </div>

            <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 font-mono">
              Deposisi Tembaga Limbus Kornea Perifer
            </div>
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed">
            <strong>Korelasi Klinis Wilson Disease:</strong> Cincin Kayser-Fleischer hadir pada &gt;95% pasien Wilson disease dengan manifestasi neurologis. Disebabkan oleh pengendapan tembaga bebas pada membran Descemet kornea bagian perifer, mengonfirmasi diagnosis bersama temuan ceruloplasmin rendah dan ekskresi tembaga urin yang tinggi.
          </div>
        </div>
      )}
    </div>
  );
};

