import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutTransitionProps {
  open: boolean;
  url: string | null;
  onDone?: () => void;
}

/**
 * Branded full-viewport transition shown for ~600ms before redirecting
 * the user (same tab) to the Shopify checkout URL. Intentional, premium
 * handoff with Vellvii branding and soft trust messaging.
 */
export const CheckoutTransition = ({ open, url, onDone }: CheckoutTransitionProps) => {
  useEffect(() => {
    if (!open || !url) return;
    const t = window.setTimeout(() => {
      window.location.href = url;
      onDone?.();
    }, 600);
    return () => window.clearTimeout(t);
  }, [open, url, onDone]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] surface-dark-rich flex flex-col items-center justify-center animate-in fade-in duration-200"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center max-w-md">
        <img
          src="/uploads/Vellvii-full-logo-transparent.png"
          alt="Vellvii"
          className="h-10 sm:h-12 w-auto opacity-90"
        />
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <p className="text-light-secondary font-montserrat text-sm sm:text-base leading-relaxed">
          Taking you to our secure Shopify checkout.
          <br />
          <span className="text-light-muted">Discreet packaging. The Art of &lsquo;O&rsquo;.</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutTransition;
