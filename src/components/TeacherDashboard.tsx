import React, { useState } from 'react';
import { X, Download, RotateCcw, GraduationCap, CheckCircle, Star, Award, TrendingUp, Info, Lightbulb } from 'lucide-react';
import { StudentProfile } from '../types';
import { playPopSound } from '../utils/audio';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile | null;
  allHistory: StudentProfile[];
  onResetStudentProgress: () => void;
  onOpenPblModule?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  isOpen,
  onClose,
  currentStudent,
  allHistory,
  onResetStudentProgress,
  onOpenPblModule,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  // Export to CSV function
  const handleExportCSV = () => {
    playPopSound();
    const studentsToExport = allHistory.length > 0 ? allHistory : currentStudent ? [currentStudent] : [];

    if (studentsToExport.length === 0) {
      alert('Belum ada data murid yang tercatat.');
      return;
    }

    const headers = [
      'Nama Murid',
      'Karakter',
      'Skor Asesmen Awal',
      'Skor Asesmen Akhir',
      'Kenaikan Nilai',
      'Total Bintang',
      'Jumlah Pos Selesai',
      'Lencana Diraih',
      'Pos Terfavorit',
      'Niat Kebiasaan Baik',
      'Perasaan Murid',
      'Waktu Mulai',
    ];

    const rows = studentsToExport.map((s) => {
      const growth = s.postTestScore !== null && s.preTestScore !== null ? s.postTestScore - s.preTestScore : '-';
      const habits = s.reflections ? s.reflections.habitCommitment.join('; ') : '-';
      return [
        `"${s.name}"`,
        `"${s.avatar}"`,
        s.preTestScore ?? 0,
        s.postTestScore ?? '-',
        growth,
        s.stars,
        `${s.completedPosts.length}/5`,
        `"${s.badgesEarned.join(', ')}"`,
        `"${s.reflections?.favoritePillar ?? '-'}"`,
        `"${habits}"`,
        `"${s.reflections?.feeling ?? '-'}"`,
        `"${s.createdAt}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_pai_kelas1_rukun_islam_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const active = currentStudent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-slate-300 max-w-4xl w-full p-6 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto anim-screen-zoom">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-800">
              <GraduationCap className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Dashboard & Rekap Nilai Guru PAI
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pantau asesmen awal, pos rukun Islam yang dituntaskan, dan asesmen akhir murid.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 btn-tactile"
            title="Tutup Menu Guru"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Local Storage Notice */}
        <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-2.5 text-xs text-sky-900">
          <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Penyimpanan Data:</strong> Data asesmen murid tersimpan secara aman di memori lokal peramban (Local Storage) perangkat ini. Guru dapat mengekspor rekap dalam format CSV untuk dokumentasi rapor kelas.
          </div>
        </div>

        {/* Current Student Profile Overview */}
        {active ? (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500">Nama Murid Aktif</span>
                <h4 className="text-2xl font-black text-slate-900 font-heading">
                  {active.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Mulai belajar: {new Date(active.createdAt).toLocaleString('id-ID')}
                </p>
              </div>

              {/* Badges and Stars */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-2xl bg-amber-100 border border-amber-300 text-center">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Bintang</span>
                  <span className="text-lg font-black text-amber-900 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
                    {active.stars}
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-2xl bg-teal-100 border border-teal-300 text-center">
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">Lencana</span>
                  <span className="text-lg font-black text-teal-900">
                    {active.badgesEarned.length} / 5
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-2xl bg-purple-100 border border-purple-300 text-center">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block">Kasus PBL</span>
                  <span className="text-lg font-black text-purple-900">
                    {active.pblSolvedPosts?.length || 0} / 5
                  </span>
                </div>
              </div>
            </div>

            {/* PBL Model Quick Link Banner */}
            {onOpenPblModule && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-5 h-5 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold text-amber-950">
                    Aplikasi ini dirancang dengan <strong>Model Problem-Based Learning (PBL) 5 Sintaks</strong>.
                  </span>
                </div>
                <button
                  onClick={() => {
                    playPopSound();
                    onOpenPblModule();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs btn-tactile shrink-0"
                >
                  Buka Modul Ajar PBL
                </button>
              </div>
            )}

            {/* Assessment Comparison Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">1. Asesmen Awal</span>
                <div className="text-3xl font-black text-slate-700 mt-1">
                  {active.preTestScore !== null ? `${active.preTestScore}` : 'Belum'}
                </div>
                <span className="text-[11px] text-slate-400">Sebelum Eksplorasi Pos</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 text-center">
                <span className="text-xs font-bold text-emerald-700 uppercase">2. Asesmen Akhir</span>
                <div className="text-3xl font-black text-emerald-700 mt-1">
                  {active.postTestScore !== null ? `${active.postTestScore}` : 'Belum'}
                </div>
                <span className="text-[11px] text-emerald-600">Setelah Menyelesaikan Pos</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-sky-300 text-center">
                <span className="text-xs font-bold text-sky-700 uppercase">3. Pertumbuhan</span>
                <div className="text-3xl font-black text-sky-700 mt-1 flex items-center justify-center gap-1">
                  {active.postTestScore !== null && active.preTestScore !== null ? (
                    <>
                      <TrendingUp className="w-6 h-6 text-sky-600" />
                      <span>{active.postTestScore - active.preTestScore >= 0 ? `+${active.postTestScore - active.preTestScore}` : active.postTestScore - active.preTestScore}</span>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <span className="text-[11px] text-sky-600">Selisih Pemahaman</span>
              </div>
            </div>

            {/* Completed Stations checklist */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600 block mb-2">
                Status Penyelesaian 5 Pos Pembelajaran:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 1, name: 'Pos 1: Syahadat' },
                  { id: 2, name: 'Pos 2: Salat' },
                  { id: 3, name: 'Pos 3: Zakat' },
                  { id: 4, name: 'Pos 4: Puasa' },
                  { id: 5, name: 'Pos 5: Haji' },
                ].map((p) => {
                  const done = active.completedPosts.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                        done
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${done ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span>{p.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reflection commitments */}
            {active.reflections && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
                <span className="font-bold uppercase text-amber-900 block mb-1">
                  Catatan Refleksi & Niat Pengamalan:
                </span>
                <p className="text-slate-700">
                  <strong>Pos Favorit:</strong> {active.reflections.favoritePillar}
                </p>
                <p className="text-slate-700 mt-0.5">
                  <strong>Kebiasaan Baik:</strong> {active.reflections.habitCommitment.join(', ')}
                </p>
                <p className="text-slate-700 mt-0.5">
                  <strong>Perasaan Murid:</strong> {active.reflections.feeling}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 font-medium">
            Belum ada data murid yang aktif. Masukkan nama murid di halaman awal untuk mulai mencatat.
          </div>
        )}

        {/* Action Buttons: Export CSV & Reset */}
        <div className="mt-6 pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Hasil Belajar (CSV)</span>
          </button>

          {!showConfirmReset ? (
            <button
              onClick={() => {
                playPopSound();
                setShowConfirmReset(true);
              }}
              className="px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Progres Murid</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-700">Yakin reset?</span>
              <button
                onClick={() => {
                  playPopSound();
                  onResetStudentProgress();
                  setShowConfirmReset(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs btn-tactile"
              >
                Ya, Reset
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
