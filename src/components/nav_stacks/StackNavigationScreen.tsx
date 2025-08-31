/**
 * StackNavigationScreen.tsx
 *
 * Navigational stack of screens for app
 */
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import route_names, { IStackParamList } from "../../routes";
import HomeScreen from "../../screens/HomeScreen";
import RoutineScreenList from "../../screens/RoutineScreenList";
import RoutineScreenSlides from "../../screens/RoutineScreenSlides";
import DetailsScreen from "../../screens/DetailsScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import SignOutScreen from "../../screens/SignOutScreen";
import LoginScreen from "../../screens/LoginScreen";

const HomeStack = createStackNavigator<IStackParamList>();

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
    <HomeStack.Navigator id={undefined} screenOptions={screen_options}>
      <HomeStack.Screen
        name={route_names.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <HomeStack.Screen
        name={route_names.SIGN_UP_SCREEN}
        component={SignUpScreen}
      />
      <HomeStack.Screen
        name={route_names.SIGN_OUT_SCREEN}
        component={SignOutScreen}
      />
      <HomeStack.Screen name={route_names.HOME_SCREEN} component={HomeScreen} />
      <HomeStack.Screen
        name={route_names.ROUTINE_SCREEN_LIST}
        component={RoutineScreenList}
      />
      <HomeStack.Screen
        name={route_names.ROUTINE_SCREEN_SLIDES}
        component={RoutineScreenSlides}
      />
      <HomeStack.Screen
        name={route_names.DETAILS_SCREEN}
        component={DetailsScreen}
      />
    </HomeStack.Navigator>
  );
}
