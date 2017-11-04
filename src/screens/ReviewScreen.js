import React, { Component } from 'react';
import { Text, View, FlatList, AsyncStorage, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardItem } from 'native-base';
import StarRating from 'react-native-star-rating';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { MapView } from 'expo';

import PureWrapper from '../components/common/PureWrapper';
import * as actions from '../actions';
import EmptyCard from '../components/common/EmptyCard';

class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Favourites',
        headerRight: ( //Sometimes it works sometimes it doesn't maybe its about first component..
                <Button 
                    transparent 
                    style={{ marginLeft: 20, width: 50 }} 
                    onPress={() => { navigation.navigate('Setting'); }}//Try text in place of icon
                >
                        <FontAwesome size={30} name='gear' />
                </Button>
        ),
        headerStyle: { marginTop: 24 },
        tabBarIcon: () => (
                <MaterialIcons 
                    name='favorite' 
                    size={26} 
                    color='white'
                />
            )
    });

    componentWillReceiveProps(nextProps) {
        console.log('called');
        const { data } = nextProps;
        AsyncStorage.setItem('likedList', JSON.stringify({ data }));
    }

    // async componentWillUnmount() { // Never Works Unless you live in a dreamworld...
    // }

    mapTime(restaurant) {
        const longitude = parseFloat(restaurant.location.longitude);
        const latitude = parseFloat(restaurant.location.latitude);
        return (
            <MapView
                liteMode
                scrollEnabled={false}
                cacheEnabled
                style={styles.mapStyles}
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
    
    renderCard({ item }) {
        const { restaurant } = item;
        return (
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
        if (data[0].key === 0) {
            return (<EmptyCard />);   
        } 
        return (
            <FlatList
                data={data.reverse()}
                renderItem={this.renderCard.bind(this)}
                extraData={data.length}
            />
        );
    }
}

const styles = StyleSheet.create({
    mapStyles: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});

const mapStateToProps = (state) => {
    // console.log('something changed, call it a state reset');
    return { data: state.list.likedList, length: state.list.likedList.length };
    //Break tradtitions and have a price to pay
};

export default connect(mapStateToProps, actions)(Review);
