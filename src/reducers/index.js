import { combineReducers } from 'redux';

import authReducer from './authReducer';
import locReducer from './locReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: authReducer,
        loc: locReducer
    });
}
