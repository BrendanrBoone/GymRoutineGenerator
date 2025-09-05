/**
 * StackNavigationScreen.tsx
 *
 * Navigational stack of screens for app
 */
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import route_names, { RootStackParamList } from "../../routes";
import RoutineScreenList from "../../screens/RoutineScreenList";
import RoutineScreenSlides from "../../screens/RoutineScreenSlides";
import DetailsScreen from "../../screens/DetailsScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import LoginScreen from "../../screens/LoginScreen";
import GenerateScreen from "@/src/screens/GenerateScreen";

const RootStack = createStackNavigator<RootStackParamList>();

/**
 * Starts at HomeScreen.
 *
 * Note: Navigator id is undefined to avoid warning. may be fixed with updated version of react-navigation
 * @returns Navigational Stack of Screens.
 */
export default function StackNavigationScreen() {
  const screen_options: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <RootStack.Navigator id={undefined} screenOptions={screen_options}>
      <RootStack.Screen
        name={route_names.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <RootStack.Screen
        name={route_names.SIGN_UP_SCREEN}
        component={SignUpScreen}
      />
      <RootStack.Screen
        name={route_names.GENERATE_SCREEN}
        component={GenerateScreen}
      />
      <RootStack.Screen
        name={route_names.ROUTINE_SCREEN_LIST}
        component={RoutineScreenList}
      />
      <RootStack.Screen
        name={route_names.ROUTINE_SCREEN_SLIDES}
        component={RoutineScreenSlides}
      />
      <RootStack.Screen
        name={route_names.DETAILS_SCREEN}
        component={DetailsScreen}
      />
    </RootStack.Navigator>
  );
}
