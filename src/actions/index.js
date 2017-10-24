import { Location, Permissions, Constants } from 'expo';

import { LOCATION_UPDATE } from './Types';

export * from './authActions';

export const getLocation = () => async (dispatch) => {
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
    let location;
    const { status } = await Permissions.askAsync(Permissions.LOCATION); 
    if (status !== 'granted') {
        console.log("you didn't give any permissions to me :(");
        return;
    }
    const answer = await Location.getProviderStatusAsync();
    console.log(answer);
    if (Constants.deviceId === 'a93c7aa8-5f8d-49b4-84e4-c7c190ac3957') {
        location = {
            coords: {
              accuracy: 786,
              altitude: 0,
              heading: 0,
              latitude: 28.6457003,
              longitude: 77.2734208,
              speed: 0,
            },
            mocked: false,
            timestamp: 1508672129296,
        };
    } else {
        location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 1000 });
    }
    console.log('current location is');
    console.log(location);
    dispatch({
        type: LOCATION_UPDATE,
        payload: location
    });
};
