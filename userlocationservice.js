import * as Location from 'expo-location';

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  let { coords } = await Location.getCurrentPositionAsync();
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    // latitude: 35.6762,
    // longitude: 139.6503,
  };
};

