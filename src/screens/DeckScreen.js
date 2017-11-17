import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

import Swipe from '../components/common/Swipe';
import * as actions from '../actions';
import EmptyCard from '../components/common/EmptyCard';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class Deck extends Component {
    static navigationOptions = () => ({
        title: 'List',
        headerRight: 'hi',
        headerStyle: { marginTop: 24 },
        tabBarIcon: () => (
            <Entypo 
                name='list' 
                size={26} 
                color='white'
            />
        )
    });
    state ={
        region: { 
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        },
    }
    
    onSwipeRight(item) {
        setTimeout(() => this.props.addToLikedList(item), 2000);
        //this.props.addToLikedList(item);
    }
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
    
    renderCard(item, i, index) { //Sometimes you have to accept for the sake of interface
        const { restaurant } = item;
        return (
            <Card style={{ height: SCREEN_HEIGHT - 120 }}>
                <CardItem style={{ flex: 1, height: 300 }}>
                {this.mapTime(restaurant)}    
                </CardItem>
                <CardItem>
                    <Text style={{ fontSize: 20 }}> {restaurant.name}</Text>
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
        );
    }
    renderSelect() {
            const { data, likedList } = this.props;
            if (data[0].key === 0) {
                return (<EmptyCard />);
            }
            if (likedList) {
                _.remove(data, (item) => likedList.find(litem => litem.key === item.key));
            }
            return (
                    <View
                    style={{marginTop: 24, flex: 1}}
                    >
                    <Swipe
                    data={data}
                    renderCard={this.renderCard.bind(this)}
                    onSwipeRight={this.onSwipeRight.bind(this)}
                    renderNoMoreCards={() => (<Card><EmptyCard /></Card>)}
                    />
                    </View>
            );
    }
    render() {
        console.log("hi time");
        return (
            <View style={{flex: 1}}>
                {this.renderSelect()}
            </View>
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
    //console.log(state.list.fetchedList.length);
    return { 
        data: state.list.fetchedList,
        likedList: state.list.likedList
    };
};

export default connect(mapStateToProps, actions)(Deck);

/* To be continued...

async takeSnapshot() {
        // 'takeSnapshot' takes a config object with the
        // following options
        const snapshot = await this.map.takeSnapshot({
          height: 300,     // optional, when omitted the view-height is used
          format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
          quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
          result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        console.log(snapshot);
    }
    async renderMap(latitude, longitude) {
        let self = this;
        const mapz = (<MapView
            intialRegion={{ 
                latitude,
                longitude,
                latitudeDelta: 0.00221,
                longitudeDelta: 0.00221
            }}
            ref={map => {
                //console.log("here lies my map", map);
                //console.log(self);
                 self.map = map; 
            }}
        >
        </MapView>);
        //console.log(mapz);
        const snapshot = await mapz.takeSnapshot({
            height: 300,     // optional, when omitted the view-height is used
            format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
            result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        console.log(snapshot);
        //this.takeSnapshot();
    }

*/
