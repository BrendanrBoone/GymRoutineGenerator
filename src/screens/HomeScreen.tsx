/**
 * HomeScreen.tsx
 *
 * Home Screen component.
 */
import { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BigButton } from "../components/ui/BigButton";
import route_names, { IHomeScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { Clock } from "../components/ui/Clock";
import { RoutineFormat } from "../components/state/IRoutines";
import useAppContext from "../components/hooks/useAppContext";
import { defined_routines } from "../components/util/DefinedRoutines";

/**
 * The First Screen the user sees
 * Note: styles are done within each module
 *
 * @param props
 * @returns
 */
export default function HomeScreen(props: IHomeScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();

  const [routineDay, setRoutineDay] = useState<String>(
    defined_routines[0].name
  );

  //onPress function for BigButton. Moves to Routine Screen.
  const bigButtonFunction = (): void => {
    functionLibrary.printLogScreen(route_names.HOME_SCREEN);
    ctx.generateRoutines(routineDay);
    props.navigation.navigate(route_names.BATTLE_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Clock />
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
    backgroundColor: defined_colors.dark_grey,
    justifyContent: "center",
    alignItems: "center",
  },
});
