import { StackNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';//Hmmm Those good old days...
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MapScreen from '../screens/MapScreen';
import DeckScreen from '../screens/DeckScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingScreen from '../screens/SettingScreen';

const Routes = {
   
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
                }, {
                    navigationOptions: {
                        marginTop: 22
                    }
                })
            }
        }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showLabel: false,
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
