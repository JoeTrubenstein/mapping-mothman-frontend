import React, { Component } from 'react'
import Map from './Map';

class Search extends Component {

    state = {
        map: null, 
        currentLocation: {
            lat: 40.759990,
            lng: -73.991210
        },
        data: [
            {id: '1', price: 50, name:'Nike Jordans', position:{lat:40.7224017, lng:-73.9896719}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpB4a009tbOBYT6ELsoZPF5fdM-CW0MeydSlqRcomXMR7hotaG', seller: {username: 'Kobe', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsG2I361ZPzSXpvaYiH_ccSf0CpLSOP5wVDFezQNIYeiL-rW3J'}, description: 'Some stuff about the sighting'},
            {id: '2', price: 100, name:'Sofa', position:{lat:40.71224017, lng:-73.9896719}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpB4a009tbOBYT6ELsoZPF5fdM-CW0MeydSlqRcomXMR7hotaG', seller: {username: 'Messi', image: 'https://d26v70zl50qz3k.cloudfront.net/wp-content/uploads/2016/06/GettyImages-534095138-400x400.jpg'}, description: 'Some stuff about the sighting'},
            {id: '3', price: 150, name:'TV', position:{lat:40.71224017, lng:-73.9796719}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpB4a009tbOBYT6ELsoZPF5fdM-CW0MeydSlqRcomXMR7hotaG', seller: {username: 'Jordan', image: 'https://pbs.twimg.com/profile_images/3082075108/916250160b6303ad041f619708607a6c_400x400.jpeg'}, description: 'Some stuff about the sighting'},
            {id: '4', price: 250, name:'Some shit', position:{lat:40.72325119, lng:-73.9907821}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpB4a009tbOBYT6ELsoZPF5fdM-CW0MeydSlqRcomXMR7hotaG', seller: {username: 'Who?', image: 'https://pbs.twimg.com/profile_images/3082075108/916250160b6303ad041f619708607a6c_400x400.jpeg'}, description: 'Some stuff about the sighting'}
        ]
    }

    centerChanged = (center) => {
        
        this.setState({
            currentLocation: center
        })
        
    }

    searchMarkerClicked = (marker) => {
        console.log('we made it to search')
        this.props.appMarkerClicked(marker)
    }

    render() {

        let items = this.state.data;
        let markers = [];

        items.forEach( item => {

            const marker = {
                key: item.id, 
                label: item.name, 
                position: item.position,
                defaultAnimation: 2,
                image: item.image,
                desc: item.description
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
                    zoom={14}
                    center={this.state.currentLocation}
                    containerElement={<div style={{ height: 100 + '%'}} /> }
                    mapElement={<div style={{ height: 100 + 'vh'}} /> }
                    searchMarkerClicked={this.searchMarkerClicked}
                    />
            </div>
        )
    }
}


export default Search;