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

export default function SignOutScreen(props: ISignOutScreenProps) {
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      props.navigation.replace(route_names.SIGN_UP_SCREEN);
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <TouchableOpacity onPress={() => auth.signOut()}>
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
});
