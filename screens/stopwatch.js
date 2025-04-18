import React, { useState, useEffect,forwardRef, useImperativeHandle } from "react"; 
import { 
	SafeAreaView, 
	StyleSheet, 
	Text, 
	View, 
	Button, 
} from "react-native";
import { globalStyle } from "../styles/globalStyle";


 const Stopwatch = (props, ref) => { 

  useImperativeHandle(ref, () => ({
    sayHi: () => { sayHi() }
  }))
  const sayHi = () => {
    console.log("Hello")
    setExpiryDate(new Date('2024-12-31 22:10')); 
		setDatePickerVisible(false); 

  }


	const [isDatePickerVisible, setDatePickerVisible] = useState(false); 
	const [expiryDate, setExpiryDate] = useState( new Date() ); 
	// Default to current date and time 
	const [timeUnits, setTimeUnits] = useState({ 
	//	years: 0, 
		days: 0, 
		hours: 0, 
		minutes: 0, 
		seconds: 0, 
	}); 

	useEffect(() => { 
		const calculateTimeUnits = (timeDifference) => { 
			const seconds = Math.floor( 
				timeDifference / 1000 
			); 
			setTimeUnits({ 
				// years: Math.floor( 
				// 	seconds / (365 * 24 * 60 * 60) 
				// ), 
				days: Math.floor( 
					(seconds % (365 * 24 * 60 * 60)) / 
						(24 * 60 * 60) 
				), 
				hours: Math.floor( 
					(seconds % (24 * 60 * 60)) / (60 * 60) 
				), 
				minutes: Math.floor( 
					(seconds % (60 * 60)) / 60 
				), 
				seconds: seconds % 60, 
			}); 
		}; 

		const updateCountdown = () => { 
			const currentDate = new Date().getTime(); 
			const expiryTime = expiryDate.getTime(); 
			const timeDifference = expiryTime - currentDate; 

			if (timeDifference <= 0) { 
				// Countdown finished 
				calculateTimeUnits(0); 
			} else { 
				calculateTimeUnits(timeDifference); 
			} 
		}; 

		updateCountdown(); 
		const interval = setInterval(updateCountdown, 1000); 

   
		return () => clearInterval(interval); 

    
	}, [expiryDate]); 



  

	const formatTime = (time) => { 
		return time.toString().padStart(2, "0"); 
	}; 

	const handleStartTimer = () => { 
		setDatePickerVisible(true); 
	}; 

	const handleResetTimer = () => { 
		setExpiryDate(new Date()); 
		// Reset to current date and time 
	}; 

	const handleDateConfirm = () => { 
		setExpiryDate(new Date('2024-12-31 22:10')); 
		setDatePickerVisible(false); 
	}; 

	const handleDateCancel = () => { 
		setDatePickerVisible(false); 
	}; 

	return ( 
		<SafeAreaView style={styles.container}> 
			<View style={styles.container}> 
				<View style={globalStyle.dashTimeHolder} >
				<View style={globalStyle.dashTimeLabel} >
					<Text style={globalStyle.dashTime} >{formatTime(timeUnits.days)}</Text>
					<Text style={globalStyle.dashTimeLabel} >Days</Text>
				</View>
				<View style={globalStyle.dashTimeLabel} >
					<Text style={globalStyle.dashTime} >{formatTime(timeUnits.hours)}</Text>
					<Text style={globalStyle.dashTimeLabel}>Hours</Text>
				</View>
				<View style={globalStyle.dashTimeLabel} >
					<Text style={globalStyle.dashTime} >{formatTime(timeUnits.minutes)}</Text>
					<Text style={globalStyle.dashTimeLabel} >Minutes</Text>
				</View>
				<View style={globalStyle.dashTimeLabel} >
					<Text style={globalStyle.dashTime} >{formatTime(timeUnits.seconds)}</Text>
					<Text style={globalStyle.dashTimeLabel} >Seconds</Text>
				</View>
				</View>
			</View> 
		</SafeAreaView> 
	); 
}; 

const styles = StyleSheet.create({ 

	timer: { 
		flexDirection: "row", 
		alignItems: "center", 
	}, 
	timeUnit: { 
		fontSize: 24, 
		fontWeight: "bold", 
		paddingHorizontal: 10, 
		paddingVertical: 5, 
	}, 
	yearUnit: { 
		backgroundColor: "blue", 
		borderRadius: 15, 
		color: "white", 
	}, 
	dayUnit: { 
		backgroundColor: "#3498db", 
		borderRadius: 15, 
		color: "white", 
	}, 
	hourUnit: { 
		backgroundColor: "#27ae60", 
		borderRadius: 15, 
		color: "white", 
	}, 
	minuteUnit: { 
		backgroundColor: "#f39c12", 
		borderRadius: 15, 
		color: "white", 
	}, 
	secondUnit: { 
		backgroundColor: "#9b59b6", 
		borderRadius: 15, 
		color: "white", 
	}, 
	timeSeparator: { 
		fontSize: 24, 
		fontWeight: "bold", 
		marginHorizontal: 5, 
	}, 

}); 


export default forwardRef(Stopwatch);

// export default function Review() {
//     return (
//       <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
//       <Text style={globalStyle.text}>Review page </Text>
//     </View>
//     );
// }


