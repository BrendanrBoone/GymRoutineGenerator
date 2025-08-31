/**
 * routes.ts
 * 
 * Defines the routes for the app
 * location of definitions for screen navigation and names
 */
import { StackScreenProps } from "@react-navigation/stack";

/**
 * Defines the parameters to a screen
 * 
 * ::App Route Plan::
 * 
 * HomeScreen: choose Routine Day
 * 
 * RoutineScreen: Show all generated routines. Routines are selectable to details screen
 * 
 * DetailsScreen: Show exercise, guide, video, sets (calculator maybe), current weight. weight and sets are adjustable
 * 
 * SignUpScreen: Sign into account or make account
 * 
 * SignOutScreen: Sign out of account
 */
export type IStackParamList = {
    [route_names.HOME_SCREEN]: undefined,
    [route_names.ROUTINE_SCREEN_LIST]: undefined,
    [route_names.ROUTINE_SCREEN_SLIDES]: undefined,
    [route_names.DETAILS_SCREEN]: {exercise: string},
    [route_names.SIGN_UP_SCREEN]: undefined,
    [route_names.SIGN_OUT_SCREEN]: undefined,
    [route_names.LOGIN_SCREEN]: undefined
};

export interface IRoutes {
    HOME_SCREEN: "Home",
    ROUTINE_SCREEN_LIST: "Routine List",
    ROUTINE_SCREEN_SLIDES: "Routine Slide",
    DETAILS_SCREEN: "Details",
    SIGN_UP_SCREEN: "Sign Up",
    SIGN_OUT_SCREEN: "Sign Out",
    LOGIN_SCREEN: "Log in"
};

//defined route names
const route_names: IRoutes = {
    HOME_SCREEN: "Home",
    ROUTINE_SCREEN_LIST: "Routine List",
    ROUTINE_SCREEN_SLIDES: "Routine Slide",
    DETAILS_SCREEN: "Details",
    SIGN_UP_SCREEN: "Sign Up",
    SIGN_OUT_SCREEN: "Sign Out",
    LOGIN_SCREEN: "Log in"
};

// Stack Screen Props. ie provides parameter information and such when within a screen
export type IHomeScreenProps = StackScreenProps<IStackParamList, typeof route_names.HOME_SCREEN>;
export type IRoutineScreenListProps = StackScreenProps<IStackParamList, typeof route_names.ROUTINE_SCREEN_LIST>;
export type IRoutineScreenSlidesProps = StackScreenProps<IStackParamList, typeof route_names.ROUTINE_SCREEN_SLIDES>;
export type IDetailsScreenProps = StackScreenProps<IStackParamList, typeof route_names.DETAILS_SCREEN>;
export type ISignUpScreenProps = StackScreenProps<IStackParamList, typeof route_names.SIGN_UP_SCREEN>;
export type ISignOutScreenProps = StackScreenProps<IStackParamList, typeof route_names.SIGN_OUT_SCREEN>;
export type ILoginScreenProps = StackScreenProps<IStackParamList, typeof route_names.LOGIN_SCREEN>;

export default route_names;