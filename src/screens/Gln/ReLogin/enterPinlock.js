import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Button } from "native-base";
import PINCode from '@haskkor/react-native-pincode'

export default class EnterPinLock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			email: '',
			password: '',
		}
		this.pin = "";
	}
 
	componentDidMount() {
    	this.pin = this.props.pin;
		this.setState({isLoading: false});
	}

	callback(pin){
		if(pin == this.pin){
			this.props.callback(true);
		}else{
			this.props.callback(false);
		}
	}

	savePin(pin){
		alert(pin);
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
					status={'enter'}
					passwordLength={4}
					handleResultEnterPin={(pin) => this.callback(pin)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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