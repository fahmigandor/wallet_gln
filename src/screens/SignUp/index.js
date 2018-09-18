// @flow
import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Left,
  Right,
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";

import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const minLength5 = minLength(5);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class SignUpForm extends Component {
  textInput: any;

  constructor(props) {
    super(props);
    const {state} = this.props.navigation;
    
this.state = {
       email:null,
       pass:null,
       name:null,
       username:null,
       isLoading:false
    };
  
  }

 
  signUp() {
    if (this.state.email != null && this.state.pass != null && this.state.email != "" && this.state.pass != "" && this.state.username != null && this.state.name != null && this.state.username != "" && this.state.name != "") {
      this.register();
      // this.props.navigation.goBack();
    } else {
      Toast.show({
        text: "All the fields are compulsory!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  register(){
  return fetch('https://www.cavallocoin.co/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
          "name"    : this.state.email,
          "username"  : this.state.pass,
          "email"   : this.state.username,
          "password"  : this.state.name
    })
    })
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false});
        // console.warn(responseJson)
        try{
            var obj = JSON.parse(responseJson);

            if(obj.success ){
              alert("Success, Please Cek Your Email");
               this.props.navigation.goBack();
            }else{
              alert(obj.data);
            }
        }catch(err){
        alert("Invalid Data");
         this.props.navigation.goBack();
       }

      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );
  }

  render() {
    return (
     
         <Container style={styles.background}>
        <StatusBar barStyle="light-content" backgroundColor="#000033"  />
        <Image
         source={require("../../../assets/bg-transparent.png")}
          style={styles.background}
        >
          <Content padder>
            <Text style={styles.signupHeader}>CREATE ACCOUNT</Text>
            <View style={styles.signupContainer}>
              <View style={styles.form}>
         <Item rounded style={styles.inputGrp}>
          <Icon
            active
            name= "person" 
            style={{ color: "#fff" }}
          /> 
         
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Name"
            secureTextEntry={false}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          /> 
          </Item>

          <Item rounded style={styles.inputGrp}>
          <Icon
            active
            name= "person" 
            style={{ color: "#fff" }}
          /> 
         
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Username"
            secureTextEntry={false}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          /> 
          </Item>

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

             <Button
                  rounded
                  block
                  large
                  style={styles.signupBtn}
                  onPress={() => this.signUp()}
                >
                  <Text
                    
                  >
                   Sign Up
                  </Text>
                </Button>
                </View>
            </View>
          </Content>
          <Footer
            style={{
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Left style={{ flex: 2 }}>
              <Button small transparent>
                <Text style={styles.helpBtns}>Terms & Conditions</Text>
              </Button>
            </Left>
            <Right style={{ flex: 1 }}>
              <Button
                small
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.helpBtns}>SignIn</Text>
              </Button>
            </Right>
          </Footer>
        </Image>
      </Container>
    );
  }
}

const SignUp = reduxForm({
  form: "signup"
})(SignUpForm);
export default SignUp;
