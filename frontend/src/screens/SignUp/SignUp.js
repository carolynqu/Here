import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { Input, PasswordInput, Error } from "../Fields";
import { signUp } from "../../api";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";

const SignUp = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = (values) => {
    signUp(values.firstName, values.lastName, values.email, values.password);
  };
  return (
    <View style={{ marginTop: 80, marginHorizontal: 30 }}>
      <Text style={styles.header}>Sign Up</Text>

      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ marginTop: 50 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={globalStyles.inputBoxHeader}>First Name:</Text>
            <Input name="firstName" control={control} required autoCapitalize />
            {errors.firstName && errors.firstName.type == "required" && (
              <Error>Required field.</Error>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={globalStyles.inputBoxHeader}>Last Name:</Text>
            <Input name="lastName" control={control} required autoCapitalize />
            {errors.lastName && errors.lastName.type == "required" && (
              <Error>Required field.</Error>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
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

          <View style={{ marginBottom: 20 }}>
            <Text style={globalStyles.inputBoxHeader}>Password:</Text>
            <PasswordInput
              name="password"
              control={control}
              required
              pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/} //https://www.w3schools.com/howto/howto_js_password_validation.asp
            />
            {errors.password && errors.password.type == "required" && (
              <Error>Required field.</Error>
            )}
            {errors.password && errors.password.type == "pattern" && (
              <Error>
                Password must contain at least one number, one uppercase and
                lowercase letter, and at least 8 or more characters.
              </Error>
            )}
          </View>

          <View>
            <Text style={globalStyles.inputBoxHeader}>Confirm Password:</Text>
            <PasswordInput
              name="confirmPassword"
              control={control}
              required
              validate={(value) =>
                control._fields.password &&
                value == control._fields.password._f.value
              }
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type == "required" && (
                <Error>Required field.</Error>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type == "validate" && (
                <Error>Passwords must match.</Error>
              )}
          </View>

          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Pressable
              style={globalStyles.buttonContainer}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={[globalStyles.buttonText, { color: "white" }]}>
                Sign Up
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={[styles.forgotPassword, { color: theme.darkText }]}>
              Already have an account?{" "}
              <Text
                style={[styles.forgotPassword, { textAlign: "center" }]}
                onPress={() => navigation.navigate("Log In")}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: theme.primaryColor,
    textAlign: "right",
  },
  header: {
    fontFamily: "LatoSemiBold",
    fontSize: 20,
    color: theme.text,
  },
  error: {
    color: "red",
  },
  input: {
    borderStyle: "solid",
    backgroundColor: "pink",
  },
  link: {
    color: "blue",
  },
  container: {
    marginTop: 50,
  },
});
export default SignUp;
