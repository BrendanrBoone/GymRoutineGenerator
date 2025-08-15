import { View, Text, ViewStyle, StyleSheet } from "react-native";
import React from "react";

export function Clock() {
  return (
    <View>
      <Text>Clock</Text>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
});
