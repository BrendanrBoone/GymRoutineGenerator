// components/hooks/useSound.ts
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

/**
 * useSound returns a play function for a specific sound file.
 * 
 * @param soundFile - Sound file to play (e.g. require('../assets/sounds_mp3/foo.mp3'))
 * @returns () => Promise<void> - The play function
 */
export default function useSound(soundFile: any): () => Promise<void> {
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load the sound
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      soundRef.current = sound;
    };
    loadSound();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  // The play function
  const play = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }
  };

  return play;
}
