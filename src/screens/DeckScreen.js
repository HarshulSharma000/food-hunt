import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';

import Swipe from '../components/common/Swipe';

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
    renderCard(item) {
        //console.log('Duty Calls', item.name);
        return (//To be continued...
            <Card>
                <CardItem>
                    <Text> {item.restaurant.name}</Text>
                </CardItem>
                <CardItem>
                    <Text> {item.restaurant.location.address} </Text>
                </CardItem>
                <StarRating
                disabled
                maxStars={5}
                rating={item.restaurant.user_rating.aggregate_rating}
                />
            </Card>     
        );
    }
    render() {
        const { data } = this.props;
        return (
           
                <Swipe
                data={data}
                renderCard={this.renderCard}
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
    return { data: state.list };
};

export default connect(mapStateToProps)(Deck);
