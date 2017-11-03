import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import Slides from '../components/common/slides';
import * as actions from '../actions';

const SLIDE_DATA = [
  { text: 'Welcome to FoodHunt  ', color: '#03A9F4' },
  { text: 'Use this to food from places around you', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class Welcome extends Component {
    state={ isReady: false };
    render() {
        const { navigate } = this.props.navigation;
        if (!this.state.isReady) {
            return (
                <AppLoading
                startAsync={async () => {
                    const token = await AsyncStorage.getItem('fb_token');
                    if (token) { 
                        let { data } = JSON.parse(await AsyncStorage.getItem('likedList'));
                        console.log(data);
                        if (data) {
                            this.props.likedListUpdate(data);            
                        } 
                        this.props.navigation.navigate('Main');
                    }
                }}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
                />
            )
        }
        return (
            <View style={styles.container} >
                <Slides data={SLIDE_DATA} onComplete={() => navigate('Auth')} />
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

export default connect(null,actions)(Welcome);
