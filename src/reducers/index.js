import { combineReducers } from 'redux';
import authReducer from './authReducer';


export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: authReducer
    });
}
