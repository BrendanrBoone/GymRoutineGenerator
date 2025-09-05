/**
 * DrawerNavigationScreen.tsx
 *
 * Navigational drawer of screens for app
 */
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import route_names, { HomeDrawerParamList } from "../../routes";
import GenerateScreen from "../../screens/GenerateScreen";
import AddExerciseScreen from "@/src/screens/AddExerciseScreen";
import SignOutScreen from "@/src/screens/SignOutScreen";

const HomeStack = createDrawerNavigator<HomeDrawerParamList>();

/**
 * Starts at HomeScreen.
 *
 * Note: Navigator id is undefined to avoid warning. may be fixed with updated version of react-navigation
 * @returns Navigational Stack of Screens.
 */
export default function DrawerNavigationScreen() {
  const screen_options: DrawerNavigationOptions = {
    headerShown: false,
  };

  return (
    <HomeStack.Navigator id={undefined} screenOptions={screen_options}>
      <HomeStack.Screen
        name={route_names.GENERATE_SCREEN}
        component={GenerateScreen}
      />
      <HomeStack.Screen
        name={route_names.ADD_EXERCISE_SCREEN}
        component={AddExerciseScreen}
      />
      <HomeStack.Screen
        name={route_names.SIGN_OUT_SCREEN}
        component={SignOutScreen}
      />
    </HomeStack.Navigator>
  );
}
