import React from "react";
import GoogleMapReact from 'google-map-react';

export default function SimpleMap(){
    defaultProps = {
        center: {lat: 40.73, lng: -73.93}, 
        zoom: 12
     }

     retur (
        <div>
            <GoogleMapReact
                bootstrapURLKeys={{key:""}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                >
                <AnyReactComponente 
                    lat={59.955413}
                    long={30.337844}
                    text="my marker"
                    />
                </GoogleMapReact>
        </div>
     )
}