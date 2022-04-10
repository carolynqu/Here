import { StyleSheet, Text, View } from "react-native";
import theme from "../../theme.style";
import ProfilePic from "../../ProfilePic";
import { globalStyles } from "../../GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import themeStyle from "../../theme.style";

const getMinutes = (t) => {
  //https://stackoverflow.com/questions/7709803/javascript-get-minutes-between-two-dates
  return Math.round(((t % 86400000) % 3600000) / 60000);
};
const Session = ({ session }) => {
  const start = new Date(session.start);
  const end = new Date(session.end);
  const now = new Date();
  var time;
  if (start - now > 0) {
    time = (
      <View style={styles.startTimeBox}>
        <Text style={styles.timeText}>
          {getMinutes(start - now)} min until event starts
        </Text>
      </View>
    );
  } else if (end - now > 0) {
    time = (
      <View
        style={[styles.startTimeBox, { backgroundColor: theme.primaryColor }]}
      >
        <Text style={styles.timeText}>{getMinutes(end - now)} min left</Text>
      </View>
    );
  } else {
    //Event passed
    return <></>;
  }
  return (
    <View style={styles.bigContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.subContainer}>
          <ProfilePic size={50} url={session.organizer.picture} />

          <View style={{ paddingTop: 20, paddingLeft: 5 }}>
            <Text
              style={{
                fontFamily: "LatoSemiBold",
                fontSize: 20,
                paddingBottom: 1,
                paddingLeft: 3,
              }}
            >
              {session.organizer.firstName} {session.organizer.lastName}
            </Text>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialIcons
                name="location-pin"
                size={24}
                color={theme.primaryColor}
              />
              <Text style={{ fontFamily: "LatoRegular", fontSize: 17 }}>
                {session.location}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "LatoRegular",
            fontSize: 20,
            paddingVertical: 10,
          }}
        >
          {session.name}
        </Text>
      </View>

      {time}
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    borderWidth: 0.5,
    borderColor: theme.lightText,
    borderRadius: 10,
    marginTop: 30,
  },
  nameAndLocation: {},
  upcomingEvent: {
    backgroundColor: "rgba(0,0,255,0.2)",
  },
  pastEvent: {
    backgroundColor: "rgba(255,0,0,0.2)",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },

  timeText: {
    fontFamily: "LatoSemiBold",
    fontSize: 12,
  },
  startTimeBox: {
    height: 30,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: theme.backgroundColor,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Session;
