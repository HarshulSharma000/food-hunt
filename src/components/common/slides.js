import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderSlides() {
        const { data, onComplete } = this.props;
        return data.map((item, i) => {
            if (i === data.length - 1) {
                return (
                    <View style={[styles.container, { backgroundColor: item.color }]} key={i}>
                        <Text style={styles.text}>
                            {item.text}
                        </Text>
                        <Button title='Ready?' onPress={() => onComplete()} buttonStyle={{ marginTop: 40, width: SCREEN_WIDTH - 20 }} />
                    </View>
                );
            }
            return (
                <View style={[styles.container, { backgroundColor: item.color }]} key={i}>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
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
