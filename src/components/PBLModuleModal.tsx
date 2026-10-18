import React from 'react';
import { X, BookOpen, Lightbulb, CheckCircle2, Printer, Target, Sparkles, Award } from 'lucide-react';
import { playPopSound } from '../utils/audio';

interface PBLModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PBLModuleModal: React.FC<PBLModuleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playPopSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-amber-400 max-w-4xl w-full p-6 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto anim-screen-zoom">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-800">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                Pedoman Pedagogis Guru
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Model Inovasi: Problem-Based Learning (PBL)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Penerapan 5 Sintaks PBL pada Pembelajaran PAI Kelas 1 SD Bab 4 Rukun Islam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile hidden sm:inline-flex"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Modul PBL</span>
            </button>
            <button
              onClick={() => {
                playPopSound();
                onClose();
              }}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 btn-tactile"
              title="Tutup Panduan"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-6 text-slate-800">
          {/* Section 1: Konsep & Rasional */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
            <h4 className="font-black text-amber-950 text-base font-heading flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600" />
              <span>Rasionalitas Penerapan Model PBL untuk Siswa Kelas 1 SD</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
              Model <strong>Problem-Based Learning (PBL)</strong> memposisikan materi 5 Rukun Islam bukan sebagai hafalan teks semata, melainkan sebagai <strong>solusi nyata atas problematika moral dan ibadah dalam kehidupan sehari-hari</strong> anak usia 6–7 tahun (seperti mengenali identitas muslim, mengatasi kelalaian waktu salat, kepedulian berbagi makanan fakir miskin, melatih kesabaran berpuasa, dan memahami batasan kemampuan berhaji).
            </p>
          </div>

          {/* Section 2: 5 Sintaks PBL dalam Aplikasi Petualangan 5 Pilar Islam */}
          <div>
            <h4 className="font-black text-slate-900 text-lg font-heading mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>5 Tahapan Sintaks PBL dalam Game Petualangan Ini</span>
            </h4>

            <div className="space-y-3">
              {/* Fase 1 */}
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Fase 1: Orientasi Murid pada Masalah Otentik
                  </h5>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 ml-9 leading-relaxed">
                  <strong>Implementasi di Aplikasi:</strong> Sebelum materi dijelaskan secara mendalam, Raka & Rara menghadapkan murid pada kasus cerita nyata di setiap pos (misal: pertanyaan teman baru tentang syarat masuk Islam, Budi yang hampir putus asa saat puasa siang hari, atau Nenek Minah yang kehabisan beras menjelang Idulfitri).
                </p>
              </div>

              {/* Fase 2 */}
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Fase 2: Mengorganisasi Murid untuk Belajar
                  </h5>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 ml-9 leading-relaxed">
                  <strong>Implementasi di Aplikasi:</strong> Murid diarahkan untuk menelaah lafaz, makna, dan arti rukun Islam melalui tombol audio pelafalan dan kartu penjelasan bergambar agar siap membedah kasus yang dihadapi.
                </p>
              </div>

              {/* Fase 3 */}
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Fase 3: Membimbing Penyelidikan Mandiri & Interaktif
                  </h5>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 ml-9 leading-relaxed">
                  <strong>Implementasi di Aplikasi:</strong> Fitur <em>"Petunjuk Penyelidikan (Clues)"</em> menyajikan fakta-fakta ajaran Islam untuk melatih daya nalar anak kelas 1 dalam menghubungkan masalah dengan solusi islami yang tepat.
                </p>
              </div>

              {/* Fase 4 */}
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-purple-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Fase 4: Mengembangkan & Menyajikan Solusi Permasalahan
                  </h5>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 ml-9 leading-relaxed">
                  <strong>Implementasi di Aplikasi:</strong> Murid memilih opsi solusi tindakan etis terbaik pada kartu PBL dan mendemonstrasikannya langsung lewat mini-game interaktif (seperti membagikan zakat beras atau menertibkan jadwal salat).
                </p>
              </div>

              {/* Fase 5 */}
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Fase 5: Menganalisis & Mengevaluasi Proses Pemecahan Masalah
                  </h5>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 ml-9 leading-relaxed">
                  <strong>Implementasi di Aplikasi:</strong> Murid menjalani Asesmen Akhir untuk mengukur peningkatan daya nalar, mengisi lembar Refleksi Pembiasaan Niat Baik, dan meraih Piagam Bintang Muslim Cilik.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Rubrik Asesmen PBL */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-black text-slate-900 text-base font-heading flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Rubrik Penilaian Problem-Based Learning (3 Ranah)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <strong>1. Sikap Spiritual & Sosial:</strong>
                <p className="text-slate-600 mt-1">
                  Menunjukkan empati kepada fakir miskin (zakat), kesabaran saat berpuasa, dan ketaatan salat 5 waktu.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <strong>2. Pengetahuan Konseptual:</strong>
                <p className="text-slate-600 mt-1">
                  Mampu menjawab pertanyaan asesmen awal dan akhir tentang arti dan urutan 5 rukun Islam.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <strong>3. Keterampilan Pemecahan Masalah:</strong>
                <p className="text-slate-600 mt-1">
                  Mampu memilih solusi terbaik atas kasus studi di tiap pos dan menuntaskan 6 arena game edukatif.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-slate-100 flex items-center justify-end">
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm btn-tactile"
          >
            Tutup Panduan PBL
          </button>
        </div>
      </div>
    </div>
  );
};
