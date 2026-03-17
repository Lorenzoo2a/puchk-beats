export interface Kit {
  id: string;
  name: string;
  producer: string;
  producerId: string;
  samples: number;
  price: number;
  genre: Genre;
  rating: number;
  reviews: number;
  sales: number;
  description?: string;
  contents?: KitContent[];
  licenses?: License[];
  userReviews?: UserReview[];
}

export interface KitContent {
  icon: string;
  name: string;
  count: number;
}

export interface License {
  name: string;
  description: string;
  price: number;
}

export interface UserReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Producer {
  id: string;
  name: string;
  verified: boolean;
  bio: string;
  badge?: string;
  kits: number;
  sales: number;
  followers: number;
  genreColor: string;
}

export type Genre =
  | "trap_dark" | "trap_melodic" | "trap_street" | "trap_evil"
  | "drill" | "drill_ny"
  | "lofi" | "lofi_dreamy"
  | "phonk" | "boom_bap" | "future_bass" | "rnb";

export const genreLabels: Record<Genre, string> = {
  trap_dark: "Trap Dark",
  trap_melodic: "Trap Mélodique",
  trap_street: "Trap Street",
  trap_evil: "Trap Evil",
  drill: "Drill",
  drill_ny: "Drill NY",
  lofi: "Lofi",
  lofi_dreamy: "Lofi Dreamy",
  phonk: "Phonk",
  boom_bap: "Boom Bap",
  future_bass: "Future Bass",
  rnb: "R&B",
};

export const genreColors: Record<Genre, { bg: string; accent: string; accent2?: string }> = {
  trap_dark: { bg: "#0A0000", accent: "#FF3B0A", accent2: "#FF6B1A" },
  trap_melodic: { bg: "#060616", accent: "#7832FF", accent2: "#4060FF" },
  trap_street: { bg: "#0A0A0A", accent: "#FF6B1A" },
  trap_evil: { bg: "#050508", accent: "#9600FF", accent2: "#FF0032" },
  drill: { bg: "#030308", accent: "#0096FF" },
  drill_ny: { bg: "#050505", accent: "#C8B400" },
  lofi: { bg: "#0D0810", accent: "#B464FF", accent2: "#FF8EC4" },
  lofi_dreamy: { bg: "#0A0D18", accent: "#64B4FF", accent2: "#C896FF" },
  phonk: { bg: "#0D0800", accent: "#FFB400", accent2: "#9B59B6" },
  boom_bap: { bg: "#0A0800", accent: "#C8A000" },
  future_bass: { bg: "#00080D", accent: "#00C8FF" },
  rnb: { bg: "#0A0010", accent: "#D4AF37" },
};

export const kits: Kit[] = [
  {
    id: "inferno-vol-1",
    name: "INFERNO Vol. 1",
    producer: "KXZMA",
    producerId: "kxzma",
    samples: 148,
    price: 24.99,
    genre: "trap_dark",
    rating: 4.8,
    reviews: 127,
    sales: 2400,
    description: "INFERNO Vol. 1 est le kit trap ultime pour les producteurs qui cherchent des sonorités sombres et agressives. 148 samples triés sur le volet, des 808 qui font trembler les murs, des kicks percutants et des hi-hats chirurgicaux. Chaque son a été designé pour dominer le mix.",
    contents: [
      { icon: "🥁", name: "Kicks", count: 20 },
      { icon: "🔊", name: "808", count: 15 },
      { icon: "🥁", name: "Snares", count: 18 },
      { icon: "🎵", name: "Hi-Hats", count: 25 },
      { icon: "🪘", name: "Percs", count: 15 },
      { icon: "✨", name: "FX", count: 12 },
      { icon: "🔁", name: "Loops", count: 10 },
      { icon: "🎤", name: "Vox", count: 8 },
      { icon: "🎯", name: "One Shots", count: 15 },
    ],
    licenses: [
      { name: "Standard", description: "Usage personnel et commercial. Jusqu'à 5000 streams.", price: 24.99 },
      { name: "Premium", description: "Usage commercial illimité. Streams illimités.", price: 49.99 },
    ],
    userReviews: [
      { user: "xMelo", rating: 5, comment: "Meilleur kit trap de l'année. Les 808s sont dingues.", date: "15 fév 2026" },
      { user: "BeatsByJay", rating: 4, comment: "Très bons sons mais j'aurais aimé plus de percs.", date: "10 fév 2026" },
      { user: "ProdNova", rating: 5, comment: "Mon kit go-to maintenant. Qualité avant quantité.", date: "28 jan 2026" },
    ],
  },
  { id: "midnight-drip", name: "Midnight Drip", producer: "Yung Satellite", producerId: "yung-satellite", samples: 96, price: 17.99, genre: "trap_melodic", rating: 4.6, reviews: 89, sales: 1800 },
  { id: "drill-surgery", name: "DRILL SURGERY", producer: "OZKR", producerId: "ozkr", samples: 210, price: 29.99, genre: "drill", rating: 4.9, reviews: 203, sales: 3100 },
  { id: "lofi-therapy", name: "Lofi Therapy", producer: "mochiprod", producerId: "mochiprod", samples: 64, price: 12.99, genre: "lofi", rating: 4.7, reviews: 156, sales: 2900 },
  { id: "phonk-drift", name: "PHONK DRIFT", producer: "KXZMA", producerId: "kxzma", samples: 112, price: 19.99, genre: "phonk", rating: 4.5, reviews: 74, sales: 1200 },
  { id: "boom-bap-archives", name: "Boom Bap Archives", producer: "DJ Crates", producerId: "dj-crates", samples: 88, price: 21.99, genre: "boom_bap", rating: 4.8, reviews: 198, sales: 2700 },
  { id: "neon-future", name: "NEON FUTURE", producer: "Synthwave Kid", producerId: "synthwave-kid", samples: 156, price: 27.99, genre: "future_bass", rating: 4.4, reviews: 62, sales: 890 },
  { id: "gutter-sound", name: "Gutter Sound", producer: "OZKR", producerId: "ozkr", samples: 134, price: 22.99, genre: "drill_ny", rating: 4.7, reviews: 141, sales: 2100 },
  { id: "silk", name: "SILK", producer: "Yung Satellite", producerId: "yung-satellite", samples: 78, price: 14.99, genre: "rnb", rating: 4.9, reviews: 167, sales: 3400 },
  { id: "concrete-jungle", name: "CONCRETE JUNGLE", producer: "Traplord99", producerId: "traplord99", samples: 180, price: 34.99, genre: "trap_street", rating: 4.6, reviews: 95, sales: 1500 },
  { id: "pastel-dreams", name: "Pastel Dreams", producer: "mochiprod", producerId: "mochiprod", samples: 52, price: 9.99, genre: "lofi_dreamy", rating: 4.8, reviews: 210, sales: 4200 },
  { id: "demon-time", name: "DEMON TIME", producer: "KXZMA", producerId: "kxzma", samples: 198, price: 32.99, genre: "trap_evil", rating: 4.7, reviews: 88, sales: 1100 },
];

export const producers: Producer[] = [
  { id: "kxzma", name: "KXZMA", verified: true, bio: "Dark sounds from Paris. Trap & Phonk.", badge: "Top Seller", kits: 3, sales: 4700, followers: 1240, genreColor: "#FF3B0A" },
  { id: "yung-satellite", name: "Yung Satellite", verified: true, bio: "Melodic vibes. Ambient textures.", badge: "Top Seller", kits: 2, sales: 5200, followers: 980, genreColor: "#7832FF" },
  { id: "ozkr", name: "OZKR", verified: true, bio: "UK/NY Drill specialist.", badge: "Rising", kits: 2, sales: 5200, followers: 760, genreColor: "#0096FF" },
  { id: "mochiprod", name: "mochiprod", verified: true, bio: "Lofi & chill. Analog warmth.", badge: "Fan Favorite", kits: 2, sales: 7100, followers: 2100, genreColor: "#B464FF" },
  { id: "dj-crates", name: "DJ Crates", verified: true, bio: "Crate digger since '95. Boom Bap only.", kits: 1, sales: 2700, followers: 540, genreColor: "#C8A000" },
  { id: "synthwave-kid", name: "Synthwave Kid", verified: false, bio: "Future sounds. Neon energy.", badge: "New", kits: 1, sales: 890, followers: 120, genreColor: "#00C8FF" },
  { id: "traplord99", name: "Traplord99", verified: false, bio: "Street certified. Hard 808s.", badge: "Rising", kits: 1, sales: 1500, followers: 310, genreColor: "#FF6B1A" },
];

export const trendingTags = ["#trap", "#808", "#drill", "#lofi", "#dark", "#phonk", "#boom_bap", "#melodic", "#future_bass"];

export const recentSales = [
  { buyer: "xMelo", kit: "INFERNO Vol. 1", amount: 24.99, time: "il y a 2h" },
  { buyer: "DrillKing", kit: "DEMON TIME", amount: 32.99, time: "il y a 5h" },
  { buyer: "LoopGod", kit: "PHONK DRIFT", amount: 19.99, time: "hier" },
  { buyer: "ChillBeats", kit: "INFERNO Vol. 1", amount: 49.99, time: "il y a 2 jours", license: "Premium" },
  { buyer: "BeatMaker92", kit: "DEMON TIME", amount: 32.99, time: "il y a 3 jours" },
];

export const dashboardStats = {
  revenue: { value: 1247.50, change: 12.5, label: "Revenus", icon: "💰" },
  sales: { value: 83, change: 8.2, label: "Ventes", icon: "📦" },
  listens: { value: 2340, change: 23.1, label: "Écoutes previews", icon: "🎧" },
  conversion: { value: 3.5, change: 0.3, label: "Taux de conversion", icon: "📈", suffix: "%" },
};

export const salesChartData = [
  { date: "1 Mar", sales: 2, revenue: 49.98 },
  { date: "3 Mar", sales: 5, revenue: 124.95 },
  { date: "5 Mar", sales: 3, revenue: 74.97 },
  { date: "7 Mar", sales: 7, revenue: 174.93 },
  { date: "9 Mar", sales: 4, revenue: 99.96 },
  { date: "11 Mar", sales: 6, revenue: 149.94 },
  { date: "13 Mar", sales: 8, revenue: 199.92 },
  { date: "15 Mar", sales: 5, revenue: 124.95 },
  { date: "17 Mar", sales: 9, revenue: 224.91 },
  { date: "19 Mar", sales: 6, revenue: 149.94 },
  { date: "21 Mar", sales: 4, revenue: 99.96 },
  { date: "23 Mar", sales: 7, revenue: 174.93 },
  { date: "25 Mar", sales: 10, revenue: 249.90 },
  { date: "27 Mar", sales: 5, revenue: 124.95 },
  { date: "29 Mar", sales: 8, revenue: 199.92 },
];

export const genreDistribution = [
  { genre: "Trap", sales: 45, percentage: 54, color: "#FF3B0A" },
  { genre: "Phonk", sales: 22, percentage: 27, color: "#FFB400" },
  { genre: "Drill", sales: 16, percentage: 19, color: "#0096FF" },
];

export const topKits = [
  { kit: kits[0], revenue: 42800 },
  { kit: kits[4], revenue: 18500 },
  { kit: kits[11], revenue: 28200 },
];
