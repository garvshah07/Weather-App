// Node Div

const mainDiv = document.querySelector(".main-div");

// Input area and search button

const searchDiv = document.querySelector(".search-div");

// Create input Element

const inputText = document.createElement("input");
inputText.id = "input-text";
inputText.type = "text";
inputText.placeholder = "Enter city name...";
inputText.value = "";

// Create Search button Element

const searchBtn = document.createElement("button");
searchBtn.innerHTML = "Search";
searchBtn.id = "search-btn";

// Add to search-div
searchDiv.appendChild(inputText);
searchDiv.appendChild(searchBtn);

const city = (inputText.value = "Ahmedabad");

// fetch function with api

const getWeather = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${inputText.value} `;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1b5f18be7emsh5bf624e16015622p1d05a2jsn36a9f8f4bb6a",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    if (inputText.value == "") {
      return;
    } else {
      const response = await fetch(url, options);
      const data = await response.json();

      const searchDetail = document.querySelector(".search-detail-div");
      searchDetail.innerHTML = "";
      const content = `
    <div>
       <h1>${inputText.value}</h1>
       </br>
       <h2>Temprature : ${data.temp}</h2>
    <div>
    </br>
    <div>
      <h2>Wind : ${data.wind_speed} Km/H </h2>
    </div>
    `;

      searchDetail.insertAdjacentHTML("afterbegin", content);

      // inputText.value = "";
    }
  } catch (error) {
    console.error(error);
  }
};

getWeather("india");

// Search button Handler

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather();
});
