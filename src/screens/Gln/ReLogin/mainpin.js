import React, {Component} from 'react';
import { TextInput, StyleSheet, Animated, FlatList, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { InputGroup, View } from "native-base";

export default class Tes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      status: 0,
      position: 0,
      datathumb: ['', '', '', '']
    }
    this.counter = 0;
    this.data = [
        ['', '', '', ''], 
        ['', '', '', '']
      ];
  }

  callback(){
    this.props.callback(true);
  }

  keyPress(val){
    switch (val) {
      case "Delete":
        if(this.counter > 0){
          this.state.datathumb[(this.counter-1)] = "";
          this.data[this.state.position][(this.counter-1)] = "";
          this.forceUpdate();
          this.counter = (this.counter - 1);
        }
        this.setState({status : 0});
      break;
      case "Next":
          this.next();
      break;
      case "Save":
          this.saved();
      break;
      default:
        if(this.counter < this.state.datathumb.length){
          this.state.datathumb[(this.counter)] = "X";
          this.data[this.state.position][(this.counter)] = parseInt(val);
          this.forceUpdate();
          this.counter = (this.counter + 1);
        }
        if(this.counter == this.state.datathumb.length){// && this.pin == this.state.data){
          this.setState({status : 1});
        }
      break;
    }
  }

  next(){
      this.setState({position : 1, status : 0, datathumb: ['', '', '', '']}, function(){
        this.counter = 0;
      });
  }

  saved(){
    if(this.data[0].toString() == this.data[1].toString()){
      AsyncStorage.setItem('pin',JSON.stringify(this.data[0]));
      this.setState({position : 0, status : 0});
      this.callback();
    }
    else{
      alert("Password does not match")
    }
  }

  render() {
    let data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Delete", "0"];
    const renderItem = ({item, index}) => {
      let style;
      return (
        <TouchableOpacity activeOpacity={ 0.85 } onPress={ () => this.keyPress(item) } disabled={ false }>
          <Animated.View style={{
            alignItems      : 'center', 
            justifyContent : 'center', 
            height : 75, 
            width : 75,
            marginHorizontal : 20, 
            marginVertical : 5, 
            borderRadius : 75 / 2, 
            backgroundColor: "#FFF"} }>
            <Text style={{ color  : "#333", opacity: 1 }}>{ item }</Text>
          </Animated.View>
        </TouchableOpacity>
      )
    };
    if(this.state.status == 1 && this.state.position == 0){
      data = data.concat(["Next"]);
    }
    if(this.state.status == 1 && this.state.position == 1){
      data = data.concat(["Save"]);
    }
    return (
      <View style={styles.MainContainer}>
      <Text style={{color: "#fff", alignSelf: "center"}}>Choose your Pin Again</Text>
      <View pointerEvents='none' style={{flexDirection: 'column', 
          borderBottomWidth:0,
          justifyContent: 'center',
          alignItems: 'center', marginBottom: 20}} >
      <InputGroup style={{borderWidth: 0}}>
      <TextInput 
                editable={false}
                style={styles.TextInputStyleClass}
                value={this.state.datathumb[0]}
                underlineColorAndroid='transparent'
                placeholder=""
              />
      <TextInput 
                editable={false}
                style={styles.TextInputStyleClass}
                value={this.state.datathumb[1]}
                underlineColorAndroid='transparent'
                placeholder=""
              />
      <TextInput 
                editable={false}
                style={styles.TextInputStyleClass}
                value={this.state.datathumb[2]}
                underlineColorAndroid='transparent'
                placeholder=""
              />
      <TextInput 
                editable={false}
                style={styles.TextInputStyleClass}
                value={this.state.datathumb[3]}
                underlineColorAndroid='transparent'
                placeholder=""
              />
      </InputGroup>
      </View>
      <FlatList
        scrollEnabled={ false }
        horizontal={ false }
        vertical={ true }
        numColumns={ 3 }
        renderItem={ renderItem }
        data={ data }
        keyExtractor={ (val, index) => index }
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 7,
  },
  rowViewContainer: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    color:"#000",
    fontSize: 17,
    padding: 10
  },
  TextInputStyleClass:{
    textAlign: 'center',
    color:"#555",
    margin: 20,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7 ,
    backgroundColor : "rgba(255,255,255,0.3)"
  }
});