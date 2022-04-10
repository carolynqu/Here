import { StyleSheet, Text, View } from "react-native";

import theme from "../../theme.style";

const Friend = ({ friend }) => {
  return (
    <View>
      <Text style={styles.friendName}>
        {friend.firstName} {friend.lastName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  friendName: {
    fontFamily: "LatoRegular",
    fontSize: 20,
    color: theme.darkText,
    marginLeft: 20,
    paddingBottom: 10,
  },
});
export default Friend;
