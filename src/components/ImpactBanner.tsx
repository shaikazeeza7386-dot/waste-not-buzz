const ImpactBanner = () => {
  const impacts = [
    { emoji: "🌍", value: "2.4 tons", label: "CO₂ Saved" },
    { emoji: "🍽️", value: "3,850", label: "Meals Rescued" },
    { emoji: "👥", value: "1,200+", label: "People Fed" },
    { emoji: "🏪", value: "38", label: "Partners" },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary via-primary to-accent p-[1px] animate-slide-up">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-6">
        <p className="text-xs font-bold tracking-widest uppercase text-primary-foreground/70 mb-4">
          🌱 Your Community Impact
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impacts.map((item) => (
            <div key={item.label} className="text-center">
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-2xl font-display font-bold text-primary-foreground mt-1">{item.value}</p>
              <p className="text-xs text-primary-foreground/70 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;
