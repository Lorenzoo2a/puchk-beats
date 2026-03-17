import { Download, FileText, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { buyerOrders } from "@/data/adminMockData";

const LibraryPage = () => {
  const purchased = buyerOrders.filter((o) => o.status === "completed");

  if (purchased.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Tu n'as encore rien acheté</h2>
        <Link to="/marketplace" className="text-puchk-orange hover:underline text-sm">Explorer la marketplace →</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Ma Bibliothèque</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchased.map((order) => (
          <div key={order.id} className="glass rounded-2xl overflow-hidden">
            <div className="h-32 bg-puchk-orange/10 relative">
              <span className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded-full bg-puchk-success/15 text-puchk-success border border-puchk-success/20 font-bold uppercase tracking-wider">WAV+MP3</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold uppercase text-sm">{order.kit.name}</h3>
              <p className="text-[10px] text-white/40 mb-3">Acheté le {order.date}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-xl border border-puchk-orange/30 text-puchk-orange text-xs font-bold hover:bg-puchk-orange/5 spring-transition flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" /> Télécharger
                </button>
                <button className="px-3 py-2 rounded-xl hover:bg-white/5 text-white/40 text-xs spring-transition flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Licence
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
