import { MapPin, Star } from "lucide-react";

interface Org {
  id: number;
  name: string;
  type: string;
  distance: string;
  rating: number;
  meals: number;
  emoji: string;
}

const orgs: Org[] = [
  { id: 1, name: "Green Valley Restaurant", type: "Restaurant", distance: "1.2 km", rating: 4.8, meals: 126, emoji: "🍳" },
  { id: 2, name: "FreshMart Grocery", type: "Grocery", distance: "2.5 km", rating: 4.5, meals: 89, emoji: "🛒" },
  { id: 3, name: "Baker's Delight", type: "Bakery", distance: "0.8 km", rating: 4.9, meals: 210, emoji: "🥐" },
  { id: 4, name: "Hotel Sunrise", type: "Hotel", distance: "3.1 km", rating: 4.3, meals: 175, emoji: "🏨" },
  { id: 5, name: "Farm Fresh Co.", type: "Farm", distance: "1.8 km", rating: 4.7, meals: 64, emoji: "🌾" },
];

const TopOrganizations = () => {
  return (
    <div className="glass-card p-5 animate-slide-up">
      <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
        🏆 Top Organizations
      </h3>
      <div className="space-y-3">
        {orgs.map((org, i) => (
          <div key={org.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
            <span className="text-2xl">{org.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{org.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{org.type}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="h-3 w-3" /> {org.distance}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 text-xs text-warning font-semibold">
                <Star className="h-3 w-3 fill-warning" /> {org.rating}
              </div>
              <p className="text-xs text-muted-foreground">{org.meals} meals</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOrganizations;
