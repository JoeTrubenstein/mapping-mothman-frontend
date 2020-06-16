import React from 'react'

const Sighting = ({marker}) => {
    return (
        <div>
            <h2>Insert information about a sighting here:</h2>
            <h4>{marker.label}</h4>
            <img src={marker.image} />
            <p>{marker.desc}</p>
        </div>
    )
};

export default Sighting;