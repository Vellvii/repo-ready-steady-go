import { useEffect, useRef } from "react";
import config from "@/lib/logoGlowConfig";

interface LogoGlowCanvasProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

const LogoGlowCanvas = ({ src, width, height, className }: LogoGlowCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    let frameId: number;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d")!;
      maskCtx.drawImage(img, 0, 0, width, height);

      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = width;
      glowCanvas.height = height;
      const glowCtx = glowCanvas.getContext("2d")!;

      const particle = { x: width / 2, y: height / 2 };
      let target = { x: width / 2, y: height / 2 };
      let pointerActive = false;

      const isInside = (x: number, y: number) => {
        const data = maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        return data[3] > 0;
      };

      const randomPoint = () => {
        let x = 0;
        let y = 0;
        do {
          x = Math.random() * width;
          y = Math.random() * height;
        } while (!isInside(x, y));
        return { x, y };
      };

      let autoTarget = randomPoint();
      let lastPointer = 0;

      const handleMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * width;
        const y = ((e.clientY - rect.top) / rect.height) * height;
        target = { x, y };
        pointerActive = true;
        lastPointer = performance.now();
      };

      const handleLeave = () => {
        pointerActive = false;
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerdown", handleMove);
      window.addEventListener("pointerleave", handleLeave);

      const drawGlow = () => {
        const intensity = config.intensity;
        const baseSpeed = pointerActive ? 0.06 : 0.02;
        const speed = baseSpeed * config.speed;

        if (!pointerActive && performance.now() - lastPointer > 2000) {
          if (Math.hypot(particle.x - autoTarget.x, particle.y - autoTarget.y) < 10) {
            autoTarget = randomPoint();
          }
          target = autoTarget;
        }

        let nextX = particle.x + (target.x - particle.x) * speed;
        let nextY = particle.y + (target.y - particle.y) * speed;
        // pull back if the next position leaves the mask
        if (!isInside(nextX, nextY)) {
          let t = 0.5;
          while (t > 0.01) {
            const testX = particle.x + (nextX - particle.x) * t;
            const testY = particle.y + (nextY - particle.y) * t;
            if (isInside(testX, testY)) {
              nextX = testX;
              nextY = testY;
              break;
            }
            t /= 2;
          }
        }
        particle.x = nextX;
        particle.y = nextY;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        glowCtx.clearRect(0, 0, width, height);
        const radius = 60 * intensity;
        const gradient = glowCtx.createRadialGradient(
          particle.x,
          particle.y,
          5,
          particle.x,
          particle.y,
          radius
        );
        gradient.addColorStop(0, `rgba(255, 221, 100, 0.9)`);
        gradient.addColorStop(1, "rgba(255, 221, 100, 0)");
        glowCtx.fillStyle = gradient;
        glowCtx.beginPath();
        glowCtx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        glowCtx.fill();

        glowCtx.globalCompositeOperation = "destination-in";
        glowCtx.drawImage(maskCanvas, 0, 0);
        glowCtx.globalCompositeOperation = "source-over";

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(glowCanvas, 0, 0);
        ctx.globalAlpha = 0.3 * intensity;
        ctx.drawImage(glowCanvas, 0, 0);
        ctx.restore();

        frameId = requestAnimationFrame(drawGlow);
      };

      drawGlow();

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerdown", handleMove);
        window.removeEventListener("pointerleave", handleLeave);
      };
    };
  }, [src, width, height]);

  return <canvas ref={canvasRef} className={className} style={{ width, height }} />;
};

export default LogoGlowCanvas;
