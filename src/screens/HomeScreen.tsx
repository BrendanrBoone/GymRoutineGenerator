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

/**
 * The First Screen the user sees
 * ArrowSelector at the top to choose type of workout routine
 * DemoButton in the middle to start the LP counter
 *
 * @param props
 * @returns
 */
export default function HomeScreen(props: IHomeScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();

  //defined variables
  const defined_routines = [
    "Chest/triceps/Shoulder Day",
    "Back/biceps/Shoulder Day",
    "Leg Day",
    "Chest Day",
    "Back Day",
    "Arm Day",
    "Shoulder Day",
    "Core Day",
  ];
  const [routineDay, setRoutineDay] = useState(defined_routines[0]);

  //wrapper function for ArrowSelector
  const handleCurrentLP = (LP: number) => {
    setCurrentLP(LP);
  };

  //Initial call of this function. Gives each player their name and starting LP
  const updatePlayerLP = (gen_routine: RoutineFormat) => {
    const playerName: string = player == ctx.player1 ? "Player1" : "Player2";
    const generated_routines: RoutineFormat = {
      ...player,
      name: playerName,
      countLP: newLP,
    };
    player == ctx.player1
      ? ctx.updatePlayer1(updatePlayer)
      : ctx.updatePlayer2(updatePlayer);
  };

  const generateRoutines = (player: IPlayer, newLP: number) => {
    const playerName: string = player == ctx.player1 ? "Player1" : "Player2";
    const updatePlayer: IPlayer = {
      ...player,
      name: playerName,
      countLP: newLP,
    };
    player == ctx.player1
      ? ctx.updatePlayer1(updatePlayer)
      : ctx.updatePlayer2(updatePlayer);
  };

  //onPress function for BigButton. Moves to Routine Screen.
  const bigButtonFunction = (): void => {
    functionLibrary.printLogScreen(route_names.HOME_SCREEN);
    updatePlayerLP(ctx.player1, currentLP);
    updatePlayerLP(ctx.player2, currentLP);
    props.navigation.navigate(route_names.BATTLE_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Clock />
      <BigButton key="big generate routines button" onPress={bigButtonFunction}>
        {"GENERATE!"}
      </BigButton>
      <Picker></Picker>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: defined_colors.dark_grey,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
