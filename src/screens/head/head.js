// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform,  AsyncStorage, StyleSheet,ScrollView,Clipboard } from "react-native";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  Left,
  ListItem,
  Button,
 Icon,
  Item,
  Input
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
const img3 = require("../../../assets/bnyas.png");
import CustomHeader from "../../components/CustomHeader";
import styles from "./styles";
import CountDownTimer from 'react_native_countdowntimer';
import HTMLView from 'react-native-htmlview';

const a= ["Buy COC :", "- Minimun buy 20 COC.","- The COC coin can be transfered from account to another account.","- It takes 10-60 minutes or 24 hours"];
  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;
const token= null;
const componentStyles = StyleSheet.create({
  container: {
    color: "#FFF",
    fontSize:12,
  },
   a: {
      color: "green"
    }
});
const htmlStyles = StyleSheet.create({
    a: {
      color: "green"
    },
    li: {
      color: "#FFF"
    },
    ul: {
      color: "#FFF"
    },
    p: {
      color: "#FFF"
    },
    br: {
      color: "#FFF"
    },
    div: {
      color: "#FFF"
    }
  })
// const usdBTC =null, btcCOC = null, usdCOC=null;

class HeadForm extends Component {
 state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    

    this.state = {
      dataSource : [],
      usdBTC :null,
      btcCOC : null,
      usdCOC:null,
      linkreferal: null

    };

    // this.cek_harga();
    AsyncStorage.getItem('token', (err, result) => {
            token = result;
          AsyncStorage.getItem('data_user', (err, resulta) => {
             var obj = JSON.parse(resulta);
            this.setState({
              linkreferal:"https://dashboard.cavallocoin.co/register/ref/"+obj.data.username
            });
          });

      this.Pengumuman();
    });
   
  }


  Pengumuman(){
    // this.setState({isLoading:true});
    return fetch('https://www.cavallocoin.co/api/boards', {
      method: 'GET',
      headers: {'accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization':'Bearer '+ token}
    })
      .then((response) => response.text())
      .then((responseJson) => {
        this.setState({isLoading:false});
      // console.warn(responseJson);
      
         var obj = JSON.parse(responseJson);
       if(obj.success){
        // console.warn("ok");
        this.setState({dataSource:obj.data.data});
           
        }
      
      })
      .catch((error) => {
        // alert(error.message);
         this.setState({isLoading:false});
      }
      );
    
}

copi(){
  Clipboard.setString(this.state.linkreferal);
}

// renderInput({ input, label, type, meta: { touched, error, warning } }) {
//     return (
//       <View>
//         <Item error={error && touched} rounded style={{margin:10}}>

//           <Icon active name="copy" style={{ color: "#ffbf00" }} />
//           <Input
//             TextColor="#ffbf00"
//             style={{ fontSize:14, color:"#ffbf00"}}
//             multiline={true}
//             // placeholder="link"
//             value={this.state.linkreferal}
//           />
//           {touched && error
//             ? <Icon
//                 active
//                 style={styles.formErrorIcon}
//                 onPress={() => this.textInput._root.clear()}
//                 name="close"
//               />
//             : <Text />}
//         </Item>
//         </View>
//     );
//   }

  render() {
   const navigation = this.props.navigation;
    return (
      <View>
      
          <View>
            <Item rounded>

          <Icon active name="copy" style={{ color: "#ffbf00" }}  onPress={() => this.copi()} />
          <Input
            TextColor="#ffbf00"
            style={{ fontSize:14, color:"#ffbf00", height:70}}
            multiline={true}
            // placeholder="link"
            editable={false}
            value={this.state.linkreferal}
          />
          
        </Item>
</View>

    <View  style={{height: 100, padding:5}}>
     <ScrollView rounded horizontal={false} vertical={true} styles={{marginTop: 20, marginLeft : 10}}>
<Grid>
           {this.state.dataSource.map((item, index) => {
        return ( 
      <Row>
             <Col>
              <Text style={{fontSize:14, marginLeft:10, fontWeight:'bold'}} >{item.title} :</Text>
              <HTMLView
        value= {item.content.replace(/\r\n\t/g, "")}
        stylesheet={htmlStyles}
      />
           </Col>
          </Row>
           
                        ) 
                            })}
</Grid>
</ScrollView>
</View>
      <View style={{margin:5}}>
         <Text style={{ color: "#FFF", alignSelf: "flex-end",fontSize:12}}>ICO Will Close On</Text>
          <View style={{ alignSelf: "flex-end"}}>
        <CountDownTimer
          style={{ backgroundColor:'#FFF',alignSelf: "flex-end"}}
          date="2018-02-24T00:00:00+00:00"
          days={{plural: 'Days ',singular: 'day '}}
          hours=':'
          mins=':'
          segs=''

          
      />
      </View>
       </View>
      
      </View>
    );
  }
}

const head = reduxForm({
  form: "help"
})(HeadForm);


export default head;
