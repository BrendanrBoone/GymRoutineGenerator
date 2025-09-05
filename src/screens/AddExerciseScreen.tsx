/**
 * AddExerciseScreen.tsx
 *
 * Add Exercise Screen component.
 */
import { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BigButton } from "../components/ui/BigButton";
import route_names, { IAddExerciseScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { Clock } from "../components/ui/Clock";
import useAppContext from "../components/hooks/useAppContext";
import { defined_routines } from "../components/util/DefinedRoutines";

/**
 * The First Screen the user sees
 * Note: styles are done within each module
 *
 * @param props
 * @returns
 */
export default function AddExerciseScreen(props: IAddExerciseScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();

  const [routineDay, setRoutineDay] = useState<String>(
    defined_routines[0].name
  );

  //onPress function for BigButton. Moves to Routine Screen.
  const bigButtonFunction = (): void => {
    functionLibrary.printLogScreen(route_names.GENERATE_SCREEN);
    ctx.generateRoutines(routineDay);
    props.navigation.navigate(route_names.ROUTINE_SCREEN_LIST);
  };

  const logoutButtonFunction = async () => {
    props.navigation.navigate(route_names.SIGN_OUT_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Clock />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logoutButtonFunction}
        >
          <Text style={{ color: defined_colors.white, fontSize: 30 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <BigButton key="big generate routines button" onPress={bigButtonFunction}>
        {"GENERATE!"}
      </BigButton>
      <Picker
        selectedValue={routineDay}
        onValueChange={(itemValue, _) => setRoutineDay(itemValue)}
        style={styles.day_picker}
      >
        {defined_routines.map((routine, index) => (
          <Picker.Item
            label={routine.name}
            value={routine.name}
            key={index}
            color={defined_colors.white}
            style={styles.day_picker}
          />
        ))}
      </Picker>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  day_picker: ViewStyle;
  header: ViewStyle;
  logoutButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: defined_colors.dark_grey,
  },
  day_picker: {
    height: "20%",
    width: "100%",
    backgroundColor: defined_colors.green,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "20%",
    borderWidth: 1,
    borderColor: defined_colors.red,
  },
  logoutButton: {
    marginLeft: "auto",
    zIndex: 1,
    height: "60%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defined_colors.purple,
    opacity: 0.6,
  },
});
