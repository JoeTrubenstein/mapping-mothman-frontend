import React, { Component } from 'react'

export default class Sighting extends Component {
    render() {
        let sighting = this.props.marker
        return (
            <div>
                <h2>Insert information about a sighting here:</h2>
                <h4>{sighting.label}</h4>
                <img src={sighting.image} />
                <p>{sighting.desc}</p>
            </div>
        )
    }
}
