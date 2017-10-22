import { Location, Permissions, Constants } from 'expo';
import { Geolocation } from 'react-native';

export * from './authActions';

export const getLocation = () => async (dispatch) => {
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
    let location;
    let { status } = await Permissions.askAsync(Permissions.LOCATION); 
    console.log("you are in here...");
    if (status !== 'granted') {
        console.log("you didn't give any permissions to me :(");
        return;
    }
<<<<<<< HEAD
    console.log(Constants.deviceId);
    //let answer = await Geolocation.getCurrentPosition((inputdata) => console.log(inputdata));
    const answer = await Location.getProviderStatusAsync();
    console.log('past this shit');
    console.log(answer);
    if (Constants.deviceId === 'a93c7aa8-5f8d-49b4-84e4-c7c190ac3957') {
        location = {
            coords: {
              accuracy: 582,
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
=======
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
   // let answer = await Geolocation.getCurrentPositionAsync({ enableHighAccuracy: false });
   let answer = await Location.getProviderStatusAsync();
    console.log('past this shit');  
    console.log(answer);
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 10000 });
>>>>>>> ec4d7d865a545789f2252d7602e12b7bf40de898
    console.log("way past");
    console.log(location);
};
