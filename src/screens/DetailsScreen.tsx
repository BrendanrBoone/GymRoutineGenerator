/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 */
import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
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
  const [isSetRep, setIsSetRep] = useState(false); // determines whether set/rep is being adjusted for the modal
  const [isWeight, setIsWeight] = useState(false);
  const [isTime, setIsTime] = useState(false);

  // CONVERSION FROM LBS TO KG IS 1 : 0,45359237

  const openAdjustor = () => {
    // darken background screen
    // show modal
    setIsAdjustorVisible(true);
    // pull up number
    // change number up or down (limit to not go below 0)
    // update number in ctx
  };

  const incrementIndicator = () => {
    // increase the number shown in the indicator container
  };

  const decrementIndicator = () => {
    // decrease the number shown in the indicator container
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
      <Modal
        isVisible={isAdjustorVisible}
        onBackButtonPress={() => setIsAdjustorVisible(false)}
        style={styles.adjustor_container}
      >
        <View style={styles.indicator_container}>
          <Text key="value indicator">INDICATION</Text>
        </View>
        <View style={styles.buttons_container}>
          <Pressable
            style={({ pressed }) => [
              styles.subtract_button,
              pressed ? { backgroundColor: defined_colors.dark_red } : {},
            ]}
            onPress={() => incrementIndicator()}
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
            onPress={() => decrementIndicator()}
          >
            <Icons.Feather name="plus" size={50} color={defined_colors.white} />
          </Pressable>
        </View>
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
  adjustor_container: {
    backgroundColor: defined_colors.duel_blue,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator_container: {
    width: "100%",
    borderWidth: 1,
    borderColor: defined_colors.dark_grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttons_container: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: defined_colors.red,
    borderRadius: 15,
    transform: [{ scaleX: 4 }],
  },
  add_button: {
    transform: [{ scaleX: 1 / 4 }],
  },
  subtract_button: {
    transform: [{ scaleX: 1 / 4 }],
  },
});
