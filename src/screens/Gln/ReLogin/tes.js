import React, {Component} from 'react';
import { TextInput, StyleSheet, Animated, FlatList, Text, TouchableOpacity } from "react-native";
import { InputGroup, View } from "native-base";

export default class Tes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      status: 0,
      datathumb: ['', '', '', ''],
      data: ['', '', '', ''],
      data2: ['', '', '', '']
    }
    this.pass = "";
    this.pin = [];
    this.counter = 0;
    this.status = 0;
  }

  callback(){
    this.props.callback(true);
  }

  keyPress(val){
    if(val != "Delete"){
      if(this.counter < this.state.data.length){
        this.state.datathumb[(this.counter)] = "X";
        this.state.data[(this.counter)] = val;
        // console.warn(this.state.data[(this.counter)], this.state.datathumb[(this.counter)]);
        this.forceUpdate();
        this.counter = (this.counter + 1);
      }
    }else{
      if(this.counter > 0){
        this.state.datathumb[(this.counter-1)] = "";
        this.state.data[(this.counter-1)] = "";
        this.forceUpdate();
        // console.warn(this.state.data[(this.counter-1)], this.state.datathumb[(this.counter-1)]);
        this.counter = (this.counter - 1);
      }
    }
    if(this.counter == this.state.data.length){// && this.pin == this.state.data){
      alert('tes');
      this.setState({status : (this.state.status + 1)});
      this.callback(true);
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
    if(this.state.status == 1){
      data = data.concat(["Send"]);
    }
    return (
      <View style={styles.MainContainer}>
      <Text>Choose your Pin Again</Text>
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
    color:"#fff",
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
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF"
  }
});