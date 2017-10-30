import { LIST_UPDATE } from '../actions/Types';

const INITIAL_STATE = [{
    restaurant: {
      R: {
        res_id: 18548025,
      },
      apikey: "25d1d57d18537d9db28d9794f33fe4fc",
      average_cost_for_two: 100,
      cuisines: "Chinese",
      currency: "Rs.",
      deeplink: "zomato://restaurant/18548025",
      establishment_types: [],
      events_url: "https://www.zomato.com/ncr/baristo-geeta-colony-new-delhi/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
      featured_image: "",
      has_online_delivery: 0,
      has_table_booking: 0,
      id: "18548025",
      is_delivering_now: 0,
      location: {
        " ": "14 Block, Near Gurudwara, Geeta Colony, New Delhi",
        "city": "New Delhi",
        "city_id": 1,
        "country_id": 1,
        "latitude": "28.6511247204",
        "locality": "Geeta Colony",
        "locality_verbose": "Geeta Colony, New Delhi",
        "longitude": "77.2763856500",
        "zipcode": "",
      },
      "menu_url": "https://www.zomato.com/ncr/baristo-geeta-colony-new-delhi/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
      "name": "Baristo",
      "offers": [],
      "photos_url": "https://www.zomato.com/ncr/baristo-geeta-colony-new-delhi/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
      "price_range": 1,
      "switch_to_order_menu": 0,
      "thumb": "",
      "url": "https://www.zomato.com/ncr/baristo-geeta-colony-new-delhi?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
      "user_rating":  {
        "aggregate_rating": "0",
        "rating_color": "CBCBC8",
        "rating_text": "Not rated",
        "votes": "0",
      },
    }
  }];
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
