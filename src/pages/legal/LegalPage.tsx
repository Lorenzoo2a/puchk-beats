const LegalPage = () => (
  <div className="min-h-screen pt-16"><div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Mentions Légales</h1>
    {[
      { title: "Éditeur", content: "PUCHK SAS — Capital social : 10 000€ — RCS Paris — Siège social : 42 rue de la Musique, 75011 Paris — Directeur de publication : KXZMA" },
      { title: "Hébergeur", content: "Vercel Inc. — 340 S Lemon Ave #4133 — Walnut, CA 91789 — United States" },
      { title: "Propriété intellectuelle", content: "L'ensemble du contenu de ce site (textes, images, logos, sons) est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable." },
      { title: "Crédits", content: "Design et développement : PUCHK Team — Icônes : Lucide Icons — Typographie : Manrope (Google Fonts)" },
    ].map((s) => (
      <div key={s.title} className="mb-6">
        <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
        <p className="text-sm text-white/50 leading-relaxed">{s.content}</p>
      </div>
    ))}
  </div></div>
);
export default LegalPage;
