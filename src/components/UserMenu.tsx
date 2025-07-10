import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "./UserProfile";

const UserMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowProfile(true)}
          className="text-white hover:bg-white/10"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {showProfile && (
        <UserProfile user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default UserMenu;