// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform, AsyncStorage,TextInput, Alert,ActivityIndicator,ScrollView, Modal,Clipboard  } from "react-native";
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

class HistoryForm extends Component {
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
      modalVisible:false,
      btn_pre:null
          };

     AsyncStorage.getItem('token', (err, result) => {
     token = result;
        // console.warn(token);

        this.bukahistory();
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
        console.warn(responseJson);
         this.setState({isLoading:false});
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
       var obj = JSON.parse(responseJson);
       
       if(obj.success){
           this.setState({cocIn:obj.balance_in.toFixed(8),
                          cocOut:obj.balance_out.toFixed(8),
                          cocBalance:obj.balancecoc.toFixed(8),
                          dataSource:obj.data.data,
                          btn_pre:obj.data.prev_page_url,
                          btn_next:obj.data.next_page_url,
                          // detail:s

                        });
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

Functiondetail(txid){
    this.setState({isLoading:true});
    return fetch('https://www.cavallocoin.co/api/gethistory/'+txid, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'authorization':'Bearer '+ token},
     
    })
      .then((response) => response.text())
      .then((responseJson) => {
         this.setState({isLoading:false});
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
       var obj = JSON.parse(responseJson);
       
        // console.warn(responseJson);
       if(obj.success){

         
           this.setState({ modalVisible:true,
                          from_wallet:obj.data.from.wallet,
                          to_wallet: obj.data.to.wallet,
                          amount: obj.data.amount+"",
                          desc: obj.data.description,
                          date: obj.data.created_at,
                          txid:obj.data.tx_id

                        });
            // console.warn(this.state.amount);
        }

      }
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );
    
}

cek(index){
  s=[];

           this.setState({
                          modalVisible:true,
                          detail:index
                        });

}

functionName(index){
// desc = this.state.dataSource[index];
    return this.state.dataSource[index].map(function(item, i){
    return(
      <Grid key={i}>
        <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >TX ID</Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.txid}</Text>
             </Col>
          </Row>
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >From Wallet</Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.from_wallet}</Text>
             </Col>
          </Row>
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >To Wallet </Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.to_wallet}</Text>
             </Col>
          </Row>
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >Amount </Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.amount}</Text>
             </Col>
          </Row>
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >Description </Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.desc}</Text>
             </Col>
          </Row>
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >Date </Text>
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>: {this.state.date}</Text>
             </Col>
          </Row>
      </Grid>
    );
  });
    


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
      <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({modalVisible:!this.state.modalVisible})}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Image source={logo} style={styles.imageHeader} />
          </Body>
          <Right />
        </Header>
         <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
        <ScrollView>
       
         <Text style={{fontSize:14, marginLeft:10, marginTop:10, marginBottom:10}} >TX ID : </Text>
          <Item rounded style={styles.inputGrp}>
          <Input
            placeholderTextColor="#FFF"
             style={{ fontSize:14, color:"#FFF", paddingLeft:10, paddingRight:10}}
            value={this.state.txid}
             editable={false}
          /> 
          </Item> 
        <Text style={{fontSize:14, marginLeft:10, marginTop:10, marginBottom:10}} >Amount :</Text>
         <Item rounded style={styles.inputGrp}>
          <Input
            placeholderTextColor="#FFF"
             style={{ fontSize:14, color:"#FFF", paddingLeft:10, paddingRight:10}}
            value={this.state.amount}
            editable={false}
          /> 
          </Item>
           <Text style={{fontSize:14, marginLeft:10, marginTop:10, marginBottom:10}} >Description :</Text>
            <Item rounded style={styles.inputGrp}>
          <Input
            placeholderTextColor="#FFF"
             style={{ fontSize:14, color:"#FFF", paddingLeft:10, paddingRight:10}}
            value={this.state.date}
             editable={false}
          /> 
          </Item>
          <Text style={{fontSize:14, marginLeft:10, marginTop:10, marginBottom:10}} >From Wallet :</Text>
            <Item rounded style={styles.inputGrp,{ height:100}}>
          <Input
            placeholderTextColor="#FFF"
             style={{ fontSize:14, color:"#FFF", paddingLeft:10, paddingRight:10, height:100}}
            value={this.state.from_wallet}
             multiline={true}
             editable={false}
          /> 
          </Item>
          <Text style={{fontSize:14, marginLeft:10, marginTop:10, marginBottom:10}} >To Wallet :</Text>
            <Item rounded style={styles.inputGrp,{ height:100}}>
          <Input
            placeholderTextColor="#FFF"
             style={{ fontSize:14, color:"#FFF", paddingLeft:10, paddingRight:10, height:100}}
            value={this.state.to_wallet}
             multiline={true}
             editable={false}
          /> 
          </Item>
          </ScrollView>
       </Image>
    </Modal>
<View>
<PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    containerStyle={{ zIndex: 10, position:'absolute'}}
  >
    <View>
      <Text style={{fontSize:30}}>Hello</Text>
    </View>
  </PopupDialog>
</View>
     <View>

           <Grid style={{marginBottom: 5,padding:5}}>
             <Row>
             
              <Col>
                <Text style={styles.textNote}>COC IN</Text>
                <Text style={styles.textNote}>{this.state.cocIn} COC</Text>
              </Col>
              <Col>
                 <Text style={styles.textNote}>COC OUT</Text>
                <Text style={styles.textNote}>{this.state.cocOut} COC</Text>
              </Col>
               <Col>
                 <Text style={styles.textNote}>Balance COC</Text>
                <Text style={styles.textNote}>{this.state.cocBalance} COC</Text>
              </Col>
             </Row>
           </Grid>

       </View> 
       
     <Text style={{fontSize:14, marginLeft:10, marginTop: 50, color:'#ffbf00'}} >History Transaction Cavallo Coin :</Text>
     <ScrollView horizontal={false}>


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
               <Col>
                <Text style={{fontSize:11, marginLeft:10}}>Action</Text>
              </Col>
          </Row>
      {this.state.dataSource.map((item, index) => {
        return ( 
      
  
          <Row style={{margin:10}}>
             <Col>
              <Text style={{fontSize:11, marginLeft:10}} >{item.amount} Coin</Text>
              {this.state.detail[index] ? 
               <Text style={{fontSize:11, marginLeft:10}} >TX ID</Text> :null}
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10}}>{item.description}</Text>
             </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10}}>{item.created_at}</Text>
              </Col>
               <Col>
                <Text style={{fontSize:12, marginLeft:5, textDecorationLine:'underline', color: "#ffbf00"}} onPress={() => this.Functiondetail(item.tx_id)}> Detail</Text>

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

const History = reduxForm({
  form: "helping"
})(HistoryForm);

export default History;
