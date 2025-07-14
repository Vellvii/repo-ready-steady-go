import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";

interface AuthProps {
  onAuth?: (user: User) => void;
  preselectedConcierge?: string;
}

const Auth = ({ onAuth, preselectedConcierge }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [concierge, setConcierge] = useState(preselectedConcierge || "vivian");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: name,
              concierge: concierge,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-luxury p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-playfair font-bold text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-white/70">
          {isLogin ? "Sign in to your account" : "Join the Vellvii experience"}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        )}
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />

        {!isLogin && (
          <div>
            <Label htmlFor="concierge" className="text-white mb-2 block">Choose Your Concierge</Label>
            <Select value={concierge} onValueChange={setConcierge} required>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select your preferred concierge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vivian">Vivian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          variant="luxury"
          disabled={loading}
        >
          {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:text-secondary transition-colors duration-300"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </Card>
  );
};

export default Auth;