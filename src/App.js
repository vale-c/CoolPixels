import React, { Component } from 'react';
import './App.scss';
import { Button } from "react-bootstrap";

const clientId = 'c0b8f67421b322f7c98eab151e6e4ecd2c70ee03763b69890ff9b25ab2f4bac2';
const endpoint = 'https://api.unsplash.com/search/photos';

class App extends Component {
  constructor(props){
  super(props)

    this.query = '';

    this.trackQueryValue = this.trackQueryValue.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      images: []
    }
  }

  search() {
    fetch(`${endpoint}?orientation=squarish&fit=clip&min-w=400&min-h=400&per_page=20&query=${this.query}&client_id=${clientId}`)
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
      return <img src={images.urls.thumb} key={images.id} alt={images.description} />
    })
  }


  render() {
    return (
		  <div>
      <div className="text-center">
        <div className="inner">
          <h2 className="main-title">CoolPixels</h2>
            <div className="navbar-form">
              <input type="text" onChange={this.trackQueryValue}/>
            </div>
            <Button bsStyle="danger" bsSize="small" onClick={this.search}>Search Pics</Button>
          </div>
			</div>
          <div className="imgList text-center">{this.images()}</div>
			</div>
		);
  }
}

export default App;