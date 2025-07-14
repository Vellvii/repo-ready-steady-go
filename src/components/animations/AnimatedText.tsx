import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}
export const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.05
}: AnimatedTextProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const container = {
    hidden: {
      opacity: 0
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay + 0.04 * i
      }
    })
  };
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };
  return <motion.div ref={ref} style={{
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap"
  }} variants={container} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {text.split(" ").map((word, index) => <motion.span variants={child} style={{
      marginRight: "0.25rem"
    }} key={index} className="text-slate-50">
          {word}
        </motion.span>)}
    </motion.div>;
};