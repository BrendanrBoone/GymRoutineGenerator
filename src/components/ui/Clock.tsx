import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date());
  const [morphAnimation] = useState(new Animated.Value(0));
  const [glowAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animateMorphing();
    animateGlowing();
  }, []);

  const animateMorphing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(morphAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(morphAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const animateGlowing = () => {
    Animated.loop(
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const morphStyle = {
    borderRadius: morphAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 100, 0],
    }),
  };

  const interpolateColors = glowAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(255, 0, 0, 1)",
      "rgba(0, 255, 0, 1)",
      "rgba(0, 0, 255, 1)",
    ],
  });

  const animatedStyles = {
    color: interpolateColors,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Clock</Text>
      <Animated.View style={[styles.clockContainer, morphStyle]}>
        <Animated.Text style={[styles.time, animatedStyles]}>
          {time.toLocaleTimeString()}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  clockContainer: ViewStyle;
  time: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 90,
    marginTop: 250,
  },
  clockContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
