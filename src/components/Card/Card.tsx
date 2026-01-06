import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import React, { useRef } from "react";
import { useParakit } from "../../context/ParakitContext";
import { useSound } from "../../hooks/useSound";
import type { ComponentSize, SoundName } from "../../types";
import { cn } from "../../utils/classNames";
import styles from "./Card.module.css";

type CardProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  size?: ComponentSize;
  floating?: boolean;
  tilt?: boolean;
  draggable?: boolean;
  sound?: SoundName | "none";
};

export function Card({
  children,
  size = "md",
  floating = false,
  tilt = true,
  draggable = false,
  sound = "none",
  className,
  style,
  ...props
}: CardProps) {
  const { physics, reducedMotion } = useParakit();
  const { play } = useSound(sound === "none" ? "pop" : sound);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config from provider
  const springConfig = {
    stiffness: physics.stiffness,
    damping: physics.damping,
    mass: physics.mass,
  };

  // Transform mouse position to rotation values
  // Input: -0.5 to 0.5 (normalized mouse position)
  // Output: -10 to 10 degrees rotation
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || reducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    // Update CSS variables for glow effect
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${percentX}%`);
    card.style.setProperty("--mouse-y", `${percentY}%`);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Play sound on drag start
  const handleDragStart = () => {
    if (sound !== "none") {
      play();
    }
  };

  // Floating animation config
  const floatingAnimation =
    floating && !reducedMotion
      ? {
          y: [0, -8, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }
      : {};

  // Build motion style object
  const motionStyle: MotionStyle = {
    ...style,
    rotateX: tilt && !reducedMotion ? rotateX : 0,
    rotateY: tilt && !reducedMotion ? rotateY : 0,
    transformPerspective: 1000,
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        styles.card,
        styles[size],
        draggable && styles.draggable,
        className
      )}
      style={motionStyle}
      animate={floatingAnimation}
      drag={draggable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      onDragStart={handleDragStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
