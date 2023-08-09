import React, { useState } from 'react'
import axios from 'axios'
import { WbSunny, Cloud, FlashOn, AcUnit, Waves, WaterDrop} from '@mui/icons-material';

const weatherIcons = {
  Clear: <WbSunny />,
  Clouds: <Cloud />,
  Thunderstorm: <FlashOn />,
  Snow: <AcUnit />,
  Mist: <Waves />,
  Rain: <WaterDrop />
};

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setCurrentDateTime(new Date().toLocaleString());
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Podaj miasto'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
        <div className="data">
            <p>{currentDateTime}</p>
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{(data.main.temp).toFixed()}°C</h1> : null}
            {/* {data.main ? <h1>{((data.main.temp - 32) * 5/9).toFixed()}°C</h1> : null} */}
          </div>
          {/* ogarnij to */}
          <div className="description">
            {/* {data.weather ? <p>{data.weather[0].main}</p> : null} */}
            {data.weather ? (
  <p>
    {weatherIcons[data.weather[0].main]}
    {data.weather[0].main === "Clear" && "Bezchmurnie"}
    {data.weather[0].main === "Clouds" && "Zachmurzenie"}
    {data.weather[0].main === "Rain" && "Deszcz"}
    {data.weather[0].main === "Thunderstorm" && "Burza z piorunami"}
    {data.weather[0].main === "Snow" && "Śnieg"}
    {data.weather[0].main === "Mist" && "Mgła"}

  </p>
) : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{(data.main.feels_like).toFixed()}°C</p> : null}
              {/* {data.main ? <p className='bold'>{((data.main.feels_like - 32) * 5/9).toFixed()}°C</p> : null} */}
              <p>Odczuwalna</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Wilgotność</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{(data.wind.speed*3,6).toFixed()} km/h</p> : null}
              {/* {data.wind ? <p className='bold'>{(data.wind.speed*1.60934).toFixed()} km/h</p> : null} */}
              <p>Prędkość wiatru</p>
            </div>
            {/* <div className="current-datetime">
            <p>{currentDateTime}</p>
          </div> */}
          </div>
        }



      </div>
    </div>
  );
}

export default App;
