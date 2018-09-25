import React, { Component, PropTypes } from 'react';
import { Image, TextInput, ActivityIndicator, TouchableOpacity, ListView, Platform, AsyncStorage, Modal, ScrollView, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import CustomHeader from "../../../components/CustomHeader";
import {
	Container,
	Content,
	Text,
	Item,
	Input,
	Button,
	Icon,
	View,
	Left,
	Right,
	Body,
	Header,
	List,
	ListItem,
	Toast,
	Picker
} from "native-base";
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";
import AutoComplete from 'native-base-autocomplete';
import SelectBox from "./SelectBox";
import ReLogin from "../ReLogin";

type Props = {
  navigation: () => void
};
declare type Any = any;
const token = null;
class Transfer extends Component {
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			listWallet : [],
			fFrom:"",
			fDestination:"",
			fAmount:"",
			isLoading : false,
			boolFrom: false,
			boolTo: false
		}
		AsyncStorage.getItem('token', (err, result) => {
			this.token = result;
			this.getListWallet();
			this.setState({token:this.token});
		});
	}

	getListWallet(){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/list/address/'+this.token, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
		.then((response) => response.text())
		.then((responseJson) => {
			try{
				var obj = JSON.parse(responseJson);
				console.warn(JSON.stringify(obj))
				if(typeof obj != "undefined"){
					if(typeof obj.success != "undefined" && obj.success == false){
						alert("Invalid Data.");
						this.setState({isLoading:false});
					}else{
						this.setState({
							listWallet:obj.data, 
							isLoading:false
						});
					}
				}
			}catch(err){
				alert("Invalid Data");
				this.setState({isLoading:false});
			}
		})
		.catch((error) => {
			alert("Invalid Data Or Check Your Connection.");
			this.setState({isLoading:false});
		});
	}

	callbackReLogin(status = false){

	}

	reLogin(){

	}

	sendTransfer(){
		// AsyncStorage.getItem('token', (err, result) => {
		// 	if(typeof obj != "undefined" && result != null && result != ""){
		// 		this.props.navigation.navigate("LoginUlang");
		// 	}
		// });
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/send/'+this.token+'/'+this.state.fFrom, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({
				'to_address': this.state.fDestination,
				'amount': this.state.fAmount
			})
		})
		.then((response) => response.text())
		.then((responseJson) => {
			try{
				var obj = JSON.parse(responseJson);
				if(typeof obj != "undefined"){
					if(typeof obj.success != "undefined" && obj.success == false){
						alert("Invalid Data.");
						this.setState({isLoading:false});
					}else if(obj.message != "undefined"){
						alert(obj.message);
						this.setState({isLoading:false});
					}else{
						alert("Transfer Successfully.");
						this.setState({
							fFrom:"",
							fDestination:"",
							fAmount:"",
							isLoading:false
						});
					}
				}
			}catch(err){
				alert("Invalid Data");
				this.setState({isLoading:false});
			}
		})
		.catch((error) => {
			alert("Invalid Data Or Check Your Connection.");
			this.setState({isLoading:false});
		});
	}

	openFrom(status = true){
		if(status){
    		this.setState({boolFrom:!this.state.boolFrom});
		}else{
    		this.setState({boolTo:!this.state.boolTo});
		}
	}

	callBackFrom = (ffrom) => {
		this.setState({
			fFrom:ffrom,
			boolFrom:!this.state.boolFrom
		});
	}
	
	callBackTo = (fdestination) => {
		this.setState({
			fDestination:fdestination,
			boolTo:!this.state.boolTo
		});
	}

    render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.background}>
					<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
						<Text style={styles.text_aktif}>Loading....</Text>
						<ActivityIndicator style={{
							alignItems: 'center',
							justifyContent: 'center',
							padding: 8}}   size="large"
							color="#aa00aa"/>
					</View>
				</View>
			);
		}
    	const navigation = this.props.navigation;
        return (
		<Container>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolFrom}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{height: Dimensions.get("window").height,}}>
				{/*<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
					<View style={{
						width: Dimensions.get("window").width * 9 / 10,
						height: 300,}}>*/}
						<Header transparent={true} style={{ backgroundColor:"#001f4d"}}>
							<Left>
								<Button transparent onPress={() => this.setState({boolFrom:!this.state.boolFrom})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
							<Body>
								<Text>From Address</Text>
							</Body>
							<Right>
							</Right>
						</Header>
						<ScrollView style={styles.container}>
							<SelectBox data={this.state.listWallet} callback={this.callBackFrom} />
						</ScrollView>
					{/*</View>*/}
				</View>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolTo}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{height: Dimensions.get("window").height,}}>
				{/* <View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
					<View style={{
						width: Dimensions.get("window").width * 9 / 10,
						height: 300,}}>*/}
						<Header transparent={true} style={{ backgroundColor:"#001f4d"}}>
							<Left>
								<Button transparent onPress={() => this.setState({boolTo:!this.state.boolTo})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
							<Body>
								<Text>Destination</Text>
							</Body>
							<Right>
							</Right>
						</Header>
						<ScrollView style={styles.container}>
							<SelectBox data={this.state.listWallet} callback={this.callBackTo} />
						</ScrollView>
					{/* </View> */}
				</View>
			</Modal>
			<Image
			source={require("../../../../assets/bg-transparent.png")}
			style={styles.container}
			>
			<CustomHeader hasTabs navigation={navigation} />
			<Content>
				<View style={{marginTop: Dimensions.get("window").height * 0 / 10}}>
					<View style={{margin: Dimensions.get("window").width * 1 / 10}}>
					<View style={styles.form}>
						<TouchableOpacity onPress={() => { this.openFrom() }}>
						<View pointerEvents='none'>
							<TextInput 
								editable={false}
								style={styles.TextInputStyleClass}
								value={this.state.fFrom}
								underlineColorAndroid='transparent'
								placeholder="Destination"
							/>
						</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { this.openFrom(false) }}>
						<View pointerEvents='none'>
							<TextInput 
								editable={false}
								style={styles.TextInputStyleClass}
								value={this.state.fDestination}
								underlineColorAndroid='transparent'
								placeholder="Destination"
							/>
						</View>
						</TouchableOpacity>
						<TextInput 
							style={styles.TextInputStyleClass}
							onChangeText={(amount) => this.setState({fAmount: amount})}
							value={this.state.fAmount}
							underlineColorAndroid='transparent'
							placeholder="Amount"
						/>
						<Button info rounded block 
							style={{marginTop: 15, margin:5}}
							onPress={() => {this.sendTransfer()}}>
							<Text>
								+ Send
							</Text>
						</Button>
					</View>
					</View>
				</View>
			</Content>
			</Image>
		</Container>

        );
    }
}

export default Transfer;