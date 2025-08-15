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
  const [buttonSize, setButtonSize] = useState(0); // button is gonna be a circle, so only needs one dimension

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setButtonSize(Math.min(width, height));
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? color_pressed : color,
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
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
    justifyContent: "center",
    alignItems: "center",
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
