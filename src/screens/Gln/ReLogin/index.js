import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Button } from "native-base";

export default class ReLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			email: '',
			password: '',
		}
		this.pass = "";
	}
 
	componentDidMount() {
    	this.pass = this.props.pass;
		this.setState({isLoading: false});
	}

	callback(){
		if(this.state.password == this.pass){
			this.props.callback(true);
		}else{
			this.props.callback(false);
		}
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
				<TextInput 
					style={styles.TextInputStyleClass}
					onChangeText={(text) => this.setState({password:text})}
					value={this.state.password}
					underlineColorAndroid='transparent'
					placeholder="Password"
				/>
				<Button info rounded block 
					style={{marginTop: 15, margin:5}}
					onPress={() => {this.callback()}}>
					<Text>
						Send
					</Text>
				</Button>
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