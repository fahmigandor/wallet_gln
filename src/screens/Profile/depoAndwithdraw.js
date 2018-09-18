// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform, TextInput, Alert,  AsyncStorage, Modal,ActivityIndicator,ScrollView,Clipboard } from "react-native";
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
   Header,
   Body,
 Icon,
  Item,
  Input
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
const img3 = require("../../../assets/bnyas.png");
import CustomHeader from "../../components/CustomHeader";
import Head from "../head/head.js";
import History from "./History.js";
import HistoryBtc from "./HistoryBtc.js";
const logo = require("../../../assets/cava.png");
import QRCode from 'react-native-qrcode-svg';
import styles from "./styles";
import datas from "./data";

  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;


const boolCOC= null, boolBTC=null,token=null;
class depoAndwithdrawForm extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      AsyncStorage.getItem('data_user', (err, result) => {
         var obj = JSON.parse(result);
     boolCOC = obj.data.wallet;
     boolBTC = obj.data.wallet_btc;

        // console.warn(boolBTC+"boolBTC");
      }
        );

       AsyncStorage.getItem('token', (err, result) => {
     token = result;
      }
        );


    this.state = {
      listViewData: datas,
      dataSource : [],
      dataSourceBitcoin : [],
      text:null,
      boolCavallo:false,
      boolBitcoin:false,
      modalVisible:false,
      modalCavallo:false,
      boolHistory:false,
      boolHistoryBtc:false,
      boolCOCModal:false,
      boolBTCModal:false,
      isLoading:false,
      BTCaddress:null,
      COCaddress:null,
      BTCamount:null,
      COCamount:null,
      passwordBTC:null,
      passwordCOC:null,
      password:null,
      walletBTC:false,
      walletCOC:false
    };
  }

  deleteRow(secId: string, rowId: string, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  getDataURL() {
  this.svg.toDataURL(this.callback);
}
callback(dataURL) {
  // console.log(dataURL);
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

  pilih(text){

    if(text == "cavallo"){
       Alert.alert(
                'Data',
               "dkjnfkdsnf",
                [
                  {text: 'OK'},
                 
                ],
                { cancelable: false }
              )
    }
  }


  functionBitcoin(){
    return(
  <View>    
      <Grid>
           <Row style={{marginTop : 10, backgroundColor:'#000033', padding:5}}>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>Address</Text></Col>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>BTC</Text></Col>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>Confirmation</Text></Col>
           </Row>
          {this.state.dataSourceBitcoin.map((item, index) => {
          return (   

           
            <Row border style={{ marginTop:5, paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor:'#ffbf00'}} 
         >
             <Col>
                {item.confirmations > 3 ? null :
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{boolBTC}</Text> }
             </Col>

              <Col>
               {item.confirmations > 3 ? null :
              <Text style={{fontSize:11, marginLeft:10}} > {item.value * 0.00000001}</Text>}
              </Col>
              <Col>
               {item.confirmations > 3 ? null :
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.confirmations}/3</Text>}
              </Col>
          </Row>
                        ) 
                            })}



     </Grid>
    
  </View>
  );
  }


functionCavallo(){
    return(   
<View>    
      <Grid>
           <Row style={{marginTop : 10, backgroundColor:'#000033', padding:5}}>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>Address</Text></Col>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>COC</Text></Col>
           <Col><Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>Confirmation</Text></Col>
           </Row>
          {this.state.dataSource.map((item, index) => {
          return (   <Row border style={{ marginTop:5, paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor:'#ffbf00'}} 
         >
             <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.coin}</Text>
             </Col>

              <Col>
              <Text style={{fontSize:11, marginLeft:10}} > {item.price}</Text>
              </Col>
              <Col>
                <Text style={{fontSize:11, marginLeft:10, marginTop: 5}}>{item.status} (20%)</Text>
              </Col>
          </Row>
                      
                        ) 
                            })}



     </Grid>

  


  </View>);
  }

createAddress(text){
  if(this.state.password == null || this.state.password == "" ){
    alert("All Coloumn must be filled");
}else{
  this.setState({isLoading:true});

  if(text == "btc"){
    url = 'https://www.cavallocoin.co/api/createbtc-wallet';
  }else{
     url = 'https://www.cavallocoin.co/api/createcoc-wallet';
  }

  // console.warn(token+" pass : "+this.state.password);
   return fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
              'authorization':'Bearer '+ token},
  body:JSON.stringify({
      "password" : this.state.password
})
})
      .then((response) => response.text())
      .then((responseJson) => {
        // console.warn("create"+responseJson);
        this.setState({isLoading:false});
 if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
         // if(ket.toUpperCase().includes("TOKEN HAS EXPIRED")){
         //   navigation.navigate("LoginUlang");
         // }else{
           var obj = JSON.parse(responseJson);
           if(obj.success){
                AsyncStorage.setItem('data_user',responseJson);
                boolBTC = obj.data.wallet_btc;
                boolCOC = obj.data.wallet;
                this.setState({boolBTC:boolBTC,
                                boolBTCModal:false,
                                boolCOCModal:false
                });
                alert("Success");


           }else{
            alert(obj.data.password[0]);
           }
     
        // }
}
      })
      .catch((error) => {
        console.warn(error.message);
        alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );
}
}



sendcoin(text){
 
  cek=false;
  if(text == "btc"){
    url = "/api/sendbtccoin";
    amount = this.state.BTCamount;
    password = this.state.passwordBTC;
    address = this.state.BTCaddress;
    data= JSON.stringify({
  "password_"  : password,
  "wallet_"  : address,
  "amount_"  : amount
});

  }else{
    url="/api/sendcoin";
     amount = this.state.COCamount;
    password = this.state.passwordCOC;
    address = this.state.COCaddress;

      data= JSON.stringify({
  "password"  : password,
  "wallet"  : address,
  "amount"  : amount
});
  }

  // console.warn(data);
if(amount != null && amount != "0" && password != null && address != null){
 
 this.setState({isLoading:true});
   return fetch('https://www.cavallocoin.co'+url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
              'authorization':'Bearer '+ token},
  body:data
})
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false});
        // console.warn("sendcoin"+responseJson);
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
       var obj = JSON.parse(responseJson);
       if(obj.success){
            AsyncStorage.setItem('data_user',responseJson);
            boolBTC = obj.data.wallet_btc;
            boolCOC = obj.data.wallet;
             this.setState({COCamount:null,
                        passwordCOC: null,
                        COCaddress: null});
       }else{
        alert(obj.data);
       }

     }
     
      })
      .catch((error) => {
        alert("Invalid Data");
        // console.warn(error.message);
         this.setState({isLoading:false});
      }
      );
    
    }else{
      alert("Coloumn must be filled");
    }

}

viewbtcReceive(){
 
 if(!this.state.boolBitcoin){
  this.setState({isLoading:true});
   return fetch('https://blockchain.info/unspent?active='+boolBTC, {
  method: 'GET',
 
})
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false});
        // console.warn(responseJson);
         if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
       var obj = JSON.parse(responseJson);
     
            this.setState({dataSourceBitcoin:obj.unspent_outputs,
                        boolBitcoin: !this.state.boolBitcoin});
            // return this.functionBitcoin();
     }
      })
      .catch((error) => {
        // alert("Invalid Data");
         this.setState({isLoading:false, boolBitcoin: !this.state.boolBitcoin});
      }
      );
    }else{
        this.setState({boolBitcoin: !this.state.boolBitcoin});
    }
 
  
}
copi(text){
  Clipboard.setString(text);
}

scrollToEnd(){
  this.setState({boolCavallo: !this.state.boolCavallo});
  this.scrollView.scrollToEnd();
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
      <View style = {styles.modal}>
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>Your BTC Address</Text>
     <Item rounded style={{margin:10}}>
          <Icon active name="copy" style={{ color: "#ffbf00" }} onPress={() => this.copi(boolBTC)}/>
          <Input
            TextColor="#ffbf00"
            style={{ fontSize:14, color:"#ffbf00", height:100}}
            multiline={true}
            // placeholder="link"
            editable={false}
            value={boolBTC}
          
          />
         
        </Item>
        <View style={{alignSelf:'center'}}>
         <QRCode
            value={boolBTC}
            getRef={(c) => (this.svg = c)}
            color='black'

          />

         </View>
         <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>IMPORTANT : Send Only BTC to the deposit adrress.</Text>
            <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>Sending any other currenry to address may result in the loss off your deposit.</Text>
      </View>
       </Image>
    </Modal>

     <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalCavallo}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({modalCavallo:!this.state.modalCavallo})}>
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
      <View style = {styles.modal}>
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>Your CavalloCoin Address</Text>
     <Item rounded style={{margin:10}}>
          <Icon active name="copy" style={{ color: "#ffbf00" }} onPress={() => this.copi(boolCOC)}/>
          <Input
            TextColor="#ffbf00"
            style={{ fontSize:14, color:"#ffbf00", height:100}}
            multiline={true}
            // placeholder="link"
            editable={false}
            value={boolCOC}
          
          />
         
        </Item>
        <View style={{alignSelf:'center'}}>
         <QRCode
            value={boolCOC}
            getRef={(c) => (this.svg = c)}
            color='black'

          />

         </View>
         <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>IMPORTANT : Send Only CavalloCoin to the deposit adrress.</Text>
            <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}>Sending any other currenry to address may result in the loss off your deposit.</Text>
      </View>
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
      <View style = {styles.modal}>
      

       <History/>
      </View>
       </Image>
    </Modal>

    <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolHistoryBtc}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({boolHistoryBtc:!this.state.boolHistoryBtc})}>
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
      <View style = {styles.modal}>
      

       <HistoryBtc/>
      </View>
       </Image>
    </Modal>

    <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolCOCModal}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({boolCOCModal:!this.state.boolCOCModal})}>
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
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}> Create Your Wallet CavalloCoin (COC)</Text>
        <Item rounded style={{margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Password"
           secureTextEntry
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </Item>
     
          <Button rounded warning style={styles.swipeBtn,{alignSelf: "center"}} onPress={() =>this.createAddress("coc")}> 
            <Text style={styles.newsCoin}>Submit</Text>
          </Button>
      </View>
       </Image>
    </Modal>

    <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolBTCModal}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }>
               <Header>
          <Left>
            <Button transparent onPress={() => this.setState({boolBTCModal:!this.state.boolBTCModal})}>
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
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "center",color:"#ffbf00", margin:5}}> Create Your Wallet Bitcoin (BTC)</Text>
        <Item rounded style={{margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Password"
           secureTextEntry
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </Item>
     
          <Button rounded warning style={styles.swipeBtn,{alignSelf: "center"}} onPress={() =>this.createAddress("btc")}> 
            <Text style={styles.newsCoin}>Submit</Text>
          </Button>
      </View>
       </Image>
    </Modal>

        <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <CustomHeader hasTabs navigation={navigation} />

         <Content>
          <ScrollView ref={(scrollView) => { this.scrollView = scrollView }} style={styles.scroll} >
      <View>
         <Head/>
      </View>

         <View>
          
            
         
         </View>

                     
                     <View style={{padding:10,backgroundColor:"#000033"}}>
                      <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "left",color:"#ffbf00", marginBottom:5}} onPress={() => this.setState({walletBTC: !this.state.walletBTC})}>Send BitCoin (BTC) :</Text>
        {boolBTC == null || boolBTC == "" ? 
       <Text style={{fontSize:11, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end", marginBottom:5}}  onPress={() => this.setState({boolBTCModal:true})} > Create address Bitcoin</Text>
    
     :
     
      <Text style={{fontSize:11, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end", marginBottom:5}}  onPress={() => this.setState({modalVisible:true})} > Get address to accept Bitcoin payments</Text>
     }
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Enter Address Wallet"
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(BTCaddress) => this.setState({BTCaddress})}
            value={this.state.BTCaddress}
          />
        </Item>

         <Item rounded style={{margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Enter Your Amount"
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(BTCamount) => this.setState({BTCamount})}
            value={this.state.BTCamount}
          />
        </Item>

         <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="unlock" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Password"
           secureTextEntry
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(passwordBTC) => this.setState({passwordBTC})}
            value={this.state.passwordBTC}
          />
        </Item>
     
          <Button rounded warning style={styles.swipeBtn,{alignSelf: "center", marginTop:5}} onPress={() => this.sendcoin("btc")}> 
            <Text style={styles.newsCoin} >Withdraw from BTC wallet</Text>
          </Button>
           <Grid>
       <Row >
        <Col onPress={() => this.setState({boolHistoryBtc: !this.state.boolHistoryBtc})}>
       <Text  style={{fontSize:13,  marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-start"}}  > Detail History BitCoin</Text>
       </Col>
       <Col>
       </Col>
        <Col  onPress={() => this.viewbtcReceive()} style={{alignSelf: "flex-end"}}>
          <Text style={{fontSize:13, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end"}}  > Receive BitCoin (BTC)</Text>
        
        </Col>
      </Row>
      <Row>
        <Col>
        {this.state.boolBitcoin ? this.functionBitcoin() : null }
        </Col>
      </Row>
     </Grid>
      </View>
     
                     
                    
      <View style={{padding:10,marginTop:5, backgroundColor:"#000033"}}>
       <Text  style={{ fontSize:14, fontWeight: 'bold', textAlign: "left",color:"#ffbf00", marginBottom:5}} onPress={() => this.setState({walletCOC: !this.state.walletCOC})}>Send Cavallo Coin (COC) :</Text>
    {boolCOC == null || boolCOC == "" ? 
       <Text style={{fontSize:11, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end", marginBottom:5}}  onPress={() => this.setState({boolCOCModal:true})} > Create address CavalloCoin</Text>
    
     :
     
       <Text style={{fontSize:11, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end", marginBottom:5}}  onPress={() => this.setState({modalCavallo:true})} > Get address to accept CavalloCoin payments</Text>
     }
       
        <Item rounded style={{backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Enter Address Wallet"
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(COCaddress) => this.setState({COCaddress})}
            value={this.state.COCaddress}
          />
        </Item>

         <Item rounded style={{margin:5, backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="copy" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Enter Your Amount"
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(COCamount) => this.setState({COCamount})}
            value={this.state.COCamount}
          />
        </Item>

         <Item rounded style={{ backgroundColor: "rgba(255,255,255,0.3)"}}>
         <Icon active name="unlock" style={{ color: "#ffbf00" }} />
           <Input 
           placeholderTextColor="#FFF"
           placeholder="Password"
           secureTextEntry
           style={{ fontSize:14, color:"#ffbf00"}}
            onChangeText={(passwordCOC) => this.setState({passwordCOC})}
            value={this.state.passwordCOC}
          />
        </Item>
     
          <Button rounded warning style={styles.swipeBtn,{alignSelf: "center",marginTop:5}} onPress={() => this.sendcoin("coc")}> 
            <Text style={styles.newsCoin}>Withdraw from COC wallet</Text>
          </Button>
           <Grid>
       <Row>
       <Col  onPress={() => this.setState({boolHistory: !this.state.boolHistory})}>
        <Text style={{fontSize:13,  marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-start"}}  > Detail History Cavallo Coin</Text>
       </Col>
       <Col>
       </Col>
        <Col   onPress={() => this.scrollToEnd()}>
          <Text style={{fontSize:13, marginLeft:10, marginRight:10, textDecorationLine:'underline', color: "#ffbf00", alignSelf: "flex-end"}}  > Receive Cavallo Coin (COC)</Text>
        
        </Col>
      </Row>
      <Row>
        <Col>
        {this.state.boolCavallo ? this.functionCavallo() : null }
        </Col>
      </Row>
     </Grid>
      </View>
   

</ScrollView>
          </Content>
        </Image>
      </Container>
    );
  }
}

const depoAndwithdraw = reduxForm({
  form: "helping"
})(depoAndwithdrawForm);

export default depoAndwithdraw;
