/**
 * AppState.tsx
 *
 * tracks values within the app and allows updates them to the backend
 * can be viewed as ctx == AppState
 */
import { ReactNode, createContext, useState } from "react";
import { IExerciseDoc } from "./IRoutines";
import { auth, db } from "../../../FirebaseConfig";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

type IAppContext = {
  debug: () => void;
  generated_routines: IExerciseDoc[];
  generateRoutines: (routine_day: string[]) => Promise<string>;
  auth: Auth;
  db: Firestore;
};

export const AppContext = createContext<IAppContext>({
  debug: () => {},
  generated_routines: [],
  generateRoutines: () => Promise.resolve(""),
  auth: auth,
  db: db,
});

interface IAppState {
  children?: ReactNode | ReactNode[];
}

export default function AppState(props: IAppState) {
  //initialize routines object
  const [generated_exercises, setGeneratedExercises] = useState<IExerciseDoc[]>(
    []
  );

  const debug = async () => {
    generated_exercises.map((exercise: IExerciseDoc) => {
      Object.entries(exercise).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    });
  };

  const fisherYatesShuffle = (array: any[]) => {
    const shuffle = [...array];
    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle;
  };

  //exported function to generate routines for user according to specified day
  // rng, sorting algorithm by weight, source of routines in day format
  // returns error string
  // ex: "not enough exercises in category (minimum 5, currently [amount])"
  const generateRoutines = async (routine_day: string[]) => {
    console.log("generating routines for day: ", routine_day);
    let err = "";
    const user = auth.currentUser;
    const exercisesCollection = collection(db, "exercises");
    if (user) {
      const q = query(exercisesCollection, where("userId", "==", user.uid));
      const data = await getDocs(q);

      const filtered_exercises = data.docs
        .filter((doc) => {
          const categories: string[] = doc.data().categories || [];
          return categories.some((category) => routine_day.includes(category));
        })
        .map((doc) => {
          const docData = doc.data();
          return {
            exerciseName: docData.exerciseName,
            userId: docData.userId,
            isCardio: docData.isCardio,
            reps: docData.reps,
            set: docData.set,
            time: docData.time,
            weight: docData.weight,
            categories: docData.categories || [],
            id: doc.id,
          } as IExerciseDoc;
        });

      if (filtered_exercises.length < 5) {
        err = `Not enough exercises in selected categories (minimum 5, currently ${filtered_exercises.length})`;
      } else {
        // generate routine
        const shuffledExercises = fisherYatesShuffle(filtered_exercises);
        setGeneratedExercises(shuffledExercises.slice(0, 5));
        await debug();
      }
    } else {
      err = "No user logged in";
    }
    return err;
  };

  return (
    <AppContext.Provider
      value={{
        debug: debug,
        generated_routines: generated_exercises,
        generateRoutines: generateRoutines,
        auth: auth,
        db: db,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
