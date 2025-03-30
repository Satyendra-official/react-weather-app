import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  let city = "London";
  const apiKey = "795e86f73dc56034d7057399a681ab25";

  const handleInput = (e) => {
    city = e.target.value;
    console.log(city);
  };

  const handleSearch = async () => {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    let data = await res.json();
    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);
  
  return (
    <>
      <div className="bg-zinc-400 h-[100vh] w-full flex justify-center items-center">
        <div className="bg-gray-500 w-md h-[50%] rounded-2xl p-5 flex-row ">
          <div className="w-full ">
            <input
              onChange={handleInput}
              type="text"
              placeholder="Enter the city name..."
              className="bg-gray-300 rounded-full py-2 px-4 mx-12 my-5 hover:focus"
            />
            <button
              onClick={handleSearch}
              className="bg-sky-500 rounded-full px-5 py-2 text-white my-5 hover:bg-sky-600"
            >
              Search
            </button>

            <h1 className="text-center font-bold text-5xl">
              {weatherData.temperature}°C{ <img className="inline" src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} /> }
            </h1>
            <div className="font-semibold mt-1 ml-5">
              <h2>Location: {weatherData.location}</h2>
              <h2>Wind Speed: {weatherData.windSpeed} mph</h2>
              <h2>Humidity: {weatherData.humidity} %</h2>
              <h2>Pressure: {weatherData.pressure} Pa</h2>
              <h2>
                 {currTime}, {currDate}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
