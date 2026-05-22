import kickstarterLogo from "@/assets/logos/kickstarter.png";
import prelaunchLogo from "@/assets/logos/prelaunch.svg";
import gadgetflowLogo from "@/assets/logos/gadgetflow.png";

export interface PresenceEntry {
  id: string;
  label: string;
  href: string;
  blurb: string;
  logo: string;
}

export const presenceSurfaces: PresenceEntry[] = [
  {
    id: "prelaunch",
    label: "Prelaunch.com",
    href: "https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions",
    blurb: "Official Vellvii DOX prelaunch listing - reservations, updates and discussion.",
    logo: prelaunchLogo,
  },
  {
    id: "kickstarter",
    label: "Kickstarter",
    href: "https://www.kickstarter.com/projects/vellvii/vellvii-dox-a-premium-luxury-vault-for-intimacy-and-storage",
    blurb: "Our original campaign page - kept live for provenance and press references.",
    logo: kickstarterLogo,
  },
  {
    id: "gadgetflow",
    label: "Gadget Flow",
    href: "https://thegadgetflow.com/blog/vellvii-dox-review-luxury-docking-and-storage-system/",
    blurb: "Vellvii DOX featured on Gadget Flow - product overview and review.",
    logo: gadgetflowLogo,
  },
];
