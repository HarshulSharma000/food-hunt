import React, { PureComponent } from 'react';
import { Image, View, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').witdh;

class EmptyCard extends PureComponent {
    render() {
        return (
            <View style={styles}>    
                <Image style={{ marginHorizontal: 10 }} source={require('../../../assets/icons/over.jpg')} />
            </View>     
        );
    }
}

const styles = {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
};

export default EmptyCard;
