/**
 * DrawerScreen.tsx
 *
 * Screen for displaying as a drawer
 */

import { View, StyleSheet } from "react-native";
import defined_colors from "../components/util/colors";

export default function DrawerScreen({ route, navigation }) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defined_colors.dark_blue,
  },
});
