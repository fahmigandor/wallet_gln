// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform, AsyncStorage,TextInput, Alert,ActivityIndicator ,ScrollView, Modal } from "react-native";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  Left,
  Right,
  ListItem,
  Button,
 Icon,
 Header,
   Body,
  Item,
  Input
} from "native-base";
import { Grid, Col as Cl, Row as Rw } from "react-native-easy-grid";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
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
const tableHead = [ 'PRICE(BTC)', 'PRICE(COC)', 'AMOUNTS', 'PRICE(USD)', 'STATUS', 'TYPE', 'DATE'];
   const wid = [100, 100, 200, 100, 100, 100, 100, 100, 100, 100];
     
   const url ='https://www.cavallocoin.co/api/gethistory-buy';
   const fee=0, fee_btc=0;
class IcoPrevForm extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
     AsyncStorage.getItem('token', (err, result) => {
     token = result;
        // console.warn(token);
      }
        );

    this.state = {
      listViewData: datas,
      dataSource : a,
      text:null,
      boolInfo:false,
      boolHistory:false,
      boolPoin:false,
      isLoading:false,
      btc_input:null,
      pass:null,
      url:url,
      isLoading:false,
      coc:null,
              coc_terima:null,
              usd:null,
              btc:null,
              mybalance_btc:null
          };
  }

  deleteRow(secId: string, rowId: string, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

   renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={{margin:10}}>
          <Icon active name="copy" style={{ color: "#ffbf00" }} />
          <Input
            color="#ffbf00"
            style={{ fontSize:14,  color: "#ffbf00"}}
            multiline={true}
            // placeholder="link"
            value="https://dashboard.cavallocoin.co/register/ref/cek_wallet"
            // {...input}
            ref={c => (this.textInput = c)}
          />
          
        </Item>
       
      </View>
    );
  }


  // functionInformation(){
  //   return(
  // <View>    
  //     <Grid>
  //          <Row style={{marginTop : 10, backgroundColor:'#000033', padding:5}}>
  //          <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>COC COIN</Text></Col>
  //          <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>PRICE [USD]</Text></Col>
  //          <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>STATUS</Text></Col>
  //          </Row>
  //         {this.state.dataSource.map((item, index) => {
  //         return (   <Row border style={{ marginTop:5, paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor:'#ffbf00'}} 
  //         onPress={() => this.pilih("brkt", item.price_value, index)}>
  //            <Col>
  //               <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.coin}</Text>
  //            </Col>

  //             <Col>
  //             <Text style={{fontSize:11, marginLeft:10}} > {item.price}</Text>
  //             </Col>
  //             <Col>
  //               <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.status} (20%)</Text>
  //             </Col>
  //         </Row>
                      
  //                       ) 
  //                           })}



  //    </Grid>
  // </View>);
  // }

  functionHistory(){
    return(<View>
      <ScrollView horizontal={true} vertical={true} styles={{marginTop: 20, marginLeft : 10}}>
           <Table styles={{flexDirection: 'row', marginTop: 20, marginLeft : 10}}>
                    
                    <Rows data={this.state.dataSource} textStyle={{fontSize:12, marginLeft:10, marginTop: 5, color:'white'}} widthArr={wid}/>
                  </Table>

           </ScrollView>
<ListItem>
<Left>
 <Icon active name="arrow-back" onPress={() => {
      this.setState({url :this.state.btn_pre});
      this.getHistory();
    }} />
</Left>
<Right>
<Icon active name="arrow-forward" onPress={() => {
      this.setState({url :this.state.btn_next});
      this.getHistory();
    }} />
    </Right>
</ListItem>
     
      
    </View>
    );
  }


functionHistorya(){
    return(
  <View>    
<ScrollView horizontal={true} vertical={true}>

        <Grid style={{ marginLeft:5, marginTop: 5}}> 
        <Row>
             <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}} >STATUS</Text>
              
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>TYPE</Text>
             </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>DATE</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>AMOUNTS</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>PRICE(USD)</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>PRICE(COC)</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>PRICE(BTC)</Text>
              </Col>
          </Row>

      {this.state.dataSource.map((item, index) => {
        return ( 
       
  
            <Row>
             <Col>
              {item.status == 1 ? <Text style={{fontSize:11, marginLeft:10, marginTop: 5}} >Success</Text> :
                                  <Text style={{fontSize:11, marginLeft:10, marginTop: 5}} >Pending</Text>}
              
              </Col>
             <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.type}</Text>
             </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.created_at}</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.amounts}</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.usd}</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.coc}</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.btc}</Text>
              </Col>
          </Row>
        
         
                        ) 
                            })}
</Grid>
</ScrollView>

  </View>);
  }

  cek_harga(){

    if(this.state.btc_input == null || this.state.btc_input == "" || this.state.btc_input == 0){
     alert("Coloumn must be filled");
    }else if(Number(this.state.btc_input) >= 20){
        alert("Amount BTC minimal 20");
    }else{
    this.setState({isLoading:true});
     return fetch('https://www.cavallocoin.co/api/price', {
      method: 'GET',
        headers: { 'Content-Type': 'application/json',
                  'authorization':'Bearer '+ token}
    })
      .then((response) => response.text())
      .then((responseJson) => {
        if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
          this.setState({isLoading:false});
        this.props.navigation.navigate("LoginUlang");

      }else{
        // console.warn(responseJson);
        try{
            var obj = JSON.parse(responseJson);

           if(obj.success){
            fee = obj.data.price_coc;
            fee_btc = obj.data.fee/100000000;
           this.FunctiondetailBTC();
           }else{
            alert("Invalid Data");
           }
        }catch(err){
           this.setState({isLoading:false});
       alert("Invalid Data");
         // this.props.navigation.goBack();
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

 cek_harga_global(){
    this.setState({isLoading:true});
     return fetch('https://blockchain.info/ticker', {
      method: 'GET'
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

            cek = true;
            if(this.state.mybalance_btc == this.state.btc_input){
              btc_seharusnya = this.state.btc_input - fee_btc;
            }else if(this.state.mybalance_btc > this.state.btc_input){
              btc_seharusnya = this.state.btc_input;
            }else{
              cek =false;
                this.setState({isLoading:false});
                alert("Your BTC not enough");
            }

        if(cek){
           satuan_btc = obj.USD.last;

            coc = fee/satuan_btc;
            coc_terima = btc_seharusnya/coc;
            usd = coc_terima*fee;
             this.setState({boolPoin:true,
              coc:coc.toFixed(8)+"",
              coc_terima:coc_terima.toFixed(8)+"",
              btc_input : btc_seharusnya.toFixed(8),
              usd:usd.toFixed(2)+"",
              fee_btc:fee_btc+"",
              satuan_btc:satuan_btc.toFixed(2)});
             alert(btc_seharusnya.toFixed(8));
        }
           
            // usd = btc

            // alert("btc ="+btc+"\ncoc ="+coc+"\nusd ="+usd);
              
        }catch(err){
        alert(err.message);
         // this.props.navigation.goBack();
       }
    }
      })
      .catch((error) => {
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );

       
  }

  FunctiondetailBTC(){
    this.setState({isLoading:true});
    return fetch('https://www.cavallocoin.co/api/mybalance-btc', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'authorization':'Bearer '+ token},
      // body:JSON.stringify({
      //   "password"  : password
      // })
    })
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false});
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
       var obj = JSON.parse(responseJson);
       if(obj.success){

          // // console.warn(obj.data);
           this.setState({ mybalance_btc:obj.data
                        });

            this.cek_harga_global();

        }
      }
      })
      .catch((error) => {
        // alert("Invalid Data");
        // console.warn(error.message);
         this.setState({isLoading:false});
      }
      );
    
}

 buy(){
  this.setState({isLoading:true});

  // console.warn(token);
   return fetch('https://www.cavallocoin.co/api/buycoc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
              'authorization':'Bearer '+ token},
  body:JSON.stringify({
      "btc" : this.state.btc_input,
      "coc" : coc,
      "usd" : usd,
      "amount" : coc_terima,
      "password" : this.state.pass
})
})
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false, boolPoin:false});
        if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
        }else{
        try{
            var obj = JSON.parse(responseJson);

            if(obj.status){
              alert("Success");
            }else{
              alert("FAILED, Cek Your BTC Coin");
            }
        }catch(err){
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

  getHistory(){
     // console.warn(this.state.url);
    if(this.state.url == null || this.state.url == ""){
       this.setState({boolHistory: false});
    }else{
  this.setState({isLoading:true});

 
   return fetch(this.state.url, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
              'authorization':'Bearer '+ token}
 
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

              data_asli = [];
                data_asli.push(tableHead);
                for (var i = 0; i < obj.data.data.length; i++) {
                  const data =[];

                  if(obj.data.data[i].status ==1){
                    data.push("Success");
                  }else{
                    data.push("Pending");
                  }data.push(obj.data.data[i].btc);
                     data.push(obj.data.data[i].coc);
                     data.push(obj.data.data[i].amounts);
                     data.push(obj.data.data[i].usd);
                    data.push(obj.data.data[i].type);
                     data.push(obj.data.data[i].created_at);
                     

                     data_asli.push(data);
                };
                    
  

              this.setState({boolHistory: !this.state.boolHistory,
                            dataSource:data_asli,
                             btn_pre:obj.data.prev_page_url,
                              btn_next:obj.data.next_page_url});
            }else{
              alert("FAILED");
            }
        }catch(err){
        alert(err.message);
         // this.props.navigation.goBack();
         this.setState({isLoading:false});
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
      <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolPoin}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({boolPoin:!this.state.boolPoin})}>
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
       <Text>Price BTC : </Text>
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
       <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            value={this.state.btc_input}
             editable = {false}
          /> 
           </Item>

           <Text>Fee : </Text>
            <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
          <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            value={this.state.fee_btc}
             editable = {false}
          />
           </Item>

        <Text>Price USD : ({this.state.satuan_btc}/BTC)</Text>
            <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
          <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            value={this.state.usd}
             editable = {false}
          />
           </Item>

       <Text>Price COC : </Text>
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
        <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            value={this.state.coc}
             editable = {false}
          />
           </Item>
       <Text>Amount COC Received : </Text>
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
       <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            value={this.state.coc_terima}
             editable = {false}
          />
           </Item>
      
       

           <Button rounded warning style={styles.swipeBtn,{alignSelf: "flex-start", marginTop:10}}  onPress={() => this.buy()}> 
           <Text>Buy</Text>
          </Button>
       </Image>
    </Modal>

    <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolHistory}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({boolHistory:!this.state.boolHistory})}>
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
      <View>    
      <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", marginBottom:10}}>Detail History Buy Coin</Text>
        {this.state.boolHistory ? this.functionHistory() : null }
        </View>
      
       </Image>
    </Modal>


        <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <CustomHeader hasTabs navigation={navigation} />

         <Content>
<View>
         <Head/>
         </View>

        
     
      <View style={{padding:10,marginTop:5, backgroundColor:"#000033"}}>
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "left",color:"#ffbf00", marginBottom:5}}>BUY COC :</Text>
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Amount in BTC"
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(btc_input) => this.setState({btc_input})}
            value={this.state.btc_input}
          />
        </Item>

       <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)", marginTop:5}}>
          <Icon
            active
            name= "unlock" 
            style={{ color: "#ffbf00" }}
          /> 
         
          <Input
            placeholderTextColor="#FFF"
            style={{ fontSize:14, color:"#ffbf00"}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass})}
            value={this.state.pass}
          /> 
          </Item>

    
          <Button rounded warning style={styles.swipeBtn,{alignSelf: "flex-start",marginTop:10}}  onPress={() => this.cek_harga()}> 
            <Text style={styles.newsCoin}>Buy</Text>
          </Button>
            
      </View>

      <Text style={{fontSize:13, marginLeft:10, marginRight:10, marginBottom:20, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end"}}  onPress={() => this.getHistory()}> Detail History Buy Coin</Text>
     
          </Content>
        </Image>
      </Container>
    );
  }
}

const IcoPrev = reduxForm({
  form: "helping"
})(IcoPrevForm);

export default IcoPrev;
