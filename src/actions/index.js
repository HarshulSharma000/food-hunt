import { Location, Permissions, Constants } from 'expo';
import axios from 'axios';
import qs from 'qs';

import { LOCATION_UPDATE, LIST_UPDATE } from './Types';
import { zomatoKey } from '../config/keys';

export * from './authActions';

const API_BASE_URL = 'https://developers.zomato.com/api/v2.1/search?';

export const getLocation = () => async (dispatch) => {
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
    let location;
    const { status } = await Permissions.askAsync(Permissions.LOCATION); 
    if (status !== 'granted') {
        console.log("you didn't give any permissions to me :(");
        return;
    }
    //const answer = await Location.getProviderStatusAsync();
    if (Constants.deviceId === 'a93c7aa8-5f8d-49b4-84e4-c7c190ac3957') {
        location = {
            coords: {
              accuracy: 786,
              altitude: 0,
              heading: 0,
              latitude: 28.6457003,
              longitude: 77.2734208,
              speed: 0,
            },
            mocked: false,
            timestamp: 1508672129296,
        };
    } else {
        location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 1000 });
    }
    dispatch({
        type: LOCATION_UPDATE,
        payload: location
    });
};

export const getList = (lat, lon) => async(dispatch) => {
    try {
        const data = {
            lat,
            lon,
            sort: 'real_distance',
            order: 'asc'
        };
        const requrl = API_BASE_URL + qs.stringify(data);
        console.log(requrl);
        console.log(zomatoKey);
        const list = await axios.get(requrl, {
            headers: {
            'user-key': zomatoKey
            }
        });
        console.log(list.status);
        dispatch({//Do it
            type: LIST_UPDATE,
            payload: list.restaurants
        });
    } catch (any) {
        console.log('On Fire:', any);
    }
};
