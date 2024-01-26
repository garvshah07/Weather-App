// import { dot } from "node:test/reporters";

// Node Div
const mainDiv = document.querySelector(".main-div");

// Input area and search button
const searchDiv = document.querySelector(".search-div");

const apikey = "a2fc58f7ff00d6e3b9510c8d39486d4d";

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

// Function to get current time
const getCurrentTime = () => {
  const date = new Date();

  const hour = date.getHours().toString() % 12 || 12;
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour} : ${minute} : ${second} ${period}`;
};

const getCurrentDay = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${dayOfWeek}`;
};

// Function to get weather information
const getWeather = async () => {
  try {
    let cityName = inputText.value;

    // If input is empty, set default city to Ahmedabad
    if (cityName === "") {
      cityName = "Ahmedabad";
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`
    );

    const data = await response.json();
    console.log(data);
    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const searchDetail = document.querySelector(".search-detail-div");
    searchDetail.innerHTML = "";

    const time = getCurrentTime();
    const day = getCurrentDay();
    const { icon } = data.weather[0];
    const content = `
      <div class="card">
            <div class="timezone">
              <h4>${time}</h4>
              <h4>${day}</h4>
            </div>
          <div class="name">
          <h3><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-2xl" height="17px" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg>${
            data.name
          }, <span>${data.sys.country}</span></h3>
        </div>
    <div class="temp">
          <h3>Temperature: ${Math.round(data.main.temp) || "0"}°</h3>
          <div class="temp-inner">
              <div>
                 <h6>H: ${data.main.temp_max || 0}</h6>
                 <h6>L: ${data.main.temp_min || 0}</h6>
              </div>
         <div class="img-inner">
                <img class="img"  src="${iconUrl}" alt="Weather Icon" />
                <h6>${data.weather[0].description}</h6>
         </div>
     </div>
        </div>
      </div>
    `;

    searchDetail.insertAdjacentHTML("afterbegin", content);

    // Clear the input field only if a city was entered (not the default)

    // if (inputText.value !== "") {
    //   inputText.value = "";
    // }
  } catch (error) {
    console.error(error);
  }
};

// Initial call to getWeather
getWeather();

// Set interval to update time every second
setInterval(() => {
  const timezoneDiv = document.querySelector(".timezone");
  if (timezoneDiv) {
    timezoneDiv.querySelectorAll("h4").textContent = getCurrentTime();
  }
  if (timezoneDiv) {
    timezoneDiv.querySelectorAll("h4").textContent = getCurrentDay();
  }
}, 1000);

// Search button Handler
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather();
});
