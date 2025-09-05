/**
 * LoginScreen.tsx
 *
 * Sign-in Screen.
 */

import {
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";
import route_names, { ILoginScreenProps } from "../routes";
import defined_colors from "../components/util/colors";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen(props: ILoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) props.navigation.navigate(route_names.GENERATE_SCREEN);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const moveToSignUp = async () => {
    props.navigation.navigate(route_names.SIGN_UP_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={moveToSignUp}>
        <Text style={styles.text}>Sign-up/Make-account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defined_colors.soft_white,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
    color: defined_colors.dark_blue,
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
  text: {
    color: defined_colors.black,
    fontSize: 18,
    fontWeight: "600",
  },
});
