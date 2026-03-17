const TermsPage = () => (
  <div className="min-h-screen pt-16"><div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Conditions Générales de Vente</h1>
    {[
      { title: "1. Objet", content: "Les présentes CGV régissent l'utilisation de la plateforme PUCHK, marketplace de drum kits et samples audio à destination des beatmakers et producteurs de musique." },
      { title: "2. Inscription", content: "L'inscription sur PUCHK est gratuite. L'utilisateur doit fournir des informations exactes et à jour. Tout compte créé avec de fausses informations pourra être suspendu." },
      { title: "3. Commandes", content: "Toute commande passée sur PUCHK est ferme et définitive. L'acheteur reçoit un accès immédiat aux fichiers après paiement." },
      { title: "4. Prix", content: "Les prix sont affichés en euros (€) TTC. Les vendeurs fixent librement leurs prix. PUCHK se réserve le droit de modifier sa commission." },
      { title: "5. Paiement", content: "Les paiements sont sécurisés via Stripe. PUCHK ne stocke aucune donnée bancaire." },
      { title: "6. Livraison", content: "Les fichiers sont livrés par téléchargement immédiat après paiement. Aucune livraison physique n'est effectuée." },
      { title: "7. Droit de rétractation", content: "Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques fournis sur un support immatériel dont l'exécution a commencé avec l'accord du consommateur." },
      { title: "8. Propriété intellectuelle", content: "Chaque vendeur garantit être le propriétaire des droits sur les contenus qu'il vend. L'acheteur acquiert une licence d'utilisation selon les termes définis par le vendeur." },
      { title: "9. Responsabilité", content: "PUCHK agit en tant qu'intermédiaire et ne saurait être tenu responsable du contenu des kits vendus par les producteurs sur la plateforme." },
    ].map((s) => (
      <div key={s.title} className="mb-6">
        <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
        <p className="text-sm text-white/50 leading-relaxed">{s.content}</p>
      </div>
    ))}
  </div></div>
);
export default TermsPage;
