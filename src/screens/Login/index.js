// @flow
import React, { Component } from "react";
import { Image,ActivityIndicator, Platform, StatusBar,AsyncStorage } from "react-native";
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
  Toast
} from "native-base";
import { Field, reduxForm } from "redux-form";
// import { ReactDOM } from "redux-dom";
// import { ReCAPTCHA } from "react-google-recaptcha/lib/recaptcha";

import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";

const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/cava.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(4);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;

// var React = require("react").default;
// var render = require("react-dom").render
// var ReCAPTCHA = require("react-google-recaptcha/lib/recaptcha");

// var grecaptchaObject = grecaptcha;
// const { normalize, ...inputProps } = this.props
class LoginForm extends Component {
  textInput: Any;
  constructor(props) {
    super(props);
    const {state} = this.props.navigation;
    
this.state = {
       email:null,
       pass:null,
       isLoading:false
    };
    AsyncStorage.getItem('token', (err, result) => {
     if(result != null && result != ""){
        this.props.navigation.navigate("LoginUlang");
     }
      }
        );
   
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
      });
    // return fetch('https://www.cocnet.co/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:JSON.stringify({
    //     "email" : this.state.email,
    //     "password" : this.state.pass
    //   })
    // })
    //   .then((response) => response.text())
    //   .then((responseJson) => {
    //     console.warn(responseJson);
    //     try{
    //         var obj = JSON.parse(responseJson);
    //         if(obj.response == "success"){
    //           // console.warn(obj.result.token);
    //             AsyncStorage.setItem('token',obj.result.token);
    //             AsyncStorage.setItem('pass',this.state.pass);
    //             this.dataUser(obj.result.token);
    //         }else{
    //           alert(obj.message);
    //           this.setState({isLoading:false});
    //         }
    //     }catch(err){
    //       this.setState({isLoading:false});
    //       alert("Invalid Data");
    //       this.props.navigation.goBack();
    //     }
    //   })
    //   .catch((error) => {
    //     alert("Invalid Data");
    //     this.setState({isLoading:false});
    //   });
  }

  dataUser(token){
 
 // console.warn(token);
    return fetch('https://www.cocnet.co/api/user', {
    method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'authorization':'Bearer '+ token
      }
    })
    .then((response) => response.text())
    .then((responseJson) => {
      this.setState({isLoading:false});
      var obj = JSON.parse(responseJson);
      AsyncStorage.setItem('data_user',responseJson);
      this.props.navigation.navigate("Main");
    })
    .catch((error) => {
      alert(error.message);
      this.setState({isLoading:false});
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
      <Container style={styles.background}>
        <StatusBar barStyle="light-content" backgroundColor="#000033"  />
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
             
            <View style={styles.container}>
              <View style={styles.form}>
                <Item rounded style={styles.inputGrp}>
                  <Icon
                    active
                    name= "mail" 
                    style={{ color: "#fff" }}
                  /> 
                  <Input
                    placeholderTextColor="#FFF"
                    style={styles.input}
                    placeholder="Email"
                    secureTextEntry={false}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                  /> 
                </Item>
                <Item rounded style={styles.inputGrp}>
                  <Icon
                    active
                    name= "unlock" 
                    style={{ color: "#fff" }}
                  /> 
                  <Input
                    placeholderTextColor="#FFF"
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(pass) => this.setState({pass})}
                    value={this.state.pass}
                  /> 
                </Item>
                <Button rounded primary block large
                  style={styles.loginBtn}
                  onPress={() => this.login()}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center", top: -5 }
                        : { fontSize: 16, fontWeight: "900" }
                    }
                  >
                   LOGIN
                  </Text>
                </Button>

               <View style={styles.otherLinksContainer}>
                  <Right>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={styles.helpBtns}>Forgot Password</Text>
                    </Button>
                  </Right>
                </View>
              </View>
            </View>
          </Content>
      </Container>
    );
  }
}
const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;
