import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Components/Search';
import Nav from './Components/Nav'
import Sighting from './Components/Sighting'
import Form from './Components/Form'
import Location from './Components/Location'
import axios from 'axios';

class App extends Component {

  state = {
    marker: {},
    sightings: []
  }

  componentDidMount() {
    //console.log('component did mount', 19)
  }

  getSightings = () => {
    axios.get('http://mothman-server.herokuapp.com/users/get-sightings')
          .then( res => {
            console.log(res)
            let items = res.data;
            let sights = [];
            console.log(items)

            items.forEach( item => {

                const sight = {
                    id: item._id, 
                    name: item.witness, 
                    position: item.location,
                    image: item.imageUrl,
                    description: item.description
                }

            sights.push(sight)

            this.setState({
              sightings: sights
            }, () => {
              // console.log(this.state.sightings)
            })
        })
          })
          .catch( error => {
            console.log(error)
          })
  }

  componentWillMount() {
    this.getSightings()
  }

  markerClicked = (marker) => {
    // console.log('we made to app')
    // console.log(marker)
    this.setState({
      marker: marker
    })
    // console.log(this.state.marker)
  }

  submitSighting = (sighting) => {
    // console.log(sighting);
    let newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg
    }
    //console.log(newObj);

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': "*"
      }
  }
    axios.post('http://localhost:3030/users/new-sighting', newObj, axiosConfig)
          .then( response => {
            console.log(response);
          })
          .catch( error => {
            console.log(error);
          })
  }

  render() {
    

  return (
    <div style={{backgroundColor: 'black', color: 'white'}}>
      <Nav />
      
      <div className="row" style={{backgroundColor: 'black', color: 'white'}}>
        <div className="col-md-6">
          <Search appMarkerClicked={this.markerClicked}
                  randomString={'random string'}
                  sightings={this.state.sightings}
                  />
        </div>
        <div className="col-md-6" style={{backgroundColor: 'black', color: 'white'}}>
          <Sighting stuff={'ummmmm'}
                    marker={this.state.marker}
          />
        </div>
        
      </div>

      <div style={{backgroundColor: 'black', color: 'white'}}>
        <Form appSubmitSighting={this.submitSighting} />        
      </div>


  
    </div>
  );
  }
}

export default App;