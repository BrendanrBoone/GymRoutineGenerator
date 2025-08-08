/**
 * StackNavigationScreen.tsx
 * 
 * Navigational stack of screens for app
 */
import { createStackNavigator } from "@react-navigation/stack";
import route_names, { IStackParamList } from "../../routes";
import HomeScreen from "../../screens/HomeScreen";
import BattleScreen from "../../screens/BattleScreen";
import CalculationScreen from "../../screens/CalculationScreen";

const HomeStack = createStackNavigator<IStackParamList>();

/**
 * Starts at HomeScreen.
 * 
 * @returns Navigational Stack of Screens.
 */
export default function StackNavigationScreen() {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name={route_names.HOME_SCREEN} component={HomeScreen} />
            <HomeStack.Screen name={route_names.BATTLE_SCREEN} component={BattleScreen} />
            <HomeStack.Screen name={route_names.CALCULATION_SCREEN} component={CalculationScreen} />
        </HomeStack.Navigator>
    );
}