// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform,AsyncStorage } from "react-native";
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
import Head from "../head/head.js";


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
const logo = require("../../../assets/cava.png");

const a= ["Buy COC :", "- Minimun buy 20 COC.","- The COC coin can be transfered from account to another account.","- It takes 10-60 minutes or 24 hours"];
const token = null;

class CommingSoon extends Component {
  

  render() {

   
    const navigation = this.props.navigation;
    return (
      <Container>
        <Image
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <CustomHeader hasTabs navigation={navigation} />

         <Content>
 <View >
              <Image source={logo} style={styles.logo} />
              <Text style={{ alignSelf: "center", fontSize: 20, marginTop:20}}>Coming Soon</Text>
            </View>


          </Content>
        </Image>
      </Container>
    );
  }
}

export default CommingSoon;
