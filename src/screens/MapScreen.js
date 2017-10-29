import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('screen').width;
class Map extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <MaterialCommunityIcons 
                    name='google-maps' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    };

    state = { mapLoaded: false };
    async componentWillMount() {
        const { latitude, longitude } = this.props;
        await this.props.getLocation();
    }
    componentDidMount() {
        this.setState({ mapLoaded: true });
    }
    render() {
        const { latitude, longitude } = this.props.location.coords;
        console.log(latitude, longitude);
        if (!this.state.mapLoaded) {
            return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
            );
        }
        return (
            <View style={{ flex: 1 }} >
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
                onRegionChangeComplete={({ latitude, longitude }) => {
                    //console.log(latitude, longitude);
                    this.props.location.coords.latitude = latitude;
                    this.props.location.coords.longitude = longitude;
                    this.props.setLocation(this.props.location);
                }}
                />
                <Button 
                large
                block
                onPress={async () => await this.props.getList(latitude, longitude)}
                style={{ 
                    backgroundColor: '#009688',
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 30
                }}
                rounded
                >
                    <Text style={{ color: '#ffffff', marginRight: 10, fontSize: 20 }}> Press me to find glory! </Text>
                    <MaterialIcons name='search' size={40} style={{ color: 'white' }} />
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
    const location = state.loc.location;
    return { location };
};

export default connect(mapStateToProps, actions)(Map);
