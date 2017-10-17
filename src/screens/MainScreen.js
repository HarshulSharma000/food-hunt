import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Welcome extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Text> Main flow begins here </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
