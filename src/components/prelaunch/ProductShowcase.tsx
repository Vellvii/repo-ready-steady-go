import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";

type MediaItem = {
  image?: string;
  video?: string;
  label: string;
  description: string;
};

type FeatureItem = {
  number: number;
  title: string;
  subtitle: string;
  tagline?: string;
  images: MediaItem[];
  subcategories?: Subcategory[];
};

type Subcategory = {
  title: string;
  description: string;
  thumbnails: string[];
};

const showcaseFeatures = [
  {
    number: 1,
    title: "Luxury Storage",
    subtitle: "Stores Beautifully",
    images: [
      {
        video: "/uploads/dox-animation.mp4",
        label: "Perfectly Organized. Discreetly Decadent.",
        description: "Custom compartments cradle your collection in quiet luxury - because every piece deserves a place of its own.",
      },
      {
        image: "/uploads/dox-white-lifestyle-2.jpg",
        label: "Unapologetically Beautiful.",
        description: "The Dox blends into any space with quiet confidence, a statement piece that turns your private passions into part of your décor.",
      },
      {
        image: "/uploads/dox-black-bookshelf.png",
        label: "Sleek. Seductive. Unforgettable.",
        description: "A flawless finish in soft rose-gold tones turns design into desire, refinement you can feel before you even open it.",
      },
    ],
    subcategories: [
      {
        title: "Biometric Fingerprint Lock",
        description: "One touch. One owner. Total control of your intimate collection.",
        thumbnails: [
          "/uploads/fingerprint-video.webm",
          "/uploads/Dox_fp_lock_video2.webm",
        ],
      },
      {
        title: "Intelligent Charging System",
        description: "Seamlessly charges your devices while keeping them beautifully organized.",
        thumbnails: [
          "/uploads/Red_Dox_charge_inside.png",
          "/uploads/Vellvii_description_sketches_open_ls.png",
          "/uploads/White_charge_outside.png",
        ],
      },
      {
        title: "Interchangeable Compartment",
        description: "Customizable storage that adapts to your unique collection.",
        thumbnails: [
          "/uploads/RedOpen1.png",
          "/uploads/BlackOpen2.png",
          "/uploads/Vellvii_description_sketches_open_ls-2.png",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Flagship Introduction - Conscious Innovation",
    subtitle: "The most innovative solution of the century.",
    tagline: "DDS - Dildo Docking Station",
    images: [
      {
        image: "/uploads/dds-suction-cup-purpose.png",
        label: "VELLVII DDS – THE DILDO DOCKING STATION",
        description: "The DDS is where form and function meet sensual innovation. What began as a bold idea, to elevate pleasure beyond the ordinary, became a sculptural masterpiece of modern design.",
      },
      {
        image: "/uploads/Black-Dildo-Close-2.png",
        label: "Dare to compare. We'll wait.",
        description: "No other creation comes close to the craftsmanship, precision, and presence of the DDS. This isn't competition, it's creation perfected.",
      },
      {
        image: "/uploads/Red-Dildo.png",
        label: "",
        description: "",
      },
      {
        image: "/uploads/dds-brand-message.png",
        label: "",
        description: "",
      },
      {
        image: "/uploads/DDS_Autocad_sketch_w_descriptions.png",
        label: "",
        description: "",
      },
    ],
  },
  {
    number: 3,
    title: "A Position of Power",
    subtitle: '"Designed to Hold More than Your Collection...Designed to Hold You"',
    images: [
      {
        image: "/uploads/BeigeDoxGVibeFrontRightClose.png",
        label: "EVOLVE COLLECTION - Beige Elegance",
        description: "Premium beige finish with rose-gold accents",
      },
      {
        image: "/uploads/RedPinkGVibe2.png",
        label: "EVOLVE COLLECTION - Red Luxury",
        description: "Bold red DOX with integrated charging",
      },
      {
        image: "/uploads/BlackPinkEvolve1.png",
        label: "EVOLVE COLLECTION - Black Sophistication",
        description: "Sleek black design with elegant contrast",
      },
      {
        image: "/uploads/BeigeRedPulseBackSide.png",
        label: "POSITION OF POWER - Pulse Detail",
        description: "Ergonomic design meets wireless charging",
      },
      {
        image: "/uploads/BlackPinkGVibe1.png",
        label: "EVOLVE COLLECTION - Complete System",
        description: "The ultimate luxury storage and charging solution",
      },
    ],
  },
];

const SubcategoryCarousel = ({
  subcategory,
  index,
}: {
  subcategory: Subcategory;
  index: number;
}) => {
  return (
    <ScrollReveal delay={0.1 * index}>
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-playfair mb-2">
            {subcategory.title}
          </h3>
          <p className="text-lg text-white/60">{subcategory.description}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CrossfadeCarousel
            items={subcategory.thumbnails}
            enableLightbox={true}
            altPrefix={subcategory.title}
            transitionDuration={2000}
            imageDisplayTime={6000}
            videoDisplayTime={10000}
          />
        </div>
      </div>
    </ScrollReveal>
  );
};

const FeatureCarousel = ({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) => {
  const imageUrls = feature.images.map((item) => item.image || item.video || "");

  return (
    <ScrollReveal delay={0.1 * index}>
      <div className="mb-24">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
            <span className="text-primary font-semibold">
              Feature {feature.number}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-playfair mb-4">
            {feature.title}
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto">
            {feature.subtitle}
          </p>
          {feature.tagline && (
            <p className="text-lg text-primary/80 mt-2 font-semibold">
              {feature.tagline}
            </p>
          )}
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <CrossfadeCarousel
            items={imageUrls}
            aspectRatio="aspect-video"
            enableLightbox={true}
            altPrefix={feature.title}
            transitionDuration={2000}
            imageDisplayTime={6000}
            videoDisplayTime={10000}
          />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 px-4">
          {feature.images.filter(item => item.label && item.description).map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl glass-dark border border-white/10"
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                {item.label}
              </h4>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>

        {feature.subcategories && (
          <div className="max-w-6xl mx-auto space-y-8 px-4">
            {feature.subcategories.map((subcategory, subIdx) => (
              <SubcategoryCarousel
                key={subIdx}
                subcategory={subcategory}
                index={subIdx}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export const ProductShowcase = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white font-playfair mb-6">
              Product Showcase
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the elegance and innovation of Vellvii's premium collection
            </p>
          </div>
        </ScrollReveal>

        {showcaseFeatures.map((feature, index) => (
          <FeatureCarousel key={feature.number} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};
