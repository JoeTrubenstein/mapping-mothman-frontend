import React, { Component } from 'react'
import Location from './Location'
// import cloudinary from 'cloudinary';

export default class Form extends Component {

    state = {
        uploadedImg: ''
    }


    setLocation = (formLoc) => {
        if (!formLoc) {
            return;
        }
        this.setState({
            location: formLoc.location
        })
        // console.log(this.state.location)
    }

    submitForm = (event) => {
        event.preventDefault();

        this.setState({
            name: event.target.name.value,
            date: event.target.date.value,
            desc: event.target.desc.value
        }, () => {
            this.props.appSubmitSighting(this.state)
        })

        

        // this.props.appSubmitSighting(this.state)
    }

    uploadWidget = (event) => {
        event.preventDefault();

        window.cloudinary.openUploadWidget({ cloud_name: 'dhj95a6jv', upload_preset: 'ml_default', tags: ['mothman'] }, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              if (result.event === 'success') {
                console.log(result.info.secure_url)
                let imgUrl = result.info.secure_url;
                this.setState({
                    uploadedImg: imgUrl
                }, () => {
                    console.log(this.state)
                })
              } 
            }
          })
    }

    render() {

        let margin = {
            marginBottom: '20px'
        }

        let formStyle = {
            width: '400px',
            padding: '15px'
        }
        return (
            <div style={margin}>
                
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Report a sighting
                    </button>
                    <div className="dropdown-menu" style={formStyle}>
                        <form onSubmit={this.submitForm} ref={element => this.form = element}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Full Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Bob Boberson" />
                            </div>
                            <div className="form-group">
                                Location
                                <Location setLocation={this.setLocation} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Date</label>
                                <input type="date" className="form-control" id="date" placeholder="name@example.com" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Describe Your Experience</label>
                                <textarea className="form-control" id="desc" rows={3} defaultValue={""} />
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <button onClick={this.uploadWidget}>Upload photo</button>
                                </div>

                            </div>
                            <button>Submit!</button>
                        </form>

                        
                    </div>

 
                </div>

            </div>
        )
    }
}
