import React, { Component } from 'react'
import Location from './Location'
// import cloudinary from 'cloudinary';

export default class Form extends Component {

    state = {
        uploadedImg: '',
        formSubmit: false,
        photoSubmit: false
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

    closeForm = (event) => {
        event.preventDefault();
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log('the form was submitted. if you are not seeing this, no fucking wonder why it was not working')
        this.setState({
            name: event.target.name.value,
            date: event.target.date.value,
            desc: event.target.desc.value,
            formSubmit: true
        }, () => {
            this.props.appSubmitSighting(this.state)
        })

        setTimeout(() => {
            this.setState({
                formSubmit: false
            })
        },
        5000)


        

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

                let imgName = ''
                for (let i = imgUrl.length - 1; i > 1; i--) {
                    if(imgUrl[i] !== '/') {
                        imgName += imgUrl[i]
                    }
                    else {
                        break;
                    }
                }

                imgName = imgName.split('').reverse().join('')
                console.log(imgName)

                this.setState({
                    uploadedImg: imgUrl,
                    imgName: imgName,
                    photoSubmit: true
                })
              } 
            }
          })
    }

    render() {

        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" ref={(el) => {
                    if (el) {
                        el.style.setProperty('background-color', 'darkgrey', 'important');
                        el.style.setProperty('display', 'flex', 'important');
                        el.style.setProperty('justify-content', 'center', 'important');
                    }
                    }}>
                    Report a sighting
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    {this.state.formSubmit ? <span style={{color: 'black', backgroundColor: 'rgb(200, 200, 200, 0.5)', margin: '15px', padding: '7px', borderRadius: '4px', textAlign: 'center'}}>Your sighting has been received! It is now under investigation.</span> : ''}
                    <form onSubmit={this.submitForm} ref={element => this.form = element}>
                        
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" placeholder="Full Name" />
                            </div>
                            <div className="form-group">
                                <Location setLocation={this.setLocation} />
                            </div>
                            <div className="form-group">
                                <input type="date" className="form-control" id="date" placeholder="name@example.com" />
                            </div>

                            <div className="form-group">
                                <textarea className="form-control" id="desc" rows={3} placeholder="Describe your experience" />
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <button onClick={this.uploadWidget}>Upload photo</button>
                                </div>
                                {this.state.photoSubmit ? <span style={{backgroundColor: 'rgba(200, 200, 200, 0.5)', padding: '3px', borderRadius: '4px'}}>{this.state.imgName}</span> : null}

                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeForm} ref={(el) => {
                        if (el) {
                            el.style.setProperty('background-color', 'darkgrey', 'important');
                        }
                        }}> Close</button>
                        <button className="btn btn-primary" ref={(el) => {
                        if (el) {
                            el.style.setProperty('background-color', 'black', 'important');
                        }
                        }}>Submit</button>
                        </div>
                        </form>

                    </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
} 