
//Expo
import { StatusBar } from 'expo-status-bar';

//React 
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react'

//Maps library
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

//Services
import { getUserLocation } from './userlocationservice';
import { getClubs } from './fetchService';

// export default function App() {

//   const [places, setPlaces] = useState([]);

//   const [userLocation, setUserLocation] = useState(null);

//   const [userLocal, setUserLocal] = useState(null);

//   useEffect(() => {

//     getClubs().then(places => setPlaces(places));

//     const getUserLocationAsync = async () => {
//       const location = await getUserLocation();
//       setUserLocation(location);
//     };
//     getUserLocationAsync();
    
//     if (userLocation) {
//       setUserLocal({
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     }
//   }, [userLocation]);

//   return (
//     <View style={styles.container}>
//       {userLocation ? (
//         <Text>
//           Your location is: {userLocation.latitude}, {userLocation.longitude}
//         </Text>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//       <Text>Ce travail</Text>
//       <MapView
//         style={{height: '50%', width: '100%'}}
//         provider={PROVIDER_GOOGLE}
//         region={userLocal}
//         showsUserLocation
//       >
//         {/* <Marker
//           coordinate={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//           }}
//         /> */}
//         {places.map(place => (
//           <Marker
//             key={place.placeId}
//             coordinate={place.coordinate}
//             title={place.placeName}
//             description={place.placeTypes.join(', ')}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// }

export default function App() {

  const [places, setPlaces] = useState([]);

  const [userLocation, setUserLocation] = useState(null);

  const [userLocal, setUserLocal] = useState(null);

  useEffect(() => {

    getClubs().then(places => setPlaces(places));

    const getUserLocationAsync = async () => {
      const location = await getUserLocation();
      setUserLocation(location);
      setUserLocal({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.06,
      });
    };
    getUserLocationAsync();
    
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.visualbuffer}></View>
      <View style={styles.header}>
          <Text style={styles.title}>
            Club Local
          </Text>
          <Text style={styles.subtitle}>
            Find the clubs near you, and get to drinking
          </Text>
      </View>
      
      <MapView
        style={{height: '70%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        region={userLocal}
        showsUserLocation
      >
        {/* <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        /> */}
        {places.map(place => (
          <Marker
            key={place.placeId}
            coordinate={place.coordinate}
            title={place.placeName}
            description={place.placeTypes.join(', ')}
          />
        ))}
      </MapView>

      <View style={styles.footer}>
          <Image></Image>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  // visualbuffer: {
  //   height: '3%',
  //   backgroundColor: 'black',
  // },
  header: {
    height: "20%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    top: 0,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Times New Roman',
    color: 'white',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Times New Roman',
    color: 'white',
    fontStyle: 'italic',
  },
  footer: {
    height: "20%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    top: 0,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  }
});
