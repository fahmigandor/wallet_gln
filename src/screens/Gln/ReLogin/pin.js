import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Button } from "native-base";
import PinView from 'react-native-pin-view'

export default class Pin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
		this.pin = [0,0,0,0];
	}
 
	componentDidMount() {
    	this.pin = this.props.pin;
		this.setState({isLoading: false});
	}

	callback(status){
		if(status){
			this.props.callback(true);
		}else{
			this.props.callback(false);
		}
	}

    render() {
        return (
			<View style={styles.MainContainer}>
				<PinView 
					password={ this.pin }
				    onSuccess={(pin) =>{this.callback(true)} }
				    onFailure={ (pin) =>{this.callback(false)} }
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