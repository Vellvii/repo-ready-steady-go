import { Link } from "react-router-dom";

const picks = [
  {
    name: "DOX",
    price: "From $899",
    href: "/products/vellvii-dox",
    image: "/uploads/Dox2.jpg",
  },
  {
    name: "LUX",
    price: "From $349",
    href: "/products/vellvii-lux",
    image: "/uploads/lux-bag-lifestyle.jpg",
  },
];

export const ModelPicks = () => {
  return (
    <section className="grid w-full grid-cols-1 bg-[#f4ede4] sm:grid-cols-2">
      {picks.map((pick) => (
        <Link
          key={pick.name}
          to={pick.href}
          className="group relative flex flex-col justify-between overflow-hidden border-black/5 px-8 py-10 sm:border-r last:border-r-0"
        >
          <div>
            <h3 className="font-baskerville text-3xl text-black">{pick.name}</h3>
            <p className="mt-1 font-montserrat text-sm text-black/60">{pick.price}</p>
            <span className="mt-2 inline-block font-montserrat text-sm font-medium text-primary">
              Discover More →
            </span>
          </div>
          <img
            src={pick.image}
            alt={pick.name}
            className="mt-6 h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      ))}
    </section>
  );
};
