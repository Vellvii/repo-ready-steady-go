import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "vellvii.shippingBar.dismissed";

/**
 * Thin site-wide bar communicating complimentary worldwide shipping.
 * Dismissible per session, reappears next visit. Quiet luxury styling.
 */
export const ShippingBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      setVisible(!dismissed);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full bg-black/85 border-b border-primary/15 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-7 flex items-center justify-center relative">
        <p className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-light-secondary text-center">
          Complimentary worldwide{" "}
          <Link
            to="/terms-of-service#shipping-delivery"
            className="text-primary underline-offset-4 hover:underline"
          >
            shipping
          </Link>{" "}
          - included on every order
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* no-op */
            }
            setVisible(false);
          }}
          aria-label="Dismiss shipping notice"
          className="absolute right-2 sm:right-4 inline-flex items-center justify-center w-5 h-5 text-light-muted hover:text-light-primary transition-colors"
        >
          <X className="w-3 h-3" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default ShippingBar;
