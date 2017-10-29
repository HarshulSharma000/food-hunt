import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
//import { Button } from 'react-native-elements';
import { Button } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: ( //Sometimes it works sometimes it doesn't maybe its about first component..
                <Button 
                    transparent 
                    style={{ marginLeft: 20, width: 50 }} 
                    onPress={() => { navigation.navigate('Setting'); }}//Try text in place of icon
                >
                        <FontAwesome size={30} name='gear' />
                </Button>
        ),
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <MaterialIcons 
                    name='favorite' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    });
    
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
