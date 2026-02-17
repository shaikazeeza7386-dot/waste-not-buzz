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

const mealTypes = ["Cooked Meals", "Fresh Vegetables", "Bread & Pastries", "Fruits", "Packaged Food", "Beverages", "Other"];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl w-full max-w-lg p-6 animate-scale-in bg-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Utensils className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Add Meal</h2>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Meal Name</Label>
            <Input id="meal-name" placeholder="e.g. Vegetable Biryani" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Food Type</Label>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    type === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input id="qty" placeholder="e.g. 25 plates" value={qty} onChange={(e) => setQty(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Best Before</Label>
              <Input id="expiry" type="time" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Notes (optional)</Label>
            <Textarea id="desc" placeholder="Any special instructions for pickup..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold gap-2 rounded-xl">
            <Plus className="h-5 w-5" />
            Post Meal
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddMealForm;
