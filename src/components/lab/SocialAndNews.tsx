import { Link } from "react-router-dom";

const socialCards = [
  { image: "/uploads/Dox_white_lifestyle1.jpg", caption: "@vellvii" },
  { image: "/uploads/lux-bag-lifestyle-2.jpg", caption: "@vellvii" },
  { image: "/uploads/dox-white-lifestyle-2.jpg", caption: "@vellvii" },
  { image: "/uploads/lux-bag-lifestyle-3.jpg", caption: "@vellvii" },
];

const guides = [
  { title: "How the Vellvii DOX Docking System Works", href: "/guides/how-the-vellvii-dox-docking-system-works" },
  { title: "Discreet Storage for Intimate Wellness Products", href: "/guides/discreet-storage-for-intimate-wellness-products" },
];

export const SocialAndNews = () => {
  return (
    <section className="w-full bg-white px-6 py-20 sm:px-12">
      <h2 className="mb-8 text-center font-baskerville text-3xl text-black">Connect with Us</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
        {socialCards.map((card) => (
          <div key={card.image} className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <img src={card.image} alt={card.caption} className="h-full w-full object-cover" />
            <span className="absolute bottom-2 left-2 font-montserrat text-xs font-medium text-white">
              {card.caption}
            </span>
          </div>
        ))}
      </div>

      <h2 className="mb-8 mt-20 text-center font-baskerville text-3xl text-black">Guides</h2>
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            to={guide.href}
            className="border-b border-black/10 pb-4 font-montserrat text-lg text-black/80 transition-colors hover:text-primary"
          >
            {guide.title}
          </Link>
        ))}
      </div>
    </section>
  );
};
