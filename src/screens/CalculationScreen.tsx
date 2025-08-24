/**
 * CalculationScreen.tsx
 *
 * LP Calculation Screen component.
 */
import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import route_names, { ICalculationScreenProps } from "../routes";
import useAppContext from "../components/hooks/useAppContext";
import defined_colors from "../components/util/colors";
import { IPlayer } from "../components/state/IRoutines";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import { LpChooser } from "../components/ui/LpChooser";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import useSound from "../components/hooks/useSound";

const { width } = Dimensions.get("window");
const horizontalMargin_calculationButtons = 20; //changes the width of the + and - buttons

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "X"];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const digitLength = 6; //limit in number of digits adjustable in calculation

/**
 * adjusts LP of user
 * LpChooser is a keypad that is limited by digitLength and can clear
 * LP can not go negative
 * plays LP sound when calculation is finished
 *
 * @param props
 * @returns
 */
export default function CalculationScreen(props: ICalculationScreenProps) {
  //provides player information
  const ctx = useAppContext();

  const playerLP = props.route.params.player.countLP; //current LP of user
  const [lpChange, setLpChange] = useState(0); //LP used to calculate, displayed in Orange
  const [playerLpResultGained, setPlayerLpResultGained] = useState(playerLP); //playerLP + lpChange
  const [playerLpResultReceived, setPlayerLpResultReceived] =
    useState(playerLP); //playerLP - lpChange
  const flipped = props.route.params.flipped; //determines if screen is flipped
  const playNoise = useSound(require("../assets/sounds_mp3/HealthChange.mp3")); //sound to play when LP is changed

  //live feedback of calculation and restricts LP calculation to Yugioh limits [0,999999]
  useEffect(() => {
    if (playerLP + lpChange > 999999) {
      setPlayerLpResultGained(999999);
    } else {
      setPlayerLpResultGained(playerLP + lpChange);
    }
    if (playerLP - lpChange < 0) {
      setPlayerLpResultReceived(0);
    } else {
      setPlayerLpResultReceived(playerLP - lpChange);
    }
  });

  //sets the player LP to a new value, stored back into AppState
  const updatePlayerLP = (player: IPlayer, newLP: number) => {
    const updatePlayer: IPlayer = {
      ...player,
      countLP: newLP,
    };
    player == ctx.player1
      ? ctx.updatePlayer1(updatePlayer)
      : ctx.updatePlayer2(updatePlayer);
  };

  //navigates back to battle screen
  const goBack = () => {
    functionLibrary.printLogScreen(route_names.CALCULATION_SCREEN);
    props.navigation.navigate(route_names.BATTLE_SCREEN);
  };

  //updates using playerLP + lpChange and returns to Battle screen
  const handleCalculateGain = () => {
    const newLP = playerLpResultGained;
    updatePlayerLP(props.route.params.player, newLP);
    playNoise();
    goBack();
  };

  //updates using playerLP - lpChange and returns to Battle screen
  const handleCalculateReceive = () => {
    const newLP = playerLpResultReceived;
    updatePlayerLP(props.route.params.player, newLP);
    playNoise();
    goBack();
  };

  return (
    <SafeAreaView style={flipped ? styles.flippedContainer : styles.container}>
      <View style={{ width: width, alignItems: "center" }}>
        <Text
          style={{ fontSize: 40, color: defined_colors.slightlybrown_darkgrey }}
        >
          LP CALCULATOR
        </Text>
        <Text
          style={{ fontSize: 20, color: defined_colors.slightlybrown_darkgrey }}
        >
          Choose amount to receive or gain
        </Text>
      </View>
      <View style={styles.text}>
        <TouchableOpacity onPress={goBack} style={styles.backButtonContainer}>
          <Feather
            name="chevron-left"
            size={70}
            color={defined_colors.slightlybrown_darkgrey}
          />
        </TouchableOpacity>
        <View style={styles.textViewBox} pointerEvents="none" key="LpText">
          <Text style={styles.pinText}>{lpChange}</Text>
        </View>
        <View style={styles.textViewBox} pointerEvents="none" key="playerLp">
          <Text
            style={{
              fontSize: 20,
              color: defined_colors.slightlybrown_darkgrey,
            }}
          >
            {"=" + playerLpResultReceived + " or " + playerLpResultGained}
          </Text>
        </View>
        <LpChooser
          dialPadContent={dialPadContent}
          digitLength={digitLength}
          lpChange={lpChange}
          setLpChange={setLpChange}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
        />
      </View>
      <View style={styles.calculationButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.calculationButton,
            { backgroundColor: defined_colors.red, flex: 1 },
          ]}
          onPress={handleCalculateReceive}
        >
          <Feather name="minus-circle" size={45} color={defined_colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.calculationButton,
            { backgroundColor: defined_colors.blue, flex: 1 },
          ]}
          onPress={handleCalculateGain}
        >
          <Feather name="plus-circle" size={45} color={defined_colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  flippedContainer: {
    flex: 1,
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
  },
  backButtonContainer: {
    position: "absolute",
    left: -width / 2 + 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    position: "relative",
  },
  pinText: {
    fontSize: 50,
    fontWeight: "medium",
    color: defined_colors.bright_orange,
  },
  textViewBox: {
    width: width,
    alignItems: "center",
  },
  calculationButtonsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: horizontalMargin_calculationButtons,
  },
  calculationButton: {
    width: (width - horizontalMargin_calculationButtons * 2) / 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
