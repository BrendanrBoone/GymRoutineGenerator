/**
 * VideoPlayer.tsx
 *
 * Video module that uses expo-av and supports local video files via require()
 */

import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Asset } from 'expo-asset';

interface VideoPlayerProps {
  onEnd: () => void;
  source_location: number; // because require() returns a number
}

/**
 * Untouchable video that runs a function when video ends
 */
export function VideoPlayer({ onEnd, source_location }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect(() => {
    const loadAsset = async () => {
      const asset = Asset.fromModule(source_location);
      await asset.downloadAsync(); // optional for local assets
      setVideoUri(asset.localUri || asset.uri);
    };

    loadAsset();
  }, [source_location]);

  if (!videoUri) {
    return null; // or show a loading spinner
  }

  return (
    <View>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={{ width: '100%', height: 300 }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isMuted={false}
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            onEnd();
          }
        }}
      />
    </View>
  );
}
