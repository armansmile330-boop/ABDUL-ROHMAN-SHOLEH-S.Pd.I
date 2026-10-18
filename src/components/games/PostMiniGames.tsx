import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, Star, RefreshCw, ArrowRight, Heart, Volume2 } from 'lucide-react';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';
import { PostSceneIllustration } from '../Illustrations';

interface PostGameProps {
  onWin: (score: number) => void;
  onBack: () => void;
}

/**
 * Pos 1 Game: Mengenal Allah & Nabi Muhammad (Syahadat)
 * Memilih pernyataan yang benar tentang Allah Maha Esa dan Nabi Muhammad utusan Allah
 */
export const Post1MiniGame: React.FC<PostGameProps> = ({ onWin, onBack }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  const cards = [
    { id: 1, text: 'Allah Maha Esa, tidak ada Tuhan selain Allah', isCorrect: true, icon: '🌟' },
    { id: 2, text: 'Nabi Muhammad SAW adalah utusan Allah yang mulia', isCorrect: true, icon: '📖' },
    { id: 3, text: 'Menyembah patung atau pohon besar', isCorrect: false, icon: '❌' },
    { id: 4, text: 'Selalu bersyukur dan beribadah hanya kepada Allah', isCorrect: true, icon: '🤲' },
  ];

  const handleToggle = (id: number, isCorrect: boolean) => {
    playPopSound();
    if (!isCorrect) {
      playTryAgainSound();
      speakIndonesian('Belum tepat! Umat Islam hanya menyembah Allah Yang Maha Esa.');
      return;
    }

    if (selectedCards.includes(id)) return;

    const nextSelected = [...selectedCards, id];
    setSelectedCards(nextSelected);
    playSuccessSound();

    // If all 3 correct cards selected
    if (nextSelected.length === 3) {
      setIsWon(true);
      playFanfareSound();
      confetti({ particleCount: 70, spread: 60 });
      speakIndonesian('Masyaallah, hebat! Kamu telah mengenal Allah dan Nabi Muhammad dengan benar!');
    }
  };

  return (
    <div className="bg-emerald-50/80 p-5 rounded-3xl border-3 border-emerald-300 anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold">
          Misi Pos 1: Gerbang Syahadat
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-1 font-heading">
          Pilih 3 Kalimat Kebaikan Tentang Allah & Rasul-Nya!
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Ketuk kartu-kartu yang menunjukkan keimanan kepada Allah dan Nabi Muhammad SAW.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((c) => {
          const isSelected = selectedCards.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => handleToggle(c.id, c.isCorrect)}
              className={`p-4 rounded-2xl border-3 text-left transition-all btn-tactile flex items-center gap-3 ${
                isSelected
                  ? 'bg-emerald-200 border-emerald-600 text-emerald-950 ring-4 ring-emerald-300'
                  : 'bg-white hover:bg-emerald-100 border-emerald-200 text-slate-800'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="font-extrabold text-base flex-1">{c.text}</span>
              {isSelected && <Check className="w-6 h-6 text-emerald-700 stroke-[3]" />}
            </button>
          );
        })}
      </div>

      {isWon ? (
        <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-emerald-500 text-center shadow-md">
          <p className="font-extrabold text-emerald-800 text-lg">
            Alhamdulillah! Kamu berhasil mengumpulkan 3 kalimat keimanan (+30 Bintang)!
          </p>
          <button
            onClick={() => onWin(30)}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <span>Dapatkan Lencana Pos 1</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between items-center text-sm font-bold text-emerald-800">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            Kembali
          </button>
          <span>{selectedCards.length} / 3 Terpilih</span>
        </div>
      )}
    </div>
  );
};

/**
 * Pos 2 Game: Taman Salat - Cocokkan nama salat dengan waktu dan suasananya
 */
export const Post2MiniGame: React.FC<PostGameProps> = ({ onWin, onBack }) => {
  const [salatList] = useState([
    { name: 'Subuh', rakaat: '2 Rakaat', time: 'Fajar / Pagi buta sebelum matahari terbit', icon: '🌅' },
    { name: 'Zuhur', rakaat: '4 Rakaat', time: 'Siang hari saat matahari condong', icon: '☀️' },
    { name: 'Asar', rakaat: '4 Rakaat', time: 'Sore hari menjelang matahari terbenam', icon: '🌤️' },
    { name: 'Magrib', rakaat: '3 Rakaat', time: 'Petang saat matahari baru saja terbenam', icon: '🌇' },
    { name: 'Isya', rakaat: '4 Rakaat', time: 'Malam hari setelah mega merah hilang', icon: '🌙' },
  ]);

  const [activeSalat, setActiveSalat] = useState(0);
  const [userRakaat, setUserRakaat] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentSalat = salatList[activeSalat];

  const handleSelectRakaat = (rakaat: string) => {
    playPopSound();
    setUserRakaat(rakaat);

    if (rakaat === currentSalat.rakaat) {
      playSuccessSound();
      setFeedback(`Benar! Salat ${currentSalat.name} berjumlah ${currentSalat.rakaat}.`);
      speakIndonesian(`Benar! Salat ${currentSalat.name} berjumlah ${currentSalat.rakaat}.`);

      setTimeout(() => {
        if (activeSalat + 1 < salatList.length) {
          setActiveSalat((prev) => prev + 1);
          setUserRakaat(null);
          setFeedback(null);
        } else {
          // Finished all 5 prayers!
          playFanfareSound();
          confetti({ particleCount: 70, spread: 60 });
        }
      }, 1200);
    } else {
      playTryAgainSound();
      setFeedback(`Belum tepat. Coba ingat lagi jumlah rakaat untuk salat ${currentSalat.name}!`);
      speakIndonesian('Belum tepat! Coba pilih rakaat yang lain.');
    }
  };

  const isAllFinished = activeSalat === salatList.length - 1 && userRakaat === currentSalat.rakaat;

  return (
    <div className="bg-sky-50/80 p-5 rounded-3xl border-3 border-sky-300 anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-3 py-1 rounded-full bg-sky-200 text-sky-800 text-xs font-bold">
          Misi Pos 2: Taman Salat
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-sky-950 mt-1 font-heading">
          Berapa Rakaat Salat {currentSalat.name}?
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Waktu: {currentSalat.time}
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border-2 border-sky-200 text-center max-w-sm mx-auto shadow-sm">
        <span className="text-4xl">{currentSalat.icon}</span>
        <div className="text-2xl font-extrabold text-sky-800 mt-2 font-heading">
          Salat {currentSalat.name}
        </div>
        <div className="text-xs text-slate-500 font-bold mt-1">
          Pertanyaan {activeSalat + 1} dari 5
        </div>
      </div>

      {/* Rakaat Choice Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-4 max-w-md mx-auto">
        {['2 Rakaat', '3 Rakaat', '4 Rakaat'].map((r) => (
          <button
            key={r}
            onClick={() => handleSelectRakaat(r)}
            className={`p-3 rounded-2xl border-3 font-extrabold text-base transition-all btn-tactile ${
              userRakaat === r && r === currentSalat.rakaat
                ? 'bg-emerald-300 border-emerald-600 text-emerald-950'
                : 'bg-white hover:bg-sky-100 border-sky-300 text-sky-900'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4 p-3 rounded-xl bg-sky-100 border border-sky-300 text-center font-bold text-sky-900 text-sm">
          {feedback}
        </div>
      )}

      {isAllFinished ? (
        <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-sky-500 text-center shadow-md">
          <p className="font-extrabold text-sky-800 text-lg">
            Masyaallah! Kamu hafal seluruh 5 waktu salat fardhu (+30 Bintang)!
          </p>
          <button
            onClick={() => onWin(30)}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-sky-600 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <span>Dapatkan Lencana Pos 2</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between items-center text-xs font-bold text-sky-700">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            Kembali
          </button>
          <span>Kemajuan: {activeSalat} / 5 Salat</span>
        </div>
      )}
    </div>
  );
};

/**
 * Pos 3 Game: Desa Berbagi Zakat - Membagikan kantong beras zakat fitrah
 */
export const Post3MiniGame: React.FC<PostGameProps> = ({ onWin, onBack }) => {
  const [sharedCount, setSharedCount] = useState(0);
  const targetCount = 3;

  const handleShare = () => {
    playPopSound();
    playSuccessSound();
    const next = sharedCount + 1;
    setSharedCount(next);

    if (next === targetCount) {
      playFanfareSound();
      confetti({ particleCount: 70, spread: 60 });
      speakIndonesian('Alhamdulillah! Beras zakat fitrah telah tersalurkan dengan santun dan ikhlas kepada fakir miskin.');
    } else {
      speakIndonesian('Alhamdulillah, terima kasih anak saleh!');
    }
  };

  return (
    <div className="bg-amber-50/80 p-5 rounded-3xl border-3 border-amber-300 anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-800 text-xs font-bold">
          Misi Pos 3: Desa Berbagi Zakat
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 mt-1 font-heading">
          Ayo Bagikan 3 Kantong Beras Zakat Fitrah!
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Ketuk kantong beras zakat untuk menyerahkannya dengan sopan kepada tetangga yang membutuhkan.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-4 bg-white rounded-2xl border-2 border-amber-200">
        {/* Recipient illustration */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-amber-100 border-3 border-amber-400 flex items-center justify-center mx-auto text-4xl shadow-inner">
            🏡
          </div>
          <span className="font-extrabold text-slate-800 text-sm mt-2 block">
            Keluarga Kurang Mampu
          </span>
          <span className="text-xs text-emerald-600 font-bold">
            Sudah Menerima: {sharedCount} / {targetCount} Kantong
          </span>
        </div>

        {/* Heart connection */}
        <Heart className={`w-8 h-8 text-rose-500 ${sharedCount > 0 ? 'animate-ping' : ''}`} />

        {/* Share Button Rice Bag */}
        <div className="text-center">
          <button
            onClick={handleShare}
            disabled={sharedCount >= targetCount}
            className={`p-4 rounded-3xl border-3 transition-all btn-tactile flex flex-col items-center ${
              sharedCount >= targetCount
                ? 'bg-slate-100 border-slate-300 opacity-60 cursor-default'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-400 scale-102 ring-4 ring-amber-200'
            }`}
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <PostSceneIllustration type="rice-charity" size={75} />
            </div>
            <span className="font-extrabold text-amber-900 text-sm mt-1">
              {sharedCount >= targetCount ? 'Semua Tersalurkan!' : 'Ketuk untuk Berbagi Beras'}
            </span>
          </button>
        </div>
      </div>

      {sharedCount >= targetCount ? (
        <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-amber-500 text-center shadow-md">
          <p className="font-extrabold text-amber-900 text-lg">
            Masyaallah! Berbagi dengan ikhlas membersihkan jiwa dan rezeki kita (+30 Bintang)!
          </p>
          <button
            onClick={() => onWin(30)}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <span>Dapatkan Lencana Pos 3</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between items-center text-xs font-bold text-amber-800">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            Kembali
          </button>
          <span>Pemberian ikhlas dan santun</span>
        </div>
      )}
    </div>
  );
};

/**
 * Pos 4 Game: Kampung Ramadan - Memilih 3 amalan baik di bulan Ramadan
 */
export const Post4MiniGame: React.FC<PostGameProps> = ({ onWin, onBack }) => {
  const [selectedDeeds, setSelectedDeeds] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  const deeds = [
    { id: 1, text: 'Bangun sahur dan berdoa bersama keluarga', isGood: true, emoji: '🍲' },
    { id: 2, text: 'Membaca Al-Qur\'an (tadarus) dan bersalawat', isGood: true, emoji: '📖' },
    { id: 3, text: 'Marah-marah dan makan permen di siang hari', isGood: false, emoji: '🍬' },
    { id: 4, text: 'Membantu ibu menyiapkan makanan takjil berbuka', isGood: true, emoji: '🥣' },
  ];

  const handleSelect = (id: number, isGood: boolean) => {
    playPopSound();
    if (!isGood) {
      playTryAgainSound();
      speakIndonesian('Saat berpuasa kita harus sabar dan tidak makan minum di siang hari.');
      return;
    }

    if (selectedDeeds.includes(id)) return;

    const next = [...selectedDeeds, id];
    setSelectedDeeds(next);
    playSuccessSound();

    if (next.length === 3) {
      setIsWon(true);
      playFanfareSound();
      confetti({ particleCount: 70, spread: 60 });
      speakIndonesian('Masyaallah! Amalan Ramadanmu sungguh mulia!');
    }
  };

  return (
    <div className="bg-indigo-50/80 p-5 rounded-3xl border-3 border-indigo-300 anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-3 py-1 rounded-full bg-indigo-200 text-indigo-800 text-xs font-bold">
          Misi Pos 4: Kampung Ramadan
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-950 mt-1 font-heading">
          Pilih 3 Amalan Baik di Bulan Ramadan!
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Ketuk amalan yang disukai Allah saat kita berpuasa di bulan Ramadan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deeds.map((d) => {
          const isSelected = selectedDeeds.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() => handleSelect(d.id, d.isGood)}
              className={`p-4 rounded-2xl border-3 text-left transition-all btn-tactile flex items-center gap-3 ${
                isSelected
                  ? 'bg-indigo-200 border-indigo-600 text-indigo-950 ring-4 ring-indigo-300'
                  : 'bg-white hover:bg-indigo-100 border-indigo-200 text-slate-800'
              }`}
            >
              <span className="text-2xl">{d.emoji}</span>
              <span className="font-extrabold text-base flex-1">{d.text}</span>
              {isSelected && <Check className="w-6 h-6 text-indigo-700 stroke-[3]" />}
            </button>
          );
        })}
      </div>

      {isWon ? (
        <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-indigo-500 text-center shadow-md">
          <p className="font-extrabold text-indigo-900 text-lg">
            Alhamdulillah! Kamu menjadi Bintang Ramadan yang berhati bersih (+30 Bintang)!
          </p>
          <button
            onClick={() => onWin(30)}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <span>Dapatkan Lencana Pos 4</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between items-center text-xs font-bold text-indigo-800">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            Kembali
          </button>
          <span>{selectedDeeds.length} / 3 Amalan Terpilih</span>
        </div>
      )}
    </div>
  );
};

/**
 * Pos 5 Game: Jalan Menuju Baitullah - Mengenal Ka'bah dan Ibadah Haji
 */
export const Post5MiniGame: React.FC<PostGameProps> = ({ onWin, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isWon, setIsWon] = useState(false);

  const options = [
    { text: 'Ka\'bah di Masjidil Haram, Makkah', isCorrect: true },
    { text: 'Pasar malam di dekat rumah', isCorrect: false },
    { text: 'Taman bermain korsel', isCorrect: false },
  ];

  const handleSelect = (text: string, isCorrect: boolean) => {
    playPopSound();
    setSelectedAnswer(text);

    if (isCorrect) {
      setIsWon(true);
      playSuccessSound();
      playFanfareSound();
      confetti({ particleCount: 80, spread: 70 });
      speakIndonesian('Masyaallah, Ka\'bah Baitullah terletak di Masjidil Haram, kota Makkah. Ibadah haji wajib bagi yang mampu.');
    } else {
      playTryAgainSound();
      speakIndonesian('Belum tepat! Ka\'bah adalah tempat ibadah suci di kota Makkah.');
    }
  };

  return (
    <div className="bg-teal-50/80 p-5 rounded-3xl border-3 border-teal-300 anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-3 py-1 rounded-full bg-teal-200 text-teal-800 text-xs font-bold">
          Misi Pos 5: Jalan Menuju Baitullah
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-teal-950 mt-1 font-heading">
          Di Manakah Letak Ka\'bah yang Suci?
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Ka'bah adalah kiblat salat umat Islam sedunia dan tujuan pelaksanaan ibadah haji.
        </p>
      </div>

      <div className="w-36 h-36 mx-auto mb-3 flex items-center justify-center">
        <PostSceneIllustration type="kabah" size={130} />
      </div>

      <div className="space-y-2.5 max-w-md mx-auto">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.text;
          return (
            <button
              key={opt.text}
              onClick={() => handleSelect(opt.text, opt.isCorrect)}
              className={`w-full p-4 rounded-2xl border-3 text-center font-extrabold text-base transition-all btn-tactile ${
                isSelected && opt.isCorrect
                  ? 'bg-emerald-200 border-emerald-600 text-emerald-950 ring-4 ring-emerald-300'
                  : isSelected && !opt.isCorrect
                  ? 'bg-amber-100 border-amber-400 text-amber-950'
                  : 'bg-white hover:bg-teal-100 border-teal-200 text-slate-800'
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {isWon ? (
        <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-teal-500 text-center shadow-md">
          <p className="font-extrabold text-teal-900 text-lg">
            Masyaallah! Kamu telah menuntaskan seluruh 5 rukun Islam (+30 Bintang)!
          </p>
          <button
            onClick={() => onWin(30)}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <span>Dapatkan Lencana Pos 5</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between items-center text-xs font-bold text-teal-800">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            Kembali
          </button>
          <span>Mampu secara fisik & biaya</span>
        </div>
      )}
    </div>
  );
};
