/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, SafeAreaView, Modal, Text } from "react-native";
import route_names, {
  IDetailsScreenProps,
  IRoutineScreenSlidesProps,
} from "../routes";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";

/**
 * Shows details of exercise.
 * Weight/time and the number of sets + reps
 *
 * @param props
 * @returns
 */
export default function DetailsScreen(props: IDetailsScreenProps) {
  //provides player information
  const ctx = useAppContext();

  const exercise = props.route.params.exercise;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: defined_colors.white,
            fontSize: 40,
          }}
        >
          {exercise}
        </Text>
      </View>
      <View style={styles.first_container}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: defined_colors.dark_grey,
  },
  header: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: defined_colors.white,
    paddingLeft: 10,
  },
  first_container: {
    width: "100%",
    borderWidth: 1,
    borderColor: defined_colors.white,
  },
});
