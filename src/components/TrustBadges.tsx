import { Truck, Package, Shield, BadgeCheck } from "lucide-react";

const badges = [
  { icon: Truck, label: "Free Shipping", sublabel: "On all orders" },
  { icon: Package, label: "Discreet Packaging", sublabel: "Plain exterior" },
  { icon: Shield, label: "Lifetime Warranty", sublabel: "Registration required" },
  { icon: BadgeCheck, label: "Authorized Retailer", sublabel: "Direct from Vellvii" },
];

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
      {badges.map((badge) => (
        <div key={badge.label} className="trust-badge flex-col sm:flex-row text-center sm:text-left p-3 sm:p-4">
          <div className="trust-badge-icon w-8 h-8 sm:w-10 sm:h-10 mx-auto sm:mx-0 mb-2 sm:mb-0">
            <badge.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-light-primary text-xs sm:text-sm font-semibold font-montserrat leading-tight">
              {badge.label}
            </p>
            <p className="text-light-muted text-[10px] sm:text-xs font-montserrat hidden sm:block">
              {badge.sublabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
