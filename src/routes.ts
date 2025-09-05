/**
 * routes.ts
 * 
 * Defines the routes for the app
 * location of definitions for screen navigation and names
 */
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { DrawerScreenProps, DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";

/**
 * Defines the parameters to a screen
 * 
 * ::App Route Plan::
 * 
 * <Stack Navigator>
 *   <LoginScreen/>
 *   <SignupScreen/>
 *   <SignOutScreen/>
 *   <Drawer Navigator>
 *     <HomeScreen/>
 *     <AddExerciseScreen/>
 *     <SignOutScreen/>
 *   </Drawer Navigator>
 *   <RoutineScreenList/>
 *   <RoutineScreenSlides/>
 *   <DetailsScreen/>
 * </Stack Navigator>
 * 
 * ::App Screen Plan::
 * 
 * HomeScreen: choose Routine Day
 * 
 * RoutineScreen: Show all generated routines. Routines are selectable to details screen
 * 
 * DetailsScreen: Show exercise, guide, video, sets (calculator maybe), current weight. weight and sets are adjustable
 * 
 * LoginSreen: login to account
 * 
 * SignUpScreen: make account
 * 
 * SignOutScreen: Sign out of account
 */
export type RootStackParamList = {
    [route_names.GENERATE_SCREEN]: undefined,
    [route_names.ROUTINE_SCREEN_LIST]: undefined,
    [route_names.ROUTINE_SCREEN_SLIDES]: undefined,
    [route_names.DETAILS_SCREEN]: {exercise: string},
    [route_names.SIGN_UP_SCREEN]: undefined,
    [route_names.LOGIN_SCREEN]: undefined
};

export type HomeDrawerParamList = {
    [route_names.GENERATE_SCREEN]: undefined,
    [route_names.ADD_EXERCISE_SCREEN]: undefined,
    [route_names.SIGN_OUT_SCREEN]: undefined
}

export interface IRoutes {
    HOME_NAVI: "Home Navigation",
    GENERATE_SCREEN: "Generate",
    ADD_EXERCISE_SCREEN: "Add Exercise",
    ROUTINE_SCREEN_LIST: "Routine List",
    ROUTINE_SCREEN_SLIDES: "Routine Slide",
    DETAILS_SCREEN: "Details",
    SIGN_UP_SCREEN: "Sign Up",
    SIGN_OUT_SCREEN: "Sign Out",
    LOGIN_SCREEN: "Log in"
};

//defined route names
const route_names: IRoutes = {
    HOME_NAVI: "Home Navigation",
    GENERATE_SCREEN: "Generate",
    ADD_EXERCISE_SCREEN: "Add Exercise",
    ROUTINE_SCREEN_LIST: "Routine List",
    ROUTINE_SCREEN_SLIDES: "Routine Slide",
    DETAILS_SCREEN: "Details",
    SIGN_UP_SCREEN: "Sign Up",
    SIGN_OUT_SCREEN: "Sign Out",
    LOGIN_SCREEN: "Log in"
};

// Stack Screen Props. ie provides parameter information and such when within a screen
export type IDrawerNaviProps = StackScreenProps<RootStackParamList, typeof route_names.HOME_NAVI>;
export type IRoutineScreenListProps = StackScreenProps<RootStackParamList, typeof route_names.ROUTINE_SCREEN_LIST>;
export type IRoutineScreenSlidesProps = StackScreenProps<RootStackParamList, typeof route_names.ROUTINE_SCREEN_SLIDES>;
export type IDetailsScreenProps = StackScreenProps<RootStackParamList, typeof route_names.DETAILS_SCREEN>;
export type ISignUpScreenProps = StackScreenProps<RootStackParamList, typeof route_names.SIGN_UP_SCREEN>;
export type ILoginScreenProps = StackScreenProps<RootStackParamList, typeof route_names.LOGIN_SCREEN>;

// Composite Navigation Types
type GenerateScreenNavigationProp = CompositeNavigationProp<DrawerNavigationProp<HomeDrawerParamList, typeof route_names.GENERATE_SCREEN>, StackNavigationProp<RootStackParamList>>;
type SignOutNavigationProp = CompositeNavigationProp<DrawerNavigationProp<HomeDrawerParamList, typeof route_names.SIGN_OUT_SCREEN>, StackNavigationProp<RootStackParamList>>;

// Drawer Screen Props
export interface IGenerateScreenProps {
    navigation: GenerateScreenNavigationProp;
    route: RouteProp<HomeDrawerParamList, typeof route_names.GENERATE_SCREEN>;
}
export interface ISignOutScreenProps {
    navigation: SignOutNavigationProp;
    route: RouteProp<HomeDrawerParamList, typeof route_names.SIGN_OUT_SCREEN>;
}
export type IAddExerciseScreenProps = DrawerScreenProps<HomeDrawerParamList, typeof route_names.ADD_EXERCISE_SCREEN>;

export default route_names;