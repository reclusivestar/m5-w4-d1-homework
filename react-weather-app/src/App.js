import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import countries from "i18n-iso-countries";
import './App.css';

// Register locale for i18n-iso-countries
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State variables
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  // API key and URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Fetch weather data
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  // Handlers
  const inputHandler = (event) => setGetState(event.target.value);
  const submitHandler = () => setState(getState);
  const kelvinToFahrenheit = (k) => ((k - 273.15) * 1.8 + 32).toFixed(0);

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>

      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">Enter Location:</label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary mt-2"
              onClick={submitHandler}
            >
              Search
            </button>
          </div>
        </div>

        <div className="card mt-3 mx-auto">
          {/* Conditional rendering for weather data */}
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />
              <p className="h5">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="fas fa-1x mr-2 text-dark"
                />
                <strong>{apiData.name}</strong>
              </p>
              <p className="h5">
                {countries.getName(apiData.sys.country, 'en', { select: 'official' })}
              </p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureLow}
                      className="fas fa-1x mr-2 text-primary"
                    />
                    <strong>{kelvinToFahrenheit(apiData.main.temp_min)}&deg; F</strong>
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureHigh}
                      className="fas fa-1x mr-2 text-danger"
                    />
                    <strong>{kelvinToFahrenheit(apiData.main.temp_max)}&deg; F</strong>
                  </p>
                </div>
              </div>
              <p className="h2">
                {kelvinToFahrenheit(apiData.main.temp)}&deg; F
              </p>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>

      <footer className="footer">
        &copy; React Weather App
      </footer>
    </div>
  );
}

export default App;
