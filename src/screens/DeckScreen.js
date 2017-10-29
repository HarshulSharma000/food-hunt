import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class Deck extends Component {
    static navigationOptions= {
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <Entypo 
                    name='list' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <Text> Deck must not be empty... </Text>
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

export default Deck;
