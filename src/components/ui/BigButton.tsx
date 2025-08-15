/**
 * BigButton.tsx
 *
 * Button module
 */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import defined_colors from "./colors";

interface Props {
  onPress: () => void;
}

type BigButton<P = unknown> = P & {
  children?: React.ReactNode | undefined;
  color?: string | undefined;
  color_pressed?: string | undefined;
  flipped?: boolean | undefined;
};

/**
 * general button that can be specified if it is oriented upside down or not
 *
 * @param param0
 * @returns
 */
export function BigButton({
  onPress,
  children,
  color,
  color_pressed,
  flipped,
}: BigButton<Props>) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { backgroundColor: pressed ? color_pressed : color },
          styles.button,
        ]}
      >
        <Text style={flipped ? styles.flippedText : styles.text}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  flippedText: TextStyle;
  button: ViewStyle; // temporary style to figure out desired percentage ratio for button and container
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: defined_colors.sienna,
  },
  text: {
    textAlign: "center",
    color: defined_colors.bright_orange,
    fontSize: 30,
  },
  flippedText: {
    textAlign: "center",
    color: defined_colors.bright_orange,
    fontSize: 30,
    transform: [{ scaleX: -1 }],
  },
});
