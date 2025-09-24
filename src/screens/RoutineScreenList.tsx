/**
 * RoutineScreenList.tsx
 *
 * Routine Screen component.
 * Lists all generated routines
 */
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import route_names, { IRoutineScreenListProps } from "../routes";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";
import { Icons } from "../components/util/icons";
import { IExercise } from "../components/state/IRoutine";
import Modal from "react-native-modal";

/**
 * Shows list of generated routines
 * routines can be selected to move to detail screen
 *
 * @param props
 * @returns
 */
export default function RoutineScreenList(props: IRoutineScreenListProps) {
  // RGB BORDER
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  useEffect(() => {
    let animationId: number;
    let time = 0;
    const animate = () => {
      time += 0.01;
      setRed(Math.floor(50 + 205 * (0.5 + 0.5 * Math.sin(time))));
      setGreen(Math.floor(50 + 205 * (0.5 + 0.5 * Math.sin(time + 2))));
      setBlue(Math.floor(50 + 205 * (0.5 + 0.5 * Math.sin(time + 4))));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  //provides player information
  const ctx = useAppContext();

  const routine_day = props.route.params.routine_day;

  const [isModalVisible, setIsModalVisiable] = useState(false);
  const [long_pressed_i, setLongPressedI] = useState(0);

  //navigates to details screen
  const goToDetails = (selected_exercise: IExercise) => {
    functionLibrary.printLogScreen(route_names.ROUTINE_SCREEN_LIST);
    props.navigation.navigate(route_names.DETAILS_SCREEN, {
      exercise: selected_exercise,
    });
  };

  const addRandomExercise = () => {
    functionLibrary.printLogScreen(route_names.ROUTINE_SCREEN_LIST);
    ctx.generateRandomExercise();
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
          {"Workout: "}
        </Text>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: defined_colors.white,
              fontSize: 30,
            }}
          >
            {routine_day.join("\n")}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} alwaysBounceVertical={true}>
        {ctx.generated_exercises.map((exercise, i) => (
          <View
            key={"View-" + exercise.exerciseName}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Pressable
              key={"Pressable-" + exercise.exerciseName}
              onPress={() => goToDetails(exercise)}
              onLongPress={() => {
                console.log("long press detected");
                setIsModalVisiable(true);
                setLongPressedI(i);
              }}
              style={({ pressed }) => [
                styles.pressableItem,
                pressed ? styles.pressedStyle : {},
                { borderColor: `rgb(${red}, ${green}, ${blue})` },
              ]}
            >
              <Text
                style={{
                  color: defined_colors.white,
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {exercise.exerciseName}
              </Text>
            </Pressable>
          </View>
        ))}
        <View
          key={"View-AddMore"}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Pressable
            key="Pressable-AddMore"
            onPress={addRandomExercise}
            style={({ pressed }) => [
              styles.pressableItem,
              pressed ? styles.pressedStyle : {},
              { borderColor: defined_colors.light_grey },
            ]}
          >
            <Icons.Feather name="plus" size={24} color={defined_colors.white} />
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisiable(false)}
        onBackButtonPress={() => setIsModalVisiable(false)}
        style={styles.modal_container}
      >
        <Pressable
          style={({ pressed }) => [
            styles.refresh_button,
            pressed ? { backgroundColor: defined_colors.light_grey } : {},
          ]}
          onPress={() => {
            ctx.refreshExercise(long_pressed_i);
            setIsModalVisiable(false);
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: defined_colors.black,
            }}
          >
            Refresh
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.remove_button,
            pressed ? { backgroundColor: defined_colors.dark_red } : {},
          ]}
          onPress={() => {
            ctx.removeExercise(long_pressed_i);
            setIsModalVisiable(false);
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: defined_colors.black,
            }}
          >
            Remove
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
    borderWidth: 1,
    borderColor: defined_colors.white,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pressableItem: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: defined_colors.dark_grey,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  pressedStyle: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: defined_colors.light_grey,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  modal_container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    height: 50,
  },
  refresh_button: {
    backgroundColor: defined_colors.white,
    borderWidth: 1,
    borderColor: defined_colors.white,
    borderRadius: 30,
    height: 60,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  remove_button: {
    backgroundColor: defined_colors.red,
    borderWidth: 1,
    borderColor: defined_colors.white,
    borderRadius: 30,
    height: 60,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
