interface PosterMomentProps {
  eyebrow: string;
  headline: string;
  body: string;
  image: string;
  reverse?: boolean;
}

export const PosterMoment = ({ eyebrow, headline, body, image, reverse }: PosterMomentProps) => {
  return (
    <section className="flex min-h-screen w-full items-center bg-surface-dark px-6 py-24 sm:px-12">
      <div
        className={`mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className="md:[direction:ltr]">
          <span className="mb-3 block font-montserrat text-sm font-medium tracking-[0.3em] text-primary/90">
            {eyebrow}
          </span>
          <h2 className="mb-6 font-baskerville text-4xl text-white sm:text-5xl md:text-6xl">
            {headline}
          </h2>
          <p className="max-w-md font-montserrat text-white/70">{body}</p>
        </div>
        <div className="md:[direction:ltr]">
          <img
            src={image}
            alt={headline}
            className="w-full rounded-sm object-cover shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
};
