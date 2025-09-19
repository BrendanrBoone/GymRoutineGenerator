/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 */
import { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { IDetailsScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";
import { IExerciseDoc } from "../components/state/IRoutine";
import { Icons } from "../components/util/icons";

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

  const [isAdjustorVisible, setIsAdjustorVisible] = useState(false); // visibility of adjustor modal
  const [adjustorValue, setAdjustorValue] = useState<number>(0); // value shown in adjustor modal
  const [metric, setMetric] = useState<string>(""); // metric label for adjustor indicator

  // CONVERSION FROM LBS TO KG IS 1 : 0,45359237

  const openAdjustor = (var_to_incr: string) => {
    // darken background screen
    // show modal
    setIsAdjustorVisible(true);
    // pull up number
    setMetric(var_to_incr);
    switch (var_to_incr) {
      case "lbs":
        setAdjustorValue(exercise.weight);
        break;
      case "mins":
        setAdjustorValue(exercise.time);
        break;
      case "sets":
        setAdjustorValue(exercise.sets);
        break;
      case "reps":
        setAdjustorValue(exercise.reps);
        break;
      default:
        setAdjustorValue(0);
        break;
    }
  };

  const incrementIndicator = () => {
    // increase the number shown in the indicator container
    if (metric === "lbs") {
      setAdjustorValue(adjustorValue + 5);
    } else {
      setAdjustorValue(adjustorValue + 1);
    }
  };

  const decrementIndicator = () => {
    // decrease the number shown in the indicator container
    if (metric === "lbs") {
      adjustorValue - 5 > 0
        ? setAdjustorValue(adjustorValue - 5)
        : setAdjustorValue(0);
    } else {
      adjustorValue - 1 > 0
        ? setAdjustorValue(adjustorValue - 1)
        : setAdjustorValue(0);
    }
  };

  const applyChanges = () => {
    switch (metric) {
      case "lbs":
        exercise.weight = adjustorValue;
        break;
      case "mins":
        exercise.time = adjustorValue;
        break;
      case "sets":
        exercise.sets = adjustorValue;
        break;
      case "reps":
        exercise.reps = adjustorValue;
        break;
      default:
        setAdjustorValue(0);
        break;
    }
    setIsAdjustorVisible(false);
    // update db and alert user
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
        onPress={() => openAdjustor(exercise.isCardio ? "mins" : "lbs")}
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
            onPress={() => openAdjustor("sets")}
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
            onPress={() => openAdjustor("reps")}
          >
            <Text style={{ color: defined_colors.white, fontSize: 40 }}>
              {exercise.reps}
            </Text>
          </Pressable>
        </View>
      )}
      <Modal
        isVisible={isAdjustorVisible}
        onBackdropPress={() => setIsAdjustorVisible(false)}
        onBackButtonPress={() => setIsAdjustorVisible(false)}
        style={styles.adjustor_container}
      >
        <View style={styles.indicator_container}>
          <Text style={{ color: defined_colors.dark_grey, fontSize: 60 }}>
            {adjustorValue + " " + metric}
          </Text>
        </View>
        <View style={styles.buttons_container}>
          <Pressable
            style={({ pressed }) => [
              styles.subtract_button,
              pressed ? { backgroundColor: defined_colors.dark_red } : {},
            ]}
            onPress={() => decrementIndicator()}
          >
            <Icons.Feather
              name="minus"
              size={50}
              color={defined_colors.white}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.add_button,
              pressed ? { backgroundColor: defined_colors.dark_red } : {},
            ]}
            onPress={() => incrementIndicator()}
          >
            <Icons.Feather name="plus" size={50} color={defined_colors.white} />
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.confirm_button,
            pressed ? { backgroundColor: defined_colors.dark_blue } : {},
          ]}
          onPress={applyChanges}
        >
          <Text
            style={{
              fontSize: 30,
              color: defined_colors.black,
            }}
          >
            Confirm
          </Text>
        </Pressable>
      </Modal>
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
  adjustor_container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    height: 50,
  },
  indicator_container: {
    width: "100%",
    height: "30%",
    borderWidth: 1,
    borderColor: defined_colors.white,
    borderRadius: 30,
    backgroundColor: defined_colors.light_grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttons_container: {
    width: "60%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: defined_colors.red,
    borderRadius: 40,
  },
  add_button: {
    height: "100%",
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: defined_colors.white,
  },
  subtract_button: {
    height: "100%",
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: defined_colors.white,
  },
  confirm_button: {
    backgroundColor: defined_colors.duel_blue,
    borderWidth: 1,
    borderColor: defined_colors.white,
    borderRadius: 30,
    height: 60,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
});
