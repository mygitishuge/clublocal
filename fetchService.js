import { googleAPIKey } from "./GooglePlacesAPI";
import { placeType } from "./GooglePlacesAPI";

//Services
import { getUserLocation } from './userlocationservice';

export const getClubs = async () => {
    const userLocation = await getUserLocation();
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;
    const radius = 5000;
    const places = [];
  
    const url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      latitude +
      ',' +
      longitude +
      '&radius=' +
      radius +
      '&type=' +
      placeType +
      '&key=' +
      googleAPIKey;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
  
      for (let googlePlace of data.results) {
        var place = {};
        var myLat = googlePlace.geometry.location.lat;
        var myLong = googlePlace.geometry.location.lng;
        var coordinate = {
          latitude: myLat,
          longitude: myLong,
        };
        place['placeTypes'] = googlePlace.types;
        place['coordinate'] = coordinate;
        place['placeId'] = googlePlace.place_id;
        place['placeName'] = googlePlace.name;
        places.push(place);
      }
      // Show all the places around 4 km from San Francisco.
      console.log(
        'Heres a bar: ' +
          places.map((nearbyPlaces) => nearbyPlaces.placeName),
      );
    } catch (error) {
      console.log(error);
    }
  
    return places;
  };
  