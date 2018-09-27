// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform,AsyncStorage, Modal } from "react-native";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  Left,
   Body,
   Header,
  ListItem,
   Right,
  Button,
 Icon,
  Item,
  Input
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
const img3 = require("../../../assets/bnyas.png");
import CustomHeader from "../../components/CustomHeader";
import Head from "../head/head.js";
const logo = require("../../../assets/cava.png");
// import LoginUlang from "./LoginUlang.js";
// import APIHandler from "./APIHandler.js";
const img1 = require("../../../assets/btcs.png");
const img2 = require("../../../assets/cvts.png");
const img4 = require("../../../assets/usda.png");
const img5 = require("../../../assets/tasi.png");
const img6 = require("../../../assets/lend.png");
const img7 = require("../../../assets/tod.png");
const img8 = require("../../../assets/tot.png");
import styles from "./styles";
import datas from "./data";

// const APIHandler = new APIHandler();

  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;

const a= ["Buy COC :", "- Minimun buy 20 COC.","- The COC coin can be transfered from account to another account.","- It takes 10-60 minutes or 24 hours"];
const token = null;
const password = null;

class ProfileForm extends Component {
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
         AsyncStorage.getItem('pass', (err, result) => {
     password = result;
        this.Functiondetail();
      }
        );
      }
        );

    this.state = {
      listViewData: datas,
      dataSource : this.ds.cloneWithRows(a),
      coc :0.00000,
      btc:0.00000,
      usd:0.00000,
      total_lending:0.00000,
      today_earn:0.00000,
      total_earn:0.00000,
      capital_released:0.00000,
      boolHistory:false,
      boolHistoryBtc:false
    };
// ApiHandler.loginPOST(function ( err, res ) {
//             console.warn("ok hasil masuk");
//         });
    
  }

  deleteRow(secId: string, rowId: string, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  writeToClipboard = async () => {   
  alert('TODO: Write to the Clipboard'); 
};

Functiondetail(){
  // alert("Functiondetail");
// LoginUlang.loginValid();
    this.setState({isLoading:true});
    return fetch('https://www.cavallocoin.co/api/mybalance', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'authorization':'Bearer '+ token}
                  // ,
      // body:JSON.stringify({
      //   "password"  : password
      // })
    })
      .then((response) => response.text())
      .then((responseJson) => {
      
        // this.setState({isLoading:false});
        // console.warn(responseJson);
      if(responseJson.toUpperCase().includes("TOKEN HAS EXPIRED")){
        this.props.navigation.navigate("LoginUlang");
      }else{
        
         var obj = JSON.parse(responseJson);
       if(obj.success){
        coca = Number(obj.data.balance);
        // console.warn(coca.toFixed(8));
           this.setState({ coc:coca.toFixed(8)});
           // alert(obj.data.balance.toFixed(8));
           this.FunctiondetailBTC();
        }
      }
      })
      .catch((error) => {
        // alert("Invalid Data");
         this.setState({isLoading:false});
      }
      );

     
    
}

FunctiondetailBTC(){
  // alert("FunctiondetailBTC");
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
        btca = Number(obj.data);
          // console.warn(obj.data);
           this.setState({ btc:btca.toFixed(8)
                        });
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



  render() {

   
    const navigation = this.props.navigation;
    return (
      <Container>
      

      <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.boolHistoryBtc}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }
               style={{backgroundColor:"#000033"}}>
               <Header>
       <Left>
            <Button transparent onPress={() => this.setState({boolHistoryBtc:!this.state.boolHistoryBtc})}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Image source={logo} style={styles.imageHeader} />
          </Body>
          <Right>
          </Right>
         
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
               visible = {this.state.boolHistory}
               onRequestClose = {()=> { console.log("Modal has been closed.") } }
               style={{backgroundColor:"#000033"}}>
               <Header>
       <Left>
            <Button transparent onPress={() => this.setState({boolHistory:!this.state.boolHistory})}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Image source={logo} style={styles.imageHeader} />
          </Body>
          <Right>
          </Right>
         
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

 <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >

          <CustomHeader hasTabs navigation={navigation} />

         <Content>
        <View>
         <Head/>
         </View>


           <Grid style={{backgroundColor:"#000033",marginBottom: 15,padding:5}}>
           <Row>
           <Col>
            <Image source={img3} style={{ width: 40,height: 40,marginLeft: 10}} />
           </Col>
            <Col>
            <Text style={styles.textNote}>Sales [ Left ]</Text>
            <Text style={styles.textNote}>$ 0.00</Text>
           </Col>
            <Col>
             <Text style={styles.textNote}>Sales [ Right ]</Text>
            <Text style={styles.textNote}>$ 0.00</Text>
           </Col>
           </Row>
           </Grid>
            
            <List style={{
                          backgroundColor: "#000033"
                        }}>
                    <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       onPress={() => this.setState({boolHistoryBtc: !this.state.boolHistoryBtc})}
                      >
                        <Image source={img1} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                            BTC
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.btc}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                        onPress={() => this.setState({boolHistory: !this.state.boolHistory})}
                      >
                        <Image source={img2} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                           COC
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.coc}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       
                      >
                        <Image source={img4} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                            USD
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.usd}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       
                      >
                        <Image source={img6} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                           Total Lending
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.total_lending}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       
                      >
                        <Image source={img7} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                           Today Earn
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                 {this.state.today_earn}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       
                      >
                        <Image source={img8} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                           Total Earn
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.total_earn}
                                </Text>
                            
                        </View>
                      </ListItem>
                      <ListItem
                        swipeList
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#000033"
                        }}
                       
                      >
                        <Image source={img5} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                          <Text style={styles.newsHeader}>
                             Capital Released
                          </Text>
                          
                                <Text style={styles.newsCoin}>
                                  {this.state.capital_released}
                                </Text>
                            
                        </View>
                      </ListItem>
       </List>

          </Content>
        </Image>
      </Container>
    );
  }
}

const Profile = reduxForm({
  form: "help"
})(ProfileForm);

export default Profile;
