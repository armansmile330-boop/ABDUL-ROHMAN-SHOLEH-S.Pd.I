import React from 'react';
import { Award, Star, Printer, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';
import { BADGES_LIST } from '../data/curriculumData';
import { playPopSound } from '../utils/audio';

interface CertificateProps {
  student: StudentProfile;
  onRestartAdventure: () => void;
  onClose?: () => void;
}

export const CertificateModal: React.FC<CertificateProps> = ({
  student,
  onRestartAdventure,
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    playPopSound();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 anim-screen-enter">
      {/* Action buttons (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm inline-flex items-center gap-2 btn-tactile shadow-md"
        >
          <Printer className="w-5 h-5" />
          <span>Cetak / Simpan Sertifikat</span>
        </button>

        <button
          onClick={() => {
            playPopSound();
            onRestartAdventure();
          }}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm inline-flex items-center gap-2 btn-tactile border border-slate-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Mulai Petualangan Baru</span>
        </button>
      </div>

      {/* The Printable Certificate Canvas */}
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-3xl border-8 border-amber-400 p-8 sm:p-12 shadow-2xl text-center overflow-hidden anim-screen-zoom">
        {/* Ornate corner ornaments */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-amber-500 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-amber-500 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-amber-500 rounded-br-xl pointer-events-none" />

        {/* Header Institution */}
        <div className="mb-4">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-800">
            PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI • KELAS 1 SD
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-amber-950 font-heading mt-2 tracking-tight">
            PIAGAM BINTANG MUSLIM CILIK
          </h2>
          <p className="text-sm sm:text-base font-bold text-teal-700 mt-1">
            Petualangan 5 Pilar Islam: Misi Seru Mengenal Rukun Islam Sejak Dini
          </p>
        </div>

        {/* Divider with Gold Star */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-0.5 w-24 bg-amber-300" />
          <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
          <div className="h-0.5 w-24 bg-amber-300" />
        </div>

        {/* Given to Text */}
        <p className="text-slate-600 text-sm font-medium">
          Piagam kehormatan ini diberikan kepada Ananda:
        </p>

        {/* Student Name */}
        <div className="my-4">
          <h3 className="text-3xl sm:text-5xl font-black text-emerald-800 font-heading underline decoration-amber-400 decoration-wavy underline-offset-8">
            {student.name}
          </h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">
            Murid Teladan Sahabat Raka & Rara
          </p>
        </div>

        {/* Statement of Achievement */}
        <p className="text-slate-700 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed my-4">
          Telah berhasil menyelesaikan seluruh penjelajahan berbasis <strong>Problem-Based Learning (PBL)</strong>, memecahkan masalah kontekstual kehidupan sehari-hari, serta memahami dan mengamalkan <strong>5 Rukun Islam</strong> (Syahadat, Salat, Zakat, Puasa Ramadan, dan Haji) dengan penuh semangat, kejujuran, dan akhlak terpuji.
        </p>

        {/* Badges Earned Section */}
        <div className="my-6 p-4 rounded-2xl bg-white/80 border-2 border-amber-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800">
              5 Lencana Bintang yang Berhasil Dikoleksi:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              💡 {student.pblSolvedPosts?.length || 5}/5 Kasus PBL Terpecahkan
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {BADGES_LIST.map((b) => (
              <div
                key={b.id}
                className="p-2.5 rounded-xl bg-gradient-to-b from-amber-50 to-emerald-50 border border-amber-300 flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shadow-sm">
                  ★
                </div>
                <span className="text-xs font-black text-slate-800 mt-1.5 leading-tight">
                  {b.name}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">Terverifikasi</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stars and Score Summary */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto my-6 text-center">
          <div className="p-3 rounded-2xl bg-amber-100 border border-amber-300">
            <span className="text-[11px] font-bold text-amber-800 uppercase block">Total Bintang</span>
            <span className="text-2xl font-black text-amber-950 flex items-center justify-center gap-1 mt-0.5">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              {student.stars}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-sky-100 border border-sky-300">
            <span className="text-[11px] font-bold text-sky-800 uppercase block">Asesmen Awal</span>
            <span className="text-2xl font-black text-sky-950 mt-0.5 block">
              {student.preTestScore ?? 0}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300">
            <span className="text-[11px] font-bold text-emerald-800 uppercase block">Asesmen Akhir</span>
            <span className="text-2xl font-black text-emerald-950 mt-0.5 block">
              {student.postTestScore ?? 100}
            </span>
          </div>
        </div>

        {/* Footer Signature & Date */}
        <div className="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600 font-bold">
          <div>
            <p>Diberikan pada tanggal:</p>
            <p className="text-slate-900 font-extrabold mt-0.5">{currentDate}</p>
          </div>

          <div className="text-center">
            {/* Stamp seal graphic */}
            <div className="w-16 h-16 rounded-full border-4 border-amber-500 bg-amber-50 flex items-center justify-center mx-auto text-amber-700 font-black text-[10px] uppercase shadow-sm">
              RESMI<br />LULUS
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p>Guru Pendidikan Agama Islam</p>
            <div className="h-8" />
            <p className="border-t border-slate-400 pt-1 font-extrabold text-slate-900">
              ( Guru PAI & Budi Pekerti )
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
