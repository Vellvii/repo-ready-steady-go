import { useRef } from "react";
import { motion } from "framer-motion";

const KickstarterHeroDownload = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1024;
    const H = 576;
    canvas.width = W;
    canvas.height = H;

    // 1. Draw hero background image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/uploads/ksv2-hero-products.jpg";
    await new Promise((res) => { img.onload = res; });

    const scale = Math.max(W / img.width, H / img.height);
    const sw = img.width * scale;
    const sh = img.height * scale;
    ctx.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);

    // 2. Bottom gradient (matching V2: from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent)
    const grad = ctx.createLinearGradient(0, H, 0, 0);
    grad.addColorStop(0, "rgba(10,10,10,1)");
    grad.addColorStop(0.35, "rgba(10,10,10,0.85)");
    grad.addColorStop(0.55, "rgba(10,10,10,0.6)");
    grad.addColorStop(1, "rgba(10,10,10,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 3. Side vignette (matching V2)
    const sideGrad = ctx.createLinearGradient(0, 0, W, 0);
    sideGrad.addColorStop(0, "rgba(10,10,10,0.4)");
    sideGrad.addColorStop(0.25, "rgba(10,10,10,0)");
    sideGrad.addColorStop(0.75, "rgba(10,10,10,0)");
    sideGrad.addColorStop(1, "rgba(10,10,10,0.4)");
    ctx.fillStyle = sideGrad;
    ctx.fillRect(0, 0, W, H);

    // 4. Gold accent line at top (matching V2 animated line)
    const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.25, "#c9a96e");
    lineGrad.addColorStop(0.45, "#b8607a");
    lineGrad.addColorStop(0.65, "#c9a96e");
    lineGrad.addColorStop(1, "transparent");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, 0, W, 3);

    // 5. "Coming to" label + line
    const leftPad = 50;
    const baseY = H - 200;

    // Small decorative line
    const accentGrad = ctx.createLinearGradient(leftPad, 0, leftPad + 50, 0);
    accentGrad.addColorStop(0, "transparent");
    accentGrad.addColorStop(1, "#c9a96e");
    ctx.fillStyle = accentGrad;
    ctx.fillRect(leftPad, baseY - 2, 50, 1);

    // "Coming to" text
    ctx.textAlign = "left";
    ctx.fillStyle = "#c9a96e";
    ctx.font = "bold 9px Arial, Helvetica, sans-serif";
    (ctx as any).letterSpacing = "5px";
    ctx.fillText("COMING TO KICKSTARTER", leftPad + 58, baseY);
    (ctx as any).letterSpacing = "0px";

    // 6. "Intimacy" — white bold
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px Georgia, 'Times New Roman', serif";
    ctx.fillText("Intimacy", leftPad, baseY + 70);

    // 7. "Redefined." — gold gradient (simulated with solid gold-rose)
    const textGrad = ctx.createLinearGradient(leftPad, baseY + 80, leftPad + 400, baseY + 140);
    textGrad.addColorStop(0, "#d4b896");
    textGrad.addColorStop(0.5, "#b8607a");
    textGrad.addColorStop(1, "#c9a96e");
    ctx.fillStyle = textGrad;
    ctx.font = "bold 72px Georgia, 'Times New Roman', serif";
    ctx.fillText("Redefined.", leftPad, baseY + 140);

    // 8. Subtitle
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "300 16px Arial, Helvetica, sans-serif";
    ctx.fillText("A new era in sexual wellness and luxury design.", leftPad, baseY + 175);

    // 9. Quote
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "italic 14px Georgia, 'Times New Roman', serif";
    ctx.fillText('"What a brilliant design"', leftPad, baseY + 200);

    // Download
    const link = document.createElement("a");
    link.download = "vellvii-kickstarter-hero-1024x576.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Kickstarter Hero Image</h1>
        <p className="text-white/40 text-sm">Preview below matches your /kickstarterV2 design — click to download.</p>
      </div>

      {/* Exact V2 hero replica as preview */}
      <div
        ref={heroRef}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10"
        style={{ aspectRatio: "1024/576" }}
      >
        {/* Background image */}
        <img
          src="/uploads/ksv2-hero-products.jpg"
          alt="Vellvii DOX collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Cinematic overlays — exact V2 match */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(40 70% 65%), hsl(350 60% 55%), hsl(40 70% 65%), transparent)",
          }}
        />

        {/* Content — matching V2 layout */}
        <div className="absolute inset-0 flex items-end pb-[10%] pl-[5%]">
          <div className="space-y-3">
            {/* Kickstarter badge */}
            <div className="flex items-center gap-3">
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #c9a96e)" }} />
              <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.5em] uppercase">Coming to</span>
              <img
                src="/uploads/kickstarter-logo.webp"
                alt="Kickstarter"
                className="h-4 w-auto rounded"
              />
            </div>

            {/* Headline */}
            <div>
              <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight font-serif">
                Intimacy
              </p>
              <p
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight font-serif"
                style={{
                  background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%), hsl(40 70% 65%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Redefined.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/65 font-light max-w-md">
              A new era in sexual wellness and luxury design.
            </p>
            <p className="text-xs text-white/35 italic font-serif">
              "What a brilliant design"
            </p>
          </div>
        </div>
      </div>

      <motion.button
        onClick={downloadImage}
        className="px-10 py-5 rounded-xl font-bold text-lg text-black"
        style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Download Hero Image (1024×576)
      </motion.button>

      <p className="text-white/25 text-xs text-center max-w-sm">
        Upload this to your Kickstarter pre-launch "Promotion" section as the hero image.
      </p>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default KickstarterHeroDownload;
