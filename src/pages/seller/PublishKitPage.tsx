import { useState } from "react";
import { Upload, X, Plus, Check, ChevronRight, ChevronLeft, Wrench, Calendar, Users } from "lucide-react";
import { genreLabels, Genre } from "@/data/mockData";

const steps = ["Fichier", "Infos", "Licences", "Avancé", "Preview"];

const PublishKitPage = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState<Genre>("trap_dark");
  const [tags, setTags] = useState<string[]>(["trap", "dark"]);
  const [tagInput, setTagInput] = useState("");
  const [price, setPrice] = useState("24.99");
  const [isFree, setIsFree] = useState(false);
  const [licenses, setLicenses] = useState([{ name: "Standard", description: "Usage personnel et commercial. Jusqu'à 5000 streams.", price: "24.99" }]);
  const [uploadMethod, setUploadMethod] = useState<"zip" | "tool" | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [collabs, setCollabs] = useState<{ username: string; percent: number }[]>([]);
  const [collabInput, setCollabInput] = useState("");
  const [collabPercent, setCollabPercent] = useState("20");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addLicense = () => {
    setLicenses([...licenses, { name: "", description: "", price: "" }]);
  };

  const addCollab = () => {
    if (collabInput.trim()) {
      setCollabs([...collabs, { username: collabInput.trim(), percent: parseInt(collabPercent) || 20 }]);
      setCollabInput("");
    }
  };

  const myPercent = 85 - collabs.reduce((s, c) => s + c.percent, 0);

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Publier un Kit</h1>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button onClick={() => setStep(i)} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold spring-transition ${
              i < step ? "bg-puchk-success text-white" : i === step ? "bg-puchk-orange text-white" : "bg-white/10 text-white/40"
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </button>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-puchk-orange" : "text-white/40"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? "bg-puchk-success" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Step 0: File */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => setUploadMethod("zip")} className={`glass rounded-2xl p-6 text-center spring-transition ${uploadMethod === "zip" ? "border-puchk-orange bg-puchk-orange/5" : "hover:border-[rgba(255,107,26,0.2)]"}`}>
                <Upload className="w-10 h-10 text-puchk-orange mx-auto mb-3" />
                <h3 className="font-bold mb-1">Upload ZIP</h3>
                <p className="text-xs text-white/40">Glisse ton ZIP ici ou clique pour parcourir</p>
              </button>
              <button onClick={() => setUploadMethod("tool")} className={`glass rounded-2xl p-6 text-center spring-transition ${uploadMethod === "tool" ? "border-puchk-orange bg-puchk-orange/5" : "hover:border-[rgba(255,107,26,0.2)]"}`}>
                <Wrench className="w-10 h-10 text-puchk-orange mx-auto mb-3" />
                <h3 className="font-bold mb-1">Depuis Puchk Tool</h3>
                <p className="text-xs text-white/40">Crée ton drumkit dans notre outil</p>
              </button>
            </div>
            {uploadMethod === "zip" && (
              <div className="border-2 border-dashed border-puchk-orange/30 rounded-2xl p-12 text-center">
                <Upload className="w-12 h-12 text-puchk-orange/40 mx-auto mb-3" />
                <p className="text-white/50 text-sm">Glisse ton fichier ZIP ici</p>
                <p className="text-white/30 text-xs mt-1">ou clique pour parcourir</p>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Info */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Titre *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="INFERNO Vol. 1" className="w-full h-12 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Décris ton kit..." className="w-full px-4 py-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-white text-sm outline-none focus:border-puchk-orange/40 spring-transition resize-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Genre</label>
              <select value={genre} onChange={(e) => setGenre(e.target.value as Genre)} className="w-full h-12 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-white outline-none focus:border-puchk-orange/40 spring-transition">
                {Object.entries(genreLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-puchk-orange/10 text-puchk-orange text-xs font-medium flex items-center gap-1">
                    #{t} <button onClick={() => setTags(tags.filter((x) => x !== t))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Ajouter un tag..." className="w-full h-10 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Prix (€)</label>
                <input type="number" value={isFree ? "0" : price} onChange={(e) => setPrice(e.target.value)} disabled={isFree} className="w-full h-12 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-white outline-none focus:border-puchk-orange/40 spring-transition disabled:opacity-50" />
              </div>
              <div className="pt-5 flex items-center gap-2">
                <button onClick={() => setIsFree(!isFree)} className={`w-10 h-5 rounded-full spring-transition relative ${isFree ? "bg-puchk-orange" : "bg-white/10"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 spring-transition ${isFree ? "left-5" : "left-0.5"}`} />
                </button>
                <span className="text-xs text-white/50">Gratuit</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Licenses */}
        {step === 2 && (
          <div className="space-y-4">
            {licenses.map((lic, i) => (
              <div key={i} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/40 uppercase">Licence {i + 1}</span>
                  {licenses.length > 1 && <button onClick={() => setLicenses(licenses.filter((_, idx) => idx !== i))} className="text-red-400 text-xs hover:underline">Supprimer</button>}
                </div>
                <input value={lic.name} onChange={(e) => { const n = [...licenses]; n[i].name = e.target.value; setLicenses(n); }} placeholder="Standard" className="w-full h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
                <input value={lic.description} onChange={(e) => { const n = [...licenses]; n[i].description = e.target.value; setLicenses(n); }} placeholder="Description..." className="w-full h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
                <input type="number" value={lic.price} onChange={(e) => { const n = [...licenses]; n[i].price = e.target.value; setLicenses(n); }} placeholder="24.99" className="w-full h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
              </div>
            ))}
            <button onClick={addLicense} className="w-full h-12 glass rounded-xl text-sm font-bold text-puchk-orange hover:bg-puchk-orange/5 spring-transition flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Ajouter une licence
            </button>
          </div>
        )}

        {/* Step 3: Advanced */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-puchk-orange" />
                  <span className="text-sm font-bold">Publication programmée</span>
                </div>
                <button onClick={() => setScheduled(!scheduled)} className={`w-10 h-5 rounded-full spring-transition relative ${scheduled ? "bg-puchk-orange" : "bg-white/10"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 spring-transition ${scheduled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              {scheduled && (
                <div className="space-y-3">
                  <input type="date" className="w-full h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none" />
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-xs text-white/60"><input type="radio" name="vis" defaultChecked className="accent-[#FF6B1A]" /> Visible avec countdown</label>
                    <label className="flex items-center gap-2 text-xs text-white/60"><input type="radio" name="vis" className="accent-[#FF6B1A]" /> Invisible jusqu'à la date</label>
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-puchk-orange" />
                  <span className="text-sm font-bold">Split de revenus</span>
                  <span className="text-[9px] text-white/30">(max 5 collabs)</span>
                </div>
                <button onClick={() => setSplitEnabled(!splitEnabled)} className={`w-10 h-5 rounded-full spring-transition relative ${splitEnabled ? "bg-puchk-orange" : "bg-white/10"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 spring-transition ${splitEnabled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              {splitEnabled && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-puchk-deep">
                    <div className="w-7 h-7 rounded-full bg-puchk-orange/20 flex items-center justify-center text-[10px] font-bold text-puchk-orange">KX</div>
                    <span className="text-sm font-medium flex-1">Toi (KXZMA)</span>
                    <span className="text-sm font-bold text-puchk-orange">{myPercent}%</span>
                  </div>
                  {collabs.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-puchk-deep">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{c.username.charAt(0).toUpperCase()}</div>
                      <span className="text-sm flex-1">@{c.username}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 font-bold">En attente</span>
                      <span className="text-sm font-bold">{c.percent}%</span>
                      <button onClick={() => setCollabs(collabs.filter((_, idx) => idx !== i))}><X className="w-3.5 h-3.5 text-white/30" /></button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input value={collabInput} onChange={(e) => setCollabInput(e.target.value)} placeholder="@username" className="flex-1 h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none" />
                    <input type="number" value={collabPercent} onChange={(e) => setCollabPercent(e.target.value)} className="w-20 h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none text-center" />
                    <button onClick={addCollab} className="h-10 px-4 bg-puchk-orange text-white rounded-lg text-sm font-bold hover:bg-puchk-orange-hover spring-transition">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-white/30">Total collaborateurs : {100 - myPercent}% · Tu gardes {myPercent}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Preview Audio</label>
              <div className="border-2 border-dashed border-puchk-orange/30 rounded-2xl p-8 text-center">
                <Upload className="w-10 h-10 text-puchk-orange/40 mx-auto mb-2" />
                <p className="text-sm text-white/50">Glisse ton fichier audio ici</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Preview Pack (optionnel)</label>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center">
                <Upload className="w-10 h-10 text-white/20 mx-auto mb-2" />
                <p className="text-sm text-white/40">3-5 samples gratuits</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Titre</span><span className="font-bold">{title || "—"}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Genre</span><span>{genreLabels[genre]}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Prix</span><span className="font-bold text-puchk-orange">{isFree ? "Gratuit" : price + "€"}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Licences</span><span>{licenses.length}</span></div>
                {splitEnabled && <div className="flex justify-between"><span className="text-white/40">Collaborateurs</span><span>{collabs.length}</span></div>}
              </div>
            </div>

            <button className="w-full h-14 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition shadow-[0_0_20px_rgba(255,107,26,0.3)] animate-pulse-glow">
              Publier
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 glass rounded-xl text-sm font-bold hover:bg-white/10 spring-transition flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
          ) : <div />}
          {step < steps.length - 1 && (
            <button onClick={() => setStep(step + 1)} className="px-5 py-2.5 bg-puchk-orange text-white rounded-xl text-sm font-bold hover:bg-puchk-orange-hover spring-transition flex items-center gap-1">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishKitPage;
