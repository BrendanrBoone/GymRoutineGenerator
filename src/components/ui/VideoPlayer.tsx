/**
 * VideoPlayer.tsx
 * 
 * Video module that uses react-native-video
 */
import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

interface VideoPlayerProps {
  onEnd: () => void;
  source_location: NodeRequire;
}

/**
 * untouchable video that runs a function when video ends
 * 
 * @param param0 
 * @returns 
 */
export function VideoPlayer({ onEnd, source_location }: VideoPlayerProps) {
  const video = React.useRef<any>(null);

  return (
    <View>
      <Video
        style={{ width: '100%', height: 300 }}
        ref={video}
        source={{uri: source_location}}
        muted={false}
        onEnd={onEnd}
      />
    </View>
  );
};