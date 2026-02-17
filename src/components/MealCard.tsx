import { MapPin, Clock, Package, ArrowRight, Check, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export type MealStatus = "available" | "claimed" | "picked";

export interface Meal {
  id: number;
  name: string;
  org: string;
  type: string;
  qty: string;
  distance: string;
  time: string;
  status: MealStatus;
  expiry?: string;
  description?: string;
}

interface MealCardProps {
  meal: Meal;
  onClaim: (id: number) => void;
  onPickup: (id: number) => void;
  index: number;
}

const statusConfig: Record<MealStatus, { label: string; dotClass: string; bgClass: string }> = {
  available: { label: "Available", dotClass: "status-available", bgClass: "bg-success/10 text-success" },
  claimed: { label: "Claimed", dotClass: "status-claimed", bgClass: "bg-warning/10 text-warning" },
  picked: { label: "Picked Up", dotClass: "status-picked", bgClass: "bg-muted text-muted-foreground" },
};

const MealCard = ({ meal, onClaim, onPickup, index }: MealCardProps) => {
  const config = statusConfig[meal.status];

  return (
    <div
      className={`glass-card rounded-2xl p-5 hover-lift animate-fade-in ${
        meal.status === "picked" ? "opacity-50" : ""
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg truncate">{meal.name}</h3>
          <p className="text-sm text-muted-foreground">{meal.org}</p>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bgClass}`}>
          <span className={`status-dot ${config.dotClass}`} />
          {config.label}
        </span>
      </div>

      {/* Type pill */}
      <span className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium mb-4">
        {meal.type}
      </span>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <Package className="h-3.5 w-3.5" />
          {meal.qty}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {meal.distance}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {meal.time}
        </span>
      </div>

      {/* Actions */}
      {meal.status === "available" && (
        <Button
          onClick={() => onClaim(meal.id)}
          className="w-full rounded-xl h-11 font-semibold gap-2"
        >
          Claim This Meal
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
      {meal.status === "claimed" && (
        <Button
          onClick={() => onPickup(meal.id)}
          variant="outline"
          className="w-full rounded-xl h-11 font-semibold gap-2 border-warning/30 text-warning hover:bg-warning/10 hover:text-warning"
        >
          <Truck className="h-4 w-4" />
          Mark as Picked Up
        </Button>
      )}
      {meal.status === "picked" && (
        <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4" />
          Completed
        </div>
      )}
    </div>
  );
};

export default MealCard;
