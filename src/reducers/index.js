import { combineReducers } from 'redux';

import authReducer from './authReducer';
import locReducer from './locReducer';
import listReducer from './listReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: authReducer,
        loc: locReducer,
        list: listReducer
    });
}
