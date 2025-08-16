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
import { BigButton } from "../components/ui/BigButton";
import route_names, { IHomeScreenProps } from "../routes";
import defined_colors from "../components/ui/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { Clock } from "../components/ui/Clock";
import { IPlayer } from "../components/state/IBattleDocument";
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

  //defined choice LP values
  const defined_starting_LP = [8000, 4000];
  const [currentLP, setCurrentLP] = useState(defined_starting_LP[0]);

  //wrapper function for ArrowSelector
  const handleCurrentLP = (LP: number) => {
    setCurrentLP(LP);
  };

  //Initial call of this function. Gives each player their name and starting LP
  const updatePlayerLP = (player: IPlayer, newLP: number) => {
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

  //onPress function for DemoButton. Defines Players LP and moves to Battle Screen
  const duelButtonFunction = (): void => {
    functionLibrary.printLogScreen(route_names.HOME_SCREEN);
    updatePlayerLP(ctx.player1, currentLP);
    updatePlayerLP(ctx.player2, currentLP);
    props.navigation.navigate(route_names.BATTLE_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Clock />
      <BigButton
        key="big generate routines button"
        onPress={duelButtonFunction}
      >
        {"GENERATE!"}
      </BigButton>
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
    justifyContent: "space-between",
    borderWidth: 0,
    borderColor: "red",
    backgroundColor: defined_colors.dark_grey,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
