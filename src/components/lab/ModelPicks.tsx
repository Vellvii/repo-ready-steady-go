import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";

const picks = [
  { name: "DOX", handle: "vellvii-dox", href: "/products/vellvii-dox", fallbackImage: "/uploads/Dox_white_lifestyle1.jpg", fallbackPrice: "From $899" },
  { name: "LUX", handle: "vellvii-lux", href: "/products/vellvii-lux", fallbackImage: "/uploads/lux-bag-lifestyle.jpg", fallbackPrice: "From $349" },
];

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode, minimumFractionDigits: 0 }).format(
    Number(amount),
  );

const ModelPickCard = ({
  name,
  handle,
  href,
  fallbackImage,
  fallbackPrice,
  delay,
}: {
  name: string;
  handle: string;
  href: string;
  fallbackImage: string;
  fallbackPrice: string;
  delay: number;
}) => {
  const { data: product } = useShopifyProduct(handle);
  const image = product?.node.images.edges[0]?.node.url ?? fallbackImage;
  const minPrice = product?.node.priceRange.minVariantPrice;
  const price = minPrice ? `From ${formatPrice(minPrice.amount, minPrice.currencyCode)}` : fallbackPrice;
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      <Link
        to={href}
        className="group relative flex flex-col justify-between overflow-hidden border-black/5 px-8 py-10 sm:border-r last:border-r-0"
      >
        <div>
          <h3 className="font-baskerville text-3xl text-black">{name}</h3>
          <p className="mt-1 font-montserrat text-sm text-black/60">{price}</p>
          <span className="mt-2 inline-block font-montserrat text-sm font-medium text-primary">
            Discover More →
          </span>
        </div>
        <img
          src={image}
          alt={name}
          className="mt-6 h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
    </motion.div>
  );
};

export const ModelPicks = () => {
  return (
    <section className="grid w-full grid-cols-1 bg-[#f4ede4] sm:grid-cols-2">
      {picks.map((pick, i) => (
        <ModelPickCard key={pick.name} {...pick} delay={i * 0.12} />
      ))}
    </section>
  );
};
