import { Location, Permissions, Constants } from 'expo';

import { LOCATION_UPDATE } from './Types';

export const getLocation = () => async (dispatch) => {
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
    let location = null;
    const { status } = await Permissions.askAsync(Permissions.LOCATION); 
    if (status !== 'granted') {
        console.log("you didn't give any permissions to me :(");
        return;
    }
    //const answer = await Location.getProviderStatusAsync();
    while (!location) {
        try {
            location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 3000, maximumAge: 1000000 });
            console.log('got this', location);
        } catch (any) {
            console.log('One unsuccessful try');
            if (Constants.deviceId === 'a93c7aa8-5f8d-49b4-84e4-c7c190ac3957') { //Some special devices require special treatement and are hopeless
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
            }
        }
    }
    
    
    dispatch({
        type: LOCATION_UPDATE,
        payload: location
    });
};

export const setLocation = (location) => {
    return {
        type: LOCATION_UPDATE,
        payload: location
    };
};
