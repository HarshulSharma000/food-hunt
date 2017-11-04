import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Setting extends Component {
    static navigationOptions = {
        headerStyle: { marginTop: 24 },
        tabBarIcon: () => (
            <FontAwesome 
                size={26} 
                color='white'
                name='gear' 
            />
        )
    }
    render() {
        return (
            <View style={styles.container} >
                <Button 
                block 
                large 
                danger
                onPress={this.props.clearLikedList}
                >
                    <MaterialCommunityIcons name='account-remove' size={32} />
                    <Text> Clear Liked List </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});

export default connect(null, actions)(Setting);
