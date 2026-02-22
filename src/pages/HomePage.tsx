import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Leaf, ArrowRight, Utensils, MapPin, Users, TrendingUp,
  Clock, Shield, Heart, Zap,
} from "lucide-react";
import Layout from "@/components/Layout";
import ImpactBanner from "@/components/ImpactBanner";

const features = [
  {
    icon: Utensils,
    title: "Meal Recording",
    desc: "Quickly log surplus meals with voice or text — it takes seconds.",
    color: "bg-success-soft text-success",
  },
  {
    icon: MapPin,
    title: "Live Map",
    desc: "See nearby surplus food on an interactive map in real time.",
    color: "bg-info-soft text-info",
  },
  {
    icon: Users,
    title: "Community Network",
    desc: "Connect restaurants, grocers, and volunteers in one platform.",
    color: "bg-grape-soft text-grape",
  },
  {
    icon: Shield,
    title: "Safe & Verified",
    desc: "All organizations are verified for food safety standards.",
    color: "bg-warning-soft text-warning",
  },
];

const howItWorks = [
  { step: "1", emoji: "📦", title: "Post Surplus", desc: "Restaurants & stores post surplus meals in seconds" },
  { step: "2", emoji: "🔔", title: "Get Notified", desc: "Nearby volunteers and NGOs receive instant alerts" },
  { step: "3", emoji: "🚗", title: "Pick Up", desc: "Claimed meals are picked up before they expire" },
  { step: "4", emoji: "💚", title: "Feed People", desc: "Meals reach those who need them most" },
];

const stats = [
  { value: "3,850+", label: "Meals Rescued", icon: Heart },
  { value: "38", label: "Partner Orgs", icon: Users },
  { value: "2.4t", label: "CO₂ Saved", icon: TrendingUp },
  { value: "<30m", label: "Avg Pickup", icon: Clock },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero */}
        <section className="py-16 md:py-24 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success-soft text-success text-xs font-bold mb-6">
            <Leaf className="h-3.5 w-3.5" /> Reducing Food Waste Together
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Rescue Meals,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Feed Communities
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
            Connect surplus food from restaurants, grocery stores, and events with people who need it — powered by your local community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl h-12 px-8 text-base font-bold gap-2"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate("/organizations")}
              variant="outline"
              className="rounded-xl h-12 px-8 text-base font-bold gap-2"
            >
              <MapPin className="h-4 w-4" /> View Map
            </Button>
          </div>
        </section>

        {/* Stats strip */}
        <section className="py-8 animate-slide-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-5 text-center hover-lift">
                <s.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="py-8">
          <ImpactBanner />
        </section>

        {/* Features */}
        <section className="py-12">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Features</p>
            <h2 className="text-3xl font-display font-bold text-foreground">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`h-12 w-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Process</p>
            <h2 className="text-3xl font-display font-bold text-foreground">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className="glass-card p-6 text-center hover-lift animate-fade-in relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl mb-3 block">{step.emoji}</span>
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-10">
            <Zap className="h-10 w-10 text-primary-foreground mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">
              Start Rescuing Meals Today
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Join the movement to eliminate food waste. Every meal counts.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl h-12 px-8 text-base font-bold gap-2 bg-background text-foreground hover:bg-background/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="font-display font-bold text-foreground">FoodRescue</span>
          </div>
          <p>© 2026 FoodRescue. Making zero waste a reality.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default HomePage;
