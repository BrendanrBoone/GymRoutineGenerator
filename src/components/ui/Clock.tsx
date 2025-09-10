import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import defined_colors from "../util/colors";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  time: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: defined_colors.white,
    borderWidth: 1,
  },
  time: {
    fontSize: 60,
    fontWeight: "bold",
    color: defined_colors.white,
  },
});
