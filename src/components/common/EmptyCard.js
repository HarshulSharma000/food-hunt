import React, { PureComponent } from 'react';
import { Image, View, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').witdh;

class EmptyCard extends PureComponent {
    render() {
        //Image.getSize('../../../assets/icons/over.jpg', (w, h) => console.log(w, h, 'done'));
        return (
            <View style={styles}>    
                <Image 
                    style={{
                        flex: 1,
                        width: null,
                        height: null
                    }} 
                    source={require('../../../assets/icons/over.jpg')}
                    resizeMode='contain'              
                />
            </View>     
        );
    }
}

const styles = { 
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch"
};

export default EmptyCard;
