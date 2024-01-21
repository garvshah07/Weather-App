const api_key = "dzDLNmnMuzFUn9+4l7wEDw==bIBsxaHD7swh0Z3A";

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

// fetch function with api

const getWeather = async () => {
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
      return alert("Please enter city name");
    } else {
      const response = await fetch(url, options);
      const data = await response.json();

      const SearchDetail = document.querySelector(".search-detail-div");
      const content = `
    <div>
       <h1>${inputText.value}</h1>
       <h2>Temprature : ${data.temp}</h2>
    <div>
    `;

      SearchDetail.insertAdjacentHTML("afterbegin", content);
      inputText.value = "";
    }
  } catch (error) {
    console.error(error);
  }
};

// Search button Handler

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather();
});

// getWeather("ahmedabad");
