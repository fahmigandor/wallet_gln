// @flow
var Color = require("color");
import React, { Component } from "react";
import { Image, Switch, TouchableOpacity, Platform,AsyncStorage,ActivityIndicator } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  Item,
  Input,
  View,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./styles";
import CustomHeader from "../../components/CustomHeader";
const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;
const light = Color(primary).alpha(0.3);
const token = null;

type Props = {
  navigation: () => void
};
class Settings extends Component {
 
  props: Props;
  constructor(props: Props) {
    super(props);

    this.state={
          username:null,
          email:null,
          name:null,
          password:null,
          new_password:null,
          repeat_password:null,
          password_lama:null,
          isLoading:true,
          wallet:null,
          myreferal:null,
          linkreferal:null
        };

     AsyncStorage.getItem('data_user', (err, result) => {
     
         var obj = JSON.parse(result);

          // console.warn(obj.data.username);

        this.setState({
          username:obj.data.username,
          email:obj.data.email,
          name:obj.data.name,
          wallet : obj.data.wallet,
          password:null,
          new_password:null,
          repeat_password:null,
          password_lama:null,
          isLoading:false,
          myreferal:null,
          linkreferal:"https://dashboard.cavallocoin.co/register/ref/"+obj.data.username
        });

        AsyncStorage.getItem('token', (err, result) => {
            token = result;
            this.MyReferal();
          });

      }
        );
  }
 EditProfil(){
  if(this.state.name == null || this.state.name == "" ){
    alert("All Coloumn must be filled");
}else{
  this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/update-profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
            'authorization':'Bearer '+ token,
            'accept':'application/json'},
    body:JSON.stringify({
  "name" : this.state.name,
  "password" : this.state.password,
  "password_confirmation" : this.state.password
})
})
      .then((response) => response.text())
      .then((responseJson) => {

        // console.warn(responseJson);
       this.setState({isLoading:false});
       if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
        }else{
        try{
            var obj = JSON.parse(responseJson);

            if(obj.success){
              alert(obj.data);
              
            }else{
              alert(obj.message);
               
            }
        }catch(err){
           this.setState({isLoading:false});
        alert("Invalid Data");
         this.props.navigation.goBack();
       }
}
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );
}
       
  }

  EditPassword(){

if(this.state.password_lama == null || this.state.password_lama == "" || this.state.new_password == null || this.state.new_password == "" || this.state.repeat_password == null || this.state.repeat_password == ""){
    alert("All Coloumn must be filled");
}else if(this.state.repeat_password != this.state.new_password){
   alert("New Password must be same with Repeat Password");
}else{
  this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/update-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
            'authorization':'Bearer '+ token,
            'accept':'application/json'},
    body:JSON.stringify({
 "current_password" :this.state.password_lama,
                "new_password" :this.state.new_password,
                "confirm_password": this.state.repeat_password
})
})
      .then((response) => response.text())
      .then((responseJson) => {

        // console.warn(responseJson);
       this.setState({isLoading:false});
       if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
        }else{
        try{
            var obj = JSON.parse(responseJson);

            if(obj.success){
              alert(obj.data);
              
            }else{

              if(obj.data.new_password){
                alert(obj.data.new_password[0]);
              }else if(obj.data.confirm_password){
                alert(obj.data.confirm_password[0]);
              }else{
                alert(obj.data.current_password[0]);
              }
              
               
            }
        }catch(err){
           this.setState({isLoading:false});
        alert("Invalid Data");
         this.props.navigation.goBack();
       }
    }
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );

  }  
  }

    MyReferal(){
  this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/my-sponsor', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
            'authorization':'Bearer '+ token,
            'accept':'application/json'}
})
      .then((response) => response.text())
      .then((responseJson) => {
// 
        // console.warn(responseJson);
       this.setState({isLoading:false});
       if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
        }else{
        try{
            var obj = JSON.parse(responseJson);

            if(obj.success){
              this.setState({myreferal:obj.data});
              
            }else{
              alert(obj.message);
               
            }
        }catch(err){
           this.setState({isLoading:false});
        alert("Invalid Data");
         this.props.navigation.goBack();
       }
}
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );

       
  }

   ForgotPass(){
  this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/password-wallet', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
            'authorization':'Bearer '+ token,
            'accept':'application/json'}
})
      .then((response) => response.text())
      .then((responseJson) => {

        // console.warn(responseJson);
       this.setState({isLoading:false});
       if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
        }else{
        try{
            var obj = JSON.parse(responseJson);

            // if(obj.success){
            //   this.setState({myreferal:obj.data});
              
            // }else{
              alert(obj.data);
               
            // }
        }catch(err){
           this.setState({isLoading:false});
        alert("Invalid Data");
         this.props.navigation.goBack();
       }
}
      })
      .catch((error) => {
        alert("Invalid Data");
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
      <Container>
         <CustomHeader hasTabs navigation={navigation} />
        <Content style={{backgroundColor:'#000033'}}>
          <View style={styles.bg}>
          
            <View style={styles.signupContainer}>
            <Text style={{marginTop:10, marginBottom:5}}>Wallet : </Text>
             <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={this.state.wallet}
                />
              </Item>

          <Button rounded warning style={styles.swipeBtn} onPress={() => this.ForgotPass()}> 
            <Text >Send Password wallet to email</Text>
          </Button>

               <Text style={{marginTop:10, marginBottom:5}}>Link Referal : </Text>
             <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={this.state.linkreferal}
                />
              </Item>

             <Text
          style={{fontSize:18,  marginRight:10, marginBottom:10, marginTop:10,color: "#ffbf00", alignSelf: "center"}}  > Settings Profile </Text>
          <Text style={{marginTop:10, marginBottom:5}}>My Referal : </Text>
                <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="My Referal"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={this.state.myreferal}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={this.state.username}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-mail-open-outline" />
                <Input
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={this.state.email}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="Name"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
                </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                />
              </Item>
              <Button rounded warning style={styles.swipeBtn} onPress={() => this.EditProfil()}> 
            <Text >Submit</Text>
          </Button>
            </View>

            <View style={styles.signupContainer}>
             <Text
          style={{fontSize:18,  marginRight:10, marginBottom:10, color: "#ffbf00", alignSelf: "center"}}  > Edit Password </Text>

              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                   onChangeText={(password_lama) => this.setState({password_lama})}
            value={this.state.password_lama}
                />
              </Item>
               <Item rounded style={styles.inputGrp}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="New Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                   onChangeText={(new_password) => this.setState({new_password})}
            value={this.state.new_password}
                />
              </Item>
               <Item rounded style={styles.inputGrp}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="Repeat Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                   onChangeText={(repeat_password) => this.setState({repeat_password})}
            value={this.state.repeat_password}
                />
              </Item>
              <Button rounded warning style={styles.swipeBtn} onPress={() => this.EditPassword()}> 
            <Text >Submit</Text>
          </Button>
            </View>

          </View>
          
        </Content>
      </Container>
    );
  }
}

export default Settings;
