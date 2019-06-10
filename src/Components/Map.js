import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class Map extends Component {

    state = {
        map: null
    }

    mapMoved() {
        console.log(JSON.stringify(this.state.map.getCenter()))
        if (this.props.locationChanged !== null) {
            this.props.locationChanged(this.state.map.getCenter());
        }

    }

    zoomChanged() {}

    mapLoaded(map) {
        
        if (this.state.map != null)
            return;
    
        this.props.onMapReady(map);
        this.setState({
            map: map
        })

    }

    handleMarkerClick(marker) {
        // console.log(marker) 
        this.props.searchMarkerClicked(marker)
    }

    render() {

        const markers = this.props.markers;

        const fancyStyle = require('./fancyStyle.json');
        
        return (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                onDragEnd={this.mapMoved.bind(this)}
                onZoomChanged={this.zoomChanged.bind(this)}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                defaultOptions={{ styles: fancyStyle }}
                >
                    <MarkerClusterer>
                    {
                        markers.map((marker, index) => {
                            return (
                                <Marker 
                                    key={index}
                                    clickable={true}
                                    icon={marker.icon}
                                    label={marker.icon}
                                    onClick={this.handleMarkerClick.bind(this, marker)}
                                    {...marker}
                                />
                            )
                        })
                    }
                    </MarkerClusterer>

            </GoogleMap>
        )
    }

}

export default withGoogleMap(Map);