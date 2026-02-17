import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Utensils } from "lucide-react";

interface AddMealFormProps {
  onAdd: (meal: {
    name: string;
    type: string;
    qty: string;
    description: string;
    expiry: string;
  }) => void;
  onClose: () => void;
}

const mealTypes = [
  { label: "Cooked Meals", emoji: "🍛" },
  { label: "Fresh Vegetables", emoji: "🥦" },
  { label: "Bread & Pastries", emoji: "🥖" },
  { label: "Fruits", emoji: "🍎" },
  { label: "Packaged Food", emoji: "📦" },
  { label: "Beverages", emoji: "🥤" },
  { label: "Dairy", emoji: "🧀" },
  { label: "Rice & Grains", emoji: "🍚" },
  { label: "Other", emoji: "🍽️" },
];

const AddMealForm = ({ onAdd, onClose }: AddMealFormProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, type, qty, description, expiry });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Utensils className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">Add New Meal</h2>
              <p className="text-xs text-muted-foreground">Post surplus food for rescue</p>
            </div>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Meal Name</Label>
            <Input id="meal-name" placeholder="e.g. Vegetable Biryani" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" required />
          </div>

          <div className="space-y-2">
            <Label>Food Type</Label>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setType(t.label)}
                  className={`tag-pill flex items-center gap-1.5 transition-all ${
                    type === t.label
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  <span>{t.emoji}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input id="qty" placeholder="e.g. 25 plates" value={qty} onChange={(e) => setQty(e.target.value)} className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Best Before</Label>
              <Input id="expiry" type="time" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="rounded-xl" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Notes (optional)</Label>
            <Textarea id="desc" placeholder="Pickup instructions, allergen info..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="rounded-xl" />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold gap-2 rounded-xl">
            <Plus className="h-5 w-5" /> Post Meal
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddMealForm;
