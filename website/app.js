/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=1b5fe91b6fec40c9d2b88539872d1846&units=metric";

// Event listener to add function to existing HTML DOM element
 document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const fellings = document.getElementById("feelings").value;

  getWeatherData(baseURL, zip, apiKey).then(function (data) {
    console.log(data);
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      content: fellings,
    })
      updateUI();
    
  });
}

// Function to GET Web API Data
const getWeatherData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to POST data
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("date").innerHTML = `Date:  ${newDate}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature:   ${allData[0].temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Content:  ${allData[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
document.getElementById("generate").addEventListener("click", updateUI);
