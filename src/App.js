import React , {Component} from 'react'
import logo from './logo.svg';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './app-component/weather-component'

const API_key ="f94742216c68a4ef07f98939606030a6"

class App extends Component {
  
  state = { 
    city:undefined,
    country:undefined,
    icon:undefined,
    main:undefined,
    celsius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    description:"",
    error:false  

   }
  
  componentDidMount(){
    this.getWeather()
    this.weathericon = {
      thunderstorm : "wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-strome-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog",
  
    }
  }
  
  calCelsius(temp){
    let cell=Math.floor(temp-273.15);
    return cell;
  }

  get_Weathericon(icon,rangeID){
   switch(true){
    case rangeID >= 200 && rangeID <= 232:
      this.setState({icon:this.weathericon.thunderstorm})
      break;
    case rangeID >= 300 && rangeID <= 321:
      this.setState({icon:this.weathericon.Drizzle})
      break;
    case rangeID >= 500 && rangeID <= 532:
      this.setState({icon:this.weathericon.Rain})
      break;
    case rangeID >= 600 && rangeID <= 622:
      this.setState({icon:this.weathericon.Snow})
      break;
    case rangeID >= 701 && rangeID <= 781:
      this.setState({icon:this.weathericon.Atmosphere})
      break;
    case rangeID === 800:
      this.setState({icon:this.weathericon.Clear})
      break;
    case rangeID >= 801 && rangeID <= 804:
      this.setState({icon:this.weathericon.Clouds})
      break;

   }
  }
   
  getWeather = async () => {
    const api_call =await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Canada&appid=${API_key}`)
    //`https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=imperial&appid=d7a12a132bf363c1c0ae7b8df6f2d42c`
    const response =await api_call.json()
    console.log(response)

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_min:this.calCelsius(response.main.temp_min),
      temp_max:this.calCelsius(response.main.temp_max),
      description:response.weather[0].description,
      
    })
    this.get_Weathericon(this.weathericon,response.weather[0].id)
  }


  render() { 
    return ( 
      <div className="App">
        <h1>Himanshu Gadi</h1>
      <Weather city={this.state.city} 
      country={this.state.country} 
      temp_celsius ={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weathericon={this.state.icon}
      />
    </div>
     );
  }
}
 
export default App;

