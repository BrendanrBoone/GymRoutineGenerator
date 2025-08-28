/**
 * App.tsx
 *
 * Entry point into the application as pointed out by Software Engineer Davidさん
 */

import React from "react";
import { useColorScheme } from "react-native";
import "FirebaseConfig.ts";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import StackNavigationScreen from "./src/components/nav_stacks/StackNavigationScreen";
import AppState from "./src/components/state/AppState";

/**
 * <AppState> initializes player values
 * <StackNavigationScreen> pulls up its first screen, the SignUpScreen
 *
 * @returns the root of the react native app
 */
function App(): React.JSX.Element {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppState>
        <StackNavigationScreen />
      </AppState>
    </NavigationContainer>
  );
}

export default App;
