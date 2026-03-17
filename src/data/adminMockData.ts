import { kits, producers } from "./mockData";

export const adminStats = {
  totalRevenue: { value: 48250, label: "Revenus total", icon: "💰", change: 15.2 },
  commissions: { value: 7237, label: "Commissions gagnées", icon: "💎", change: 14.8 },
  totalSales: { value: 1850, label: "Nombre de ventes", icon: "📦", change: 12.1 },
  users: { value: 3420, label: "Utilisateurs inscrits", icon: "👥", change: 8.5 },
  publishedKits: { value: 245, label: "Kits publiés", icon: "🎵", change: 5.3 },
  pendingKits: { value: 3, label: "Kits en attente", icon: "⏳", change: 0 },
};

export const monthlyRevenue = [
  { month: "Oct", revenue: 3200 }, { month: "Nov", revenue: 4100 }, { month: "Dec", revenue: 5800 },
  { month: "Jan", revenue: 4500 }, { month: "Fév", revenue: 6200 }, { month: "Mar", revenue: 7200 },
];

export const weeklySignups = [
  { week: "S1", signups: 45 }, { week: "S2", signups: 62 }, { week: "S3", signups: 38 },
  { week: "S4", signups: 71 }, { week: "S5", signups: 55 }, { week: "S6", signups: 89 },
  { week: "S7", signups: 67 }, { week: "S8", signups: 94 },
];

export const recentActivity = [
  { action: "xMelo a acheté INFERNO Vol.1", time: "il y a 2h", icon: "🛒" },
  { action: "OZKR a publié DRILL SURGERY Vol. 2", time: "il y a 3h", icon: "📦" },
  { action: "Nouveau user : BeatMaster23", time: "il y a 4h", icon: "👤" },
  { action: "ChillBeats a acheté SILK (Premium)", time: "il y a 5h", icon: "🛒" },
  { action: "Signalement sur CONCRETE JUNGLE", time: "il y a 6h", icon: "🚩" },
  { action: "mochiprod a modifié Pastel Dreams", time: "il y a 7h", icon: "✏️" },
  { action: "DrillKing a acheté DEMON TIME", time: "il y a 8h", icon: "🛒" },
  { action: "Nouveau vendeur : TrapKing44", time: "il y a 10h", icon: "💰" },
  { action: "DJ Crates a uploadé un nouveau kit", time: "il y a 12h", icon: "📦" },
  { action: "LoopGod a laissé un avis 5⭐", time: "il y a 14h", icon: "⭐" },
];

export const pendingKits = [
  { id: "pending-1", name: "NIGHT TERROR", producer: "TrapKing44", date: "15 mar 2026", samples: 124, genre: "trap_dark" as const },
  { id: "pending-2", name: "Chill Waves", producer: "LofiGuru", date: "14 mar 2026", samples: 56, genre: "lofi" as const },
  { id: "pending-3", name: "STREET CODE", producer: "Traplord99", date: "13 mar 2026", samples: 98, genre: "trap_street" as const },
];

export const allUsers = [
  { id: "u1", name: "KXZMA", email: "kxzma@puchk.io", role: "seller" as const, joined: "12 jan 2025", lastSeen: "il y a 1h", status: "active" as const, spent: 0, earned: 4700, kits: 3 },
  { id: "u2", name: "xMelo", email: "xmelo@gmail.com", role: "buyer" as const, joined: "3 fév 2025", lastSeen: "il y a 2h", status: "active" as const, spent: 124.97, earned: 0, kits: 0 },
  { id: "u3", name: "Yung Satellite", email: "ysat@puchk.io", role: "seller" as const, joined: "15 jan 2025", lastSeen: "il y a 3h", status: "active" as const, spent: 0, earned: 5200, kits: 2 },
  { id: "u4", name: "OZKR", email: "ozkr@puchk.io", role: "seller" as const, joined: "20 jan 2025", lastSeen: "il y a 5h", status: "active" as const, spent: 0, earned: 5200, kits: 2 },
  { id: "u5", name: "DrillKing", email: "drillking@hotmail.com", role: "buyer" as const, joined: "1 mar 2025", lastSeen: "il y a 5h", status: "active" as const, spent: 65.98, earned: 0, kits: 0 },
  { id: "u6", name: "mochiprod", email: "mochi@puchk.io", role: "seller" as const, joined: "8 jan 2025", lastSeen: "hier", status: "active" as const, spent: 0, earned: 7100, kits: 2 },
  { id: "u7", name: "BeatsByJay", email: "jay@gmail.com", role: "buyer" as const, joined: "10 fév 2025", lastSeen: "il y a 2j", status: "active" as const, spent: 49.98, earned: 0, kits: 0 },
  { id: "u8", name: "ToxicBeatz", email: "toxic@mail.com", role: "buyer" as const, joined: "5 mar 2026", lastSeen: "il y a 30j", status: "banned" as const, spent: 0, earned: 0, kits: 0 },
];

export const allOrders = [
  { id: "o1", date: "17 mar 2026", buyer: "xMelo", kit: "INFERNO Vol. 1", seller: "KXZMA", amount: 24.99, commission: 3.75, status: "completed" as const },
  { id: "o2", date: "17 mar 2026", buyer: "DrillKing", kit: "DEMON TIME", seller: "KXZMA", amount: 32.99, commission: 4.95, status: "completed" as const },
  { id: "o3", date: "16 mar 2026", buyer: "LoopGod", kit: "PHONK DRIFT", seller: "KXZMA", amount: 19.99, commission: 3.00, status: "completed" as const },
  { id: "o4", date: "15 mar 2026", buyer: "ChillBeats", kit: "INFERNO Vol. 1", seller: "KXZMA", amount: 49.99, commission: 7.50, status: "completed" as const },
  { id: "o5", date: "14 mar 2026", buyer: "BeatMaker92", kit: "DEMON TIME", seller: "KXZMA", amount: 32.99, commission: 4.95, status: "completed" as const },
  { id: "o6", date: "13 mar 2026", buyer: "ProdNova", kit: "DRILL SURGERY", seller: "OZKR", amount: 29.99, commission: 4.50, status: "completed" as const },
  { id: "o7", date: "12 mar 2026", buyer: "ChillBeats", kit: "SILK", seller: "Yung Satellite", amount: 14.99, commission: 2.25, status: "pending" as const },
];

export const reports = [
  { id: "r1", kit: "CONCRETE JUNGLE", reason: "Samples non originaux — plagiat suspecté", reporter: "BeatsByJay", date: "16 mar 2026", status: "pending" as const },
  { id: "r2", kit: "NEON FUTURE", reason: "Description trompeuse — moins de samples qu'annoncé", reporter: "ProdNova", date: "14 mar 2026", status: "resolved" as const },
];

export const customCommissions = [
  { seller: "KXZMA", rate: 12 },
  { seller: "mochiprod", rate: 10 },
];

export const buyerOrders = [
  { id: "bo1", date: "17 mar 2026", kit: kits[0], license: "Standard", amount: 24.99, status: "completed" as const },
  { id: "bo2", date: "15 mar 2026", kit: kits[4], license: "Standard", amount: 19.99, status: "completed" as const },
  { id: "bo3", date: "10 mar 2026", kit: kits[2], license: "Premium", amount: 59.98, status: "completed" as const },
  { id: "bo4", date: "5 mar 2026", kit: kits[8], license: "Standard", amount: 14.99, status: "completed" as const },
];

export const sellerAnalyticsData = {
  dailySales: [
    { date: "1 Mar", sales: 2, revenue: 49.98, previews: 120, conversion: 1.7 },
    { date: "3 Mar", sales: 5, revenue: 124.95, previews: 230, conversion: 2.2 },
    { date: "5 Mar", sales: 3, revenue: 74.97, previews: 180, conversion: 1.7 },
    { date: "7 Mar", sales: 7, revenue: 174.93, previews: 310, conversion: 2.3 },
    { date: "9 Mar", sales: 4, revenue: 99.96, previews: 200, conversion: 2.0 },
    { date: "11 Mar", sales: 6, revenue: 149.94, previews: 280, conversion: 2.1 },
    { date: "13 Mar", sales: 8, revenue: 199.92, previews: 350, conversion: 2.3 },
    { date: "15 Mar", sales: 5, revenue: 124.95, previews: 240, conversion: 2.1 },
    { date: "17 Mar", sales: 9, revenue: 224.91, previews: 400, conversion: 2.3 },
  ],
  topCountries: [
    { country: "🇫🇷 France", sales: 340 },
    { country: "🇺🇸 États-Unis", sales: 210 },
    { country: "🇬🇧 Royaume-Uni", sales: 120 },
    { country: "🇩🇪 Allemagne", sales: 85 },
    { country: "🇧🇪 Belgique", sales: 62 },
  ],
  kitPerformance: [
    { kit: kits[0], sales: 2400, revenue: 42800, previews: 12000, conversion: 3.5 },
    { kit: kits[4], sales: 1200, revenue: 18500, previews: 8400, conversion: 2.8 },
    { kit: kits[11], sales: 1100, revenue: 28200, previews: 6200, conversion: 3.1 },
  ],
};

export const promoCodes = [
  { id: "p1", code: "FIRE20", discount: 20, kit: "Tous mes kits", used: 12, max: 50, expires: "30 avr 2026", active: true },
  { id: "p2", code: "NEWBEAT", discount: 15, kit: "INFERNO Vol. 1", used: 8, max: 20, expires: "15 avr 2026", active: true },
  { id: "p3", code: "OLDSCHOOL", discount: 10, kit: "PHONK DRIFT", used: 5, max: 5, expires: "1 mar 2026", active: false },
];
