import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';

class Map extends Component {
    componentWillMount() {
        
    }
    render() {
        const { latitude, longitude } = this.props;
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
                intialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                />
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
    console.log(latitude);
    return { longitude, latitude };
};

export default connect(mapStateToProps)(Map);
