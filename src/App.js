import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }
  
  random = e => {
    e.preventDefault()
    var datacopy = this.state.data
    var random = [datacopy[Math.floor(Math.random()* 24)]]
    this.setState ({
      data: random,
    })
  }
  
  reverse = e => {
    e.preventDefault()
    var datacopy = this.state.data
    this.setState ({
      data: datacopy.reverse(),
    })
  }
  
  callGiphy = e => {
    e.preventDefault()
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
        var data = jsonResult.data;
        var array = [];
        for (var i = 0; i < data.length; i++) {
          array[i] = data[i].images.fixed_height.url;
        }
        this.setState ({
          data: array,
          })
      }) 
  }
  
  render() {
    let gifs = this.state.data
    return (
      <div className="App">
      <input type="button" value="GIFs from GIPHY" onClick={this.callGiphy} />
      <br></br>
      <input type="button" value="Random from GIPHY" onClick={this.random} />
      <br></br>
      <input type="button" value="Reverse the order" onClick={this.reverse} />
      <br></br>
        {gifs.map(gif => {
          return(
            <img src= {gif} />
          )})
        }
        </div>
    );
  }
}

export default App;
