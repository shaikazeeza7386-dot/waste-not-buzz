import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Bell,
  MapPin,
  Clock,
  Package,
  Users,
  TrendingUp,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockDonations = [
  {
    id: 1,
    org: "Green Valley Restaurant",
    type: "Cooked Meals",
    qty: "25 plates",
    distance: "1.2 km",
    time: "30 min ago",
    status: "available",
  },
  {
    id: 2,
    org: "FreshMart Grocery",
    type: "Fresh Vegetables",
    qty: "15 kg",
    distance: "2.5 km",
    time: "1 hr ago",
    status: "available",
  },
  {
    id: 3,
    org: "Baker's Delight",
    type: "Bread & Pastries",
    qty: "40 pieces",
    distance: "0.8 km",
    time: "15 min ago",
    status: "available",
  },
  {
    id: 4,
    org: "Hotel Sunrise",
    type: "Buffet Surplus",
    qty: "50 plates",
    distance: "3.1 km",
    time: "45 min ago",
    status: "claimed",
  },
];

const stats = [
  { label: "Food Rescued", value: "1,240 kg", icon: Package, color: "text-primary" },
  { label: "Organizations", value: "38", icon: Users, color: "text-secondary" },
  { label: "Meals Saved", value: "3,850", icon: TrendingUp, color: "text-success" },
];

const Dashboard = () => {
  const [buzzerActive, setBuzzerActive] = useState(false);
  const navigate = useNavigate();

  const handleBuzzer = () => {
    setBuzzerActive(true);
    setTimeout(() => setBuzzerActive(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-bold text-foreground">FoodRescue</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-buzzer" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome + Buzzer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Good morning! 🌿
            </h1>
            <p className="text-muted-foreground mt-1">
              You have {mockDonations.filter((d) => d.status === "available").length} food donations nearby
            </p>
          </div>

          <button
            onClick={handleBuzzer}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              buzzerActive
                ? "bg-buzzer text-primary-foreground animate-pulse-buzzer shadow-lg"
                : "bg-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            <Bell className="h-6 w-6" />
            {buzzerActive ? "Buzzer Sent! 🔔" : "Send Buzzer"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card
              key={stat.label}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Food Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground">
              Nearby Food Available
            </h2>
            <Button variant="ghost" className="text-primary gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDonations.map((donation, i) => (
              <Card
                key={donation.id}
                className={`hover:shadow-md transition-all duration-200 animate-fade-in ${
                  donation.status === "claimed" ? "opacity-60" : ""
                }`}
                style={{ animationDelay: `${(i + 3) * 100}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{donation.org}</h3>
                      <p className="text-sm text-muted-foreground">{donation.type}</p>
                    </div>
                    <Badge
                      variant={donation.status === "available" ? "default" : "secondary"}
                      className={
                        donation.status === "available"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : ""
                      }
                    >
                      {donation.status === "available" ? "Available" : "Claimed"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="h-3.5 w-3.5" />
                      {donation.qty}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {donation.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {donation.time}
                    </span>
                  </div>
                  {donation.status === "available" && (
                    <Button className="w-full mt-4" size="sm">
                      Claim & Pickup
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
