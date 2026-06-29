import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface DesignFeatureProps {
  headline: string;
  body: string;
  mainImage: string;
  sideImages: string[];
  reverse?: boolean;
}

export const DesignFeature = ({ headline, body, mainImage, sideImages, reverse }: DesignFeatureProps) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="w-full bg-black px-6 py-20 sm:px-12">
      <div className={`mx-auto grid max-w-6xl gap-6 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h3 className="mb-4 font-baskerville text-3xl text-white sm:text-4xl">{headline}</h3>
          <p className="max-w-md font-montserrat text-white/70">{body}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-2 gap-3"
        >
          <img src={mainImage} alt={headline} className="col-span-2 h-56 w-full rounded-sm object-cover" />
          {sideImages.map((src) => (
            <img key={src} src={src} alt="" className="h-32 w-full rounded-sm object-cover" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
