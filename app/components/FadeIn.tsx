import { motion, useReducedMotion } from "motion/react";

const OFFSET = 20;

const directionOffsets = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
  none: {},
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
  className,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const hidden = {
    opacity: 0,
    ...(shouldReduceMotion ? {} : directionOffsets[direction as keyof typeof directionOffsets]),
  };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
};