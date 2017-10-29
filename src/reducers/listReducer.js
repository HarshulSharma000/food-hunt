import { LIST_UPDATE } from '../actions/Types';

export default (state = {}, action) => {
    switch (action.type) {
        case LIST_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
