import { Download } from "lucide-react";

const AdminSettings = () => (
  <div>
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Paramètres</h1>
    <div className="space-y-6 max-w-2xl">
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations du site</h2>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Nom du site</label>
          <input defaultValue="PUCHK" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Description</label>
          <textarea defaultValue="La marketplace premium de drumkits" rows={2} className="w-full px-4 py-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none resize-none" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Email contact</label>
          <input defaultValue="contact@puchk.io" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
        </div>
        <button className="w-full h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold hover:bg-puchk-orange-hover spring-transition">Sauvegarder</button>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Export de données</h2>
        <div className="space-y-3">
          {["Exporter les utilisateurs (CSV)", "Exporter les ventes (CSV)", "Exporter les commandes (CSV)"].map((label) => (
            <button key={label} className="w-full h-11 glass rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 spring-transition flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminSettings;
