import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Setting extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <FontAwesome 
                    size={26} 
                    color='white'
                    name='gear' 
                />
            ); 
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <Text> Some things are important... But some are certainly most important. </Text>
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

export default Setting;
