import React, { Component } from 'react';
import './App.css';
import { Button } from "react-bootstrap";

const clientId = 'c0b8f67421b322f7c98eab151e6e4ecd2c70ee03763b69890ff9b25ab2f4bac2';
const endpoint = 'https://api.unsplash.com/search/photos';

class App extends Component {
  constructor(props){
    super(props)

    this.query = '';

    this.trackQueryValue = this.trackQueryValue.bind(this); //search for new image
    this.search = this.search.bind(this);

    this.state = {
      images: []
    }
  }

  search() {
    fetch(`${endpoint}?query=${this.query}&client_id=${clientId}`)
      .then(response => {
        return response.json()
      }).then(jsonResponse => {
        console.log(jsonResponse);
        this.setState({
          images: jsonResponse.results
        })
      })
  }

  trackQueryValue(event) {
    this.query = event.target.value;
  }

  images() {
    return this.state.images.map(images => {
      return <img src={images.urls.thumb} key={images.id} alt="result" />
    })
  }


  render() {
    return (
		  <div className="text-center">
			  <input type="text" onChange={this.trackQueryValue}/>
          <Button bsStyle="primary" bsSize="small" onClick={this.search}>Cerca</Button>
          <div className="imageGallery">{this.images()}</div>
			</div>
		);
  }
}

export default App;