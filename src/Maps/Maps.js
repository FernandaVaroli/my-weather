import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, OverlayView } from "@react-google-maps/api";
import './Maps.css';
import DailyTemp from "../DailyTemp/DailyTemp";
import axios from "axios";
import PlacesAutocomplete from "../PlacesAutoComplete/PlacesAutoComplete";


export default function Maps(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;

}


const api_endpoint_forecast = `https://api.open-meteo.com/v1/forecast?`;

function Map() {

    const [markerPosition, setMarkerPosition] = useState(null);
    const [responseData, setResponseData] = useState({})
    
    React.useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setMarkerPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
        })}

    }, [])

    React.useEffect(() => {
        if(markerPosition && markerPosition.lat && markerPosition.lng){

            axios.get(`${api_endpoint_forecast}latitude=${markerPosition.lat}&longitude=${markerPosition.lng}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=America/Fortaleza`).then((response) => {
                setResponseData(response.data)
            })
            
        }
        
    }, [markerPosition])

    const mapClickCallback = function (event){
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    }

    return (
    <>
        <div className="places-container">
            <PlacesAutocomplete setCoordinatesCallback={setMarkerPosition} />
        </div>
      
        <div className="daily-temp">

            <DailyTemp 
                dailyList={responseData.daily}>

                </DailyTemp>
            
        </div>

        <GoogleMap 
            mapContainerClassName = "map-container"
            zoom={10}
            onClick={mapClickCallback}
            center={markerPosition || {lat:43.45, lng:-80.49}}
        >
            {markerPosition && <Marker position={markerPosition} />}

            { markerPosition && <OverlayView 
                key='markerWeather'
                position={markerPosition}
                mapPaneName="markerLayer"            
            >    
                <div  
                    style={{
                    background: `#203254`,
                    padding: `7px 12px`,
                    fontSize: '11px',
                    color: `white`,
                    borderRadius: '4px',
                }}> 
                    <p>{responseData.current_weather && responseData.current_weather.temperature}</p>
                </div>
            </OverlayView> }
            
        </GoogleMap>

        </>
    )
}

