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
   // let answer = await Geolocation.getCurrentPositionAsync({ enableHighAccuracy: false });
    console.log('past this shit');
    //console.log(answer);
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 1000 });
    console.log("way past");
    console.log(location);
};
