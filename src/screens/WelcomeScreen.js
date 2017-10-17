import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Slides from '../components/common/slides';

const SLIDE_DATA = [
  { text: 'Welcome to FoodHunt  ', color: '#03A9F4' },
  { text: 'Use this to food from places around you', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class Welcome extends Component {
    render() {
        const { navigate } = this.props.navigation;
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
export default Welcome;
