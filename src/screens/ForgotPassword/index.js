// @flow
import React, { Component } from "react";
import { Image, StatusBar,ActivityIndicator } from "react-native";
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
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";

const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;
class ForgotPasswordForm extends Component {
  textInput: Any;
  state: {
    offset: {
      x: 0,
      y: 0
    }
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      name: "",
      email:null
    };
  }

  ForgotPass(){
  this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/password/email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
            'accept':'application/json'},
  body:JSON.stringify({
                "email" :this.state.email
})
})
      .then((response) => response.text())
      .then((responseJson) => {

        // console.warn(responseJson);
         alert("Cek Your Email");
       this.setState({isLoading:false});
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );

       
  }


 
  forgotPassword() {
    if (this.props.valid) {
      this.ForgotPass();
    } else {
      Toast.show({
        text: "Enter Valid Email",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
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
      <Container>
        <StatusBar barStyle="light-content" />
        <Image
           source={require("../../../assets/bg-transparent.png")}
          style={styles.background}
        >
          <Content contentOffset={this.state.offset}>
            <Content padder scrollEnabled={false}>
              <Text style={styles.forgotPasswordHeader}>
                Forgot Your Password?
              </Text>
              <View style={styles.forgotPasswordContainer}>
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

                <Button
                  rounded
                  block
                  bordered
                  onPress={() => this.forgotPassword()}
                  style={styles.emailBtn}
                >
                  <Text style={{ color: "#FFF" }}>Send Email</Text>
                </Button>
              </View>
            </Content>
          </Content>
          <Footer
            style={{
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.helpBtns}>Back To Login</Text>
            </Button>
          </Footer>
        </Image>
      </Container>
    );
  }
}

const ForgotPassword = reduxForm({
  form: "help"
})(ForgotPasswordForm);
export default ForgotPassword;
