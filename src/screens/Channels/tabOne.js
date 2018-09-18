// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, Platform } from "react-native";
import { Field, reduxForm } from "redux-form";
import { Content, Text, View, Container,
  Button,
  Icon,
  Item,
  Input,
  Toast,
  Footer } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from "./styles";


  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;

class TabOneForm extends Component {

renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={{margin:10}}>
          <Icon active name="copy" style={{ color: "#000033" }} />
          <Input
            TextColor="#000033"
            style={styles.input,{ fontSize:14}}
            multiline={true}
            // placeholder="link"
            value="https://dashboard.cavallocoin.co/register/ref/cek_wallet"
            // {...input}
            ref={c => (this.textInput = c)}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Content showsVerticalScrollIndicator={false} style={{backgroundColor: "#000033"}}>
        <View>
       
         <Field
                  name="email"
                  component={this.renderInput}
                  type="email"
                  // validate={[email, required]}
                />
    
       
          <Grid>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/btcs.png")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      FASHION
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/cvts.png")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      SCIENCE
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/usda.png")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      AUTO
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/usda.png")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      AUTO
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/7.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      TECHNOLOGY
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/6.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      FINANCES
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/1.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      ENVIRONMENT
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/11.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      SPORTS
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/12.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      ART
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/10.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      ANIMATION
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Channel")}
                >
                  <Image
                    source={require("../../../assets/NewsIcons/13.jpg")}
                    style={styles.channelImg}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                      EDUCATION
                    </Text>
                  </Image>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>
      </Content>
    );
  }
}

const TabOne = reduxForm({
  form: "help"
})(TabOneForm);


export default TabOne;
