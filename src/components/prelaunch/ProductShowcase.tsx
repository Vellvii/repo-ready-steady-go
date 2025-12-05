import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
import { ReserveButtons } from "./ReserveButtons";
import doxOpenToys from "@/assets/dox-open-toys.png";
import doxCreamShelf from "@/assets/dox-cream-shelf.png";
import doxBedroomBookshelf from "@/assets/dox-bedroom-bookshelf.png";

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
  aspectRatio?: string;
};

type Subcategory = {
  title: string;
  description: string;
  thumbnails: string[];
  aspectRatio?: string;
};

// Feature 1 data structure for vertical layout
const feature1Data = {
  number: 1,
  title: "Luxury Storage",
  subtitle: "Stores Beautifully",
  sections: [
    {
      type: "image" as const,
      src: doxOpenToys,
      alt: "Dox open with toys",
    },
    {
      type: "text" as const,
      label: "Perfectly Organized. Discreetly Decadent.",
      description: "Custom compartments cradle your collection in quiet luxury - because every piece deserves a place of its own.",
    },
    {
      type: "image" as const,
      src: doxCreamShelf,
      alt: "Dox cream on shelf",
    },
    {
      type: "text" as const,
      label: "Unapologetically Beautiful.",
      description: "The Dox blends into any space with quiet confidence, a statement piece that turns your private passions into part of your décor.",
    },
    {
      type: "video" as const,
      src: "/uploads/dox-animation.mp4",
    },
    {
      type: "text" as const,
      label: "Sleek. Seductive. Unforgettable.",
      description: "A flawless finish in soft rose-gold tones turns design into desire, refinement you can feel before you even open it.",
    },
    {
      type: "image" as const,
      src: doxBedroomBookshelf,
      alt: "Dox on bedroom bookshelf",
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
      aspectRatio: "aspect-video",
    },
    {
      title: "Interchangeable Compartment",
      description: "Customizable storage that adapts to your unique collection.",
      thumbnails: [
        "/uploads/RedOpen1.png",
        "/uploads/BlackOpen2.png",
        "/uploads/Vellvii_description_sketches_open_ls-2.png",
      ],
      aspectRatio: "aspect-video",
    },
  ],
};

const showcaseFeatures = [
  {
    number: 2,
    title: "Flagship Introduction - Conscious Innovation",
    subtitle: "The most innovative solution of the century.",
    tagline: "DDS - Dildo Docking Station",
    aspectRatio: "aspect-video",
    images: [
      {
        image: "/uploads/Vellvii_description_sketches_separated_VDS_DDS_blk_img_1.png",
        label: "VELLVII DDS – THE DILDO DOCKING STATION",
        description: "The DDS is where form and function meet sensual innovation. What began as a bold idea, to elevate pleasure beyond the ordinary, became a sculptural masterpiece of modern design.",
      },
      {
        video: "/uploads/dds-animation.mp4",
        label: "",
        description: "",
      },
      {
        image: "/uploads/Black-Dildo-Close-2.png",
        label: "DARE TO COMPARE. WE'LL WAIT.",
        description: "No other creation comes close to the craftsmanship, precision, and presence of the DDS. This isn't competition, it's creation perfected.",
      },
      {
        image: "/uploads/BeigeDDSPieces-2.png",
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
    aspectRatio: "aspect-video",
    images: [
      {
        video: "/uploads/VDS_video.webm",
        label: "VDS : VELLVII DOCKING STATION",
        description: "Everyone deserves to own something beautiful, personal, and unapologetically theirs. The Dox isn't about hiding, it's about honoring. Crafted to elevate the most intimate parts of life, without shame, without guilt - Only Art.",
      },
      {
        image: "/uploads/VDS_Autocad_sketch_w_descriptions.png",
        label: "VELLVII COLLECTION",
        description: "With intense and deliberate focus on our mantra — \"The Art of 'O'.\" Every curve, every detail, every innovation is a study in sensual design. Crafted not just to perform, but to move you - emotionally, physically, beautifully. Vellvii doesn't chase pleasure. We sculpt it. We perfect it. We turn it into art.",
      },
    ],
  },
  {
    number: 4,
    title: "VELLVII COLLECTION",
    subtitle: "The Art of \"O\"",
    images: [],
    subcategories: [
      {
        title: "PULSE",
        description: "Precision-engineered pleasure that redefines intimacy.",
        thumbnails: [
          "/uploads/Pulse_description_sketches1.png",
          "/uploads/PulsePoBCloseBL-2.png",
          "/uploads/BlackRedPulseBack.png",
          "/uploads/BlackRedPulseSide.png",
          "/uploads/BlackRedPulseSideUp1.png",
        ],
        aspectRatio: "aspect-video",
      },
      {
        title: "G-VIBE",
        description: "Dual stimulation perfected through innovative design.",
        thumbnails: [
          "/uploads/RedGVibeSide.png",
          "/uploads/RedPinkGVibe2_1.png",
          "/uploads/Pulse_G-vibe_on_pedestal.jpg",
          "/uploads/BlackPinkGVibe1_1.png",
        ],
      },
      {
        title: "EVOLVE",
        description: "The evolution of luxury, crafted for your collection.",
        thumbnails: [
          "/uploads/PinkEvolveSide.png",
          "/uploads/PinkEvolve2PFrontSide.png",
          "/uploads/RedEvolve2PSide.png",
          "/uploads/BlackPinkEvolveBackClose.png",
          "/uploads/RedPinkEvolve1.png",
          "/uploads/BlackPinkEvolve1_1.png",
        ],
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
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-baskerville mb-4 tracking-tight">
            {subcategory.title}
          </h3>
          <p className="text-xl text-white/70 font-light leading-relaxed">{subcategory.description}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10">
            <CrossfadeCarousel
              items={subcategory.thumbnails}
              aspectRatio={subcategory.aspectRatio || "aspect-[4/3]"}
              enableLightbox={true}
              showControls={true}
              showDots={true}
              altPrefix={subcategory.title}
              imageDisplayTime={5000}
              videoDisplayTime={8000}
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

// Feature 1 Vertical Layout Component
const Feature1VerticalLayout = () => {
  return (
    <ScrollReveal>
      <div className="mb-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass-accent backdrop-blur-2xl mb-8">
            <span className="text-primary font-bold text-lg tracking-wide">
              Feature {feature1Data.number}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-baskerville mb-6 tracking-tight leading-[1.1]">
            {feature1Data.title}
          </h2>
          <p className="text-2xl sm:text-3xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
            {feature1Data.subtitle}
          </p>
        </div>

        {/* Vertical layout sections */}
        <div className="max-w-6xl mx-auto space-y-12 px-4">
          {feature1Data.sections.map((section, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx}>
              {section.type === "image" && (
                <div className="rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10">
                  <img
                    src={section.src}
                    alt={section.alt}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              {section.type === "video" && (
                <div className="rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10">
                  <video
                    src={section.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  />
                </div>
              )}
              {section.type === "text" && (
                <div className="max-w-3xl mx-auto text-center">
                  <div className="group p-10 rounded-2xl glass-dark border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-card">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 font-baskerville">
                      {section.label}
                    </h4>
                    <p className="text-lg text-white/70 leading-relaxed font-light">
                      {section.description}
                    </p>
                  </div>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Subcategories */}
        {feature1Data.subcategories && (
          <div className="max-w-6xl mx-auto space-y-12 px-4 mt-20">
            {feature1Data.subcategories.map((subcategory, subIdx) => (
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
      <div className="mb-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass-accent backdrop-blur-2xl mb-8">
            <span className="text-primary font-bold text-lg tracking-wide">
              Feature {feature.number}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-baskerville mb-6 tracking-tight leading-[1.1]">
            {feature.title}
          </h2>
          <p className="text-2xl sm:text-3xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
            {feature.subtitle}
          </p>
          {feature.tagline && (
            <p className="text-xl text-primary/90 mt-4 font-semibold tracking-wide">
              {feature.tagline}
            </p>
          )}
        </div>

        {imageUrls.length > 0 && (
          <>
            <div className="max-w-6xl mx-auto mb-16">
              <div className="rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10">
                <CrossfadeCarousel
                  items={imageUrls}
                  aspectRatio={feature.aspectRatio || "aspect-[4/3]"}
                  enableLightbox={true}
                  showControls={true}
                  showDots={true}
                  altPrefix={feature.title}
                  imageDisplayTime={5000}
                  videoDisplayTime={8000}
                />
              </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 px-4">
              {feature.images.filter(item => item.label && item.description).map((item, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl glass-dark border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-card"
                >
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.label}
                  </h4>
                  <p className="text-base text-white/70 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {feature.subcategories && (
          <div className="max-w-6xl mx-auto space-y-12 px-4">
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
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-28">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white font-baskerville mb-8 tracking-tight leading-[1.05]">
              Product Showcase
            </h2>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
              Experience the elegance and innovation of <span className="font-semibold text-white/80">Vellvii's premium collection</span>
            </p>
          </div>
        </ScrollReveal>

        {/* Feature 1 - Vertical Layout */}
        <Feature1VerticalLayout />
        
        {/* Reserve buttons before Feature 2 */}
        <ReserveButtons />
        
        {showcaseFeatures.map((feature, index) => (
          <div key={feature.number}>
            {/* Reserve buttons before Features 3 and 4 */}
            {feature.number >= 3 && <ReserveButtons />}
            <FeatureCarousel feature={feature} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};
