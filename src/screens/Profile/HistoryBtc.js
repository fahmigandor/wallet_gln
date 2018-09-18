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
const url='https://www.cavallocoin.co/api/gethistory-btc';

class HistoryBtcForm extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: datas,
      dataSource : [],
      text:null,
      boolInfo:false,
      boolHistory:false,
      isLoading:false,
      btc_input:null,
      isLoading:true,
      cocIn:null,
      cocOut:null,
      cocBalance:null,
      pass:null,
      btn_next:null,
      url:url,
      detail:[],
      wallet_ku:null,
      modalVisible:false,
      btn_pre:null
          };


     AsyncStorage.getItem('data_user', (err, result) => {
       var obj = JSON.parse(result);
     boolBTC = obj.data.wallet_btc;
        this.setState({wallet_ku:boolBTC});
// console.warn(boolBTC);
         AsyncStorage.getItem('token', (err, result) => {
     token = result;
        

        this.bukahistory();
      }
        );


      }
        );


    


    
  }

  bukahistory(){

    if(this.state.url != null){

      this.setState({isLoading:true});
    return fetch(this.state.url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'authorization':'Bearer '+ token},
     
    })
      .then((response) => response.text())
      .then((responseJson) => {
      
        this.setState({isLoading:false});
        // console.warn(responseJson);
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
         var obj = JSON.parse(responseJson);
       if(obj.success){
           this.setState({cocIn:obj.balance_in,
                          cocOut:obj.balance_out,
                          cocBalance:obj.balancecoc,
                          dataSource:obj.data.data,
                          btn_pre:obj.data.prev_page_url,
                          btn_next:obj.data.next_page_url,
                          // detail:s

                        });
        }
      }
      })
      .catch((error) => {
        alert(error.message);
         // console.error(error.message);
         this.setState({isLoading:false});
      }
      );
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

     <View style={{backgroundColor:"#000033"}}>
       
     <Text style={{fontSize:14, marginLeft:10, marginTop: 10, color:'#ffbf00'}} >History Transaction BitCoin :</Text>
     <ScrollView horizontal={false} vertical={true}>


        <Grid style={{ marginLeft:5, marginTop: 5}}> 
        <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >Amount</Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>Description</Text>
             </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10}}>Date</Text>
              </Col>
              
          </Row>
      {this.state.dataSource.map((item, index) => {
        return ( 
      
  
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >{item.amounts} Coin</Text>
            </Col>
             <Col>
                {item.from == this.state.wallet_ku ? 
                  <Text style={{fontSize:11, marginLeft:10}}>Send Coin</Text> :
                  <Text style={{fontSize:11, marginLeft:10}}>Receive Coin</Text>}
             </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10}}>{item.created_at}</Text>
              </Col>
               
          </Row>
                        ) 
                            })}

 </Grid>

<View style={{backgroundColor:'transparent'}}>
<ListItem>
<Left>
      <Icon active name="arrow-back" onPress={() => {
      this.setState({url :this.state.btn_pre});
      this.bukahistory();
    }}/>
    </Left>
    <Right>
      <Icon active name="arrow-forward" onPress={() => {
      this.setState({url :this.state.btn_next});
      this.bukahistory();
    }}/>
    </Right>
    </ListItem>

</View>
  </ScrollView>


</View>
          
    );
  }
}

const HistoryBtc = reduxForm({
  form: "helping"
})(HistoryBtcForm);

export default HistoryBtc;
