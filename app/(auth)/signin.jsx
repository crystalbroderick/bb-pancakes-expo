import { Btn } from "@/components/buttons";
import { InputField, PasswordInput } from "@/components/forms";
import { COLORS, FONTS } from "@/constants/theme.js";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/utils/supabase";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import HorizontalDividerWithLabel from "../../components/Divider";
import SafeScreen from "../../components/SafeScreen";

const SigninScreen = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Login failed", error.message);
        setError(error.message);
      }
    } catch (err) {
      console.error("Unexpected error in signInWithPassword:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/(tabs)/");
    }
  }, [session]);

  return (
    <SafeScreen bg={theme.accent_blue} paddingHorizontal>
      <View style={styles.container}>
        {/* Form Header */}
        <View style={styles.titleRow}>
          <Image
            source={require("@/assets/images/pancakes-logo.png")}
            style={[styles.logo, { tintColor: COLORS.yellow }]}
          />

          <View style={styles.textContainer}>
            <Text style={[FONTS.title, { color: "white" }]}>Sign in</Text>
          </View>
        </View>
        {error && <Text style={styles.error}>*{error}</Text>}
        {/* Form Fields*/}
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <InputField
            control={control}
            name="email"
            label="Email"
            placeholder=""
            textColor={COLORS.white}
            useDarkBackground
          />
        </View>
        <View style={styles.verticallySpaced}>
          <PasswordInput
            control={control}
            name="password"
            label="Password"
            type="password"
            textColor={COLORS.white}
            useDarkBackground
          />
        </View>
        <Btn title="Sign in" onPress={handleSubmit(onSubmit)}></Btn>
        <HorizontalDividerWithLabel accent={theme.accent} textColor="white">
          <Link href="/(auth)/signup">New user? Sign up here</Link>
        </HorizontalDividerWithLabel>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    marginTop: 10,
    marginBottom: 10,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  textContainer: {
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
  },
  error: {
    color: "white",
  },
});

export default SigninScreen;
