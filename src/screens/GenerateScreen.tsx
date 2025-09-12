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
import { BigButton } from "../components/ui/BigButton";
import route_names, { IGenerateScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { Clock } from "../components/ui/Clock";
import useAppContext from "../components/hooks/useAppContext";
import { getAuth } from "firebase/auth";
import { items } from "../components/util/IRoutineCategories";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { Icons } from "../components/util/icons";

/**
 * Main Configuration Screen
 *
 * @param props
 * @returns
 */
export default function GenerateScreen(props: IGenerateScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();
  ctx.auth = getAuth();

  const [routineDay, setRoutineDay] = useState<string[]>([]); // can have multiple routine days selected

  //onPress function for BigButton. Moves to Routine Screen.
  const bigButtonFunction = async (
    selected_routine_day: string[]
  ): Promise<void> => {
    functionLibrary.printLogScreen(route_names.GENERATE_SCREEN);
    try {
      const err = await ctx.generateRoutines(selected_routine_day); // err is string
      if (err) {
        console.log("error log: ", err);
        return;
      }
      props.navigation.navigate(route_names.ROUTINE_SCREEN_LIST);
    } catch (error) {
      console.log("catch error: ", error);
    }
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
        <View style={{ width: "70%" }}>
          <Clock />
        </View>
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
      <BigButton
        key="big generate routines button"
        onPress={() => bigButtonFunction(routineDay)}
      >
        {"GENERATE!"}
      </BigButton>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icons.MaterialIcons as any}
        uniqueKey="id"
        subKey="children"
        alwaysShowSelectText={true}
        showDropDowns={false}
        selectText="good luck soldier"
        onSelectedItemsChange={(id) => {
          console.log("selectedItem: ", id);
          setRoutineDay((routineDay) => [
            ...routineDay,
            items.children.find((child) => child.id === id)?.name || "", // fix this
          ]);
        }}
        selectedItems={routineDay}
        styles={{
          selectToggle: {
            marginTop: "10%",
          },
        }}
        colors={{
          selectToggleTextColor: defined_colors.white,
          success: defined_colors.red,
        }}
      />
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
