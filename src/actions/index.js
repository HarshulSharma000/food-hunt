import { Location, Permissions } from 'expo';
import { Geolocation } from 'react-native';

export * from './authActions';

export const getLocation = () => async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION); 
    console.log("you are in here...");
    if (status !== 'granted') {
        console.log("you didn't give any permissions to me :(");
        return;
    }
    await Location.setApiKey('AIzaSyBYpuG_Lq3xFJoA6HKz__IBS81wB4bKtvk');
   // let answer = await Geolocation.getCurrentPositionAsync({ enableHighAccuracy: false });
   let answer = await Location.getProviderStatusAsync();
    console.log('past this shit');  
    console.log(answer);
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 10000 });
    console.log("way past");
    console.log(location);
};
