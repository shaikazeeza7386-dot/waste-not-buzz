import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Leaf, Bell, Plus, LogOut, Package, Users, TrendingUp, Utensils,
  Search, Heart, Timer, Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MealCard, { type Meal, type MealStatus } from "@/components/MealCard";
import AddMealForm from "@/components/AddMealForm";
import ActivityFeed from "@/components/ActivityFeed";
import ImpactBanner from "@/components/ImpactBanner";
import TopOrganizations from "@/components/TopOrganizations";

const initialMeals: Meal[] = [
  { id: 1, name: "Vegetable Biryani", org: "Green Valley Restaurant", type: "Cooked Meals", qty: "25 plates", distance: "1.2 km", time: "30 min ago", status: "available", emoji: "🍛" },
  { id: 2, name: "Fresh Salad Mix", org: "FreshMart Grocery", type: "Fresh Vegetables", qty: "15 kg", distance: "2.5 km", time: "1 hr ago", status: "available", emoji: "🥗" },
  { id: 3, name: "Croissants & Baguettes", org: "Baker's Delight", type: "Bread & Pastries", qty: "40 pieces", distance: "0.8 km", time: "15 min ago", status: "available", emoji: "🥐" },
  { id: 4, name: "Buffet Surplus Combo", org: "Hotel Sunrise", type: "Cooked Meals", qty: "50 plates", distance: "3.1 km", time: "45 min ago", status: "claimed", emoji: "🍱" },
  { id: 5, name: "Seasonal Fruit Box", org: "Farm Fresh Co.", type: "Fruits", qty: "20 kg", distance: "1.8 km", time: "2 hrs ago", status: "available", emoji: "🍎" },
  { id: 6, name: "Pasta & Garlic Bread", org: "Italiano Kitchen", type: "Cooked Meals", qty: "30 plates", distance: "4.0 km", time: "20 min ago", status: "picked", emoji: "🍝" },
  { id: 7, name: "Paneer Tikka Wraps", org: "Spice Junction", type: "Cooked Meals", qty: "18 wraps", distance: "1.5 km", time: "10 min ago", status: "available", emoji: "🌯" },
  { id: 8, name: "Rice & Dal Combo", org: "Community Kitchen", type: "Rice & Grains", qty: "60 plates", distance: "0.5 km", time: "5 min ago", status: "available", emoji: "🍚" },
  { id: 9, name: "Milk & Yogurt Pack", org: "Dairy Direct", type: "Dairy", qty: "30 liters", distance: "2.0 km", time: "40 min ago", status: "claimed", emoji: "🥛" },
  { id: 10, name: "Juice Boxes", org: "Healthy Sips Cafe", type: "Beverages", qty: "50 boxes", distance: "3.5 km", time: "1 hr ago", status: "available", emoji: "🧃" },
  { id: 11, name: "Chapati & Sabzi", org: "Annapurna Dhaba", type: "Cooked Meals", qty: "100 plates", distance: "0.3 km", time: "Just now", status: "available", emoji: "🫓" },
  { id: 12, name: "Mixed Dry Fruits Pack", org: "NutriWell Store", type: "Packaged Food", qty: "25 packs", distance: "2.8 km", time: "3 hrs ago", status: "picked", emoji: "🥜" },
];

const filterTabs: { label: string; value: MealStatus | "all"; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: Utensils },
  { label: "Available", value: "available", icon: Zap },
  { label: "Claimed", value: "claimed", icon: Timer },
  { label: "Picked Up", value: "picked", icon: Heart },
];

const Dashboard = () => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [filter, setFilter] = useState<MealStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [buzzerActive, setBuzzerActive] = useState(false);
  const navigate = useNavigate();

  const handleClaim = (id: number) => {
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, status: "claimed" as MealStatus } : m)));
  };

  const handlePickup = (id: number) => {
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, status: "picked" as MealStatus } : m)));
  };

  const handleAddMeal = (meal: { name: string; type: string; qty: string; description: string; expiry: string }) => {
    const emojiMap: Record<string, string> = {
      "Cooked Meals": "🍛", "Fresh Vegetables": "🥦", "Bread & Pastries": "🥖",
      "Fruits": "🍎", "Packaged Food": "📦", "Beverages": "🥤",
      "Dairy": "🧀", "Rice & Grains": "🍚", "Other": "🍽️",
    };
    const newMeal: Meal = {
      id: Date.now(),
      name: meal.name,
      org: "Your Organization",
      type: meal.type,
      qty: meal.qty,
      distance: "0 km",
      time: "Just now",
      status: "available",
      description: meal.description,
      expiry: meal.expiry,
      emoji: emojiMap[meal.type] || "🍽️",
    };
    setMeals((prev) => [newMeal, ...prev]);
  };

  const handleBuzzer = () => {
    setBuzzerActive(true);
    setTimeout(() => setBuzzerActive(false), 3000);
  };

  const filtered = meals.filter((m) => {
    const matchFilter = filter === "all" || m.status === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.org.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const quickStats = [
    { label: "Total Meals", value: meals.length, icon: Utensils, bg: "bg-grape-soft", color: "text-grape" },
    { label: "Available Now", value: meals.filter((m) => m.status === "available").length, icon: Package, bg: "bg-success-soft", color: "text-success" },
    { label: "Claimed", value: meals.filter((m) => m.status === "claimed").length, icon: Users, bg: "bg-warning-soft", color: "text-warning" },
    { label: "Rescued", value: meals.filter((m) => m.status === "picked").length, icon: TrendingUp, bg: "bg-info-soft", color: "text-info" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="glass-card sticky top-0 z-50 border-b border-border/60 rounded-none">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 max-w-7xl">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold text-foreground">FoodRescue</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBuzzer}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                buzzerActive
                  ? "bg-buzzer text-primary-foreground animate-pulse-buzzer"
                  : "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              <Bell className="h-4 w-4" />
              {buzzerActive ? "Sent! 🔔" : "Send Buzzer"}
            </button>
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Hero greeting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
          <div>
            <p className="text-sm font-semibold text-primary mb-1">Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Good morning! 🌿
            </h1>
            <p className="text-muted-foreground mt-1">
              {meals.filter((d) => d.status === "available").length} meals waiting to be rescued nearby
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="rounded-xl gap-2 h-11 px-6 font-bold text-sm">
            <Plus className="h-4 w-4" /> Add New Meal
          </Button>
        </div>

        {/* Impact Banner */}
        <ImpactBanner />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-4 hover-lift animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meals - 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilter(tab.value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                      filter === tab.value
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((meal, i) => (
                  <MealCard key={meal.id} meal={meal} onClaim={handleClaim} onPickup={handlePickup} index={i} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Utensils className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-display font-bold text-muted-foreground">No meals found</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Try different filters or add a new meal</p>
              </div>
            )}
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-5">
            <ActivityFeed />
            <TopOrganizations />
          </div>
        </div>
      </main>

      {showAddForm && <AddMealForm onAdd={handleAddMeal} onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default Dashboard;
