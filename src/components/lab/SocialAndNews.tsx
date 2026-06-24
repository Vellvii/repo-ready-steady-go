import { Link } from "react-router-dom";
import { socialChannels } from "@/data/socials";

const guides = [
  { title: "How the Vellvii DOX Docking System Works", href: "/guides/how-the-vellvii-dox-docking-system-works" },
  { title: "Discreet Storage for Intimate Wellness Products", href: "/guides/discreet-storage-for-intimate-wellness-products" },
];

export const SocialAndNews = () => {
  return (
    <section className="w-full bg-white px-6 py-20 sm:px-12">
      <h2 className="mb-8 text-center font-baskerville text-3xl text-black">Connect with Us</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
        {socialChannels.map(({ id, label, handle, href, blurb, Icon }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-sm border border-black/10 p-5 transition-colors hover:border-primary"
          >
            <Icon className="h-6 w-6 text-black/80 transition-colors group-hover:text-primary" />
            <div>
              <p className="font-montserrat text-sm font-semibold text-black">{label}</p>
              <p className="font-montserrat text-xs text-black/60">{handle}</p>
            </div>
            <p className="font-montserrat text-xs text-black/50">{blurb}</p>
          </a>
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
