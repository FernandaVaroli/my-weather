import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, OverlayView } from "@react-google-maps/api";
import './Maps.css';
import axios from "axios";
import usePlacesAutocomple, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox"

export default function Maps(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;

}

const api_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const api_key = process.env.REACT_APP_WEATHER_KEY;
const cel_metrics = `metric`;

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
            axios.get(`${api_endpoint}lat=${markerPosition.lat}&lon=${markerPosition.lng}&appid=${api_key}&units=${cel_metrics}`).then((response) => {
                setResponseData(response.data)
            })

            
        }
        
    }, [markerPosition])

    return (
    <>
        <div className="places-container">
            <PlacesAutocomplete setCoordinatesCallback={setMarkerPosition} />
        </div>

        <GoogleMap 
            mapContainerClassName = "map-container"
            zoom={10}
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
                    <p>{responseData.main && responseData.main.temp}</p>
                </div>
            </OverlayView> }
            
        </GoogleMap>

        </>
    )
}

const PlacesAutocomplete = ({setCoordinatesCallback}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomple();

    const handleSelect = async(address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]); 
        setCoordinatesCallback({lat, lng});
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready}
        className="combobox-input" placeholder="Search an address"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) => (
                <ComboboxOption key={place_id} value={description}/>))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>;
}