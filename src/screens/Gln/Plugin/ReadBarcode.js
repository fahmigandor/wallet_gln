import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, PermissionsAndroid  } from 'react-native';

import Camera from 'react-native-camera';

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    componentDidMount(){
        try {
            const granted = PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.CAMERA, {
                'title': 'Cool Photo App Camera Permission',
                'message': 'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.'
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    onBarCodeRead = (e) => {
    	  this.props.callback(e.data);
    }

    render () {
        return (
            <View  style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                        <Text style={{
                            backgroundColor: 'white'
                        }}>{this.state.qrcode}</Text>
                    </Camera>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
	justifyContent: 'center',
	flex:1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  	height:400
  }
});