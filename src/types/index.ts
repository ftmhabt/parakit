export interface PhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface ParakitConfig {
  sounds: boolean;
  soundVolume: number;
  physics: PhysicsConfig;
  reducedMotion: boolean;
}

export type SoundName =
  | "chirp"
  | "pop"
  | "whoosh"
  | "success"
  | "error"
  | "toggle";

export type ComponentSize = "sm" | "md" | "lg";
