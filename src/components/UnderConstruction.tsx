import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface UnderConstructionProps {
  onPasswordCorrect: () => void;
}

const UnderConstruction = ({ onPasswordCorrect }: UnderConstructionProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (password === '2003DJv!@') {
        onPasswordCorrect();
        toast({
          title: "Access granted",
          description: "Welcome to Vellvii",
        });
      } else {
        toast({
          title: "Incorrect password",
          description: "Please try again",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">🚧</h1>
          <h2 className="text-4xl font-bold text-white mb-2">Under Construction</h2>
          <p className="text-white/80 text-lg">
            We're working hard to bring you something amazing
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Button 
                type="submit" 
                className="w-full bg-white text-primary hover:bg-white/90"
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'Enter Site'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-white/60 text-sm">
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;