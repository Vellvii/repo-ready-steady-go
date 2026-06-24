interface DesignFeatureProps {
  headline: string;
  body: string;
  mainImage: string;
  sideImages: string[];
  reverse?: boolean;
}

export const DesignFeature = ({ headline, body, mainImage, sideImages, reverse }: DesignFeatureProps) => {
  return (
    <section className="w-full bg-black px-6 py-20 sm:px-12">
      <div
        className={`mx-auto grid max-w-6xl gap-6 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="flex flex-col justify-center">
          <h3 className="mb-4 font-baskerville text-3xl text-white sm:text-4xl">{headline}</h3>
          <p className="max-w-md font-montserrat text-white/70">{body}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={mainImage} alt={headline} className="col-span-2 h-56 w-full rounded-sm object-cover" />
          {sideImages.map((src) => (
            <img key={src} src={src} alt="" className="h-32 w-full rounded-sm object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
};
