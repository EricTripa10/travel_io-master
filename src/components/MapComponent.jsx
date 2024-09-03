import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;
const containerStyle = {
  width: "100%",
  height: "80vh",
};

const CustomInfoWindow = ({ location, onCloseClick }) => {
  const infoWindowStyle = {
    background: `#fff`,
    border: `1px solid #ccc`,
    padding: `10px`,
    maxWidth: `200px`,
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.geometry.location.lat},${location.geometry.location.lng}`;

  return (
    <InfoWindow
      position={{
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
      }}
      onCloseClick={onCloseClick}
    >
      <div style={infoWindowStyle}>
        <h4>{location.name}</h4>
        <p>{location.formatted_address}</p>
        <p>Rating: {location.rating}</p>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions on Google Maps
        </a>
      </div>
    </InfoWindow>
  );
};

const MapContainer = () => {
  const [googleLocation, setGoogleLocation] = useState([]);
  const dispatch = useDispatch();

  const locationsDetails = useSelector((state) => state.locations);
  const { locations } = locationsDetails;

  const reduxLocation = useSelector((state) => state.selectedLocation);
  const { selectedLocation } = reduxLocation;

  const selectedFavorites = useSelector((state) => state.selectedFavorite);
  const { selectedFavorite } = selectedFavorites;

  const [mapCenter, setMapCenter] = useState({
    lat: 45.9432,
    lng: 24.9668,
  });
  const [zoomLevel, setZoomLevel] = useState(7);
  const [selectLocation, setSelectLocation] = useState(null);

  useEffect(() => {
    if (locations.results) {
      dispatch({ type: "SELECT_FAVORITE", payload: null });
      setGoogleLocation(locations.results);
      setMapCenter({
        lat: locations?.results[0].geometry.location.lat || 45.9432,
        lng: locations?.results[0].geometry.location.lng || 24.9668,
      });
      setZoomLevel(locations?.results[0].geometry.location.lat ? 12 : 7);
    }
  }, [locations]);

  useEffect(() => {
    if (selectedLocation.geometry !== undefined) {
      setSelectLocation(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedFavorite !== undefined && selectedFavorite !== null) {
      setGoogleLocation([selectedFavorite.data]);
      setSelectLocation(selectedFavorite.data);
      setMapCenter({
        lat: selectedFavorite.data.geometry.location.lat || 45.9432,
        lng: selectedFavorite.data.geometry.location.lng || 24.9668,
      });
      setZoomLevel(selectedFavorite.data.geometry.location.lat ? 12 : 7);
    }
  }, [selectedFavorite]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoomLevel}
      >
        {googleLocation &&
          googleLocation.map((loc) => (
            <Marker
              key={loc.place_id}
              position={{
                lat: loc.geometry.location.lat,
                lng: loc.geometry.location.lng,
              }}
              onClick={() => setSelectLocation(loc)}
            />
          ))}

        {selectLocation && (
          <CustomInfoWindow
            location={selectLocation}
            onCloseClick={() => setSelectLocation(null)}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
