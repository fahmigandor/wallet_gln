import React, { Component } from 'react';

import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';

export default class SelectBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			email: '',
			password: '',
		}
		AsyncStorage.getItem('token', (err, result) => {
			if(typeof obj != "undefined" && result != null && result != ""){
				this.props.navigation.navigate("LoginUlang");
			}
		});
	}
 
	componentDidMount() {
    	var data = this.props.data;
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			isLoading: false,
			dataSource: ds.cloneWithRows(data),
		}, function() {
			this.arrayholder = data ;
		});
	}

	GetListViewItem(status) {
		this.props.sendStatus(status);
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
					onChangeText={(text) => this.SearchFilterFunction(text)}
					value={this.state.text}
					underlineColorAndroid='transparent'
					placeholder="Search Here"
				/>
			<ListView
				dataSource={this.state.dataSource}
				renderSeparator= {this.ListViewItemSeparator}
				renderRow={(rowData) => <Text style={styles.rowViewContainer} 
				onPress={this.GetListViewItem.bind(this, rowData.address)} >{rowData.label}</Text>}
				enableEmptySections={true}
				style={{marginTop: 10}}
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