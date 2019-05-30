import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Components/Search';
import Nav from './Components/Nav'

function App() {
  return (
    <div>
      <Nav />
    
    <div className="row">
      <div className="col-md-6">
        <Search />
      </div>
      <div className="col-md-6">
        Insert information about a sighting here
      </div>
    </div>
    </div>
  );
}

export default App;