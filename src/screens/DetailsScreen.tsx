/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  Text,
  Pressable,
} from "react-native";
import route_names, { IDetailsScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";
import { IExerciseDoc } from "../components/state/IRoutine";

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

  const exercise: IExerciseDoc = props.route.params.exercise;

  const openAdjustor = () => {
    // darken background screen
    // pull up number
    // change number up or down (limit to not go below 0)
    // update number in ctx
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: defined_colors.white,
            fontSize: 40,
          }}
        >
          {exercise.exerciseName}
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.first_container,
          pressed ? { backgroundColor: defined_colors.light_grey } : {},
        ]}
        onPress={() => openAdjustor()}
      >
        <Text
          style={{ color: defined_colors.white, fontSize: 200 }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {exercise.isCardio ? exercise.time : exercise.weight}
        </Text>
        <Text
          style={{ color: defined_colors.light_grey, fontSize: 40 }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {exercise.isCardio ? " mins" : " lbs"}
        </Text>
      </Pressable>
      {exercise.isCardio ? null : (
        <View style={styles.second_container}>
          <Pressable
            style={({ pressed }) => [
              styles.sets,
              pressed ? { backgroundColor: defined_colors.dark_blue } : {},
            ]}
            onPress={() => openAdjustor()}
          >
            <Text style={{ color: defined_colors.white, fontSize: 40 }}>
              {exercise.sets}
            </Text>
          </Pressable>
          <Text style={{ color: defined_colors.white, fontSize: 40 }}>X</Text>
          <Pressable
            style={({ pressed }) => [
              styles.reps,
              pressed ? { backgroundColor: defined_colors.dark_red } : {},
            ]}
            onPress={() => openAdjustor()}
          >
            <Text style={{ color: defined_colors.white, fontSize: 40 }}>
              {exercise.reps}
            </Text>
          </Pressable>
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  second_container: {
    width: "100%",
    borderWidth: 1,
    borderColor: defined_colors.white,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sets: {
    width: "40%",
    shadowColor: defined_colors.dark_blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  reps: {
    width: "40%",
    shadowColor: defined_colors.dark_red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
});
