const btn = document.querySelector("#btn");
const searchInput = document.querySelector("#searchInput");
const content = document.querySelector("#content");
const h3El = document.createElement('h3');
const tempInC = document.createElement('span');
const feelsLike = document.createElement('p');
const humidity = document.createElement('p');
const wind = document.createElement('p');
const errorParagraph = document.createElement('p');

errorParagraph.id = 'error';

btn.addEventListener("click", async () => {
  content.textContent = "";
  const loadingIndicator = document.createElement('p');
  loadingIndicator.textContent = "Loading...";
  content.appendChild(loadingIndicator);
  let searchTerm;

  try {
    searchTerm = searchInput.value.trim();
    const degC1 = document.createTextNode("  \u00B0C");
    const degC2 = document.createTextNode("  \u00B0C");
    const percent = document.createTextNode(" %");
    const kmph = document.createTextNode(" km/hr");

    if (searchTerm === "") {
      console.log("Please enter a search term");
      return;
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=773a7b8ce5a6401e90a50847232211&q=${searchTerm}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    content.removeChild(loadingIndicator);

    // img.src = result.data.images.original.url;

    h3El.textContent = result.location.name;

    tempInC.textContent = result.current.temp_c;

    feelsLike.textContent = `Feels like: ${result.current.feelslike_c}`;

    humidity.textContent = `Humidity: ${result.current.humidity}`;

    wind.textContent = `Wind: ${result.current.wind_kph}`;

    content.appendChild(h3El);

    tempInC.appendChild(degC1);
    content.appendChild(tempInC);

    feelsLike.appendChild(degC2);
    content.appendChild(feelsLike);

    humidity.appendChild(percent);
    content.appendChild(humidity);

    wind.appendChild(kmph);
    content.appendChild(wind);
  } catch (error) {
    content.textContent = "";

    searchTerm = searchInput.value.trim();
    errorParagraph.textContent = `Error: City "${searchTerm}" not found`;
    content.appendChild(errorParagraph);
  }

  searchInput.value = "";
});
