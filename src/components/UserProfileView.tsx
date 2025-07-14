import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Edit, Camera, Mail, Phone, User as UserIcon, Crown } from "lucide-react";

interface UserProfileViewProps {
  user: User;
  onClose: () => void;
}

const UserProfileView = ({ user, onClose }: UserProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState("");
  const [concierge, setConcierge] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, [user.id]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setName(data.name || "");
        setPhone(data.phone || "");
        setConcierge(data.concierge || "");
        setProfilePicture(data.profile_picture || "");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Could not load profile data.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update email if changed
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });
        if (emailError) throw emailError;
      }

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          name,
          email,
          phone,
          concierge,
          profile_picture: profilePicture,
        });

      if (profileError) throw profileError;

      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully.",
      });

      setIsEditing(false);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll just use a placeholder URL
      // In production, you'd upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="glass-luxury p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={profilePicture} alt={name || "Profile"} />
              <AvatarFallback className="bg-gradient-secondary text-black text-2xl font-bold">
                {name ? name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary/80 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h2 className="text-2xl font-playfair font-bold text-white mb-2">
            {isEditing ? "Edit Profile" : "My Profile"}
          </h2>
          <p className="text-white/70">
            {isEditing ? "Update your account information" : "Your account details"}
          </p>
        </div>

        {!isEditing ? (
          // View Mode
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 glass-dark rounded-lg">
              <UserIcon className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-white/60">Name</p>
                <p className="text-white">{name || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 glass-dark rounded-lg">
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-white/60">Email</p>
                <p className="text-white">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 glass-dark rounded-lg">
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-white/60">Phone</p>
                <p className="text-white">{phone || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 glass-dark rounded-lg">
              <Crown className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-white/60">Preferred Concierge</p>
                <p className="text-white capitalize">{concierge || "Not set"}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                type="button"
                variant="luxury"
                onClick={() => setIsEditing(true)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="concierge" className="text-white">Preferred Concierge</Label>
              <Select value={concierge} onValueChange={setConcierge}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a concierge" />
                </SelectTrigger>
                <SelectContent>
                  
                  <SelectItem value="vivian">Vivian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="luxury"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default UserProfileView;