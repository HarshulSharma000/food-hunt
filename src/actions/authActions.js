import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './Types';

export const facebookLogin = () => async dispatch => {
    try {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('1106169912846528', {
            permissions: ['public_profile']
        });

        if (type === 'cancel') {
             dispatch({ type: FACEBOOK_LOGIN_FAIL });
             return () => { console.log('stay happy'); };
        } 
        await AsyncStorage.setItem('fb_token', token);
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } catch (any) {
        console.log(any);
    }
};
