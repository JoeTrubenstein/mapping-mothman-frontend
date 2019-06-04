import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Components/Search';
import Nav from './Components/Nav'
import Sighting from './Components/Sighting'

class App extends Component {

  state = {
    marker: {}
  }

  markerClicked = (marker) => {
    // console.log('we made to app')
    // console.log(marker)
    this.setState({
      marker: marker
    })
    // console.log(this.state.marker)
  }

  render() {

  return (
    <div>
      <Nav />
    
    <div className="row">
      <div className="col-md-6">
        <Search appMarkerClicked={this.markerClicked}
                randomString={'random string'}
                />
      </div>
      <div className="col-md-6">
        <Sighting stuff={'ummmmm'}
                  marker={this.state.marker}
        />
      </div>
    </div>
    </div>
  );
  }
}

export default App;