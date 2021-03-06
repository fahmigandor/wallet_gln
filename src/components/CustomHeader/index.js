// @flow
import React, { Component } from "react";
import { Image } from "react-native";
import { Icon, Button, Left, Right, Body, Header } from "native-base";

import styles from "./styles";

const headerLogo = require("../../../assets/greenfix.png");

class CustomHeader extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Header hasTabs={this.props.hasTabs} style={{backgroundColor: "transparent"}}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon active name="menu" style={{ color: "#fff" }}/>
          </Button>
        </Left>
        <Body>
          <Image source={headerLogo} style={styles.imageHeader} />
        </Body>
        <Right />
      </Header>
    );
  }
}

export default CustomHeader;
