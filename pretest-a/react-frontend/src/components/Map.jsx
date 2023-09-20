import { useContext, useRef, useState } from "react";
import style from "./css/Map.module.css";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { RiArrowUpCircleFill, RiRecordCircleFill } from "react-icons/ri";

import { OrderContext } from "../context/OrderContext";
import { RiMapPin2Fill } from "react-icons/ri";
import Loader from "./Loader";
import BottomBar from "./BottomBar";

const center = { lat: -7.24917, lng: 112.75083 };

const Map = () => {
  const {
    selectDirection,
    setSelectDirection,
    setSelectFleet,
    distance,
    setDistance,
    isOrder,
    point,
    setPoint,
  } = useContext(OrderContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState("");

  const pickupRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return (
      <>
        <Loader />
        <BottomBar />
      </>
    );
  }

  const calculateRoute = async () => {
    if (pickupRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickupRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);

    setPoint({
      pickup: pickupRef.current.value,
      destination: destinationRef.current.value,
    });

    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  return (
    <>
      {/* maps */}
      <div className={style.maps}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      {/* destination */}
      <div className={style.container}>
        {isOrder && (
          <div className={style.pointContainer}>
            <div className={style.point}>
              <RiArrowUpCircleFill size={30} color="#006699" />
              <div className={style.icon}>
                <p className={style.location}>Lokasi Penjemputan</p>
                <p className={style.det}>{point.pickup}</p>
              </div>
            </div>
            <div className={`${style.point} ${style.destination}`}>
              <RiRecordCircleFill size={30} color="#ff6600" />
              <div className={style.icon}>
                <p className={style.location}>Lokasi Tujuan</p>
                <p className={style.det}>{point.destination}</p>
              </div>
            </div>
          </div>
        )}

        {!isOrder && (
          <>
            <div className={style.header}>
              {!selectDirection && <p>Pilih Perjalanan</p>}
              {selectDirection && <p>Detail Perjalanan</p>}
            </div>
            <div className={style.input}>
              <RiArrowUpCircleFill size={30} color="#006699" />
              <Autocomplete className={style.auto}>
                <input
                  type="text"
                  placeholder="Penjemputan"
                  ref={pickupRef}
                  disabled={selectDirection ? true : false}
                  required
                />
              </Autocomplete>
            </div>
            <div className={style.input}>
              <RiRecordCircleFill size={30} color="#ff6600" />
              <Autocomplete className={style.auto}>
                <input
                  type="text"
                  placeholder="Tujuan"
                  ref={destinationRef}
                  disabled={selectDirection ? true : false}
                  required
                />
              </Autocomplete>
            </div>
          </>
        )}

        {!selectDirection && (
          <div className={style.btnGroup}>
            <button
              type="submit"
              onClick={() => {
                calculateRoute();
                setSelectDirection(true);
              }}
              className={`${style.btn} ${style.btnSubmit}`}
            >
              Submit
            </button>
          </div>
        )}
        {!isOrder && selectDirection && (
          <div className={style.btnGroup}>
            <button
              type="submit"
              onClick={() => {
                setSelectDirection(false);
                setSelectFleet(false);
              }}
              className={`${style.btn} ${style.btnEdit}`}
            >
              Ubah Lokasi
            </button>
          </div>
        )}
      </div>
      {!isOrder && selectDirection && (
        <div className={style.recap}>
          <div>
            <h4>Jarak</h4>
            <p>{distance}</p>
          </div>
          <div>
            <h4>Estimasi</h4>
            <p>{duration}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
