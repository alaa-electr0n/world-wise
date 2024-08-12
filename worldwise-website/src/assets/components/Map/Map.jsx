import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../../hooks/useGeoLocation";
import Button from "../Button/Button";
import { useUrlPoisition } from "../../../hooks/useUrlPosition";

function Map() {
  //hOW to read information from search Queries set in the route: by using useSearchParamsHookS
  const [mapLat, mapLng] = useUrlPoisition();

  // function handlePosition() {
  //   setSearchParams({ lat: 23, lng: 50 });
  // }

  const [mapPosition, setMapPosition] = useState([0, 40]);
  const { cities } = useCities();

  //using GeoLaocation Hook to get my current Position
  const {
    position: geoLocationPosition,

    isLoading: isLoadingGeolocation,
    getPosition: getGeoLocationPosition,
  } = useGeolocation();

  //to make the state of the map position rememner the "Lng" and "Lat" of the country after they gone from the url

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // get my current position on the map
  //by sync the mapPostion with the geoLocationPostion in useEffect hook

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    // {step2}
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getGeoLocationPosition}>
          {isLoadingGeolocation ? "Loading..." : "Get Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={` ${styles.map}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;

//make the map move to the current city selected from the selected List

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

//when i cclick on the map , the form appear with the "Lat, Lng " of the city clicked on

function DetectClick() {
  //Programmatically navigation
  // step1 => useNavigate
  // step 2=> update the navigate function on click on the wanted element
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
