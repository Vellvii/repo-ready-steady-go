import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, PackageCheck } from "lucide-react";

/**
 * Compact, premium trust row for cart contexts (CartDrawer + Cart page).
 * Quiet luxury: hairline icons, Montserrat caps, no badges.
 */
export const CartTrustSignals = () => {
  const items = [
    {
      icon: ShieldCheck,
      label: "Lifetime warranty",
      sub: "Registered within 7 days",
      to: "/warranty",
    },
    {
      icon: Sparkles,
      label: "Authentic materials",
      sub: "Hand-finished",
      to: null,
    },
    {
      icon: PackageCheck,
      label: "Discreet shipping",
      sub: "Unbranded packaging",
      to: "/terms-of-service#shipping-delivery",
    },
  ];

  return (
    <ul className="card-dark rounded-xl p-4 space-y-3 border border-white/5">
      {items.map(({ icon: Icon, label, sub, to }) => {
        const content = (
          <div className="flex items-start gap-3">
            <Icon
              className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
              strokeWidth={1.4}
            />
            <div className="min-w-0">
              <p className="font-montserrat text-[11px] uppercase tracking-[0.18em] text-light-primary leading-tight">
                {label}
              </p>
              <p className="font-montserrat text-[11px] text-light-muted mt-0.5">
                {sub}
              </p>
            </div>
          </div>
        );
        return (
          <li key={label}>
            {to ? (
              <Link
                to={to}
                className="block hover:opacity-80 transition-opacity"
              >
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CartTrustSignals;
