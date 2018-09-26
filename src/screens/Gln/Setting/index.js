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
import Pin from "../ReLogin/pin";
import KeyboardView from "../ReLogin/mainpin";

type Props = {
  navigation: () => void
};
declare type Any = any;
const token = null;
class Setting extends Component {
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			isLoading : false,
			pin: [],
			counterLogin: 0,
			boolCreatePin: false,
			boolUpdatePin: false,
			boolPin: false
		}
		AsyncStorage.getItem('token', (err, result) => {
			this.token = result;
			AsyncStorage.getItem('pass', (err, result) => {
				this.pass = result;
			});
			this.setState({token:this.token});
		});
	}

	componentDidMount() {
		AsyncStorage.getItem('pin', (err, result) => {
			if(result != null){
				this.setState({pin:JSON.parse(result)})
			}
		});
	}
	
	createPin(){
		this.setState({
			boolCreatePin:!this.state.boolCreatePin
		});
	}
	updatePin(){
		this.setState({
			boolPin:!this.state.boolPin
		});
	}

	callbackPin = (status) => {
		if(status){
			this.setState({boolPin:!this.state.boolPin, counterLogin:0}, function(){
				this.createPin();
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
	callbackCreatePin = (status) => {
		if(status){
			AsyncStorage.getItem('pin', (err, result) => {
				this.setState({pin:JSON.parse(result), boolCreatePin:!this.state.boolCreatePin});
			});
		}
	}
	callbackUpdatePin = (status) => {}

	setPin(){
		if(this.state.pin.length > 0){
			this.updatePin()
		}else{
			this.createPin()
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
							color="#aa00aa"/>
					</View>
				</View>
			);
		}
    	const navigation = this.props.navigation;
    	// const EnterPin = (props) => {
    	// 	if(!this.state.pin.length > 0) return null
    	// 	return props.component;
    	// }
        return (
		<Container>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolPin}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{height: Dimensions.get("window").height,}}>
					<Header transparent={true} style={{ backgroundColor:"#001f4d"}}>
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
					<ScrollView style={styles.container}>
						<Pin pin={this.state.pin} callback={this.callbackPin} />
					</ScrollView>
				</View>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolCreatePin}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{height: Dimensions.get("window").height,}}>
					<Header transparent={true} style={{ backgroundColor:"#001f4d"}}>
						<Left>
							<Button transparent onPress={() => this.setState({boolCreatePin:!this.state.boolCreatePin})}>
								<Icon active name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Text>Create Pin</Text>
						</Body>
						<Right>
						</Right>
					</Header>
					<ScrollView style={styles.container}>
						<KeyboardView callback={this.callbackCreatePin} />
					</ScrollView>
				</View>
			</Modal>
			<Image
			source={require("../../../../assets/bgs.png")}
			style={styles.container}
			>
			<CustomHeader hasTabs navigation={navigation} />
			<Content>
				<View style={{marginTop: Dimensions.get("window").height * 0 / 10}}>
					<View style={{margin: Dimensions.get("window").width * 1 / 10}}>
					<View style={styles.form}>
						<Button info rounded block 
							style={{marginTop: 15, margin:5}}
							onPress={() => {this.setPin()}}>
							<Text>
								Set Pin
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

export default Setting;
