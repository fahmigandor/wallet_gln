// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform, AsyncStorage,TextInput, Alert,ActivityIndicator,ScrollView, Modal  } from "react-native";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  Left,
   Header,
   Body,
  Right,
  ListItem,
  Button,
 Icon,
  Item,
  Input
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import PopupDialog from 'react-native-popup-dialog';
const img3 = require("../../../assets/bnyas.png");
import CustomHeader from "../../components/CustomHeader";
import Head from "../head/head.js";

import styles from "./styles";
import datas from "./data";
const logo = require("../../../assets/cava.png");

  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;

const a= [{"coin":"500.000","price":3,"status":"waiting"},{"coin":"4500.000","price":3,"status":"waiting"}, {"coin":"500.000","price":3,"status":"waiting"}];

const coc_terima = null, coc=null,usd=null, token=null;
const url='https://www.cavallocoin.co/api/gethistory';

class LoginUlangForm extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    super(props);
      this.state = {
      email:null,
      pass:null,
      isLoading:false
    };

    AsyncStorage.getItem('data_user', (err, result) => {
      var obj = JSON.parse(result);
      this.setState({
        email:obj.email,
      });
    });
  }

  login() {
    if (this.state.email != null && this.state.pass != null && this.state.email != "" && this.state.pass != "") {
      this.setState({isLoading:true});
      this.loginValid();
      // console.warn( "id_imei="+this.props.textInput);
    } else {
      Toast.show({
        text: "Enter Valid Email & Password!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  loginValid(){
    return fetch('https://wallet.greenline.ai/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:JSON.stringify({
        "email" : this.state.email,
        "password" : this.state.pass
      })
    })
      .then((response) => response.text())
      .then((responseJson) => {
        // console.warn(responseJson);
        try{
            var obj = JSON.parse(responseJson);

            if(typeof obj != "undefined"){
              if(typeof obj.success != "undefined" && obj.success == false){
                alert("Invalid Data.");
                this.setState({isLoading:false});
                return;
              }
              if(typeof obj.api_key != "undefined"){
                AsyncStorage.setItem('token',obj.api_key);
                AsyncStorage.setItem('pass',this.state.pass);
                AsyncStorage.setItem('data_user',responseJson);
                this.props.navigation.navigate("Main");
                // this.dataUser(obj.result.token);
              alert("Success");
              }else{
                alert("Please generate you api key.");
                this.setState({isLoading:false});
              }
            }
        }catch(err){
          this.setState({isLoading:false});
          alert("Invalid Data");
          this.props.navigation.goBack();
        }

      })
      .catch((error) => {
        alert("Invalid Data Or Check Your Connection.");
        this.setState({isLoading:false});
      }
      });

       
  }

  dataUser(token){
 
 // console.warn(token);
    return fetch('https://www.cavallocoin.co/api/user', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'authorization':'Bearer '+ token
      }
    })
    .then((response) => response.text())
    .then((responseJson) => {
      // this.setState({isLoading:false});
      // console.warn(responseJson);
      var obj = JSON.parse(responseJson);
      AsyncStorage.setItem('data_user',responseJson);
      this.props.navigation.navigate("Profile");
    })
    .catch((error) => {
      alert("Invalid Data");
      // this.setState({isLoading:false});
    }
    );

       
  }

 

  render() {

   
  const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.background}>
          <Text style={styles.text_aktif}>Loading....</Text>
          
          <ActivityIndicator style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8}}   size="large"
          color="#aa00aa"/>
        </View>

      );
    }

    return (
      <Container style={{backgroundColor:"#000033"}}>
        <Image
        source={require("../../../assets/bg-transparent.png")}
        style={styles.container}
        >
          <View >
            <Header>
              <Left>
                <Button transparent onPress={() =>  this.props.navigation.goBack()}>
                <Icon active name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Image source={logo} style={styles.imageHeader} />
              </Body>
              <Right />
            </Header>
            <Text
              style={
              Platform.OS === "android"
              ? { fontSize: 16, textAlign: "center", top: -5,
              marginTop:10 }
              : { fontSize: 16, fontWeight: "900",
              marginTop:10 }
              } >
                  >
              INPUT YOUR PASSWORD LOGIN
            </Text>
            <Item rounded style={styles.inputGrp}>
              <Icon
              active
              name= "unlock" 
              style={{ color: "#fff" }}
              /> 
         
              <Input
              placeholderTextColor="#FFF"
              style={{ fontSize:14, color:"#FFF"}}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(pass) => this.setState({pass})}
              value={this.state.pass}
              /> 
            </Item>


            <Button
              rounded
              primary
              block
              large
              style={{backgroundColor: "#ffbf00", marginTop:10, marginBottom:10}}
              onPress={() => this.login()}>
                >
              <Text
                style={
                Platform.OS === "android"
                ? { fontSize: 16, textAlign: "center", top: -5 }
                : { fontSize: 16, fontWeight: "900" }
                } >
                  >
                LOGIN
              </Text>
            </Button>

          </View>
        </Image>
      </Container>
          
    );
  }
}

const LoginUlang = reduxForm({
  form: "helping"
})(LoginUlangForm);

export default LoginUlang;
