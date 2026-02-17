import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, ArrowRight } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroFood} alt="Fresh food being shared" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/10" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-primary-foreground">FoodRescue</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4 leading-tight">
            Save Food,<br />Feed Communities
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Connect surplus food with nearby organizations. One buzzer away from making a difference.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary-foreground">3,850</p>
              <p className="text-xs text-primary-foreground/60 font-medium">Meals Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary-foreground">38</p>
              <p className="text-xs text-primary-foreground/60 font-medium">Partners</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary-foreground">2.4t</p>
              <p className="text-xs text-primary-foreground/60 font-medium">CO₂ Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">FoodRescue</span>
          </div>

          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Join the mission"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Sign in to manage food donations" : "Create an account to start rescuing food"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input id="name" placeholder="Your organization name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl h-11" required={!isLogin} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <select
                    id="orgType"
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required={!isLogin}
                  >
                    <option value="">Select type...</option>
                    <option value="restaurant">🍳 Restaurant</option>
                    <option value="grocery">🛒 Grocery Store</option>
                    <option value="ngo">🤝 NGO / Charity</option>
                    <option value="community">🏠 Community Kitchen</option>
                    <option value="individual">👤 Individual</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-11" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl h-11" required />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold gap-2 rounded-xl">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
