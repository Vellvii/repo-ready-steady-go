import { useRef } from "react";

const KickstarterHeroDownload = () => {
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

    // Load hero image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/uploads/ksv2-hero-products.jpg";
    await new Promise((res) => { img.onload = res; });

    // Draw image covering canvas
    const scale = Math.max(W / img.width, H / img.height);
    const sw = img.width * scale;
    const sh = img.height * scale;
    ctx.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);

    // Bottom gradient overlay
    const grad = ctx.createLinearGradient(0, H * 0.35, 0, H);
    grad.addColorStop(0, "rgba(10,10,10,0)");
    grad.addColorStop(0.5, "rgba(10,10,10,0.7)");
    grad.addColorStop(1, "rgba(10,10,10,0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Side vignette
    const sideGrad = ctx.createLinearGradient(0, 0, W, 0);
    sideGrad.addColorStop(0, "rgba(10,10,10,0.4)");
    sideGrad.addColorStop(0.3, "rgba(10,10,10,0)");
    sideGrad.addColorStop(0.7, "rgba(10,10,10,0)");
    sideGrad.addColorStop(1, "rgba(10,10,10,0.4)");
    ctx.fillStyle = sideGrad;
    ctx.fillRect(0, 0, W, H);

    // Gold accent line at top
    const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.3, "#c9a96e");
    lineGrad.addColorStop(0.5, "#b8607a");
    lineGrad.addColorStop(0.7, "#c9a96e");
    lineGrad.addColorStop(1, "transparent");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, 0, W, 3);

    // "Intimacy" text
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px Georgia, 'Times New Roman', serif";
    ctx.fillText("Intimacy", 60, H - 170);

    // "Redefined." gradient text (simulate with gold)
    ctx.fillStyle = "#c9a96e";
    ctx.font = "bold 64px Georgia, 'Times New Roman', serif";
    ctx.fillText("Redefined.", 60, H - 105);

    // Subtitle
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "300 18px Arial, Helvetica, sans-serif";
    ctx.fillText("A new era in sexual wellness and luxury design.", 60, H - 65);

    // Quote
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "italic 15px Georgia, 'Times New Roman', serif";
    ctx.fillText('"What a brilliant design"', 60, H - 35);

    // Vellvii logo text (top-right corner)
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "bold 14px Arial, Helvetica, sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText("VELLVII", W - 40, 35);

    // Download
    const link = document.createElement("a");
    link.download = "vellvii-kickstarter-hero-1024x576.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-bold text-white">Kickstarter Hero Image Generator</h1>
      <p className="text-white/50 max-w-md text-center">
        Click the button below to generate and download a 1024×576 hero image using your actual product photo with branding overlay.
      </p>

      {/* Preview */}
      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10">
        <img
          src="/uploads/ksv2-hero-products.jpg"
          alt="Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute bottom-8 left-8 space-y-2">
          <p className="text-white font-bold text-4xl font-serif">Intimacy</p>
          <p className="text-[#c9a96e] font-bold text-4xl font-serif">Redefined.</p>
          <p className="text-white/70 text-sm">A new era in sexual wellness and luxury design.</p>
          <p className="text-white/40 text-xs italic font-serif">"What a brilliant design"</p>
        </div>
      </div>

      <button
        onClick={downloadImage}
        className="px-8 py-4 rounded-xl font-bold text-lg text-black"
        style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
      >
        Download Hero Image (1024×576)
      </button>

      <canvas ref={canvasRef} className="hidden" />

      <p className="text-white/30 text-xs max-w-md text-center">
        Recommended: Upload this as your Kickstarter pre-launch hero image. Add your title & subtitle in Kickstarter's editor.
      </p>
    </div>
  );
};

export default KickstarterHeroDownload;
