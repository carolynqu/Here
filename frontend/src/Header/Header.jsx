import { StyleSheet, Text, View } from "react-native";
import theme from "../theme.style";
import { globalStyles } from "../GlobalStyles";

const Header = ({ profile }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.navigationContainer}>
        <Text style={[globalStyles.navigationHeader]}>StudyWithMe</Text>
      </View>
      <View style={styles.profileButton}>{profile}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    paddingTop: 60,
  },
  headerContainer: { height: 110, position: "relative", paddingHorizontal: 15 },
  profileButton: {
    position: "absolute",
    right: 15,
    top: 60,
  },
});
export default Header;
