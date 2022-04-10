import { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PresentationContainer from "../PresentationContainer";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";

const Invite = ({ navigation }) => {
  return (
    <PresentationContainer title="Invite" navigation={navigation}>
    	<View>
    		<Text>
    			Hello!
    		</Text>
    	</View>
    </PresentationContainer>
  );
};
const styles = StyleSheet.create({
});
export default Invite;
