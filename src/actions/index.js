import axios from 'axios';
import qs from 'qs';

import { LIST_UPDATE } from './Types';
import { zomatoKey } from '../config/keys';

export * from './locActions';
export * from './authActions';

const API_BASE_URL = 'https://developers.zomato.com/api/v2.1/search?';

export const getList = (lat, lon) => async(dispatch) => {
    try {
        const data = {
            lat,
            lon,
            sort: 'real_distance',
            count: '20',
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
        //console.log(list.data[1]);
        dispatch({//Do it
            type: LIST_UPDATE,
            payload: list.data.restaurants
        });
    } catch (any) {
        console.log('On Fire:', any);
    }
};
