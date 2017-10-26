import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import * as actions from '../actions';

class Map extends Component {
    state = { mapLoaded: false };
    async componentWillMount() {
        const { latitude, longitude } = this.props;
        await this.props.getLocation();
    }
    componentDidMount() {
        this.setState({ mapLoaded: true });
    }
    render() {
        const { latitude, longitude } = this.props;
        console.log(latitude, longitude);
        if (!this.state.mapLoaded) {
            return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
            );
        }
        return (
            <View style={styles.container} >
                <MapView 
                style={{  //Its all about style B)
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0221, //Only Expo Knows why the are here
                    longitudeDelta: 0.0221,
                }}
                />
                <Button onPress={async () => await this.props.getList(latitude, longitude)}>
                    <Text> Press me to find glory! </Text>
                </Button>
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

const mapStateToProps = (state) => {
    const { latitude, longitude } = state.loc.location.coords;
    return { longitude, latitude };
};

export default connect(mapStateToProps, actions)(Map);
