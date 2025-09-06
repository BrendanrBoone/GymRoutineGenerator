/**
 * AddExerciseScreen.tsx
 *
 * Add Exercise Screen component.
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import route_names, { IAddExerciseScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import functionLibrary from "../components/state/ScrnDepFuncLib";
import useAppContext from "../components/hooks/useAppContext";
import { db } from "../../FirebaseConfig";
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
import { getAuth } from "firebase/auth";

/**
 * Add Exercises to the Firebase Firestore Database
 *
 * @param props
 * @returns
 */
export default function AddExerciseScreen(props: IAddExerciseScreenProps) {
  //allows usage of context values from AppState.tsx
  const ctx = useAppContext();

  const [exercise, setExercise] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Clock />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logoutButtonFunction}
        >
          <Text style={{ color: defined_colors.white, fontSize: 30 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <BigButton key="big generate routines button" onPress={bigButtonFunction}>
        {"GENERATE!"}
      </BigButton>
      <Picker
        selectedValue={routineDay}
        onValueChange={(itemValue, _) => setRoutineDay(itemValue)}
        style={styles.day_picker}
      >
        {defined_routines.map((routine, index) => (
          <Picker.Item
            label={routine.name}
            value={routine.name}
            key={index}
            color={defined_colors.white}
            style={styles.day_picker}
          />
        ))}
      </Picker>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  day_picker: ViewStyle;
  header: ViewStyle;
  logoutButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: defined_colors.dark_grey,
  },
  day_picker: {
    height: "20%",
    width: "100%",
    backgroundColor: defined_colors.green,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "20%",
    borderWidth: 1,
    borderColor: defined_colors.red,
  },
  logoutButton: {
    marginLeft: "auto",
    zIndex: 1,
    height: "60%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defined_colors.purple,
    opacity: 0.6,
  },
});
