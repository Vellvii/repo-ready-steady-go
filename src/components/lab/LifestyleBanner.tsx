export const LifestyleBanner = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      <img
        src="/uploads/Lifestyle_img8.jpg"
        alt="Vellvii lifestyle"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-6 sm:left-12">
        <span className="font-montserrat text-sm tracking-[0.3em] text-primary/90">THE VELLVII DOX</span>
      </div>
    </section>
  );
};
