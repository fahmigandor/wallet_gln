// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity,  AsyncStorage,ActivityIndicator, Alert } from "react-native";

import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  List,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
const headerLogo = require("../../../assets/gnc-2.png");
import styles from "./style";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
const navigation =null;
const username=null;
const datas = [
  {
    name: "Home",
    route: "Main",
    icon: "home"
  },
  {
    name: "Create Wallet",
    route: "Create",
    icon: "list"
  },
  {
    name: "History",
    route: "History",
    icon: "bookmarks"
  },
  {
    name: "Transfer",
    route: "Transfer",
    icon: "shuffle"
  },
  {
    name: "Api Information",
    route: "Create",
    icon: "paper"
  },
  {
    name: "Settings",
    route: "",
    icon: "settings"
  },
  {
    name: "Logout",
    route: "CommingSoon",
    icon: "log-out"
  }
  ];
class SideBar extends Component {

 constructor(props: Props) {
    super(props);
navigation = this.props.navigation;
    this.state = {
      isLoading : true
    };

   AsyncStorage.getItem('data_user', (err, result) => {
     
         var obj = JSON.parse(result);
         username = obj.name;
        this.setState({isLoading:false});

      }
        );
 }

 getData(name, route){

    if(name == "Logout"){
  Alert.alert(
  'Data',
 "Are you sure logout?",
  [
    {text: 'OK', onPress: () => this.logout()},
    {text:'CANCEL'}
  ],
  { cancelable: false }
)
    }else{
      this.props.navigation.navigate(route);
    }
 }

 logout(){
     AsyncStorage.setItem('token',"");
     AsyncStorage.setItem('data_user',"");
     AsyncStorage.setItem('pass',"");
       this.props.navigation.navigate("Login");
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
        <Image
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
         
          <Content style={styles.drawerContent}>

                 <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn}>
              <Grid>
                <Col>
                  <TouchableOpacity
                   
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                     Welcome, {username}
                    </Text>
                  
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Settings");
                    }}
                  >
                    <Thumbnail
                      source={headerLogo}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>

           
<List
            dataArray={datas}
            renderRow={data =>

             
            <ListItem
              button
              onPress={() => { this.getData(data.name,data.route);
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name={data.icon} />
              <Text style={styles.linkText}> {data.name}</Text>
            </ListItem>}
          
          />

           
          </Content>
  
        </Image>
      </Container>
    );
  }
}

export default SideBar;
