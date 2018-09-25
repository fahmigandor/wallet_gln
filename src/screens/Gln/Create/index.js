import React, { Component, PropTypes } from 'react';
import { Image, ActivityIndicator, TouchableOpacity, ListView, Platform, AsyncStorage, Modal, ScrollView, Dimensions } from "react-native";
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
	Toast
} from "native-base";
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";

type Props = {
  navigation: () => void
};
declare type Any = any;
const token = null;
class Create extends Component {
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			listWallet : [],
			label:"",
			token: "",
			boolDetail : false,
			isLoading : false
		}
		AsyncStorage.getItem('token', (err, result) => {
			token = result;
			this.setState({token:token});
		});
	}

	createWallet(){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/create/wallet/'+this.state.token, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({'label': this.state.label })
		})
		.then((response) => response.text())
		.then((responseJson) => {
			try{
				var obj = JSON.parse(responseJson);
				if(typeof obj != "undefined"){
					if(typeof obj.success != "undefined" && obj.success == false){
						alert("Invalid Data.");
						this.setState({isLoading:false});
					}else{
                		this.props.navigation.navigate("Main");
						this.setState({
							label:"", 
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
		<Container style={{backgroundColor:"#000"}}>
			<Modal animationType = {"slide"} transparent = {true}
				visible = {this.state.boolDetail}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
				    <View style={{
						width: Dimensions.get("window").width * 9 / 10,
						height: 300,}}>
						<Header>
							<Left>
								<Button transparent onPress={() => this.setState({boolDetail:!this.state.boolDetail})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
						</Header>
						<ScrollView style={styles.container}>
						</ScrollView>
					</View>
				</View>
			</Modal>
			<Image
			source={require("../../../../assets/bg-transparent.png")}
			style={styles.container}
			>
			<CustomHeader hasTabs navigation={navigation} />
			<Content style={{marginTop: "40%"}}>
				<View style={{marginTop: Dimensions.get("window").height * 0 / 10}}>
					<View style={{margin: Dimensions.get("window").width * 1 / 10}}>
					<View style={styles.form}>
						<Item small info block rounded style={styles.inputGrp}>
							<Icons name="paperclip" size={20}
								style={{ color: "#fff", margin:5 }}
							/>
							<Input
								placeholderTextColor="#FFF"
								TextColor="#FFF"
								style={styles.input}
								placeholder="Label"
								secureTextEntry={false}
								onChangeText={(label) => this.setState({label: label})}
								value={this.state.label}
							/>
						</Item>
						<Button info rounded block 
							style={{marginTop: 15, margin:5, backgroundColor: "#2E8B57"}}
							onPress={() => {this.createWallet()}}>
							<Text>
								+ Create Wallet
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

export default Create;