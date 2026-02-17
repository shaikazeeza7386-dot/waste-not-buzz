import { Clock, CheckCircle2, Truck, Bell, ArrowUpRight } from "lucide-react";

interface ActivityItem {
  id: number;
  text: string;
  time: string;
  icon: "claim" | "pickup" | "buzzer" | "new";
}

const iconMap = {
  claim: { Icon: CheckCircle2, color: "text-primary", bg: "bg-success-soft" },
  pickup: { Icon: Truck, color: "text-warning", bg: "bg-warning-soft" },
  buzzer: { Icon: Bell, color: "text-buzzer", bg: "bg-buzzer-soft" },
  new: { Icon: ArrowUpRight, color: "text-info", bg: "bg-info-soft" },
};

const activities: ActivityItem[] = [
  { id: 1, text: "Baker's Delight posted 40 croissants", time: "2 min ago", icon: "new" },
  { id: 2, text: "You claimed Vegetable Biryani", time: "10 min ago", icon: "claim" },
  { id: 3, text: "Buzzer sent to Hotel Sunrise", time: "25 min ago", icon: "buzzer" },
  { id: 4, text: "Pasta & Garlic Bread picked up", time: "1 hr ago", icon: "pickup" },
  { id: 5, text: "FreshMart posted Fresh Salad Mix", time: "1.5 hrs ago", icon: "new" },
  { id: 6, text: "Farm Fresh Co. posted Fruit Box", time: "2 hrs ago", icon: "new" },
];

const ActivityFeed = () => {
  return (
    <div className="glass-card p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Recent Activity
        </h3>
        <span className="tag-pill bg-info-soft text-info">Live</span>
      </div>
      <div className="space-y-3">
        {activities.map((a) => {
          const { Icon, color, bg } = iconMap[a.icon];
          return (
            <div key={a.id} className="flex items-start gap-3 group">
              <div className={`h-8 w-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
