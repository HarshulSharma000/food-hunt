import { 
  LIST_UPDATE, 
  ADD_TO_LIKED_LIST, 
  CLEAR_LIKED_LIST, 
  LIKED_LIST_UPDATE 
} from '../actions/Types';

const INITIAL_STATE = {
  fetchedList: [{
    key: 0,
    restaurant: {
      R: {
        res_id: 0,
      },
      location: {
        address: 'Ghar ke pass',
        city: 'New Delhi',
        city_id: 1,
        country_id: 1,
        latitude: '28.6511247204',
        locality: 'Geeta Colony',
        locality_verbose: 'Geeta Colony, New Delhi',
        longitude: '77.2763856500',
        zipcode: '',
      },
      name: 'Omprakash ka Dhaba',
      user_rating: {
        aggregate_rating: '0',
        rating_color: 'CBCBC8',
        rating_text: 'Not rated',
        votes: '0',
      },
    }
  }],

  likedList: [{
    key: 0,
    restaurant: {
      R: {
        res_id: 0,
      },
      location: {
        address: 'Ghar ke pass',
        city: 'New Delhi',
        city_id: 1,
        country_id: 1,
        latitude: '28.6511247204',
        locality: 'Geeta Colony',
        locality_verbose: 'Geeta Colony, New Delhi',
        longitude: '77.2763856500',
        zipcode: '',
      },
      name: 'Omprakash ka Dhaba',
      user_rating: {
        aggregate_rating: '0',
        rating_color: 'CBCBC8',
        rating_text: 'Not rated',
        votes: '0',
      },
    }
  }]
};
export default (state = { ...INITIAL_STATE }, action) => { 
  //Dare to make this async and you will regret all your life
    switch (action.type) {
        case LIST_UPDATE:
          return { ...state, fetchedList: action.payload };

        case ADD_TO_LIKED_LIST:
          if (state.likedList[0].key === 0) {
            state.likedList.pop();
            state.likedList.push(action.payload);
            return { ...state };
          }
          state.likedList.push(action.payload); //Sometimes traditions are broken for performance
          return { ...state };

        case CLEAR_LIKED_LIST:
          return { ...state, likedList: [INITIAL_STATE.likedList[0]] };
        
        case LIKED_LIST_UPDATE:
          return { ...state, likedList: action.payload };
        
        default:
          return state;
    }
};
