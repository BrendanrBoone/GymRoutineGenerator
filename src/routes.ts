/**
 * routes.ts
 * 
 * Defines the routes for the app
 * location of definitions for screen navigation and names
 */
import { StackScreenProps } from "@react-navigation/stack";
import { IPlayer } from "./components/state/IRoutines";

/**
 * Defines the parameters to a screen
 * 
 * ::App Route Plan::
 * 
 * HomeScreen: choose LP type 4000 or 8000
 * 
 * BattleScreen: two buttons with animations for LPs
 * 
 * CalculationScreen: edit LP counter.
 */
export type IStackParamList = {
    [route_names.HOME_SCREEN]: undefined,
    [route_names.BATTLE_SCREEN]: undefined,
    [route_names.CALCULATION_SCREEN]: {player: IPlayer, flipped: boolean}
};

export interface IRoutes {
    HOME_SCREEN: "Home",
    BATTLE_SCREEN: "Battle",
    CALCULATION_SCREEN: "Calculation"
};

//defined route names
const route_names: IRoutes = {
    HOME_SCREEN: "Home",
    BATTLE_SCREEN: "Battle",
    CALCULATION_SCREEN: "Calculation"
};

// Stack Screen Props. ie provides parameter information and such when within a screen
export type IHomeScreenProps = StackScreenProps<IStackParamList, typeof route_names.HOME_SCREEN>;
export type IBattleScreenProps = StackScreenProps<IStackParamList, typeof route_names.BATTLE_SCREEN>;
export type ICalculationScreenProps = StackScreenProps<IStackParamList, typeof route_names.CALCULATION_SCREEN>;

export default route_names;