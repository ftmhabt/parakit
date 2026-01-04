import { useCallback, useRef } from "react";
import { useParakit } from "../context/ParakitContext";
import type { SoundName } from "../types";

// Map sound names to their file paths
const soundFiles: Record<SoundName, string> = {
  chirp: "/sounds/chirp.mp3",
  pop: "/sounds/pop.mp3",
  whoosh: "/sounds/whoosh.mp3",
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  toggle: "/sounds/toggle.mp3",
};

export function useSound(soundName: SoundName) {
  // Get settings from provider
  const { sounds, soundVolume } = useParakit();

  // useRef keeps the same audio element between renders
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // useCallback memoizes the function so it doesn't recreate every render
  const play = useCallback(() => {
    // Don't play if sounds are disabled
    if (!sounds) return;

    // Create audio element only once (lazy initialization)
    if (!audioRef.current) {
      audioRef.current = new Audio(soundFiles[soundName]);
    }

    const audio = audioRef.current;
    audio.volume = soundVolume;
    audio.currentTime = 0; // Reset to start

    // play() returns a promise, might fail due to browser restrictions
    audio.play().catch((error) => {
      console.warn("Sound play failed:", error);
    });
  }, [sounds, soundVolume, soundName]);

  // Also return a way to stop the sound
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}
