import { useState } from "react";
import { X, ArrowUp, ArrowDown, Search } from "lucide-react";
import { kits, producers } from "@/data/mockData";

const AdminFeatured = () => {
  const [hotKits, setHotKits] = useState(kits.slice(0, 6).map((k) => k.name));
  const [staffPicks, setStaffPicks] = useState([kits[0].name, kits[2].name, kits[8].name]);
  const [risingProducers, setRisingProducers] = useState(producers.slice(0, 5).map((p) => p.name));
  const [kitOfWeek, setKitOfWeek] = useState(kits[0].id);

  const Section = ({ title, items, setItems }: { title: string; items: string[]; setItems: (items: string[]) => void }) => (
    <div className="glass rounded-2xl p-6 mb-6">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">{title}</h3>
      <div className="space-y-2 mb-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-puchk-deep">
            <span className="text-sm flex-1">{item}</span>
            <button onClick={() => { const n = [...items]; if (i > 0) { [n[i], n[i-1]] = [n[i-1], n[i]]; setItems(n); } }} className="p-1 hover:bg-white/5 rounded"><ArrowUp className="w-3 h-3 text-white/30" /></button>
            <button onClick={() => { const n = [...items]; if (i < n.length-1) { [n[i], n[i+1]] = [n[i+1], n[i]]; setItems(n); } }} className="p-1 hover:bg-white/5 rounded"><ArrowDown className="w-3 h-3 text-white/30" /></button>
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="p-1 hover:bg-red-500/10 rounded"><X className="w-3 h-3 text-red-400" /></button>
          </div>
        ))}
      </div>
      <button className="w-full h-10 glass rounded-xl text-xs font-bold text-puchk-orange hover:bg-puchk-orange/5 spring-transition">
        <Search className="w-3 h-3 inline mr-1" /> Ajouter
      </button>
      <button className="w-full h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold mt-3 hover:bg-puchk-orange-hover spring-transition">Sauvegarder</button>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Mises en avant</h1>
      <Section title="Hot This Week" items={hotKits} setItems={setHotKits} />
      <Section title="Staff Picks" items={staffPicks} setItems={setStaffPicks} />
      <Section title="Rising Producers" items={risingProducers} setItems={setRisingProducers} />

      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Kit de la semaine</h3>
        <select value={kitOfWeek} onChange={(e) => setKitOfWeek(e.target.value)} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none">
          {kits.map((k) => <option key={k.id} value={k.id}>{k.name} — {k.producer}</option>)}
        </select>
        <button className="w-full h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold mt-3 hover:bg-puchk-orange-hover spring-transition">Sauvegarder</button>
      </div>
    </div>
  );
};

export default AdminFeatured;
