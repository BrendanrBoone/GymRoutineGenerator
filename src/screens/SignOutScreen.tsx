/**
 * SignOutScreen.tsx
 *
 * SignOut Screen.
 */

import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../FirebaseConfig";
import route_names, { ISignOutScreenProps } from "../routes";
import { getAuth } from "firebase/auth";
import defined_colors from "../components/util/colors";
import useAppContext from "../components/hooks/useAppContext";

export default function SignOutScreen(props: ISignOutScreenProps) {
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      props.navigation.replace(route_names.LOGIN_SCREEN);
    }
  });
  const ctx = useAppContext();
  const user = ctx.auth.currentUser;
  const user_email = user ? user.email : "User not detected";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{user_email}</Text>
      <Text style={styles.title}>Sign Out?</Text>
      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
