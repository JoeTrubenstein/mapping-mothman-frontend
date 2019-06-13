import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
 
export default class Location extends Component {
  /**
   * Render the example app
   */

   /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect = (suggest) => {
    // console.log(suggest);
    this.props.setLocation(suggest)
  }
  render() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];
    const google = window.google;
 
    return (
      <React.Fragment>
        <Geosuggest
          ref={el=>this._geoSuggest=el}
          placeholder="Type your location"
          initialValue=""
          fixtures={fixtures}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20" />
 
      </React.Fragment>
    )
  }
 
  
}