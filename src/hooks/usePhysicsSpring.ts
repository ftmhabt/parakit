import { useSpring, type SpringOptions } from "framer-motion";
import { useParakit } from "../context/ParakitContext";

export function usePhysicsSpring(
  initialValue: number,
  customConfig?: Partial<SpringOptions>
) {
  const { physics, reducedMotion } = useParakit();

  // If user prefers reduced motion, make animations instant
  const springConfig: SpringOptions = reducedMotion
    ? {
        stiffness: 1000, // Very stiff = fast
        damping: 100, // High damping = no bounce
      }
    : {
        stiffness: customConfig?.stiffness ?? physics.stiffness,
        damping: customConfig?.damping ?? physics.damping,
        mass: customConfig?.mass ?? physics.mass,
      };

  return useSpring(initialValue, springConfig);
}
