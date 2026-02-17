import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Bell,
  Plus,
  LogOut,
  Package,
  Users,
  TrendingUp,
  Utensils,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import MealCard, { type Meal, type MealStatus } from "@/components/MealCard";
import AddMealForm from "@/components/AddMealForm";

const initialMeals: Meal[] = [
  { id: 1, name: "Vegetable Biryani", org: "Green Valley Restaurant", type: "Cooked Meals", qty: "25 plates", distance: "1.2 km", time: "30 min ago", status: "available" },
  { id: 2, name: "Fresh Salad Mix", org: "FreshMart Grocery", type: "Fresh Vegetables", qty: "15 kg", distance: "2.5 km", time: "1 hr ago", status: "available" },
  { id: 3, name: "Croissants & Baguettes", org: "Baker's Delight", type: "Bread & Pastries", qty: "40 pieces", distance: "0.8 km", time: "15 min ago", status: "available" },
  { id: 4, name: "Buffet Surplus Combo", org: "Hotel Sunrise", type: "Cooked Meals", qty: "50 plates", distance: "3.1 km", time: "45 min ago", status: "claimed" },
  { id: 5, name: "Seasonal Fruit Box", org: "Farm Fresh Co.", type: "Fruits", qty: "20 kg", distance: "1.8 km", time: "2 hrs ago", status: "available" },
  { id: 6, name: "Pasta & Garlic Bread", org: "Italiano Kitchen", type: "Cooked Meals", qty: "30 plates", distance: "4.0 km", time: "20 min ago", status: "picked" },
];

const filterTabs: { label: string; value: MealStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Claimed", value: "claimed" },
  { label: "Picked Up", value: "picked" },
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

  const stats = [
    { label: "Total Meals", value: meals.length, icon: Utensils, color: "text-primary" },
    { label: "Available", value: meals.filter((m) => m.status === "available").length, icon: Package, color: "text-success" },
    { label: "Claimed", value: meals.filter((m) => m.status === "claimed").length, icon: Users, color: "text-warning" },
    { label: "Rescued", value: meals.filter((m) => m.status === "picked").length, icon: TrendingUp, color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="glass-card sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-bold text-foreground">FoodRescue</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBuzzer}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                buzzerActive
                  ? "bg-buzzer text-primary-foreground animate-pulse-buzzer"
                  : "bg-primary text-primary-foreground hover:shadow-md hover:scale-[1.02]"
              }`}
            >
              <Bell className="h-4 w-4" />
              {buzzerActive ? "Sent! 🔔" : "Buzzer"}
            </button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Bento Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 hover-lift animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === tab.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)} className="rounded-xl gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              Add Meal
            </Button>
          </div>
        </div>

        {/* Meal Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((meal, i) => (
              <MealCard key={meal.id} meal={meal} onClaim={handleClaim} onPickup={handlePickup} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Utensils className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No meals found</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters or add a new meal</p>
          </div>
        )}
      </main>

      {showAddForm && <AddMealForm onAdd={handleAddMeal} onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default Dashboard;
