import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Auth from "@/components/Auth";
import UserProfile from "@/components/UserProfile";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedConcierge, setSelectedConcierge] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, loading } = useAuth();

  // Redirect authenticated users to home
  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const handleConciergeSelection = (concierge: string) => {
    setSelectedConcierge(concierge);
    // Store concierge choice in localStorage
    localStorage.setItem("selectedConcierge", concierge);
    
    // If user is logged in, navigate to home immediately
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } else {
      // If not logged in, show auth modal
      setTimeout(() => {
        setShowAuth(true);
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden">
      {/* Auth/Profile buttons in top right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        {user ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(true)}
            className="text-white hover:bg-white/10"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAuth(true)}
              className="text-white hover:bg-white/10"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAuth(true)}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </>
        )}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_50%)] opacity-20"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-luxury rounded-full blur-3xl opacity-30 float-animation"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-secondary rounded-full blur-2xl opacity-40 float-animation" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 text-center space-y-12 px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="fade-in-up">
          <div className="mb-4">
            <img src="/lovable-uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii" className="h-32 md:h-40 mx-auto" />
          </div>
          <p className="text-lg text-foreground/80 font-inter max-w-2xl mx-auto leading-relaxed mt-6">
            Experience personalized luxury with our AI concierge service, 
            designed to guide your intimate journey with sophistication and care.
          </p>
        </div>

        {/* Concierge Selection */}
        <div className="fade-in-up space-y-8" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-playfair text-foreground mb-8">
            Choose Your Personal Concierge
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Luke */}
            <Card 
              className="glass-luxury p-8 hover:scale-105 transition-all duration-500 cursor-pointer group hover-glow"
              onClick={() => handleConciergeSelection("luke")}
            >
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl font-playfair font-bold text-white">L</span>
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-white">Luke</h3>
                <p className="text-white/80 font-inter leading-relaxed">
                  Your sophisticated guide with extensive expertise in luxury intimacy. 
                  Luke provides detailed insights and refined recommendations.
                </p>
                <div className="pt-4">
                  <Button variant="concierge" size="lg" className="w-full">
                    Choose Luke
                  </Button>
                </div>
              </div>
            </Card>

            {/* Vivian */}
            <Card 
              className="glass-luxury p-8 hover:scale-105 transition-all duration-500 cursor-pointer group hover-glow"
              onClick={() => handleConciergeSelection("vivian")}
            >
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6">
                  <img src="/lovable-uploads/0f6e82dd-0d32-4119-a2a1-e5a0386ffec4.png" alt="Vivian" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-white">Vivian</h3>
                <p className="text-white/80 font-inter leading-relaxed">
                  Your warm and intuitive companion who creates a comfortable environment. 
                  Vivian offers personalized care with gentle guidance.
                </p>
                <div className="pt-4">
                  <Button variant="concierge" size="lg" className="w-full">
                    Choose Vivian
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {selectedConcierge && (
            <div className="mt-8 p-4 glass-dark rounded-lg fade-in-up">
              <p className="text-white/90 font-inter">
                Excellent choice! {selectedConcierge === 'luke' ? 'Luke' : 'Vivian'} will be your personal concierge.
                {user ? "Preparing your luxury experience..." : "Please sign in to continue..."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAuth(false)}
              className="absolute -top-2 -right-2 text-white hover:bg-white/10 z-10"
            >
              ✕
            </Button>
            <Auth onAuth={() => setShowAuth(false)} />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && user && (
        <UserProfile user={user} onClose={() => setShowProfile(false)} />
      )}

      {/* Creative Credit Footer */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <p className="text-xs text-white/60 font-inter">
            Crafted with ❤️ and precision by{" "}
            <a 
              href="https://www.lumarostudios.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-300 font-medium"
            >
              Lumaro Studios
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;