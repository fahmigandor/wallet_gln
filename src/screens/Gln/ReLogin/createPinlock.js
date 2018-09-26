import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Button } from "native-base";
import PINCode from '@haskkor/react-native-pincode'

export default class CreatePinLock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: '',
		}
	}
 
	// componentDidMount() {
	// 	this.setState({isLoading: false});
	// }

	callback(){
		this.props.callback(true);
	}

	savePin(pin){
		console.warn(pin);
		var pin = pin.split("").map(Number);
		console.warn(JSON.stringify(JSON.parse("[" + string + "]")));
        AsyncStorage.setItem('pin',pin);
		this.callback();
	}
  
	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
				<ActivityIndicator />
				</View>
			);
		}
		return (
			<View style={styles.MainContainer}>
				<PINCode 
					styleLockScreenButton={styles.lockScreenButton}
					styleLockScreenColorIcon="#fff"
					status={'choose'}
					passwordLength={4}
					storePin={(pin) => {this.savePin(pin)}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	lockScreenButton:{
		backgroundColor: "#000", 
		borderRadius: 5, 
		padding : 5
	},
	MainContainer :{
		justifyContent: 'center',
		flex:1,
		margin: 7,
	},
	rowViewContainer: {
		borderBottomWidth: 1,
		borderColor: '#fff',
		color:"#fff",
		fontSize: 17,
		padding: 10
	},
	TextInputStyleClass:{
		textAlign: 'center',
		height: 40,
		borderWidth: 1,
		borderColor: '#009688',
		borderRadius: 7 ,
		backgroundColor : "#FFFFFF"
	}
});