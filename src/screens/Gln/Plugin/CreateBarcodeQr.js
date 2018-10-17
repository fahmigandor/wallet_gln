import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { AppRegistry, StyleSheet, View, TextInput } from 'react-native';
 
export default class CreateBarcodeQr extends Component {
	constructor(props) {
		super(props);
			this.state = {
			isLoading: true,
			text: ''
		}
	}
 
	componentDidMount() {
    	var qr = this.props.qr;
		this.setState({ text: qr });
	}
 
	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.text}
				/>
				<View style={{margin:10}}>
					<QRCode
						value={this.state.text}
						size={200}
						bgColor='purple'
						fgColor='white'/>
				</View>
			</View>
		);
	};
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    input: {
        height: 40,
        width:"60%",
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});