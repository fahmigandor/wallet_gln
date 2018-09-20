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
import SearchableDropDown from 'react-native-searchable-dropdown';
import AutoComplete from "react-native-autocomplete";

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
			selectWallet : [],
			fFrom:"",
			fDestination:"",
			fAmount:"",
			token: "",
			boolDetail : false,
			isLoading : false
		}
		AsyncStorage.getItem('token', (err, result) => {
			token = result;
			this.setState({token:token});
			this.getListWallet(token);
		});
	}

	getListWallet(token){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/list/address/'+token, {
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
						var selectWallet = [];
						var push = "";
						obj.data.forEach(function(item){
							push = {id: item.data, name: item.label} ;
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
							selectWallet.push(push);
						});
						this.setState({
							listWallet:obj.data, 
							selectWallet: selectWallet,
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
						alert("Invalid Data.");
						this.setState({isLoading:false});
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

  onTyping(text) {
    const countries = listWallet.filter(item =>
      item.label.toLowerCase().startsWith(text.toLowerCase())
    ).map((item) => item.label);

    this.setState({ selectWallet: countries });
  }

  onSelect(value) {
    AlertIOS.alert("You choosed", value);
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
						<Header transparent={true} style={{ backgroundColor:"#001f4d"}}>
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
						</ScrollView>
					</View>
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
							<AutoComplete
							style={{alignSelf: "stretch",
							    height: 50,
							    margin: 10,
							    marginTop: 50,
							    backgroundColor: "#FFF",
							    borderColor: "lightblue",
							    borderWidth: 1}}
							suggestions={this.state.selectWallet}
							onTyping={this.onTyping}
							onSelect={this.onSelect}
							placeholder="Search for a country"
							clearButtonMode="always"
							returnKeyType="go"
							textAlign="center"
							clearTextOnFocus
							autoCompleteTableTopOffset={10}
							autoCompleteTableLeftOffset={20}
							autoCompleteTableSizeOffset={-40}
							autoCompleteTableBorderColor="lightblue"
							autoCompleteTableBackgroundColor="azure"
							autoCompleteTableCornerRadius={8}
							autoCompleteTableBorderWidth={1}
							autoCompleteFontSize={15}
							autoCompleteRegularFontName="Helvetica Neue"
							autoCompleteBoldFontName="Helvetica Bold"
							autoCompleteTableCellTextColor={"dimgray"}
							autoCompleteRowHeight={40}
							autoCompleteFetchRequestDelay={100}
							maximumNumberOfAutoCompleteRows={6}
							/>
						<Item reguler style={styles.inputGrp}>
							<Icons name="paperclip" size={20}
								style={{ color: "#fff", margin:5 }}
							/>
							<Input
								placeholderTextColor="#FFF"
								TextColor="#FFF"
								style={styles.input}
								placeholder="From"
								secureTextEntry={false}
								onChangeText={(from) => this.setState({fFrom: from})}
								value={this.state.fFrom}
							/>
						</Item>
						<Item reguler style={styles.inputGrp}>
							<Icons name="paperclip" size={20}
								style={{ color: "#fff", margin:5 }}
							/>
							<Input
								placeholderTextColor="#FFF"
								TextColor="#FFF"
								style={styles.input}
								placeholder="Destination"
								secureTextEntry={false}
								onChangeText={(destination) => this.setState({fDestination: destination})}
								value={this.state.fDestination}
							/>
						</Item>
						<Item reguler style={styles.inputGrp}>
							<Icons name="paperclip" size={20}
								style={{ color: "#fff", margin:5 }}
							/>
							<Input
								placeholderTextColor="#FFF"
								TextColor="#FFF"
								style={styles.input}
								placeholder="Amount"
								secureTextEntry={false}
								onChangeText={(amount) => this.setState({fAmount: amount})}
								value={this.state.fAamount}
							/>
						</Item>
						<Button info rounded block 
							style={{marginTop: 15, margin:5}}
							onPress={() => {this.sendTransfer()}}>
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

export default Transfer;