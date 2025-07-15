import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  maxOffset?: number;
  as?: 'button' | 'div';
}

export const MagneticButton = ({
  children,
  className = '',
  onClick,
  strength = 0.4,
  maxOffset = 15,
  as = 'button'
}: MagneticButtonProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const element = as === 'div' ? divRef.current : buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const offsetX = Math.max(Math.min(distanceX * strength, maxOffset), -maxOffset);
    const offsetY = Math.max(Math.min(distanceY * strength, maxOffset), -maxOffset);

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'div' ? motion.div : motion.button;
  const ref = as === 'div' ? divRef : buttonRef;

  return (
    <Component
      ref={ref as any}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </Component>
  );
};