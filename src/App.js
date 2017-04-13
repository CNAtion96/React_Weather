import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

constructor(props){
  super();
  this.state = {
    weather: [],
    value: 'cincinatti',
  };
}

componentDidMount(){
    this.getWeather(this.state.value);
  }

  getNewWeather(e){
    e.preventDefault();
    this.getWeather(this.state.value);
  }

  getWeather(city){
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=imperial&cnt=6&APPID=b52a2c029fff494c5032a2860ad870f2`)
    .then((response)=> {
      this.setState({
        weather: response.data.list,
      })
    });
  }

  changedInput(e){
    this.setState({
      value:e.target.value,
    })
  }

  render() {
    const weather = this.state.weather.map(day=>{
      return (<div className="col-md-2">
          <h2>Hight: {day.temp.max}</h2>
          <h2>Low: {day.temp.min}</h2>
          <h2>{day.weather[0].description}</h2>
        </div>
      )
    })
    return (
      <div className="App">

        <h3 className="col-md-6 col-md-offset-3">The Weather in {this.state.value} for the next week is:</h3>

        <form onSubmit={this.getNewWeather.bind(this)} className="col-md-12 ">
          <input className="form-control" onChange={this.changedInput.bind(this)} type="text" placeholder="Enter City" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

          {weather}

      </div>
    );
  }
}

export default App;
