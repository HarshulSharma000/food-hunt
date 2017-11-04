import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderIcon(i) {
        if (i === 0) {
            return (<MaterialCommunityIcons name='food' size={300} />);
        }
    }
    renderSlides() {
        const { data, onComplete } = this.props;
        return data.map((item, i) => {
            if (i === data.length - 1) {
                return (
                    <View style={[styles.container, { backgroundColor: item.color }]} key={i}>
                        <Text style={styles.text}>
                            {item.text}
                        </Text>
                        <Button 
                        style={{ marginTop: 30, backgroundColor: '#308e40', height: 50 }} 
                        onPress={() => onComplete()}
                        block
                        >
                            <Text style={{ color: '#ffffff', fontSize: 20, marginRight: 20 }}> Ready? </Text>
                            <MaterialCommunityIcons name="login" color='white' size={30} />
                        </Button>
                    </View>
                );
            }
            if (i === 0) {
                return (
                    <View style={[styles.container, { backgroundColor: item.color }]} key={i}>
                        <Text style={[styles.text, { color: '#000000' }]}>
                            {item.text}
                        </Text>
                        <MaterialCommunityIcons name='food' size={300} />
                    </View>
                );
            }
            return (
                <View style={[styles.container, { backgroundColor: item.color }]} key={i}>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                    {this.renderIcon(i)}
                </View>
            );
        });
    }
    render() {
        return (
        <ScrollView 
            style={{ flex: 1 }} 
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {this.renderSlides()}
        </ScrollView>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4286f4',
        width: SCREEN_WIDTH,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center'
    }
});

export default Slides;
