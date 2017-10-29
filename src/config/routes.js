import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { BackHandler } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MapScreen from '../screens/MapScreen';
import DeckScreen from '../screens/DeckScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingScreen from '../screens/SettingScreen';

const Routes = {
    Splash: { screen: SplashScreen },
    Welcome: { screen: WelcomeScreen },
    Auth: { screen: AuthScreen },
    Main: {
        screen: TabNavigator({
            Map: { screen: MapScreen },
            Deck: { screen: DeckScreen },
            Other: { 
                screen: StackNavigator({
                    Review: { screen: ReviewScreen },
                    Setting: { screen: SettingScreen }
                })
            }
        }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showLabel: false,
                // labelStyle: { 
                //     fontSize: 12,
                //     height: 10
                // },
                tabStyle: {
                    height: 60,
                },
                showIcon: true,
                indicatorStyle: {
                    opacity: 0
                }
            },
            lazy: true
        })
    }   
};

export default Routes;
