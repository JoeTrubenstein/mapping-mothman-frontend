import React, {useRef} from 'react';
import Geosuggest from 'react-geosuggest';
 
const Location = ({ setLocation }) => {

  const geosuggestEl = useRef(null);

  const fixtures = [
    {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
    {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
    {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
  ];

  /**
   * When a suggest got selected
   */
  const onSuggestSelect = (suggest) => setLocation(suggest);
  const google = window.google

  return (
    <div>
      <Geosuggest
        ref={geosuggestEl}
        placeholder="Start typing!"
        initialValue=""
        fixtures={fixtures}
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius="20" />
    </div>
  );
};

export default Location;