import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { Input, PasswordInput, Error } from "../Fields";
import { ScrollView } from "react-native-gesture-handler";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";

const LogIn = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = (values) => {
      signIn({ email: values.email, password: values.password });
  };
  return (
    <View style={{ marginTop: 80, marginHorizontal: theme.horizMargin }}>
      <Text style={styles.header}>Log In</Text>

      <ScrollView
        showsVerticalScrollIndicator="false"
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.welcomeText}> Welcome Back! </Text>
        <View style={{ marginTop: 60 }}>
          <View style={{ marginBottom: 30 }}>
            <Text style={globalStyles.inputBoxHeader}>School Email:</Text>
            <Input
              name="email"
              control={control}
              required
              pattern={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
            />
            {errors.email && errors.email.type == "required" && (
              <Error>Required field.</Error>
            )}
            {errors.email && errors.email.type == "pattern" && (
              <Error>Invalid email.</Error>
            )}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={globalStyles.inputBoxHeader}>Password:</Text>
            <PasswordInput
              name="password"
              control={control}
              required
              placeHolder="hello"
            />
            {errors.password && errors.password.type == "required" && (
              <Error>Required field.</Error>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.forgotPassword}> Forgot password? </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Pressable
            style={[globalStyles.buttonContainer]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={[globalStyles.buttonText, { color: "white" }]}>
              Log In
            </Text>
          </Pressable>
        </View>

        <View
          style={{ marginTop: 20, paddingBottom: 400, alignItems: "center" }}
        >
          <Text style={[styles.forgotPassword, { color: theme.darkText }]}>
            Don't have an account?{" "}
            <Text
              style={[styles.forgotPassword, { textAlign: "center" }]}
              onPress={() => navigation.navigate("Sign Up")}
            >
              Sign Up.
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "LatoSemiBold",
    fontSize: 20,
    color: theme.text,
  },
  welcomeText: {
    marginTop: 70,
    fontFamily: "LatoSemiBold",
    fontSize: 45,
    color: theme.blackColor,
    textAlign: "center",
  },
  forgotPassword: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: theme.primaryColor,
    textAlign: "right",
  },
});
export default LogIn;
