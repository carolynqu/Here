import { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { Input, Error } from "../Fields";
import PresentationContainer from "../PresentationContainer";
import { AuthContext } from "../../AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";

const MAX_EVENT_NAME_LENGTH = 27;
const MAX_LOCATION_NAME_LENGTH = 27;
const Add = ({ navigation }) => {
  let dt = new Date();
  dt.setHours(dt.getHours() + 1);
  const [from, setFrom] = useState(new Date());
  const [until, setUntil] = useState(dt);
  //const { newEvent } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = (values) => {
    console.log(values);
    console.log(from);
    console.log(until);
  };
  return (
    <PresentationContainer title="Add New Event" navigation={navigation}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: theme.horizMargin,
          paddingTop: 30,
        }}
      >
        <Text style={globalStyles.inputBoxHeader}>Event Name</Text>

        <Input
          name="eventName"
          control={control}
          required
          validate={(value) => value.length <= MAX_EVENT_NAME_LENGTH}
        />
        {errors.eventName && errors.eventName.type == "required" && (
          <Error>Input is mandatory.</Error>
        )}
        {errors.eventName && errors.eventName.type == "validate" && (
          <Error>
            Event name may not exceed {MAX_EVENT_NAME_LENGTH} characters.
          </Error>
        )}

        <Text style={[globalStyles.inputBoxHeader, { marginTop: 10 }]}>
          Location
        </Text>

        <Input
          name="locationName"
          control={control}
          required
          validate={(value) => value.length <= MAX_LOCATION_NAME_LENGTH}
        />
        {errors.locationName && errors.locationName.type == "required" && (
          <Error>Input is mandatory.</Error>
        )}
        {errors.locationName && errors.locationName.type == "validate" && (
          <Error>
            Location name may not exceed {MAX_LOCATION_NAME_LENGTH} characters.
          </Error>
        )}

        <Text style={[globalStyles.inputBoxHeader, { marginTop: 10 }]}>
          From When
        </Text>

        <View style={styles.dateTimeContainer}>
          <DateTimePicker
            testID="fromDateTime"
            value={from}
            mode={"datetime"}
            is24Hour={true}
            onChange={(event, date) => setFrom(date)}
          />
        </View>

        <Text style={[globalStyles.inputBoxHeader, { marginTop: 10 }]}>
          Until When
        </Text>

        <View style={styles.dateTimeContainer}>
          <DateTimePicker
            testID="toDateTime"
            value={until}
            mode={"datetime"}
            is24Hour={true}
            onChange={(event, date) => setUntil(date)}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Pressable
          style={[globalStyles.buttonContainer]}
          onPress={handleSubmit}
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
  dateTimeContainer: {
    paddingBottom: 10,
  },
});
export default Add;
