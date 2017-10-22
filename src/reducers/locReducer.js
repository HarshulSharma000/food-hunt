import { LOCATION_UPDATE } from '../actions/Types';

const INITIAL_STATE = {
    location: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_UPDATE:
        return { ...state, location: action.payload };
        default:
        return state;
    }
};
