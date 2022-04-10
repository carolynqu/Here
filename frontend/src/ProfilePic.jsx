import { StyleSheet, View } from 'react-native';
const ProfilePic = ({ url, size=20 }) => {
	var profilePicStyle = {
		borderRadius: 90,
		backgroundColor: "purple",
		width: size,
		height: size,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	}
	return (
		<View style={profilePicStyle}/>
	);
}
const styles = StyleSheet.create({
});
export default ProfilePic;
