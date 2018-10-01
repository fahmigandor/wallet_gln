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
			listHistory : []
		}
		this.token = "";
		AsyncStorage.getItem('token', (err, result) => {
			if(typeof result != "undefined" && result != "" && result != null){
				this.token = result;
				this.getListHistory();
			}
		});
	}

	getListHistory(){
    	this.setState({isLoading:true});
		return fetch('https://wallet.greenline.ai/api/history/'+this.token, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
		.then((response) => response.text())
		.then((responseJson) => {
			try{
				var obj = JSON.parse(responseJson);
				console.warn(JSON.stringify(responseJson));
				if(typeof obj != "undefined"){
					if(typeof obj.success != "undefined" && obj.success == false){
						alert("Invalid Data.a");
						this.setState({isLoading:false});
					}else if(typeof obj.message != "undefined"){
						alert(obj.message);
						this.setState({isLoading:false});
					}else{
						alert("Transfer Successfully.");
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
			<CustomHeader hasTabs navigation={navigation} />
			<Content>
				<View>
			    <ScrollView horizontal={false}>
        		<Grid style={{margin:5}}> 
					<Row style={{margin:5, paddingBottom:5, borderBottomColor:"#fff", borderBottomWidth:1}}>
						<Col>
							<Text style={styles.textCol} >Date</Text>
						</Col>
						<Col>
							<Text style={styles.textCol} >To</Text>
						</Col>
						<Col>
							<Text style={styles.textCol} >amount</Text>
						</Col>
					</Row>
					{this.state.listHistory.map((item, index) => {
						return (
							<Row style={{margin:10}}>
								<Col>
									<Text style={styles.textCol} >{item.created_at}</Text>
								</Col>
								<Col>
									<Text style={styles.textCol} >{item.to_wallet}</Text>
								</Col>
								<Col>
									<Text style={styles.textCol} >{item.amount}</Text>
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