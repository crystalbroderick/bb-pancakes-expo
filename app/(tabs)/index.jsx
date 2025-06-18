import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/ThemedText";
import { FONTS } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAuth } from "../../context/AuthContext";
export default function Index() {
  const { session, signin } = useAuth();

  // if(session) return <Redirect href="/settings"/>

  return (
    <SafeScreen>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <ThemedText style={FONTS.title}>You are logged in!</ThemedText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headline: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
