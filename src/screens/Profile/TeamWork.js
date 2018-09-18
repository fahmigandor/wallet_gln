// @flow
var Color = require("color");
import React, { Component } from "react";
import { Image, Switch, TouchableOpacity, ScrollView,Platform,AsyncStorage,StyleSheet,ActivityIndicator } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  // Item,
  Input,
  View,
    Left,
  ListItem,
  List,
  Right,
  Body
} from "native-base";
// import JSONTree from 'react-native-json-tree';
import { Map } from 'immutable';
import { Grid as gr, Col, Row } from "react-native-easy-grid";
import Grid from 'react-native-grid-component';
// import AwesomeHierarchyGraph from 'react-native-d3-tree-graph'
// import TreeView from 'react-native-treeview';
// import Tree from 'react-tree-graph';
// import Tree from 'react-d3-tree';

// import styles from "./styles";
// import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import CustomHeader from "../../components/CustomHeader";
const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;
const light = Color(primary).alpha(0.3);
const token = null;

type Props = {
  navigation: () => void
};

const jsona = [];
const inum = 0;



class TeamWork extends Component {
 
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
          isLoading:false,
          myreferal:null,
          json:[]
        };

     AsyncStorage.getItem('data_user', (err, result) => {
     
         var obj = JSON.parse(result);

          // console.warn(obj.data.username);

        this.setState({
          username:obj.data.username,
          email:obj.data.email,
          name:obj.data.name,
          password:null,
          new_password:null,
          repeat_password:null,
          password_lama:null,
          isLoading:true,
          myreferal:null
        });

        AsyncStorage.getItem('token', (err, result) => {
            token = result;
            this.TeamworkData(obj.data.username);
          });

      }
        );
  }

  TeamworkData(username){
  // this.setState({isLoading:true});
  if(username != "undefined" && username != null && username!= ""){
     return fetch('https://www.cavallocoin.co/api/my-team/'+username, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
            'authorization':'Bearer '+ token,
            'accept':'application/json'}
})
      .then((response) => response.text())
      .then((responseJson) => {

        if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
          this.setState({isLoading:false});
        this.props.navigation.navigate("LoginUlang");
        }else{
            var obj = JSON.parse(responseJson);

            this.setState({json:obj.data,
              username:username,
              isLoading:false});
            cek = true;
            for (var i = 0; i <= jsona.length-1; i++) {
              if(jsona[i] == username){
                cek = false;
              }
            };

            if(cek){
              jsona.push(username);
            }
        }
   // console.warn(jsona[jsona.length-1]);
      })
      .catch((error) => {
        alert(error.message);
         this.setState({isLoading:false});
      }
      );
}else{
  this.setState({isLoading:false});
}
       
  }

  backTeamWork(){
    
    if(jsona.length >= 1){

    this.setState({isLoading:true});
    jsona.pop();
    panjang = jsona.length;

      inum = panjang-1;
      // console.warn(jsona[inum]);
    this.TeamworkData(jsona[inum]);
  
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
        <Container style={{backgroundColor:"#000033"}}>
        <CustomHeader hasTabs navigation={navigation} />

         <Content>

<List style={{ height: 50,
    justifyContent: "center",
    backgroundColor: "#ffbf00"}}>
    <ListItem style={{ height: 50,
    backgroundColor: "#ffbf00"}}>

            <Button transparent style={{  justifyContent: "center",alignSelf: "center"}} onPress={() => this.backTeamWork()}>
              <Icon active style={{ color: "#FFF" }} name="arrow-back" />
            </Button>
   
       
          <Text style={{  justifyContent: "center",alignSelf: "center",fontSize: 15}}>{this.state.username}
          </Text>
      
          </ListItem>
          </List>

         <Grid
        style={styles.list}
        data={this.state.json}
        renderItem={data =>
          <View style={styles.item}>
          <Text style={{  justifyContent: "center",alignSelf: "center",fontSize: 15}} onPress={() => this.TeamworkData(data)}>{data}</Text></View>
        }
        
        itemsPerRow={3}
        
      />
      </Content>
       </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 50,
    margin: 1,
    justifyContent: "center",
    backgroundColor: "#ffbf00"
  }
});

export default TeamWork;
