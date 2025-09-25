/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 *
 * UNFINISHED
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Modal, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import route_names, { IRoutineScreenSlidesProps } from "../routes";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";

/**
 * Shows list of generated routines
 * routines can be selected to move to detail screen
 *
 * @param props
 * @returns
 */
export default function RoutineScreenList(props: IRoutineScreenSlidesProps) {
  //provides player information
  const ctx = useAppContext();

  //navigates to details screen
  const goToDetails = (selected_exercise: string) => {
    functionLibrary.printLogScreen(route_names.ROUTINE_SCREEN_LIST);
  };

  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  p1Half: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  p2Half: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  duelView: {
    height: 250,
    width: 185,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "63%",
  },
  win_dow: {
    flex: 1,
    maxHeight: 500,
    marginVertical: "35%",
    backgroundColor: "purple",
    opacity: 0.8,
    justifyContent: "center",
  },
  win_dow_flipped: {
    flex: 1,
    maxHeight: 500,
    marginVertical: "35%",
    backgroundColor: "purple",
    opacity: 0.9,
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
  },
});
