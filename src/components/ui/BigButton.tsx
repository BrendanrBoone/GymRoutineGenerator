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
  text_and_border_color?: string | undefined;
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
  color = defined_colors.red,
  color_pressed = defined_colors.dark_red,
  text_and_border_color = defined_colors.white,
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
            borderColor: text_and_border_color,
          },
          styles.button,
        ]}
      >
        <Text
          style={[{ color: text_and_border_color }, styles.text]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  button: ViewStyle; // temporary style to figure out desired percentage ratio for button and container
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderColor: defined_colors.white,
    borderWidth: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 90,
  },
});
