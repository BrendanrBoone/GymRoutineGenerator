/**
 * AppState.tsx
 *
 * tracks values within the app and allows updates them to the backend
 * can be viewed as ctx == AppState
 */
import { ReactNode, createContext, useState } from "react";
import utility from "../util/utility";
import { RoutineFormat } from "./IRoutines";
import { auth, db } from "../../../FirebaseConfig";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

type IAppContext = {
  generated_routines: RoutineFormat;
  generateRoutines: (routine_day: String) => void;
  auth: Auth;
  db: Firestore;
};

export const AppContext = createContext<IAppContext>({
  generated_routines: utility.createEmptyRoutineObject(),
  generateRoutines: () => {},
  auth: auth,
  db: db,
});

interface IAppState {
  children?: ReactNode | ReactNode[];
}

export default function AppState(props: IAppState) {
  //initialize routines object
  const [routines, setRoutines] = useState<RoutineFormat>(
    utility.createEmptyRoutineObject()
  );

  //exported function to generate routines for user according to specified day
  // rng, sorting algorithm by weight, source of routines in day format
  // returns error string
  // ex: "not enough exercises in category (minimum 5, currently [amount])"
  const generateRoutines = (routine_day: string) => {};

  return (
    <AppContext.Provider
      value={{
        generated_routines: routines,
        generateRoutines: generateRoutines,
        auth: auth,
        db: db,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
