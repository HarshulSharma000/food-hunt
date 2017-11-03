import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardItem } from 'native-base';
import StarRating from 'react-native-star-rating';
//import { Button } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { MapView } from 'expo';

import PureWrapper from '../components/common/PureWrapper';
import * as actions from '../actions';

class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: ( //Sometimes it works sometimes it doesn't maybe its about first component..
                <Button 
                    transparent 
                    style={{ marginLeft: 20, width: 50 }} 
                    onPress={() => { navigation.navigate('Setting'); }}//Try text in place of icon
                >
                        <FontAwesome size={30} name='gear' />
                </Button>
        ),
        tabBarIcon: () => { 
            return (
                <MaterialIcons 
                    name='favorite' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    });

    async componentWillMount() {
        let { data } = JSON.parse(await AsyncStorage.getItem('likedList'));

        if (data) {
            this.props.likedListUpdate(data);            
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('called');
        const { data } = nextProps;
        AsyncStorage.setItem('likedList', JSON.stringify({ data }));
    }

    async componentWillUnmount() { // Never Works
        // console.log('to save', this.props.data.length);
        // //await AsyncStorage.setItem('likedList', this.props.data);
    }

    mapTime(restaurant) {
        const longitude = parseFloat(restaurant.location.longitude);
        const latitude = parseFloat(restaurant.location.latitude);
        return (
            <MapView
                liteMode
                scrollEnabled={false}
                cacheEnabled={true}
                style={{
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
                region={{
                    longitude,
                    latitude,
                    latitudeDelta: 0.000921,
                    longitudeDelta: 0.000921,    
                }}
            >
                <MapView.Marker 
                    coordinate={{
                        latitude,
                        longitude
                    }}
                />
            </MapView>
        );
    }
    
    emptyCard() {
        return (
            <Card style={{ flex: 1 }}>
                <CardItem>
                    <Text style={{ fontSize: 10, fontStyle: 'italic' }}> DANCE cuz</Text>
                </CardItem>
                <CardItem>
                    <Text style={{ fontSize: 50 }}> Nothing to Display </Text>
                </CardItem>
            </Card>     
        );
    }
    renderCard({ item }) {
        const { restaurant } = item;
        return (//To be continued...
            <PureWrapper>
                <Card style={{ height: 500 }}>
                    <CardItem style={{ flex: 1, height: 300 }}>
                    {this.mapTime(restaurant)}    
                    </CardItem>
                    <CardItem>
                        <Text style={{ fontSize: 10 }}> {restaurant.name}</Text>
                    </CardItem>
                    <CardItem>
                        <Text> {restaurant.location.address} </Text>
                    </CardItem>
                    <CardItem>
                        <StarRating
                        disabled
                        maxStars={5}
                        rating={restaurant.user_rating.aggregate_rating}
                        />
                    </CardItem>
                </Card>     
            </PureWrapper>
        );
    }

     render() { // render() not so cool when handling promises
        //console.log('it rerenders baby :I');
        const { data } = this.props;
        if (this.props.data.length === 1) {
            return (this.emptyCard());   
        } 
        console.log(data);
        //await AsyncStorage.setItem('linkedList', JSON.stringify({ data }));
        return (
            <FlatList
                data={this.props.data.reverse()}
                renderItem={this.renderCard.bind(this)}
                extraData={this.props.data.length}
            />
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
    // console.log('something changed, call it a state reset');
    return { data: state.list.likedList, length: state.list.likedList.length };//Break tradtitions and have a price to pay
};

export default connect(mapStateToProps, actions)(Review);
