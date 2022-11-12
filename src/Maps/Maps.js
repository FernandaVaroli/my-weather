import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import './Maps.css';

export default function Maps(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;

}

function Map() {
    return (
        <GoogleMap mapContainerClassName = "map-container"
            zoom={10}
            center={{lat: 44, lng: -80}}
        >

        </GoogleMap>
    )
}