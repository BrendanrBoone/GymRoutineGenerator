import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useEventListener } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

interface VideoPlayerProps {
  onEnd: () => void;
  source_location: string;
}

export function VideoPlayer({ onEnd, source_location }: VideoPlayerProps) {
  const player = useVideoPlayer(source_location, player => {
    player.loop = false;
    player.play();
  });

  useEventListener(player, 'playToEnd', () => {
    onEnd();
  })

  return (
    <View>
      <VideoView
        style={{ width: '100%', height: 300 }}
        player={player}
        nativeControls={false}
        contentFit="contain"
      />
    </View>
  );
}
