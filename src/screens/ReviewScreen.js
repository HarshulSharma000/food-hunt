import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
//import { Button } from 'react-native-elements';
import {Button} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review',
    headerRight: 
                <Button 
                    transparent 
                    style={{ marginRight: 10 }} 
                    onPress={() => { navigation.navigate('Setting'); }}
                >
                        <FontAwesome size={30} name='gear' />
                </Button>,
                
        style: {
            marginTop: Platform.OS === 'Android' ? 40 : 0
        }
    });
    renderHeaderButton() {
        return (
            <Button onPress={() => { navigation.navigate('Setting'); }} ><Text> Setting </Text> </Button>
        );
    }
    render() {
        return (
            <View style={styles.container} >
                <Text> Enjoy your Reviewing </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Review;
