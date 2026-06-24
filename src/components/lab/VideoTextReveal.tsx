// Placeholder reveal video — swap for the real DOX open/unlock footage when ready.
const REVEAL_VIDEO = "/uploads/dox-open-animation.mp4";

export const VideoTextReveal = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-black">
      <svg viewBox="0 0 1200 400" className="h-full w-full max-w-6xl">
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-baskerville"
              fontSize="190"
              fill="white"
            >
              SEALED.
            </text>
          </mask>
        </defs>
        <foreignObject width="100%" height="100%" mask="url(#text-mask)">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={REVEAL_VIDEO} type="video/mp4" />
          </video>
        </foreignObject>
      </svg>
    </section>
  );
};
