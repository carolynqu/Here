import { StyleSheet, Text, View } from "react-native";
import Sessions from "./Sessions";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";

const Home = () => {
  return (
    <View style={{ marginHorizontal: theme.horizMargin }}>
      <Text style={globalStyles.mainPageHeader}>Current Events</Text>
      <Sessions />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    margin: 10,
    color: theme.darkText,
  },
});
export default Home;
