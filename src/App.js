import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      data: [],
      input: '',
      trending: [],
    }
  }
  
  componentDidMount() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=JYslkGeco8QJ6gAUF3hRIpQSltMs0hsF&limit=25&rating=G')
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
        var trending = jsonResult.data;
        var array = [];
        for (var i = 0; i < trending.length; i++) {
          array[i] = trending[i].images.fixed_height.url;
        }
        this.setState ({
          trending: array,
          })
      }) 
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
  
  handleInput = e =>{
    this.setState ({
      input: e.target.value
    })
  }
  
  search = e => {
    e.preventDefault()
    this.setState ({
      data: [],
    })
    var params = this.state.input
    fetch('https://api.giphy.com/v1/gifs/search?api_key=JYslkGeco8QJ6gAUF3hRIpQSltMs0hsF&q='+params+'&limit=25&offset=0&rating=G&lang=en')
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
    
  trending = e => {
    e.preventDefault()
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=JYslkGeco8QJ6gAUF3hRIpQSltMs0hsF&limit=50&rating=G')
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
    return (
      <div className="App">
      <form>
      <input type="text" placeholder="Search for GIFs" onChange={this.handleInput} />
      <button onClick={this.search}>Search</button>
      <br></br>
      <input type="button" value="Random from GIPHY" onClick={this.random} />
      <br></br>
      <input type="button" value="Reverse the order" onClick={this.reverse} />
      <br></br>
      </form>
      {this.state.data.map(gif => {
          return(
            <img src= {gif} />
          )})
      }
      <h2>Trending GIFs from GIPHY</h2>
      {this.state.trending.map(gif => {
        return(
          <img src= {gif} />
        )})
      }
      <br></br>
      <input type="button" value="Load more trending GIFs" onClick={this.trending} />
      </div>
    );
  }
}

export default App;
