import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Setting extends Component {
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
