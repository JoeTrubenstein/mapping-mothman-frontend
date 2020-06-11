import React, { Component } from 'react'
import Map from './Map';

class Search extends Component {

    state = {
        map: null, 
        currentLocation: {
            lat: 40.759990,
            lng: -73.991210
        }
        
    }
    

    componentWillMount() {
        //console.log(this.props.sightings)
    }

    componentDidUpdate(prevProps) {
      
    }

    centerChanged = (center) => {
        
        this.setState({
            currentLocation: center
        })
        
    }

    searchMarkerClicked = (marker) => {
        // console.log(marker)
        this.props.appMarkerClicked(marker)
    }

    

    render() {
        // console.log(this.props.sightings)
        let items = this.props.sightings;
        let markers = [];

        items.forEach( item => {

            const marker = {
                key: item.id, 
                witness: item.name,
                //label: item.name, 
                position: item.position,
                defaultAnimation: 2,
                image: item.image,
                desc: item.description,
                seenDate: item.seenDate
            }
            markers.push(marker)
        })
     
        return (
            
            <div>
                <Map
                    onMapReady={ (map) => {
                        if (this.state.map != null)
                            return;
                     
                        this.setState({
                            map:map
                        })
                    }}

                    locationChanged={this.centerChanged.bind(this)}
                    markers={markers}
                    zoom={5}
                    center={this.state.currentLocation}
                    containerElement={<div style={{ height: 100 + '%'}} /> }
                    mapElement={<div style={{ height: 500}} /> }
                    searchMarkerClicked={this.searchMarkerClicked}
                    />
            </div>
        )
    }
}


export default Search;