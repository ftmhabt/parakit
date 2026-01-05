import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useParakit } from "../../context/ParakitContext";
import { useSound } from "../../hooks/useSound";
import { cn } from "../../utils/classNames";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentPropsWithoutRef<typeof motion.button> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  sound?: "chirp" | "pop" | "whoosh" | "none";
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  sound = "none",
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const { reducedMotion } = useParakit();
  const { play } = useSound("pop");
  const controls = useAnimation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play sound unless disabled or sound is 'none'
    if (!disabled) {
      play();
    }

    // Trigger the "peck" animation
    if (!disabled && !reducedMotion) {
      controls.start({
        scale: [1, 0.95, 1.05, 1],
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 },
      });
    }

    // Call user's onClick if provided
    onClick?.(e);
  };

  return (
    <motion.button
      className={cn(styles.button, styles[variant], styles[size], className)}
      animate={controls}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
