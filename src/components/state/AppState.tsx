/**
 * AppState.tsx
 *
 * tracks values within the app and allows updates them to the backend
 * can be viewed as ctx == AppState
 */
import { ReactNode, createContext, useState } from "react";
import { IExerciseDoc } from "./IRoutine";
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
  generated_exercises: IExerciseDoc[];
  generateRoutine: (routine_day: string[]) => Promise<string>;
  addExercise: (
    exerciseName: string,
    categories: string[],
    isCardio: boolean
  ) => void;
  updateExercise: (id: string, var_to_change: string, new_value: any) => void;
  auth: Auth;
  db: Firestore;
};

export const AppContext = createContext<IAppContext>({
  debug: () => {},
  generated_exercises: [],
  generateRoutine: () => Promise.resolve(""),
  addExercise: () => {},
  updateExercise: () => {},
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

  const user = auth.currentUser;
  const exercisesCollection = collection(db, "exercises");

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
  const generateRoutine = async (routine_day: string[]) => {
    console.log("generating routines for day: ", routine_day);
    let err = "";
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
            sets: docData.sets,
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
      }
    } else {
      err = "No user logged in: " + String(auth.currentUser);
    }
    return err;
  };

  const generateRandomExercise = async (routine_day: string[]) => {
    console.log("generating random exercise for day:", routine_day);
    let err = "";
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
            sets: docData.sets,
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
      }
    } else {
      err = "No user logged in: " + String(auth.currentUser);
    }
    return err;
  };

  const addExercise = async (
    exerciseName: string,
    categories: string[],
    isCardio: boolean
  ) => {
    if (user) {
      // add exercise document to firestore
      await addDoc(exercisesCollection, {
        exerciseName: exerciseName,
        userId: user.uid,
        sets: 0,
        reps: 0,
        weight: 0,
        time: 0,
        categories: categories,
        isCardio: isCardio,
      });
      alert('Exercise "' + exerciseName + '" added');
    } else {
      alert("No user is signed in");
    }
  };

  const updateExercise = async (
    id: string,
    var_to_change: string,
    new_value: any
  ) => {
    const exerciseDoc = doc(db, "exercises", id);
    switch (var_to_change) {
      case "lbs":
        await updateDoc(exerciseDoc, { weight: new_value });
        break;
      case "mins":
        await updateDoc(exerciseDoc, { time: new_value });
        break;
      case "sets":
        await updateDoc(exerciseDoc, { sets: new_value });
        break;
      case "reps":
        await updateDoc(exerciseDoc, { reps: new_value });
        break;
      case "name":
        await updateDoc(exerciseDoc, { exerciseName: new_value });
        break;
    }
    alert("Exercise Data Updated");
  };

  return (
    <AppContext.Provider
      value={{
        debug: debug,
        generated_exercises: generated_exercises,
        generateRoutine: generateRoutine,
        addExercise: addExercise,
        updateExercise: updateExercise,
        auth: auth,
        db: db,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
