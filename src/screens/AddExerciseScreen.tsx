/**
 * AddExerciseScreen.tsx
 *
 * Add Exercise Screen component.
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import route_names, { IAddExerciseScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import useAppContext from "../components/hooks/useAppContext";
import { db } from "../../FirebaseConfig";
import data from "../components/util/IRoutineCategories";
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

/**
 * Add Exercises to the Firebase Firestore Database
 *
 * @param props
 * @returns
 */
export default function AddExerciseScreen(props: IAddExerciseScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();

  const [exerciseName, setExerciseName] = useState("");
  const [isCardio, setIsCardio] = useState(false); // determines whether exercise is trained by time or reps
  const [selected, setSelected] = useState<string[]>([]); // array of selected categories. gets mapped to correlating boolean states

  const user = ctx.auth.currentUser;
  const exercisesCollection = collection(db, "exercises");

  const addExercise = async () => {
    if (user) {
      // add exercise document to firestore
      await addDoc(exercisesCollection, {
        exerciseName: exerciseName,
        userId: user.uid,
        sets: 0,
        reps: 0,
        weight: 0,
        time: 0,
        categories: selected,
        isCardio: isCardio,
      });
      alert('Exercise "' + exerciseName + '" added');
    } else {
      alert("No user is signed in");
    }
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          setIsCardio(!isCardio);
          console.log(selected);
        }}
        style={styles.booleanButton}
      >
        <Text
          style={[
            { color: isCardio ? defined_colors.red : defined_colors.green },
            styles.text,
          ]}
        >
          {isCardio ? " Cardio Exercise" : " Strength Exercise"}
        </Text>
      </Pressable>
      <TextInput
        style={styles.textInput}
        placeholder="Exercise Name"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <MultipleSelectList
        placeholder="Select Categories"
        setSelected={setSelected}
        data={data}
        save="value"
        label="categories"
        boxStyles={{ width: "90%" }}
      />
      <TouchableOpacity style={styles.button} onPress={addExercise}>
        <Text style={styles.text}>Add Exercise</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  textInput: TextStyle;
  button: ViewStyle;
  booleanButton: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 70,
    width: "90%",
    paddingHorizontal: 25,
    fontSize: 16,
    color: defined_colors.darkless_grey,
    shadowColor: defined_colors.light_grey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: defined_colors.light_blue,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: defined_colors.light_blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  booleanButton: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: defined_colors.light_blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
