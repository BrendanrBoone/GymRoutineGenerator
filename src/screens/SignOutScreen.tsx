/**
 * SignOutScreen.tsx
 *
 * SignOut Screen.
 */

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";
import route_names, { ISignOutScreenProps } from "../routes";
import { getAuth } from "firebase/auth";
import defined_colors from "../components/util/colors";

export default function SignOutScreen(props: ISignOutScreenProps) {
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      props.navigation.replace(route_names.LOGIN_SCREEN);
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out?</Text>
      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
});
