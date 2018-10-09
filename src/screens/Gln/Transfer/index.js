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
import EnterPin from "../ReLogin/enterPinlock";
import CreatePin from "../ReLogin/createPinlock";
import Pin from "../ReLogin/pin";
import ReadBarcode from "../Plugin/ReadBarcode";

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
			counterLogin: 0,
			pin: [],
			boolPin: false,
			boolFrom: false,
			boolTo: false,
			boolBarcode: false
		}
		AsyncStorage.getItem('token', (err, result) => {
			this.token = result;
			AsyncStorage.getItem('pass', (err, result) => {
				this.pass = result;
			});
			AsyncStorage.getItem('pin', (err, result) => {
				this.setState({pin : JSON.parse(result)});
			});
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
				if(typeof obj != "undefined"){
					if(typeof obj.success != "undefined" && obj.success == false){
						alert("Invalid Data");
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

	sendTransfer(){
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
			console.warn("run transfer");
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

	openModal(code){
		switch(code) {
		    case "from":
	    		this.setState({boolFrom:!this.state.boolFrom});
	        break;
		    case "to":
	    		this.setState({boolTo:!this.state.boolTo});
	        break;
		    case "barcode":
	    		this.setState({boolBarcode:!this.state.boolBarcode});
	        break;
		    case "ReLogin":
	    		this.setState({boolReLogin:!this.state.boolReLogin});
	        break;
		    default:
		    	alert("Nothing any statement");
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

	callBackPin = (status = false) => {
		if(status){
			this.setState({boolPin:!this.state.boolPin, counterLogin:0}, function(){
				this.sendTransfer();
			});
		}else{
			this.setState({counterLogin:(this.state.counterLogin + 1)}, function(){
				alert("Wrong Pin "+this.state.counterLogin+"x.");
				if(this.state.counterLogin == 3){
					this.setState({boolPin:!this.state.boolPin, counterLogin:0}, function(){
					    AsyncStorage.setItem('token',"");
					    AsyncStorage.setItem('data_user',"");
					    AsyncStorage.setItem('pass',"");
					    this.props.navigation.navigate("Login");
					});
				}
			});
		}
	}
	
	callBackBarcode = (text) => {
		this.setState({
			fDestination: text,
			boolBarcode:!this.state.boolBarcode
		});
	}

	openPin(){
		// console.warn(this.state.pin);return;
		if(typeof this.state.pin != "undefined" && this.state.pin != null && this.state.pin != "" && this.state.pin.length > 0){
			this.setState({
				boolPin:!this.state.boolPin
			});
		}else{
			alert("Please Set Your Pin.")
		}
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
							color="#fff"/>
					</View>
				</View>
			);
		}
    	const navigation = this.props.navigation;
        return (
		<Container>
		<Image
			source={require("../../../../assets/sidebar-transparent.png")}
			style={styles.container}
			>
			<Modal animationType = {"slide"} transparent = {true}
				visible = {this.state.boolBarcode}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
				    <View style={{
						width: Dimensions.get("window").width * 9.5 / 10,
						height: 350,}}>
						<Header transparent={true} style={{ backgroundColor:"#2E8B57"}}>
						<Left>
							<Button transparent onPress={() => this.setState({boolBarcode:!this.state.boolBarcode})}>
								<Icon active name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Text>Read Barcode</Text>
						</Body>
						<Right>
						</Right>
					</Header>
					<ScrollView>
						<ReadBarcode callback={this.callBackBarcode} />
					</ScrollView>
					</View>
				</View>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolPin}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<Image source={require("../../../../assets/bgs.png")} style={styles.container}>
				<View style={{height: Dimensions.get("window").height,}}>
					<Header transparent={true} style={{ backgroundColor:"#000"}}>
						<Left>
							<Button transparent onPress={() => this.setState({boolPin:!this.state.boolPin})}>
								<Icon active name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Text>Enter Pin</Text>
						</Body>
						<Right>
						</Right>
					</Header>
					<ScrollView>
						<Pin pin={this.state.pin} callback={this.callBackPin} />
					</ScrollView>
				</View>
			</Image>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolFrom}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<Image
					source={require("../../../../assets/sidebar-transparent.png")}
					style={styles.container}
					>
				<View style={{height: Dimensions.get("window").height,}}>
					<Header transparent={true} style= {{backgroundColor: "transparent"}}>
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
					<ScrollView>
						<SelectBox data={this.state.listWallet} callback={this.callBackFrom} />
					</ScrollView>
				</View>
				</Image>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolTo}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<Image
					source={require("../../../../assets/sidebar-transparent.png")}
					style={styles.container}
					>
				<View style={{height: Dimensions.get("window").height,}}>
					<Header transparent={true} style={{ backgroundColor:"transparent"}}>
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
					<ScrollView>
						<SelectBox data={this.state.listWallet} callback={this.callBackTo} />
					</ScrollView>
				</View>
				</Image>
			</Modal>
			<CustomHeader hasTabs navigation={navigation} />
			<Content>
				<View style={{marginTop: Dimensions.get("window").height * 1.5 / 10}}>
					<View style={{margin: Dimensions.get("window").width * 1 / 10}}>
					<Item style={styles.inputGrp} rounded>
						<TouchableOpacity onPress={() => { this.openModal("from") }} style={{width: "100%"}}>
							<TextInput 
								editable={false}
								value={this.state.fFrom}
								textColor="#fff"
    							placeholderTextColor="#fff"
								underlineColorAndroid='transparent'
								placeholder="From"
							/>
						</TouchableOpacity>
					</Item>
					<Item style={styles.inputGrp} rounded>
						<Item style={styles.box9}>
							<TouchableOpacity onPress={() => { this.openModal("to") }} style={{width: "100%",justifyContent: 'center'}}>
							<View pointerEvents='none'>
								<TextInput 
									editable={false}
									textColor="#fff"
	    							placeholderTextColor="#fff"
									value={this.state.fDestination}
									underlineColorAndroid='transparent'
									placeholder="Destination"
								/>
							</View>
							</TouchableOpacity>
						</Item>
						<Item style={styles.box1}>
							<TouchableOpacity onPress={() => { this.openModal("barcode") }} style={{width: "100%",justifyContent: 'center'}}>
								<Icons name="barcode" size={20}
									style={styles.iconRight}
								/>
							</TouchableOpacity>
						</Item>
					</Item>
					<Item style={styles.inputGrp} rounded>
						<TextInput 
							style={{width: "100%"}}
							textColor="#fff"
    						placeholderTextColor="#fff"
							onChangeText={(amount) => this.setState({fAmount: amount})}
							value={this.state.fAmount}
							underlineColorAndroid='transparent'
							placeholder="Amount"
						/>
					</Item>
						<Button info rounded block 
							style={{marginTop: 15, margin:5, backgroundColor: "#2E8B57"}}
							onPress={() => {this.openPin()}}>
							<Text>
								Send
							</Text>
						</Button>
					</View>
					</View>
			</Content>
		</Image>
		</Container>

        );
    }
}

export default Transfer;