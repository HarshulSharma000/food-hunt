import axios from 'axios';
import qs from 'qs';


import { LIST_UPDATE, ADD_TO_LIKED_LIST, CLEAR_LIKED_LIST, LIKED_LIST_UPDATE } from './Types';
import { zomatoKey } from '../config/keys';

const API_BASE_URL = 'https://developers.zomato.com/api/v2.1/search?';

export const getList = (lat, lon) => async(dispatch) => {
    try {
        const data = {
            lat,
            lon,
            sort: 'real_distance',
            count: '40',
            order: 'asc'
        };
        const requrl = API_BASE_URL + qs.stringify(data);
        console.log(requrl);
        const list = await axios.get(requrl, {
            headers: {
            'user-key': zomatoKey
            }
        });
        console.log(list.status);
        const restaurants = list.data.restaurants.map((item) => {
                return ({
                    ...item, key: item.restaurant.R.res_id
                });
            }
        );
        dispatch({//Do it
            type: LIST_UPDATE,
            payload: restaurants
        });
    } catch (any) {
        console.log('On Fire:', any);
    }
};

export const addToLikedList = (item) => {
    return {
        type: ADD_TO_LIKED_LIST,
        payload: item
    };
};

export const clearLikedList = () => {
    return {
        type: CLEAR_LIKED_LIST,
        payload: 'nothing:)'
    };
};

export const likedListUpdate = (data) => {
    return {
        type: LIKED_LIST_UPDATE,
        payload: data
    };
};
