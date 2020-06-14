import React from 'react'
import Map from './Map';
import MarkerClusterer from '@google/markerclustererplus';

const Search = ({sightings, appMarkerClicked}) => {

    const searchMarkerClicked = (marker) => {
        appMarkerClicked(marker)
    };

    const addMarkers = (map, markers) => {
        const mapMarkers = [];
        markers.forEach((marker) => {
          const mapMarker = new window.google.maps.Marker({
            position: marker.position,
            label: null,
            title: marker.witness,
          })
          mapMarker.addListener(`click`, () => {
            searchMarkerClicked(marker)
          });
          mapMarkers.push(mapMarker);
        });
        new MarkerClusterer(map, mapMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }

    const items = sightings;
    const markers = [];

    items.forEach( item => {

        const marker = {
            key: item.id, 
            witness: item.name,
            position: item.position,
            defaultAnimation: 2,
            image: item.image,
            desc: item.description,
            seenDate: item.seenDate
        }
        markers.push(marker)
    });
        
    const fancyStyle = require("./fancyStyle.json");
    
        return (
            <div>
                <Map
                    options={{
                        center: { lat: 40, lng: -80 },
                        zoom: 5,
                        styles: fancyStyle
                    }}
                    onMount={addMarkers}
                    onMountProps={markers}
                />
        </div>
    )
};

export default Search;