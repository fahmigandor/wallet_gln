import React, { Component, PropTypes } from 'react';
import { Image, ActivityIndicator, TouchableOpacity, ListView, Platform, AsyncStorage, Modal, ScrollView, Dimensions, TextInput, TouchableHighlight } from "react-native";
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
import SelectBox from "../Transfer/SelectBox";

type Props = {
  navigation: () => void
};
declare type Any = any;
const token = null;
class Home extends Component {
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			listWallet : [],
			lLabel:"",
			lAddress:"",
			lPrivate:"",
			lBalance:"",
			fFrom:"",
			fDestination:"",
			fAmount:0,
			token: "",
			boolDetail : false,
			boolTransfer : false,
			boolTo: false,
			boolCreate: false,
			label:"",
			isLoading : false
		}
		AsyncStorage.getItem('token', (err, result) => {
			this.setState({token:result});
			this.getListWallet();
		});
	}

	getListWallet(){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/list/address/'+this.state.token, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
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

	getBallance(address){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/balance/'+this.state.token+'/'+address, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
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
						this.setState({lBalance:obj.data.balance, isLoading:false});
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

	openDetail(item){
		this.getBallance(item.address);
		this.setState({
			lLabel:item.label,
			lAddress:item.address,
			lPrivate:item.private,
			boolDetail:!this.state.boolDetail
		});
	}

	openCreate(){
		this.setState({
			boolCreate:!this.state.boolCreate
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
							isLoading:false,
							boolCreate:!this.state.boolCreate
						});
						this.getListWallet();
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
    	// console.warn(this.state.token, this.state.fFrom, this.state.fDestination, this.state.fAmount);return;
		return fetch('https://wallet.greenline.ai/api/send/'+this.state.token+'/'+this.state.fFrom, {
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
						alert("Invalid data or your balance is not sufficient.");
						this.setState({
							isLoading:false,
							boolTransfer:!this.state.boolTransfer
						});
					}else{
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

	openSend(item){
		this.setState({
			fFrom:item.address,
			fDestination:"",
			fAmount:0,
			boolTransfer:!this.state.boolTransfer
		});
	}
	
	openModal(){
		this.setState({boolTo:!this.state.boolTo});
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
							color="#000"/>
					</View>
				</View>
			);
		}
    	const navigation = this.props.navigation;
        return (
		<Container>
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
					<ScrollView >
						<SelectBox data={this.state.listWallet} callback={this.callBackTo} />
					</ScrollView>
				</View>
				</Image>
			</Modal>
			<Modal animationType = {"slide"} transparent={true} 
				visible={this.state.boolCreate}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				
				<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
				    <View style={{
						width: Dimensions.get("window").width * 9.5 / 10,
						height: 310,}}>
						<Header style={{ backgroundColor:"#2E8B57"}}>
							<Left>
								<Button transparent onPress={() => this.setState({boolCreate:!this.state.boolCreate})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
						<Body>
							<Text>Create Wallet</Text>
						</Body>
						<Right>
						</Right>
					</Header>
					<ScrollView style={{ backgroundColor:"#DCDCDC"}}>
		            <View>
		              	<View style={{marginTop: Dimensions.get("window").height * 0.5 / 10}}>
							<View style={{margin: Dimensions.get("window").width * 1 / 10}}>
							<View style={styles.form}>
								<Item style={styles.inputGrp} rounded>
									<Icons name="paperclip" size={20}
										style={{ color: "#000", margin:5 }}
									/>
									<Input
										placeholderTextColor="#000"
										TextColor="#000"
										placeholder="Label"
										secureTextEntry={false}
										onChangeText={(label) => this.setState({label: label})}
										value={this.state.label}
									/>
								</Item>
								<Button info rounded block 
									style={{marginTop: 15, margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}
									onPress={() => {this.createWallet()}}>
									<Text style={{color: "#2E8B57"}}>
										+ Create Wallet
									</Text>
								</Button>
							</View>
							</View>
						</View>
		            </View>
		            </ScrollView>
					</View>
		          </View>
				
			</Modal>
			<Modal animationType = {"slide"} transparent = {true}
				visible = {this.state.boolDetail}
				onRequestClose = {()=> { console.log("Modal has been closed.") }}>
				<View style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'}}>
				    <View style={{
						width: Dimensions.get("window").width * 9.5 / 10,
						height: 310,}}>
						<Header style={{ backgroundColor:"#2E8B57"}}>
							<Left>
								<Button transparent onPress={() => this.setState({boolDetail:!this.state.boolDetail})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
							<Body>
								<Text>Detail</Text>
							</Body>
							<Right>
							</Right>
						</Header>
						<ScrollView style={styles.container}>
			        		<List style={{ backgroundColor:"#DCDCDC"}}>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text style={styles.textCol}>Label :</Text>
										</Col>
										<Col>
											<Text style={styles.textCol}>{this.state.lLabel}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text style={styles.textCol}>Address :</Text>
										</Col>
										<Col>
											<Text style={styles.textCol}>{this.state.lAddress}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text style={styles.textCol}>Ballance :</Text>
										</Col>
										<Col>
											<Text style={styles.textCol}>{this.state.lBalance}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text style={styles.textCol}>Private :</Text>
										</Col>
										<Col>
											<Text style={styles.textCol}>{this.state.lPrivate}</Text>
										</Col>
									</Row>
	        					</ListItem>
							</List>
						</ScrollView>
					</View>
				</View>
			</Modal>
			<Modal animationType = {"slide"} transparent = {true}
				visible = {this.state.boolTransfer}
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
								<Button transparent onPress={() => this.setState({boolTransfer:!this.state.boolTransfer})}>
									<Icon active name="arrow-back" />
								</Button>
							</Left>
							<Body>
								<Text>Transfer</Text>
							</Body>
							<Right>
							</Right>
						</Header>
						<ScrollView style={{backgroundColor:"#DCDCDC"}}>
							<View style={{margin: 15}}>
							<View style={styles.form}>
								<TouchableOpacity>
									<Item rounded style={styles.inputGrp}>
										<Icons name="paperclip" size={20}
											style={{ color: "#000", margin:5 }}
										/>
										<Input
											placeholderTextColor="#000"
											TextColor="#000"
											style={styles.input}
											placeholder="From"
											secureTextEntry={false}
											onChangeText={(from) => this.setState({fFrom: from})}
											value={this.state.fFrom}
										/>
									</Item>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => { this.openModal("to") }}>
								<View pointerEvents='none'>
									<Item rounded style={styles.inputGrp}>
										<Icons name="paperclip" size={20}
											style={{ color: "#000", margin:5 }}
										/>
										<Input
											editable={false}
											placeholderTextColor="#000"
											TextColor="#000"
											style={styles.input}
											placeholder="Destination"
											secureTextEntry={false}
											value={this.state.fDestination}
										/>
									</Item>
								</View>
								</TouchableOpacity>
								<Item rounded style={styles.inputGrp}>
									<Icons name="paperclip" size={20}
										style={{ color: "#000", margin:5 }}
									/>
									<Input
										placeholderTextColor="#000"
										TextColor="#000"
										style={styles.input}
										placeholder="Amount"
										secureTextEntry={false}
										onChangeText={(amount) => this.setState({fAmount: amount})}
										value={this.state.fAamount}
									/>
								</Item>
								<Button info rounded block 
									style={{marginTop: 15, margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}
									onPress={() => {this.sendTransfer()}}>
									<Text style={{color: "#2E8B57"}}>
										Send
									</Text>
								</Button>
							</View>
							</View>
						</ScrollView>
					</View>
				</View>
			</Modal>
			<Image
			source={require("../../../../assets/sidebar-transparent.png")}
			style={styles.container}
			>
			<CustomHeader hasTabs navigation={navigation} />
			<Content>
				<View>
			    <ScrollView horizontal={false}>
				<Button small info block rounded style={{marginBottom: 10, margin:5, backgroundColor: "rgba(255,255,255,0.3)"}} onPress={() =>{this.openCreate();}}>
					<Text style={{fontSize:13, color: "#FFD700"}}>
						+ Create Wallet
					</Text>
				</Button>
        		<Grid style={{ backgroundColor:"transparent", margin:5}}> 
					<Row style={styles.row}>
						<Col style={{width: Dimensions.get("window").width * 2 /10}}>
							<Text style={styles.textRow} >Label</Text>
						</Col>
						<Col style={{width: Dimensions.get("window").width * 5 / 10}}>
							<Text style={styles.textRow} >Address</Text>
						</Col>
						<Col>
							<Text style={styles.textRow} >Action</Text>
						</Col>
					</Row>
					{this.state.listWallet.map((item, index) => {
						return (
							<Row style={{margin:10, borderBottomColor:"#ffffff"}} key={item.id.toString()} >
								<Col style={{width: Dimensions.get("window").width * 2 /10}}>
									<Text style={styles.textRow} >{item.label}</Text>
								</Col>
								<Col style={{width: Dimensions.get("window").width * 5 / 10}}>
									<Text style={styles.textRow} >{item.address}</Text>
								</Col>
								<Col>
									<Button style={styles.buttonCol}
										onPress={() => {this.openDetail(item);}}>
										<Text style={{fontSize:11, alignSelf: "center"}}>
											<Icons name="eye" size={11} style={{ color: "#fff" }}/>
											{" "}Detail
										</Text>
									</Button>
									<Button style={styles.buttonCol}
										onPress={() => this.openSend(item)}>
										<Text style={{fontSize:11}}>
											<Icon name="navigate" style={{fontSize: 11, color: '#fff'}}/>
											{" "}Send
										</Text>
									</Button>
								</Col>
							</Row>
						) 
					})}
				</Grid>
				</ScrollView>
				</View>
			</Content>
			</Image>
		</Container>

        );
    }
}

export default Home;