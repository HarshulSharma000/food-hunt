import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').witdh;

class Auth extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <View style={styles.container} >
                <View >
                <Text style={{ color: 'white', fontSize: 30 }}> Always on Facebook??? </Text>
                <Button 
                title='Log IN' 
                onPress={this.props.facebookLogin} 
                buttonStyle={{ marginTop: 40, width: SCREEN_WIDTH - 5 }}
                />
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
