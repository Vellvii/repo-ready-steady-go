import { useEffect, useRef } from "react";
import config from "@/lib/logoGlowConfig";

interface LogoGlowCanvasProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** starting angle offset for idle orbit */
  idleOffset?: number;
}

const LogoGlowCanvas = ({ src, className, style, idleOffset = 0 }: LogoGlowCanvasProps) => {
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
      let width = 0;
      let height = 0;
      const maskCanvas = document.createElement("canvas");
      const maskCtx = maskCanvas.getContext("2d")!;
      const glowCanvas = document.createElement("canvas");
      const glowCtx = glowCanvas.getContext("2d")!;

      const updateDimensions = () => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
        maskCanvas.width = width;
        maskCanvas.height = height;
        glowCanvas.width = width;
        glowCanvas.height = height;
        maskCtx.clearRect(0, 0, width, height);
        maskCtx.drawImage(img, 0, 0, width, height);
      };

      updateDimensions();

      // compute bounding box for orbit
      const data = maskCtx.getImageData(0, 0, width, height).data;
      let minX = width,
        minY = height,
        maxX = 0,
        maxY = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4 + 3] > 0) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      let center = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
      let orbitRadius = 0.3 * Math.min(maxX - minX, maxY - minY) / 2;

      const particle = {
        x: center.x + orbitRadius * Math.cos(idleOffset),
        y: center.y + orbitRadius * Math.sin(idleOffset),
        vx: 0,
        vy: 0,
      };
      let pointer = { x: particle.x, y: particle.y };
      let pointerActive = false;
      let lastPointer = 0;
      let angle = idleOffset;

      const isInside = (x: number, y: number) => {
        const d = maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        return d[3] > 0;
      };

      const trackPointer = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer = {
          x: ((e.clientX - rect.left) / rect.width) * width,
          y: ((e.clientY - rect.top) / rect.height) * height,
        };
        pointerActive = true;
        lastPointer = performance.now();
      };

      const leavePointer = () => {
        pointerActive = false;
      };

      window.addEventListener("pointermove", trackPointer);
      window.addEventListener("pointerdown", trackPointer);
      window.addEventListener("pointerleave", leavePointer);
      window.addEventListener("resize", updateDimensions);

      const drawGlow = () => {
        glowCtx.clearRect(0, 0, width, height);
        const radius = 60 * config.intensity;
        const gradient = glowCtx.createRadialGradient(
          particle.x,
          particle.y,
          5,
          particle.x,
          particle.y,
          radius
        );
        gradient.addColorStop(0, "rgba(255, 221, 100, 0.9)");
        gradient.addColorStop(1, "rgba(255, 221, 100, 0)");
        glowCtx.fillStyle = gradient;
        glowCtx.beginPath();
        glowCtx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        glowCtx.fill();

        glowCtx.globalCompositeOperation = "destination-in";
        glowCtx.drawImage(maskCanvas, 0, 0);
        glowCtx.globalCompositeOperation = "source-over";

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(glowCanvas, 0, 0);
        ctx.globalAlpha = 0.3 * config.intensity;
        ctx.drawImage(glowCanvas, 0, 0);
        ctx.restore();
      };

      let lastTime = performance.now();
      const animateGlow = () => {
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        const magnetStrength = 5;
        const friction = 0.9;

        if (!pointerActive && now - lastPointer > 2000) {
          angle += dt;
          pointer.x = center.x + orbitRadius * Math.cos(angle);
          pointer.y = center.y + orbitRadius * Math.sin(angle);
        }

        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy) || 1;
        const force = (magnetStrength * dt) / distance;

        particle.vx += dx * force;
        particle.vy += dy * force;

        particle.vx *= friction;
        particle.vy *= friction;

        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        if (isInside(newX, newY)) {
          particle.x = newX;
          particle.y = newY;
        } else {
          let t = 1;
          for (let i = 0; i < 8; i++) {
            const ix = particle.x + particle.vx * t;
            const iy = particle.y + particle.vy * t;
            if (isInside(ix, iy)) {
              particle.x = ix;
              particle.y = iy;
              break;
            }
            t -= 1 / 8;
          }
          particle.vx = 0;
          particle.vy = 0;
        }

        drawGlow();
        frameId = requestAnimationFrame(animateGlow);
      };

      animateGlow();

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", trackPointer);
        window.removeEventListener("pointerdown", trackPointer);
        window.removeEventListener("pointerleave", leavePointer);
        window.removeEventListener("resize", updateDimensions);
      };
    };
  }, [src, idleOffset]);

  return <canvas ref={canvasRef} className={className} style={style} />;
};

export default LogoGlowCanvas;
