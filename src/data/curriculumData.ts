import { PillarPost, QuizQuestion, BadgeInfo } from '../types';

export const PILLARS_DATA: PillarPost[] = [
  {
    id: 1,
    number: 1,
    name: 'Syahadat',
    subtitle: 'Gerbang Masuk Agama Islam',
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهِ',
    arabicTransliteration: 'Asyhadu an laa ilaaha illallaah, wa asyhadu anna Muhammadar rasuulullaah',
    meaning: 'Aku bersaksi bahwa tidak ada Tuhan selain Allah, dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah.',
    explanation: 'Syahadat adalah rukun Islam yang pertama dan utama. Dengan mengucap dua kalimat syahadat dengan yakin di dalam hati, kita mengakui hanya Allah yang disembah dan mencintai Nabi Muhammad SAW.',
    dailyLifeExample: 'Mengucapkan syahadat dengan santun, mendengarkan lantunan azan, berdzikir mengingat Allah saat bangun tidur, dan selalu bersyukur atas rezeki.',
    pblScenario: {
      problemTitle: 'Tantangan Masalah: Pertanyaan Sahabat Baru',
      situation: 'Di sekolah baru, seorang teman bertanya dengan santun kepada Raka: "Raka, jika seseorang ingin masuk ke dalam agama Islam, ucapan dan ikrar apakah yang paling pertama dan utama harus diucapkan dengan yakin di dalam hati?"',
      dilemmaQuestion: 'Bagaimanakah kita memecahkan rasa penasaran teman baru tersebut dengan penjelasan rukun Islam yang benar?',
      clues: [
        'Kunci utama pintu gerbang keislaman adalah bersaksi tiada Tuhan selain Allah',
        'Mengakui Nabi Muhammad SAW adalah Rasul utusan Allah',
        'Ikrar agung ini dinamakan Dua Kalimat Syahadat (Syahadatain)'
      ],
      options: [
        {
          id: 'opt-1a',
          text: 'Mengajarkan Dua Kalimat Syahadat (Tauhid & Rasul) serta artinya dengan ramah',
          isBestSolution: true,
          feedback: 'Masyaallah, tepat sekali! Syahadat adalah rukun pertama dan pintu gerbang keimanan.'
        },
        {
          id: 'opt-1b',
          text: 'Cukup menyuruhnya membeli baju muslim baru tanpa membaca syahadat',
          isBestSolution: false,
          feedback: 'Belum tepat. Baju baru bukan syarat sah menjadi seorang muslim.'
        },
        {
          id: 'opt-1c',
          text: 'Membiarkan teman tersebut bingung dan tidak menjawabnya',
          isBestSolution: false,
          feedback: 'Belum tepat. Sebagai muslim yang baik, kita harus berbagi ilmu dengan ramah.'
        }
      ],
      learningOutcome: 'Murid mampu memecahkan masalah identitas keimanan muslim melalui pemahaman Dua Kalimat Syahadat.'
    },
    badgeId: 'syahadat',
    badgeName: 'Penjelajah Syahadat',
    badgeIcon: 'Scroll',
    themeColor: {
      primary: 'bg-emerald-500 hover:bg-emerald-600',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-400',
      text: 'text-emerald-700',
      accent: 'text-emerald-500',
    },
    gameType: 'syahadat-match',
  },
  {
    id: 2,
    number: 2,
    name: 'Salat',
    subtitle: 'Tiang Agama yang Menyejukkan Hati',
    meaning: 'Salat lima waktu adalah kewajiban umat Islam yang mendekatkan diri kita kepada Allah.',
    explanation: 'Salat adalah rukun Islam yang kedua. Dalam sehari semalam, ada lima waktu salat yang kita laksanakan: Subuh (2 rakaat), Zuhur (4 rakaat), Asar (4 rakaat), Magrib (3 rakaat), dan Isya (4 rakaat).',
    dailyLifeExample: 'Mengambil air wudu dengan tertib, memakai pakaian bersih dan rapi, serta ikut salat berjamaah di masjid atau bersama ayah bunda di rumah.',
    pblScenario: {
      problemTitle: 'Tantangan Masalah: Jadwal Salat Ahmad yang Terlambat',
      situation: 'Ahmad sering kebingungan mengingat kapan waktu salat fardhu tiba. Kemarin ia hampir keliru ingin salat Subuh di siang bolong, dan lupa berapa rakaat salat fardhu yang harus ia kerjakan.',
      dilemmaQuestion: 'Bagaimana solusi terbaik untuk membantu Ahmad disiplin melaksanakan salat 5 waktu dengan tertib dan tepat waktu?',
      clues: [
        'Ada lima waktu salat fardhu: Subuh (2), Zuhur (4), Asar (4), Magrib (3), dan Isya (4)',
        'Salat adalah tiang agama yang melatih kedisiplinan sejak dini',
        'Mendengarkan panggilan azan dan memasang jadwal waktu salat sangat membantu'
      ],
      options: [
        {
          id: 'opt-2a',
          text: 'Membuat jadwal 5 waktu salat bersama Ahmad dan membiasakan salat saat azan terdengar',
          isBestSolution: true,
          feedback: 'Hebat sekali! Ahmad kini tahu urutan dan rakaat 5 salat fardhu dengan tertib.'
        },
        {
          id: 'opt-2b',
          text: 'Menyuruh Ahmad salat sekali saja dalam seminggu saat hari Minggu',
          isBestSolution: false,
          feedback: 'Belum tepat. Salat fardhu wajib dikerjakan lima waktu setiap hari, bukan seminggu sekali.'
        },
        {
          id: 'opt-2c',
          text: 'Mengatakan bahwa salat itu tidak perlu tepat waktu',
          isBestSolution: false,
          feedback: 'Belum tepat. Salat tepat waktu adalah amalan yang sangat dicintai oleh Allah.'
        }
      ],
      learningOutcome: 'Murid mampu mengatasi masalah kedisiplinan ibadah dengan mengorganisasi jadwal 5 waktu salat fardhu.'
    },
    badgeId: 'salat',
    badgeName: 'Sahabat Salat',
    badgeIcon: 'Clock',
    themeColor: {
      primary: 'bg-sky-500 hover:bg-sky-600',
      bgLight: 'bg-sky-50',
      border: 'border-sky-400',
      text: 'text-sky-700',
      accent: 'text-sky-500',
    },
    gameType: 'salat-time',
  },
  {
    id: 3,
    number: 3,
    name: 'Zakat',
    subtitle: 'Berbagi Kebahagiaan dan Membersihkan Harta',
    meaning: 'Zakat mengajarkan kita untuk peduli dan berbagi rezeki kepada saudara yang membutuhkan.',
    explanation: 'Zakat adalah rukun Islam yang ketiga. Contohnya zakat fitrah menjelang hari raya Idulfitri. Dengan zakat, orang yang kurang mampu ikut merasa senang dan berkecukupan.',
    dailyLifeExample: 'Membantu ayah dan ibu menimbang beras zakat fitrah untuk dibagikan kepada fakir miskin, serta gemar memasukkan koin ke kotak amal masjid.',
    pblScenario: {
      problemTitle: 'Tantangan Masalah: Beras untuk Nenek Minah Menjelang Lebaran',
      situation: 'Dua hari sebelum hari raya Idulfitri tiba, Rara melihat tetangga lansia di dekat pos desa, Nenek Minah, tampak bersedih karena simpanan berasnya habis dan belum memiliki makanan untuk menyambut lebaran.',
      dilemmaQuestion: 'Sebagai anak muslim yang beriman pada rukun Islam, solusi nyata apa yang dapat kita lakukan bersama keluarga?',
      clues: [
        'Zakat fitrah diwajibkan bagi muslim menjelang hari raya Idulfitri',
        'Bahan zakat fitrah berupa makanan pokok (beras) yang bersih dan layak konsumsi',
        'Berbagi zakat membersihkan jiwa dan menyenangkan hati fakir miskin'
      ],
      options: [
        {
          id: 'opt-3a',
          text: 'Menyalurkan zakat fitrah beras bersama orang tua kepada Nenek Minah dengan santun dan ikhlas',
          isBestSolution: true,
          feedback: 'Masyaallah, mulia sekali! Nenek Minah tersenyum bahagia menyambut hari raya Idulfitri.'
        },
        {
          id: 'opt-3b',
          text: 'Memamerkan kue lebaran di depan rumah Nenek Minah tanpa membagikannya',
          isBestSolution: false,
          feedback: 'Belum tepat. Perilaku sombong dan pamer dilarang dalam ajaran Islam.'
        },
        {
          id: 'opt-3c',
          text: 'Menunggu sampai lebaran selesai baru memberikan sisa makanan yang basi',
          isBestSolution: false,
          feedback: 'Belum tepat. Zakat fitrah harus makanan pokok yang baik dan diberikan sebelum salat Id.'
        }
      ],
      learningOutcome: 'Murid mampu memecahkan masalah kesenjangan sosial di lingkungannya melalui pengamalan zakat fitrah.'
    },
    badgeId: 'zakat',
    badgeName: 'Sahabat Berbagi',
    badgeIcon: 'HeartHandshake',
    themeColor: {
      primary: 'bg-amber-500 hover:bg-amber-600',
      bgLight: 'bg-amber-50',
      border: 'border-amber-400',
      text: 'text-amber-800',
      accent: 'text-amber-500',
    },
    gameType: 'zakat-share',
  },
  {
    id: 4,
    number: 4,
    name: 'Puasa Ramadan',
    subtitle: 'Belajar Sabar dan Bersyukur',
    meaning: 'Puasa adalah menahan diri dari makan, minum, dan perbuatan tercela dari terbit fajar hingga terbenam matahari.',
    explanation: 'Puasa Ramadan dilaksanakan selama satu bulan penuh di bulan suci Ramadan. Puasa melatih kita menjadi anak yang sabar, jujur, berhati bersih, dan taat kepada Allah.',
    dailyLifeExample: 'Bangun sahur sebelum azan Subuh, belajar menahan lapar dan haus, mengaji Al-Qur\'an, dan berbuka dengan kurma atau air putih saat azan Magrib.',
    pblScenario: {
      problemTitle: 'Tantangan Masalah: Menahan Diri dan Sabar Saat Haus di Siang Hari',
      situation: 'Saat siang hari di bulan Ramadan, Budi yang sedang belajar berpuasa merasa haus dan lemas. Budi hampir tergoda minum es sirup diam-diam di kulkas dan mulai marah-marah kepada adiknya.',
      dilemmaQuestion: 'Bantuan atau nasihat bijak apa yang dapat kita berikan kepada Budi agar puasanya tetap terjaga?',
      clues: [
        'Hakikat puasa adalah menahan hawa nafsu lapar, dahaga, serta amarah karena Allah',
        'Mengambil wudu dengan air sejuk dapat menenangkan hati dan meredakan rasa lelah',
        'Mengisi waktu dengan membaca Al-Qur\'an atau istirahat tidur siang sejenak bernilai pahala'
      ],
      options: [
        {
          id: 'opt-4a',
          text: 'Menganjurkan Budi berwudu, istirahat tidur siang sejenak, dan menyemangatinya bersabar hingga azan Magrib',
          isBestSolution: true,
          feedback: 'Pintar sekali! Budi merasa tenang kembali dan berhasil menuntaskan puasanya hingga waktu berbuka.'
        },
        {
          id: 'opt-4b',
          text: 'Mengajak Budi membatalkan puasa diam-diam agar tidak ketahuan orang tua',
          isBestSolution: false,
          feedback: 'Belum tepat. Allah Maha Melihat segala perbuatan kita meski bersembunyi.'
        },
        {
          id: 'opt-4c',
          text: 'Mengejek Budi sebagai anak yang lemah dan penakut',
          isBestSolution: false,
          feedback: 'Belum tepat. Sesama muslim harus saling menyemangati dalam kebaikan dan kesabaran.'
        }
      ],
      learningOutcome: 'Murid mampu memecahkan tantangan pengendalian diri dan kesabaran saat menjalankan ibadah puasa Ramadan.'
    },
    badgeId: 'ramadan',
    badgeName: 'Bintang Ramadan',
    badgeIcon: 'Moon',
    themeColor: {
      primary: 'bg-indigo-500 hover:bg-indigo-600',
      bgLight: 'bg-indigo-50',
      border: 'border-indigo-400',
      text: 'text-indigo-700',
      accent: 'text-indigo-500',
    },
    gameType: 'ramadan-actions',
  },
  {
    id: 5,
    number: 5,
    name: 'Haji',
    subtitle: 'Ziarah Suci ke Baitullah Ka\'bah di Makkah',
    meaning: 'Haji adalah ibadah mengunjungi Ka\'bah di Masjidil Haram, Makkah, bagi yang mampu.',
    explanation: 'Haji adalah rukun Islam yang kelima. Ibadah ini diwajibkan hanya bagi umat Islam yang mampu secara fisik, bekal perjalanan, dan keuangannya.',
    dailyLifeExample: 'Mengenal Ka\'bah sebagai kiblat salat, ikut latihan manasik haji di sekolah dengan pakaian putih ihram, dan belajar doa talbiyah.',
    pblScenario: {
      problemTitle: 'Tantangan Masalah: Kesalahpahaman Fatimah Tentang Syarat Haji',
      situation: 'Fatimah menangis karena mendengar temannya berencana ikut manasik haji. Fatimah mengira semua orang termasuk dirinya yang masih kecil dan keluarganya yang pas-pasan berdosa jika belum berangkat ke Makkah sekarang.',
      dilemmaQuestion: 'Bagaimanakah pemahaman ilmu yang benar untuk meluruskan kesalahpahaman Fatimah?',
      clues: [
        'Rukun Islam kelima ibadah haji memiliki syarat istitha\'ah (mampu)',
        'Mampu meliputi kesehatan tubuh, keamanan jalan, dan kecukupan bekal nafkah',
        'Anak kecil dianjurkan belajar manasik haji dan menumbuhkan kerinduan pada Baitullah'
      ],
      options: [
        {
          id: 'opt-5a',
          text: 'Menjelaskan dengan lembut bahwa haji diwajibkan bagi yang mampu, dan anak kecil cukup belajar manasik serta berdoa',
          isBestSolution: true,
          feedback: 'Alhamdulillah, penjelasanmu tepat dan menyejukkan hati Fatimah! Islam adalah agama yang memudahkan umatnya.'
        },
        {
          id: 'opt-5b',
          text: 'Membenarkan bahwa Fatimah harus meminjam uang banyak agar bisa segera terbang ke Makkah',
          isBestSolution: false,
          feedback: 'Belum tepat. Islam tidak membebani hamba-Nya di luar batas kemampuannya.'
        },
        {
          id: 'opt-5c',
          text: 'Menyatakan bahwa rukun Islam kelima tidak usah dipelajari sama sekali',
          isBestSolution: false,
          feedback: 'Belum tepat. Kita tetap wajib mengenal rukun haji dan mencintai Ka\'bah Baitullah.'
        }
      ],
      learningOutcome: 'Murid mampu mengidentifikasi dan meluruskan konsep syarat kemampuan (istitha\'ah) dalam pelaksanaan ibadah haji.'
    },
    badgeId: 'haji',
    badgeName: 'Penjelajah Baitullah',
    badgeIcon: 'Sparkles',
    themeColor: {
      primary: 'bg-teal-600 hover:bg-teal-700',
      bgLight: 'bg-teal-50',
      border: 'border-teal-400',
      text: 'text-teal-800',
      accent: 'text-teal-600',
    },
    gameType: 'haji-journey',
  },
];

export const BADGES_LIST: BadgeInfo[] = [
  {
    id: 'syahadat',
    name: 'Penjelajah Syahadat',
    title: 'Lencana Tauhid & Rasul',
    description: 'Mengetahui arti dua kalimat syahadat dengan benar.',
    color: 'from-emerald-400 to-teal-500',
    iconName: 'Scroll',
  },
  {
    id: 'salat',
    name: 'Sahabat Salat',
    title: 'Lencana 5 Waktu',
    description: 'Mengenal waktu dan jumlah rakaat salat fardhu.',
    color: 'from-sky-400 to-blue-500',
    iconName: 'Clock',
  },
  {
    id: 'zakat',
    name: 'Sahabat Berbagi',
    title: 'Lencana Peduli Sesama',
    description: 'Memahami indahnya zakat dan berbagi makanan pokok.',
    color: 'from-amber-400 to-orange-500',
    iconName: 'HeartHandshake',
  },
  {
    id: 'ramadan',
    name: 'Bintang Ramadan',
    title: 'Lencana Puasa Sabar',
    description: 'Mengenal ibadah puasa dan kebiasaan baik di bulan Ramadan.',
    color: 'from-purple-400 to-indigo-500',
    iconName: 'Moon',
  },
  {
    id: 'haji',
    name: 'Penjelajah Baitullah',
    title: 'Lencana Ka\'bah Suci',
    description: 'Mengenal ibadah haji ke Baitullah bagi yang mampu.',
    color: 'from-teal-400 to-emerald-600',
    iconName: 'Sparkles',
  },
];

// Pre-assessment questions (Asesmen Awal)
export const PRE_ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berapakah jumlah Rukun Islam yang wajib kita ketahui?',
    audioPrompt: 'Berapakah jumlah Rukun Islam yang wajib kita ketahui?',
    options: [
      { id: 'a', text: '3 Rukun', imageType: 'number-3', isCorrect: false },
      { id: 'b', text: '5 Rukun', imageType: 'number-5', isCorrect: true },
      { id: 'c', text: '7 Rukun', imageType: 'number-7', isCorrect: false },
    ],
    explanation: 'Masyaallah benar! Rukun Islam berjumlah 5 pilar utama.',
  },
  {
    id: 2,
    question: 'Apakah rukun Islam yang pertama kali diucapkan?',
    audioPrompt: 'Apakah rukun Islam yang pertama kali diucapkan?',
    options: [
      { id: 'a', text: 'Mengucap Syahadat', imageType: 'syahadat', isCorrect: true },
      { id: 'b', text: 'Membayar Zakat', imageType: 'zakat', isCorrect: false },
      { id: 'c', text: 'Pergi Haji', imageType: 'haji', isCorrect: false },
    ],
    explanation: 'Pintar! Rukun Islam pertama adalah Mengucap Dua Kalimat Syahadat.',
  },
  {
    id: 3,
    question: 'Berapa kali kita melaksanakan salat wajib dalam satu hari satu malam?',
    audioPrompt: 'Berapa kali kita melaksanakan salat wajib dalam satu hari satu malam?',
    options: [
      { id: 'a', text: '2 Waktu', imageType: 'clock-2', isCorrect: false },
      { id: 'b', text: '5 Waktu', imageType: 'clock-5', isCorrect: true },
      { id: 'c', text: '10 Waktu', imageType: 'clock-10', isCorrect: false },
    ],
    explanation: 'Hebat! Salat wajib dilaksanakan 5 kali sehari: Subuh, Zuhur, Asar, Magrib, dan Isya.',
  },
  {
    id: 4,
    question: 'Kapan umat Islam berpuasa wajib selama satu bulan penuh?',
    audioPrompt: 'Kapan umat Islam berpuasa wajib selama satu bulan penuh?',
    options: [
      { id: 'a', text: 'Bulan Ramadan', imageType: 'ramadan-crescent', isCorrect: true },
      { id: 'b', text: 'Hari Ulang Tahun', imageType: 'gift', isCorrect: false },
      { id: 'c', text: 'Waktu Liburan Sekolah', imageType: 'beach', isCorrect: false },
    ],
    explanation: 'Benar sekali! Puasa wajib dilakukan di bulan suci Ramadan.',
  },
  {
    id: 5,
    question: 'Siapakah yang wajib melaksanakan ibadah haji ke Baitullah Ka\'bah?',
    audioPrompt: 'Siapakah yang wajib melaksanakan ibadah haji ke Baitullah?',
    options: [
      { id: 'a', text: 'Semua anak kecil', imageType: 'child', isCorrect: false },
      { id: 'b', text: 'Umat Islam yang mampu', imageType: 'kabah', isCorrect: true },
      { id: 'c', text: 'Semua orang tanpa syarat', imageType: 'crowd', isCorrect: false },
    ],
    explanation: 'Tepat sekali! Ibadah haji wajib bagi orang Islam yang mampu bekal, kesehatan, dan perjalanannya.',
  },
];

// Post-assessment questions (Asesmen Akhir)
export const POST_ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Dua kalimat syahadat berisi pengakuan bahwa tiada Tuhan selain Allah dan Nabi Muhammad adalah...',
    audioPrompt: 'Dua kalimat syahadat berisi pengakuan bahwa Nabi Muhammad adalah...',
    options: [
      { id: 'a', text: 'Utusan Allah', imageType: 'prophet', isCorrect: true },
      { id: 'b', text: 'Malaikat', imageType: 'angel', isCorrect: false },
      { id: 'c', text: 'Raja dunia', imageType: 'crown', isCorrect: false },
    ],
    explanation: 'Masyaallah! Nabi Muhammad SAW adalah Rasul utusan Allah yang membimbing umat manusia.',
  },
  {
    id: 2,
    question: 'Manakah urutan rukun Islam yang benar setelah Syahadat?',
    audioPrompt: 'Manakah urutan rukun Islam yang benar setelah Syahadat?',
    options: [
      { id: 'a', text: 'Salat, Zakat, Puasa, Haji', imageType: 'pillars-order', isCorrect: true },
      { id: 'b', text: 'Haji, Puasa, Zakat, Salat', imageType: 'pillars-reverse', isCorrect: false },
      { id: 'c', text: 'Zakat, Haji, Salat, Puasa', imageType: 'pillars-scrambled', isCorrect: false },
    ],
    explanation: 'Keren! Urutannya adalah: 1. Syahadat, 2. Salat, 3. Zakat, 4. Puasa, 5. Haji.',
  },
  {
    id: 3,
    question: 'Salat apakah yang dikerjakan saat fajar menyingsing sebelum matahari terbit?',
    audioPrompt: 'Salat apakah yang dikerjakan saat fajar menyingsing sebelum matahari terbit?',
    options: [
      { id: 'a', text: 'Salat Subuh (2 Rakaat)', imageType: 'morning-sun', isCorrect: true },
      { id: 'b', text: 'Salat Zuhur (4 Rakaat)', imageType: 'midday-sun', isCorrect: false },
      { id: 'c', text: 'Salat Magrib (3 Rakaat)', imageType: 'sunset', isCorrect: false },
    ],
    explanation: 'Alhamdulillah tepat! Salat Subuh dikerjakan pagi buta sebanyak 2 rakaat.',
  },
  {
    id: 4,
    question: 'Apa tujuan kita mengeluarkan zakat fitrah kepada orang yang membutuhkan?',
    audioPrompt: 'Apa tujuan kita mengeluarkan zakat fitrah kepada orang yang membutuhkan?',
    options: [
      { id: 'a', text: 'Berbagi rezeki dan menyayangi sesama', imageType: 'heart-charity', isCorrect: true },
      { id: 'b', text: 'Agar dipuji dan terkenal', imageType: 'trophy', isCorrect: false },
      { id: 'c', text: 'Menghabiskan makanan yang basi', imageType: 'trash', isCorrect: false },
    ],
    explanation: 'Masyaallah cerdas! Zakat dilakukan ikhlas untuk berbagi dan menyayangi sesama.',
  },
  {
    id: 5,
    question: 'Di kota manakah letak Ka\'bah di Masjidil Haram tempat umat Islam menunaikan ibadah haji?',
    audioPrompt: 'Di kota manakah letak Ka\'bah tempat ibadah haji?',
    options: [
      { id: 'a', text: 'Kota Makkah', imageType: 'kabah-flag', isCorrect: true },
      { id: 'b', text: 'Kota Jakarta', imageType: 'city', isCorrect: false },
      { id: 'c', text: 'Kota Kairo', imageType: 'pyramid', isCorrect: false },
    ],
    explanation: 'Luar biasa! Ka\'bah berada di Masjidil Haram kota suci Makkah.',
  },
];

// Interactive Games Data

// Game 1: Cari Pasangan (Matching Game)
export const MATCHING_GAME_DATA = [
  {
    id: 'p1',
    pillar: '1. Syahadat',
    targetPillarId: 1,
    pair: 'Mengucap Kalimat Tauhid',
    icon: 'Scroll',
    color: 'emerald',
    hint: 'Rukun pertama, pintu masuk Islam',
  },
  {
    id: 'p2',
    pillar: '2. Salat',
    targetPillarId: 2,
    pair: '5 Waktu Menghadap Allah',
    icon: 'Clock',
    color: 'sky',
    hint: 'Subuh, Zuhur, Asar, Magrib, Isya',
  },
  {
    id: 'p3',
    pillar: '3. Zakat',
    targetPillarId: 3,
    pair: 'Berbagi Makanan Pokok/Beras',
    icon: 'HeartHandshake',
    color: 'amber',
    hint: 'Membantu orang yang membutuhkan',
  },
  {
    id: 'p4',
    pillar: '4. Puasa Ramadan',
    targetPillarId: 4,
    pair: 'Menahan Lapar & Haus',
    icon: 'Moon',
    color: 'indigo',
    hint: 'Dari fajar hingga magrib',
  },
  {
    id: 'p5',
    pillar: '5. Ibadah Haji',
    targetPillarId: 5,
    pair: 'Ke Ka\'bah bagi yang Mampu',
    icon: 'Sparkles',
    color: 'teal',
    hint: 'Ziarah ke Baitullah di Makkah',
  },
];

// Game 2: Susun 5 Rukun Islam (Sequence in Order 1 to 5)
export const SEQUENCE_GAME_PILLARS = [
  { id: 1, order: 1, name: '1. Mengucap Syahadat', icon: 'Scroll', color: 'emerald' },
  { id: 2, order: 2, name: '2. Mendirikan Salat', icon: 'Clock', color: 'sky' },
  { id: 3, order: 3, name: '3. Membayar Zakat', icon: 'HeartHandshake', color: 'amber' },
  { id: 4, order: 4, name: '4. Puasa di Bulan Ramadan', icon: 'Moon', color: 'indigo' },
  { id: 5, order: 5, name: '5. Naik Haji bagi yang Mampu', icon: 'Sparkles', color: 'teal' },
];

// Game 4: Tebak Gambar
export const GUESS_PICTURE_QUESTIONS = [
  {
    id: 1,
    title: 'Tebak Gambar Rukun Islam',
    imageType: 'kabah',
    caption: 'Bangunan berbentuk kubus hitam suci di Masjidil Haram, Makkah.',
    options: ['Haji ke Baitullah', 'Puasa Ramadan', 'Membayar Zakat'],
    correctAnswer: 'Haji ke Baitullah',
    explanation: 'Benar! Itu adalah Ka\'bah, tujuan ibadah haji di kota Makkah.',
  },
  {
    id: 2,
    title: 'Tebak Gambar Rukun Islam',
    imageType: 'prayer-mat',
    caption: 'Anak muslim menggelar sajadah dan melakukan gerakan takbiratul ihram 5 kali sehari.',
    options: ['Mendirikan Salat', 'Mengucap Syahadat', 'Ibadah Haji'],
    correctAnswer: 'Mendirikan Salat',
    explanation: 'Hebat! Menggelar sajadah dan beribadah 5 waktu adalah ibadah Salat.',
  },
  {
    id: 3,
    title: 'Tebak Gambar Rukun Islam',
    imageType: 'ramadan-iftar',
    caption: 'Bulan sabit indah di langit malam dan keluarga bersiap sahur bersama.',
    options: ['Puasa Ramadan', 'Membayar Zakat', 'Haji ke Baitullah'],
    correctAnswer: 'Puasa Ramadan',
    explanation: 'Tepat sekali! Bulan sabit dan sahur adalah suasana berkah di bulan Ramadan.',
  },
  {
    id: 4,
    title: 'Tebak Gambar Rukun Islam',
    imageType: 'rice-charity',
    caption: 'Karung beras zakat fitrah yang dibagikan dengan santun kepada tetangga yang membutuhkan.',
    options: ['Membayar Zakat', 'Mendirikan Salat', 'Puasa Ramadan'],
    correctAnswer: 'Membayar Zakat',
    explanation: 'Masyaallah benar! Berbagi beras fitrah adalah contoh pelaksanaan Zakat.',
  },
];

// Game 5: Misi Benar atau Belum Tepat (True/False)
export const TRUE_FALSE_MISSIONS = [
  {
    id: 1,
    statement: 'Rukun Islam berjumlah lima perkara yang wajib diyakini dan diamalkan.',
    isTrue: true,
    correctMsg: 'Tepat sekali! Ada 5 rukun Islam.',
    explanation: 'Rukun Islam ada 5: Syahadat, Salat, Zakat, Puasa, dan Haji.',
  },
  {
    id: 2,
    statement: 'Salat wajib dikerjakan hanya satu kali dalam seminggu.',
    isTrue: false,
    correctMsg: 'Benar! Pernyataan tersebut belum tepat.',
    explanation: 'Salat wajib (fardhu) dikerjakan 5 kali setiap hari, bukan seminggu sekali.',
  },
  {
    id: 3,
    statement: 'Puasa Ramadan mengajarkan kita untuk menahan rasa lapar dan haus dengan sabar.',
    isTrue: true,
    correctMsg: 'Masyaallah benar! Puasa melatih kesabaran.',
    explanation: 'Saat puasa kita menahan lapar dan haus dari fajar hingga magrib karena Allah.',
  },
  {
    id: 4,
    statement: 'Semua anak kecil yang belum punya uang wajib segera berangkat haji sekarang.',
    isTrue: false,
    correctMsg: 'Hebat! Jawabanmu cerdas.',
    explanation: 'Haji diwajibkan bagi yang mampu secara bekal, kesehatan, dan biaya.',
  },
  {
    id: 5,
    statement: 'Memberi zakat harus dilakukan dengan sopan, ikhlas, dan tidak menyakiti hati penerima.',
    isTrue: true,
    correctMsg: 'Alhamdulillah tepat sekali!',
    explanation: 'Zakat dan sedekah harus diniatkan ikhlas karena Allah dan menjaga kehormatan sesama.',
  },
];

// Game 6: Peti Ilmu (Treasure Chest Puzzles)
export const TREASURE_CHEST_ITEMS = [
  {
    id: 1,
    pillarName: 'Syahadat',
    question: 'Apa kunci pertama untuk membuka pintu kebaikan dalam Islam?',
    options: ['Mengucap Syahadat', 'Bermain game', 'Tidur siang'],
    correctAnswer: 'Mengucap Syahadat',
    rewardText: 'Kunci Tauhid Berhasil Terbuka! Hatimu dipenuhi cahaya keimanan.',
    badgeId: 'syahadat',
  },
  {
    id: 2,
    pillarName: 'Salat',
    question: 'Salat apa yang dikerjakan saat siang hari sebanyak 4 rakaat?',
    options: ['Salat Zuhur', 'Salat Subuh', 'Salat Magrib'],
    correctAnswer: 'Salat Zuhur',
    rewardText: 'Peti Disiplin Waktu Terbuka! Kamu anak yang rajin tepat waktu.',
    badgeId: 'salat',
  },
  {
    id: 3,
    pillarName: 'Zakat',
    question: 'Zakat mengajarkan hati kita agar tidak bersikap apa?',
    options: ['Pelit & Kikir', 'Sayang teman', 'Rajin belajar'],
    correctAnswer: 'Pelit & Kikir',
    rewardText: 'Peti Kasih Sayang Terbuka! Tangan di atas lebih baik daripada tangan di bawah.',
    badgeId: 'zakat',
  },
  {
    id: 4,
    pillarName: 'Puasa',
    question: 'Kapan kita mulai boleh makan dan minum kembali saat berpuasa?',
    options: ['Saat azan Magrib tiba', 'Saat matahari sedang terik', 'Saat waktu sahur'],
    correctAnswer: 'Saat azan Magrib tiba',
    rewardText: 'Peti Kesabaran Berkilau Terbuka! Kamu menjadi anak yang sabar dan taat.',
    badgeId: 'ramadan',
  },
  {
    id: 5,
    pillarName: 'Haji',
    question: 'Pakaian putih suci tanpa jahitan untuk laki-laki saat ibadah haji disebut pakaian...',
    options: ['Pakaian Ihram', 'Seragam sekolah', 'Baju tidur'],
    correctAnswer: 'Pakaian Ihram',
    rewardText: 'Peti Kemuliaan Baitullah Terbuka! Semoga kelak kamu dan keluarga dapat berziarah ke Ka\'bah!',
    badgeId: 'haji',
  },
];
