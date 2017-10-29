import { LOCATION_UPDATE } from '../actions/Types';

const INITIAL_STATE = {
    location: {
        coords: {
            accuracy: 31.09000015258789,
            altitude: 0,
            heading: 0,
            latitude: 0,
            longitude: 0,
            speed: 0,
        }
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_UPDATE:
        console.log('Changed Location:', action.payload);
        return { ...state, location: action.payload };
        default:
        return state;
    }
};
