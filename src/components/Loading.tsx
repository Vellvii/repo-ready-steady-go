import { Card } from "@/components/ui/card";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading = ({ message = "Loading...", fullScreen = false }: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 relative">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-white/80 text-center">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-dark flex items-center justify-center z-[var(--z-modal)]">
        <Card className="glass-luxury p-8">
          {content}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {content}
    </div>
  );
};