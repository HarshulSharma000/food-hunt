import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Modal, Image } from 'react-native';
import { MapView, Location } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as actions from '../actions';

class Map extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
                <MaterialCommunityIcons 
                    name='google-maps' 
                    size={26} 
                    color='white'
                />
        )
    };
    state= { 
        modalVisible: false, 
        done: false
    };
    async componentWillMount() {
        //const { latitude, longitude } = this.props;
        const gps = await Location.getProviderStatusAsync();
        console.log(gps);
        if (gps.gpsAvailable) {
            this.setState({ modalVisible: false, done: true });
        }
        while (!this.state.done) {
            try {
                let gps = await new Promise(this.showModal);
                console.log('got it');
                this.setState({ modalVisible: false, done: true });
                break;
             } catch (any) {
                 console.log('ooops');
                 this.setState({ modalVisible: true });
             }
        }
        await this.props.getLocation();
    }
    componentDidMount() {
        this.setState({ mapLoaded: true });
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log('doodlee');
    //     const { latitude, longitude } = nextProps;
    //     console.log(latitude,longitude);
    // }
    // shouldComponentUpdate() {
    //     return true;
    // }
    showModal(resolve, reject) {
        setTimeout(async () => {
            const gps = await Location.getProviderStatusAsync();
            console.log(gps);
            if (gps.gpsAvailable) {
                resolve('yes');
            }
            reject('no...');
        }, 8000);
    }
    renderModal() {
        return (
            <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}
            >
                <View style={styles.modalStyle}>
                    <Text style={{ fontSize: 50 }} > GPS IS OFF!! </Text>
                    <Text 
                        style={{ 
                            fontSize: 30, 
                            marginHorizontal: 10
                        }}
                    >
                        Do you want me to get your locations without you even turning the GPS on?
                    </Text>
                    <Image
                        style={{ marginVertical: 5 }}
                        source={require('../../assets/icons/seriously.jpg')} 
                    />
                    
                    <Button 
                        block
                        large
                        rounded
                        onPress={() => {
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <Text style={{ color: '#ffffff' }}>I'm turning on GPS</Text>
                    </Button>
                </View>
            </Modal>
        );
    }
    render() {
        const { latitude, longitude } = this.props.location.coords;
        return (
            <View style={{ flex: 1 }} >
                <MapView 
                style={styles.mapStyles}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0221, //Only Expo Knows why the are here
                    longitudeDelta: 0.0221,
                }}
                onRegionChangeComplete={({ latitude, longitude }) => {
                    this.props.location.coords.latitude = latitude;
                    this.props.location.coords.longitude = longitude;
                    this.props.setLocation(this.props.location);
                }}
                />
                <Button 
                large
                block
                onPress={async () => {
                    const { latitude, longitude } = this.props.location.coords;
                    //Aim is to use props not captured variables 
                    await this.props.getList(latitude, longitude);
                    this.props.navigation.navigate('Deck');
                }}
                style={styles.buttonStyle}
                rounded
                >
                    <Text style={{ color: '#ffffff', marginRight: 10, fontSize: 20 }}> Press me to find glory! </Text>
                    <MaterialIcons name='search' size={40} style={{ color: 'white' }} />
                </Button>
                {this.renderModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: { 
        backgroundColor: '#009688',
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 30
    },
    modalStyle: {  
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 8,
        backgroundColor: '#a8bddd',
        marginHorizontal: 10,
        marginVertical: 20,
        borderColor: '#2a2d33',
        borderRadius: 20,
        borderWidth: 0.2
    },
    mapStyles: {  //Its all about style B)
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

const mapStateToProps = (state) => {
    const location = state.loc.location;
    return { location };
};

export default connect(mapStateToProps, actions)(Map);
