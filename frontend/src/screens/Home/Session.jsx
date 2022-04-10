import { StyleSheet, Text, View } from 'react-native';
import theme from '../../theme.style';
import ProfilePic from '../../ProfilePic';

const getMinutes = (t) => { //https://stackoverflow.com/questions/7709803/javascript-get-minutes-between-two-dates
	return Math.round(((t % 86400000) % 3600000) / 60000);
}
const Session = ({ session }) => {
	const start = new Date(session.start);
	const end = new Date(session.end);
	const now = new Date();
	var time;
	if(start-now > 0){
		time = <Text style={styles.upcomingEvent}>
			{getMinutes(start-now)} min until event starts
			</Text>
	}
	else if(end-now > 0){
		time = <Text style={styles.pastEvent}>
			{getMinutes(end-now)} min left
			</Text>
	}
	else{ //Event passed
		return <></>
	}
  	return (
  	  	<View>
  	  		<ProfilePic size={12} url={session.organizer.picture}/>
  	  		<Text>
  	  			{session.organizer.firstName} {session.organizer.lastName} |
  	  		</Text>
  	  		<Text>
  	  			{session.name}
  	  		</Text>
  	  		<Text>
  	  			{session.location}
  	  		</Text>
  	  		{time}
  	  	</View>
  	);
}

const styles = StyleSheet.create({
	upcomingEvent: {
		backgroundColor: "rgba(0,0,255,0.2)",
	},
	pastEvent: {
		backgroundColor: "rgba(255,0,0,0.2)",
	},
});
export default Session;
