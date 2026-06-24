interface Panel {
  label: string;
  image: string;
  href: string;
}

const panels: Panel[] = [
  { label: "Biometric Security", image: "/uploads/dox-interior-labeled.jpg", href: "/guides/biometric-lock-box-for-sex-toys" },
  { label: "Find a Retailer", image: "/uploads/dox-black-bookshelf.png", href: "/contact" },
];

export const SplitBanner = () => {
  return (
    <section className="grid w-full grid-cols-1 sm:grid-cols-2">
      {panels.map((panel) => (
        <a
          key={panel.label}
          href={panel.href}
          className="group relative flex h-40 items-center justify-between overflow-hidden bg-black px-8"
        >
          <img
            src={panel.image}
            alt={panel.label}
            className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
          />
          <span className="relative z-10 font-baskerville text-2xl text-white">{panel.label}</span>
          <span className="relative z-10 font-montserrat text-primary">→</span>
        </a>
      ))}
    </section>
  );
};
