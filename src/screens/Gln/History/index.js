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
class History extends Component {
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			listHistory : [],
			lLabel:"",
			lAddress:"",
			lPrivate:"",
			lBalance:"",
			token: "",
			boolDetail : false
		}
		AsyncStorage.getItem('token', (err, result) => {
			token = result;
			this.setState({token:token});
			this.getListTransaction(token);
		});
	}

	getListTransaction(token, address= ""){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/history/'+token, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({ 'address': address })
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
							listHistory:obj.data, 
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

	openDetail(item){
		this.getBallance(item.address);
		this.setState({
			lLabel:item.label,
			lAddress:item.address,
			lPrivate:item.private,
			boolDetail:!this.state.boolDetail
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
			        		<List style={{ backgroundColor:"#002966"}}>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text>Label :</Text>
										</Col>
										<Col>
											<Text>{this.state.lLabel}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text>Address :</Text>
										</Col>
										<Col>
											<Text>{this.state.lAddress}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text>Ballance :</Text>
										</Col>
										<Col>
											<Text>{this.state.lBalance}</Text>
										</Col>
									</Row>
	        					</ListItem>
								<ListItem>
									<Row>
										<Col style={{width: Dimensions.get("window").width / 5}}>
											<Text>Private :</Text>
										</Col>
										<Col>
											<Text>{this.state.lPrivate}</Text>
										</Col>
									</Row>
	        					</ListItem>
							</List>
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
				<View>
			    <ScrollView horizontal={false}>
				<Button small info block rounded style={{marginBottom: 10, margin:5}}>
					<Text style={{fontSize:11}}>
						+ Create Wallet
					</Text>
				</Button>
        		<Grid style={{ backgroundColor:"#000022", margin:5}}> 
					<Row style={{margin:5, paddingBottom:5, borderBottomColor:"#ffffff", borderBottomWidth:1}}>
						<Col>
							<Text style={{fontSize:11, marginLeft:10}} >Transaction</Text>
						</Col>
						<Col>
							<Text style={{fontSize:11, marginLeft:10}} >address</Text>
						</Col>
						<Col>
							<Text style={{fontSize:11, marginLeft:10}} >amount</Text>
						</Col>
						<Col>
							<Text style={{fontSize:11, marginLeft:10}} >Action</Text>
						</Col>
					</Row>
					{this.state.listHistory.map((item, index) => {
						return (
							<Row style={{margin:10}}>
								<Col>
									<Text style={{fontSize:11, marginLeft:10}} >{item.kode}</Text>
								</Col>
								<Col>
									<Text style={{fontSize:11, marginLeft:10}} >{item.from}</Text>
									<Text style={{fontSize:11, marginLeft:10}} >{item.destination}</Text>
								</Col>
								<Col>
									<Text style={{fontSize:11, marginLeft:10}} >{item.amount} GLN</Text>
								</Col>
								<Col>
									<Button small success style={{marginBottom:5}}
										onPress={() => {this.openDetail(item);}}>
										<Text style={{fontSize:11}}>
											<Icons name="eye" size={11} />
											{" "}Detail
										</Text>
									</Button>
									<Button small success>
										<Text style={{fontSize:11}}>
											<Icon style={{fontSize:11}} type="FontAwesome" name="swap" />
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

export default History;