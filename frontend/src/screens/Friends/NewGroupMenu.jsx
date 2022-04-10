import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import { Input, Error } from "../Fields";
import PresentationContainer from "../PresentationContainer";
import { AuthContext } from "../../AuthContext";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const MAX_GROUP_NAME_LENGTH = 18;
const NewGroupMenu = ({ navigation }) => {
  const { newGroup } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = (values) => {
    newGroup({
      id: undefined,
      picture: "url",
      name: values.groupName,
      members: [],
    });
    navigation.goBack();
  };
  return (
    <PresentationContainer title="Make New Group" navigation={navigation}>
      <TouchableOpacity style={styles.addPhoto}>
        <Text style={styles.addPhotoText}>Add Photo</Text>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          paddingHorizontal: theme.horizMargin,
          paddingTop: 30,
        }}
      >
        <Text style={globalStyles.inputBoxHeader}>New Group Name</Text>

        <Input
          name="groupName"
          control={control}
          required
          validate={(value) => value.length <= MAX_GROUP_NAME_LENGTH}
        />
        {errors.groupName && errors.groupName.type == "required" && (
          <Error>Input is mandatory.</Error>
        )}
        {errors.groupName && errors.groupName.type == "validate" && (
          <Error>
            Group name may not exceed {MAX_GROUP_NAME_LENGTH} characters.
          </Error>
        )}
      </View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Pressable
          style={[globalStyles.buttonContainer]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[globalStyles.buttonText, { color: "white" }]}>
            Next
          </Text>
        </Pressable>
      </View>
    </PresentationContainer>
  );
};
const styles = StyleSheet.create({
  addPhoto: {
    borderRadius: 90,
    backgroundColor: theme.primaryColor,
    height: 150,
    width: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  addPhotoText: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
});
export default NewGroupMenu;
