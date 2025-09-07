/**
 * GenerateScreen.tsx
 *
 * Generate Button Screen component.
 */
import { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BigButton } from "../components/ui/BigButton";
import route_names, { IGenerateScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { Clock } from "../components/ui/Clock";
import useAppContext from "../components/hooks/useAppContext";
import { defined_routines } from "../components/util/DefinedRoutines";
import { getAuth } from "firebase/auth";

/**
 * The First Screen the user sees
 *
 * @param props
 * @returns
 */
export default function GenerateScreen(props: IGenerateScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();
  ctx.auth = getAuth();

  const [routineDay, setRoutineDay] = useState<String>(
    defined_routines[0].name
  );

  //onPress function for BigButton. Moves to Routine Screen.
  const bigButtonFunction = (): void => {
    functionLibrary.printLogScreen(route_names.GENERATE_SCREEN);
    err = ctx.generateRoutines(routineDay); // err is string
    if (err) {
      console.log("error log: ", err);
      return;
    }
    props.navigation.navigate(route_names.ROUTINE_SCREEN_LIST);
  };

  const logoutButtonFunction = async () => {
    props.navigation.navigate(route_names.SIGN_OUT_SCREEN);
  };

  const addExerButtonFunction = async () => {
    props.navigation.navigate(route_names.ADD_EXERCISE_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Clock />
        <View style={styles.hamburger}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logoutButtonFunction}
          >
            <Text style={{ color: defined_colors.white, fontSize: 20 }}>
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={addExerButtonFunction}
          >
            <Text style={{ color: defined_colors.white, fontSize: 20 }}>
              AddExer
            </Text>
          </TouchableOpacity>
        </View>
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
  hamburger: ViewStyle;
  button: ViewStyle;
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
  hamburger: {
    marginLeft: "auto",
    alignItems: "center",
    width: "30%",
    height: "100%",
    borderWidth: 1,
    borderColor: defined_colors.red,
  },
  button: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defined_colors.light_blue,
    opacity: 0.6,
  },
  logoutButton: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defined_colors.purple,
    opacity: 0.6,
  },
});
