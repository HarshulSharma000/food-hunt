import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

import Swipe from '../components/common/Swipe';
import * as actions from '../actions';

class Deck extends Component {
    static navigationOptions= {
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <Entypo 
                    name='list' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    }
    state ={
        region: { 
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        }
    }
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
    mapTime(restaurant) {
        const longitude = parseFloat(restaurant.location.longitude);
        const latitude = parseFloat(restaurant.location.latitude)
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
    onSwipeRight(item) {
        setTimeout(() => this.props.addToLikedList(item), 2000);
        //this.props.addToLikedList(item);
    }
    renderCard(item, i, index) {
        const { restaurant } = item;
        // this.renderMap(
        //     parseFloat(restaurant.location.longitude), 
        //     parseFloat(restaurant.location.latitude)
        // );
        return (
            <Card style={{ height: 500 }}>
                <CardItem style={{ flex: 1, height: 300 }}>
                {this.mapTime(restaurant)}    
                </CardItem>
                <CardItem>
                    <Text style={{ fontSize: 10}}> {restaurant.name}</Text>
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
    emptyCard() {
        return (
            <Card style={{  flex: 1 }}>
                
                <CardItem>
                    <Text style={{ fontSize: 110, fontStyle: 'italic' }}> DANCE cuz</Text>
                </CardItem>
                <CardItem>
                    <Text style={{ fontSize: 50 }}> Nothing to Display </Text>
                </CardItem>
                
            </Card>     
        );
    }
    render() {
        const { data, likedList } = this.props;
        data.pop();
        if (data.length === 0) {
            return (this.emptyCard());
        }
        _.remove(data, (item) => {
            return likedList.find(litem => litem.key === item.key);
        });
        return (
           
                <Swipe
                data={data}
                renderCard={this.renderCard.bind(this)}
                onSwipeRight={this.onSwipeRight.bind(this)}
                renderNoMoreCards={() => this.emptyCard()}
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
    //console.log(state.list);
    return { 
        data: state.list.fetchedList,
        likedList: state.list.likedList
    };
};

export default connect(mapStateToProps, actions)(Deck);
