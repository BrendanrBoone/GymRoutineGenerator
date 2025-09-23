/**
 * AppState.tsx
 *
 * tracks core values on the front-end (IExercise) and contains all functions interacting with the back-end
 * can be viewed as ctx == AppState
 */
import { ReactNode, createContext, useState } from "react";
import { IExercise, IExerciseDoc, IUserDoc } from "./IRoutine";
import { auth, db } from "../../../FirebaseConfig";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

type IAppContext = {
  generated_exercises: IExercise[];
  generateRoutine: (routine_day: string[]) => Promise<string>;
  generateRandomExercise: () => void;
  refreshExercise: (indx: number) => void;
  addExercise: (
    exerciseName: string,
    categories: string[],
    isCardio: boolean
  ) => void;
  updateExercise: (id: string, var_to_change: string, new_value: any) => void;
  renameExercise: (old_name: string, new_name: string) => void;
  auth: Auth;
  db: Firestore;
};

export const AppContext = createContext<IAppContext>({
  generated_exercises: [],
  generateRoutine: () => Promise.resolve(""),
  generateRandomExercise: () => {},
  refreshExercise: () => {},
  addExercise: () => {},
  updateExercise: () => {},
  renameExercise: () => {},
  auth: auth,
  db: db,
});

interface IAppState {
  children?: ReactNode | ReactNode[];
}

export default function AppState(props: IAppState) {
  //initialize routines object
  const [generated_exercises, setGeneratedExercises] = useState<IExercise[]>(
    []
  );
  // maybe use index number for efficiency but this looks easier
  const [unseen_exercises, setUnseenExercises] = useState<IExercise[]>([]);
  const [seen_exercises, setSeenExercises] = useState<IExercise[]>([]);

  const exercisesCollection = collection(db, "exercises");

  const fisherYatesShuffle = (array: any[]) => {
    const shuffle = [...array];
    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle;
  };

  const checkExerciseExists = async (exerciseName: string) => {
    try {
      const exerciseDocToCheck = doc(db, "exercises", exerciseName);
      const docSnapshot = await getDoc(exerciseDocToCheck);
      return docSnapshot.exists();
    } catch (err) {
      console.error("Error checking if exercise doc exists:", err);
    }
  };

  const checkUidExists = async (
    exercise_doc: DocumentReference<DocumentData, DocumentData>,
    userId: string
  ) => {
    try {
      const uidDocToCheck = doc(exercise_doc, "userIds", userId);
      const docSnapshot = await getDoc(uidDocToCheck);
      return docSnapshot.exists();
    } catch (err) {
      console.error("Error checking if userId doc exists:", err);
    }
  };

  const initializeSubcollection = async (
    exerciseName: string,
    userId: string
  ) => {
    try {
      const exercise_doc = doc(db, "exercises", exerciseName);
      const userId_doc = doc(exercise_doc, "userIds", userId);
      await setDoc(userId_doc, {
        exerciseName: exerciseName,
        userId: userId,
        reps: 0,
        sets: 0,
        time: 0,
        weight: 0,
      } as IUserDoc);
    } catch (err) {
      console.error("Error initializing subcollection:", err);
    }
  };

  //exported function to generate routines for user according to specified day
  // rng, sorting algorithm by weight, source of routines in day format
  // returns error string
  // ex: "not enough exercises in category (minimum 5, currently [amount])"
  const generateRoutine = async (routine_day: string[]) => {
    setUnseenExercises([]);
    setSeenExercises([]);
    console.log("generating routines for day: ", routine_day);
    const user = auth.currentUser;
    let err = "";

    try {
      if (user) {
        const q = query(exercisesCollection);
        const data = await getDocs(q);

        // exercise doc snapshots that match categories
        const exer_cat_ss = data.docs.filter((doc) => {
          const categories: string[] = doc.data().categories || [];
          return categories.some((category) => routine_day.includes(category));
        });

        // map exercises with user preferences to IExercise[]
        const routine = exer_cat_ss.map(async (document) => {
          const doc_data: DocumentData = document.data();
          let uid_doc_data: DocumentData;

          const uid_doc = doc(document.ref, "userIds", user.uid);
          const uid_doc_ss = await getDoc(uid_doc);
          if (!uid_doc_ss.exists()) {
            await initializeSubcollection(doc_data.exerciseName, user.uid);
            const new_uid_doc = doc(document.ref, "userIds", user.uid);
            const new_uid_doc_ss = await getDoc(new_uid_doc);
            uid_doc_data = new_uid_doc_ss.data()!;
          } else {
            uid_doc_data = uid_doc_ss.data();
          }
          return {
            exerciseName: doc_data.exerciseName,
            isCardio: doc_data.isCardio,
            categories: doc_data.categories || [],
            userId: uid_doc_data.userId,
            reps: uid_doc_data.reps,
            sets: uid_doc_data.sets,
            time: uid_doc_data.time,
            weight: uid_doc_data.weight,
          } as IExercise;
        });

        const resolved_exercises: IExercise[] = await Promise.all(routine);
        if (resolved_exercises.length < 5) {
          err = `Not enough exercises in selected categories (minimum 5, currently ${resolved_exercises.length})`;
        } else {
          // generate routine
          const shuffledExercises: IExercise[] =
            fisherYatesShuffle(resolved_exercises);
          setUnseenExercises(shuffledExercises.slice(5));
          setGeneratedExercises(shuffledExercises.slice(0, 5));
        }
      } else {
        err = "No user logged in: " + String(auth.currentUser);
      }
    } catch (e) {
      console.error("Error when generating exercises:" + e);
    }
    return err;
  };

  const generateRandomExercise = async () => {
    try {
      if (unseen_exercises.length <= 0) {
        alert("no more exercises of this category available in database");
        return;
      }
      console.log("generating one new exercise");
      unseen_exercises.forEach((exercise: IExercise) => {
        console.log("unseen_exercises: " + exercise.exerciseName);
      });
      const random_index = Math.floor(Math.random() * unseen_exercises.length);
      const random_exercise: IExercise = unseen_exercises[random_index];
      console.log("random exercise: " + random_exercise.exerciseName);
      if (generated_exercises.includes(random_exercise)) {
        console.error(
          "random exercises is already in generated exercises for some reason"
        );
        return;
      }
      setGeneratedExercises([...generated_exercises, random_exercise]);
      unseen_exercises.splice(random_index, 1);
      setUnseenExercises([...unseen_exercises]);
      setSeenExercises([...seen_exercises, random_exercise]);
      seen_exercises.forEach((exercise: IExercise) => {
        console.log("seen_exercises: " + exercise.exerciseName);
      });
    } catch (err) {
      console.error("Error at generating random exercise:", err);
    }
  };

  const refreshExercise = async (indx: number) => {
    try {
      if (unseen_exercises.length <= 0) {
        alert("no more exercises of this category available in database");
        return;
      }
      console.log("refreshing exercise");
      unseen_exercises.forEach((exercise: IExercise) => {
        console.log("unseen_exercises: " + exercise.exerciseName);
      });
      const random_index = Math.floor(Math.random() * unseen_exercises.length);
      const random_exercise: IExercise = unseen_exercises[random_index];
      console.log("random exercise: " + random_exercise.exerciseName);
      if (generated_exercises.includes(random_exercise)) {
        console.error(
          "random exercises is already in generated exercises for some reason"
        );
        return;
      }
      const updated_gen_exers = generated_exercises.map((exercise, i) => {
        if (i === indx) {
          setSeenExercises([...seen_exercises, exercise]);
          return random_exercise;
        }
        return exercise;
      });
      setGeneratedExercises([...updated_gen_exers]);
      unseen_exercises.splice(random_index, 1);
      setUnseenExercises([...unseen_exercises]);
      setSeenExercises([...seen_exercises, random_exercise]);
      seen_exercises.forEach((exercise: IExercise) => {
        console.log("seen_exercises: " + exercise.exerciseName);
      });
    } catch (err) {
      console.error("Error at generating random exercise:", err);
    }
  };

  const addExercise = async (
    exerciseName: string,
    categories: string[],
    isCardio: boolean
  ) => {
    const user = auth.currentUser;
    if (user) {
      // check if db has exercise already
      if (await checkExerciseExists(exerciseName)) {
        alert('"' + exerciseName + '" is already stored in the database');
      } else {
        // add exercise document to firestore
        const new_exercise_doc = doc(db, "exercises", exerciseName);
        await setDoc(new_exercise_doc, {
          exerciseName: exerciseName,
          categories: categories,
          isCardio: isCardio,
        } as IExerciseDoc);
        // add initial subcollection of userIds with user for the document
        await initializeSubcollection(exerciseName, user.uid);
        alert('Exercise "' + exerciseName + '" added');
      }
    } else {
      alert("No user is signed in");
    }
  };

  const updateExercise = async (
    exerciseName: string,
    var_to_change: string,
    new_value: any
  ) => {
    const user = auth.currentUser;
    if (user) {
      const exercise_doc = doc(db, "exercises", exerciseName);
      const userId_doc = doc(exercise_doc, "userIds", user.uid);
      switch (var_to_change) {
        case "lbs":
          await updateDoc(userId_doc, { weight: new_value });
          break;
        case "mins":
          await updateDoc(userId_doc, { time: new_value });
          break;
        case "sets":
          await updateDoc(userId_doc, { sets: new_value });
          break;
        case "reps":
          await updateDoc(userId_doc, { reps: new_value });
          break;
      }
      alert("Exercise Data Updated");
    }
  };

  const renameExercise = async (old_name: string, new_name: string) => {
    const user = auth.currentUser;
    if (user) {
      const old_doc_ref = doc(db, "exercises", old_name);
      const old_doc_ss = await getDoc(old_doc_ref);
      const new_doc_ref = doc(db, "exercises", new_name);
      await setDoc(new_doc_ref, old_doc_ss.data());
      await deleteDoc(old_doc_ref);
      initializeSubcollection(new_name, user.uid);
      alert(
        "Renamed exercise and deleted previous preferences. Need to update"
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        generated_exercises: generated_exercises,
        generateRoutine: generateRoutine,
        generateRandomExercise: generateRandomExercise,
        refreshExercise: refreshExercise,
        addExercise: addExercise,
        updateExercise: updateExercise,
        renameExercise: renameExercise,
        auth: auth,
        db: db,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
