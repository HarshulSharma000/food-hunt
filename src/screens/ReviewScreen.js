import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardItem } from 'native-base';
import StarRating from 'react-native-star-rating';
//import { Button } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { MapView } from 'expo';

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
        tabBarIcon: ({ tintcolor }) => { 
            return (
                <MaterialIcons 
                    name='favorite' 
                    size={26} 
                    color='white'
                />
            ); 
        }
    });
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
    renderCard({ item }) {
        console.log(item);
        const { restaurant } = item;
        // this.renderMap(
        //     parseFloat(restaurant.location.longitude), 
        //     parseFloat(restaurant.location.latitude)
        // );
        return (//To be continued...
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
        );
    }
    render() {
        //console.log(this.props.data);
        return (
            <View style={styles.container} >
                <Text> Enjoy your Reviewing </Text>
                <FlatList
                data={this.props.data.reverse()}
                renderItem={this.renderCard.bind(this)}
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
    return { data: state.list.likedList };
};

export default connect(mapStateToProps)(Review);
