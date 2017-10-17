import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review',
        headerRight: <Button title='Setting' onPress={() => { navigation.navigate('Setting'); }} />,
        style: {
            marginTop: Platform.OS === 'Android' ? 40 : 0
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
