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
      {/* Left - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroFood}
          alt="Fresh food being shared between hands"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-display font-bold text-primary-foreground">
              FoodRescue
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4 leading-tight">
            Save Food,<br />Feed Communities
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Connect surplus food with nearby organizations. One buzzer away from making a difference.
          </p>
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-xl font-display font-bold text-foreground">FoodRescue</span>
          </div>

          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Join the mission"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? "Sign in to manage food donations"
              : "Create an account to start rescuing food"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    placeholder="Your organization name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <select
                    id="orgType"
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required={!isLogin}
                  >
                    <option value="">Select type...</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery Store</option>
                    <option value="ngo">NGO / Charity</option>
                    <option value="community">Community Kitchen</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold gap-2">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
