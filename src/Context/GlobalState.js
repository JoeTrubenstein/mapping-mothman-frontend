import React, { useState, createContext } from 'react';
import Axios from './Axios';

export const Context = createContext();

export const Provider = (props) => {

    const [sightings, setSightings] = useState([]);
    const [error, setError] = useState(null);

    const getSightings = (admin) => {
        Axios.get("/users/get-sightings")
            .then(res => {
            const items = res.data;
    
            const approvedSights = items.filter(item => item.isApproved === true);
    
            const sights = [];
            if(admin) {
                items.forEach(item => {
                    const sight = {
                        id: item._id,
                        name: item.witness,
                        position: item.location,
                        image: item.imageUrl,
                        description: item.description,
                        isApproved: item.isApproved,
                        seenDate: item.seenDate
                    };
                    sights.push(sight);
                });
            }
            else {
                approvedSights.slice(-6).forEach(item => {
                    const sight = {
                        id: item._id,
                        name: item.witness,
                        position: item.location,
                        image: item.imageUrl,
                        description: item.description,
                        seenDate: item.seenDate,
                        submitDate: item.submitDate
                    };
                    sights.push(sight);
                });
            }
            
            setSightings(sights);
            })
            .catch(error => {
                setError(error);
            });
        };

        const submitSighting = sighting => {
            const newObj = {
                witness: sighting.name,
                seenDate: sighting.date,
                location: sighting.location,
                description: sighting.desc,
                imageUrl: sighting.uploadedImg
            };
        
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*"
                }
            };
            Axios.post("/users/new-sighting", newObj, axiosConfig)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
            };

            const approveSighting = sightingID => {
                const config = {
                  id: sightingID
                };
            
                Axios.post("/users/admin-dashboard/approve-sighting", config)
                  .then(() => {
                    getSightings(true);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              };

              const rejectSighting = sightingID => {
                const config = {
                  id: sightingID
                };
            
                Axios.post("/users/admin-dashboard/reject-sighting", config)
                  .then(() => {
                    getSightings(true);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              };
        
    return(
        <Context.Provider 
            value={{
                sightings: sightings,
                error: error,
                getSightings: getSightings,
                submitSighting: submitSighting,
                approveSighting: approveSighting,
                rejectSighting: rejectSighting
            }}
        >
            {props.children}
        </Context.Provider>
    );
};