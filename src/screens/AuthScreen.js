import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
//import { Button } from 'react-native-elements';
import { Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').witdh;

class Auth extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <View style={styles.container} >
                <View >
                <Text style={{ color: 'white', fontSize: 30, marginBottom: 20 }}> Always on Facebook??? </Text>
                
                <Button 
                info 
                block
                onPress={this.props.facebookLogin} 
                >
                    <Text style={{ fontSize: 20, marginRight: 20 }}> Log IN </Text>
                    <Entypo name='facebook' size={30} />
                </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#204f9b',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

export default connect(null, actions)(Auth);
