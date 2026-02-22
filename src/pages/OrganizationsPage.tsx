import { useState } from "react";
import { MapPin, Star, Search, Filter, Trophy, Utensils, TrendingUp, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import MapView from "@/components/MapView";

interface Org {
  id: number;
  name: string;
  type: string;
  distance: string;
  rating: number;
  meals: number;
  emoji: string;
  lat: number;
  lng: number;
  address: string;
  joined: string;
}

const orgs: Org[] = [
  { id: 1, name: "Green Valley Restaurant", type: "Restaurant", distance: "1.2 km", rating: 4.8, meals: 126, emoji: "🍳", lat: 17.3850, lng: 78.4867, address: "12 Green Valley Rd", joined: "Jan 2025" },
  { id: 2, name: "FreshMart Grocery", type: "Grocery", distance: "2.5 km", rating: 4.5, meals: 89, emoji: "🛒", lat: 17.3900, lng: 78.4900, address: "45 Market St", joined: "Mar 2025" },
  { id: 3, name: "Baker's Delight", type: "Bakery", distance: "0.8 km", rating: 4.9, meals: 210, emoji: "🥐", lat: 17.3820, lng: 78.4830, address: "8 Baker's Lane", joined: "Dec 2024" },
  { id: 4, name: "Hotel Sunrise", type: "Hotel", distance: "3.1 km", rating: 4.3, meals: 175, emoji: "🏨", lat: 17.3950, lng: 78.4950, address: "100 Sunrise Blvd", joined: "Feb 2025" },
  { id: 5, name: "Farm Fresh Co.", type: "Farm", distance: "1.8 km", rating: 4.7, meals: 64, emoji: "🌾", lat: 17.3800, lng: 78.4800, address: "Rural Route 7", joined: "Apr 2025" },
  { id: 6, name: "Community Kitchen", type: "NGO", distance: "0.5 km", rating: 5.0, meals: 520, emoji: "🏠", lat: 17.3870, lng: 78.4850, address: "1 Community Pl", joined: "Oct 2024" },
  { id: 7, name: "Spice Junction", type: "Restaurant", distance: "1.5 km", rating: 4.6, meals: 95, emoji: "🌶️", lat: 17.3830, lng: 78.4920, address: "22 Spice Rd", joined: "May 2025" },
  { id: 8, name: "Annapurna Dhaba", type: "Restaurant", distance: "0.3 km", rating: 4.4, meals: 340, emoji: "🫓", lat: 17.3860, lng: 78.4880, address: "5 Main St", joined: "Nov 2024" },
];

const typeFilters = ["All", "Restaurant", "Grocery", "Bakery", "Hotel", "Farm", "NGO"];

const OrganizationsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);

  const filtered = orgs.filter((o) => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || o.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalMeals = orgs.reduce((s, o) => s + o.meals, 0);

  const mapMarkers = filtered.map((o) => ({
    id: o.id,
    name: o.name,
    lat: o.lat,
    lng: o.lng,
    type: o.type,
    emoji: o.emoji,
    meals: o.meals,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <p className="text-sm font-semibold text-primary mb-1">Community</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Top Organizations 🏆
          </h1>
          <p className="text-muted-foreground mt-1">
            {orgs.length} partner organizations · {totalMeals.toLocaleString()} meals rescued
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up">
          <div className="glass-card p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto text-warning mb-1" />
            <p className="text-xl font-display font-bold text-foreground">{orgs.length}</p>
            <p className="text-xs text-muted-foreground">Partners</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Utensils className="h-6 w-6 mx-auto text-primary mb-1" />
            <p className="text-xl font-display font-bold text-foreground">{totalMeals.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Meals Rescued</p>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto text-success mb-1" />
            <p className="text-xl font-display font-bold text-foreground">4.7</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
        </div>

        {/* Map */}
        <div className="animate-slide-up">
          <h2 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Live Map
          </h2>
          <MapView markers={mapMarkers} className="shadow-lg" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {typeFilters.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  typeFilter === t
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orgs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>
        </div>

        {/* Org list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((org, i) => (
            <div
              key={org.id}
              className="glass-card p-5 hover-lift animate-fade-in cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setSelectedOrg(selectedOrg?.id === org.id ? null : org)}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{org.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-foreground truncate">{org.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-warning font-semibold shrink-0">
                      <Star className="h-4 w-4 fill-warning" /> {org.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span className="tag-pill bg-grape-soft text-grape">{org.type}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {org.distance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold text-primary">{org.meals} meals rescued</span>
                    <span className="text-xs text-muted-foreground">Joined {org.joined}</span>
                  </div>

                  {selectedOrg?.id === org.id && (
                    <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                      <p className="text-sm text-muted-foreground mb-2">
                        📍 {org.address}
                      </p>
                      <Button size="sm" className="rounded-xl gap-1.5 text-xs">
                        <ExternalLink className="h-3 w-3" /> View Full Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationsPage;
