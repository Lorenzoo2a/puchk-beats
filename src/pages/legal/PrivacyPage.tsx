const PrivacyPage = () => (
  <div className="min-h-screen pt-16"><div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Politique de Confidentialité</h1>
    {[
      { title: "Données collectées", content: "Nous collectons : email, nom d'utilisateur, historique d'achats, préférences de navigation, adresse IP. Les données de paiement sont traitées par Stripe et ne sont pas stockées sur nos serveurs." },
      { title: "Finalité", content: "Vos données sont utilisées pour : la gestion de votre compte, le traitement de vos commandes, l'amélioration de nos services, l'envoi de communications (avec votre consentement)." },
      { title: "Durée de conservation", content: "Les données personnelles sont conservées pendant la durée de votre compte plus 3 ans après sa suppression, conformément aux obligations légales." },
      { title: "Droits RGPD", content: "Vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et d'opposition au traitement de vos données. Contactez-nous à privacy@puchk.io." },
      { title: "Cookies", content: "PUCHK utilise des cookies essentiels au fonctionnement du site et des cookies analytiques (avec votre consentement) pour améliorer l'expérience utilisateur." },
      { title: "Contact DPO", content: "Pour toute question relative à vos données personnelles : dpo@puchk.io" },
    ].map((s) => (
      <div key={s.title} className="mb-6">
        <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
        <p className="text-sm text-white/50 leading-relaxed">{s.content}</p>
      </div>
    ))}
  </div></div>
);
export default PrivacyPage;
