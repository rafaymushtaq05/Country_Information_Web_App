let card = null;
let container = null;

function handleSubmission() {
  const capitalInput = document.querySelector("#getInfo");
  const capital = capitalInput.value;

  if (card) {
    card.remove();
  }

  const loadingIndicator = document.querySelector("#loadingIndicator");
  loadingIndicator.style.display = "block";
  fetchCountry(capital);
}

async function fetchCountry(capital) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/capital/${capital}`
    );
    const [data] = await response.json();
    displayInfo(data);
  } catch (e) {
    alert("An Error Occured!");
  } finally {
    const loadingIndicator = document.querySelector("#loadingIndicator");
    loadingIndicator.style.display = "none";
  }
}

function displayInfo(data) {
  const region = data.region;
  const imageUrl = data.flags["png"];
  const countryName = data.name["common"];
  // console.log(countryName);
  const coatOfArms = data.coatOfArms["svg"];
  const borders = data.borders;
  console.log(borders);
  const lat = data.latlng[0];

  const lng = data.latlng[1];
 
  container = document.createElement("div");
  container.className = "cardContainer";

  card = document.createElement("div");
  card.className = "card";

  const country_img = document.createElement("img");
  country_img.src = imageUrl;
  card.appendChild(country_img);

  const country_name = document.createElement("h2");
  country_name.textContent = countryName;
  card.appendChild(country_name);

  const country_region = document.createElement("p");
  country_region.textContent = `Region: ${region}`;
  card.appendChild(country_region);

  const coat = document.createElement("img");
  coat.src = coatOfArms;
  coat.setAttribute("width", "100");
  coat.setAttribute("height", "100");

  const circle = document.createElement("circle");
  circle.setAttribute("cx", "50");
  circle.setAttribute("cy", "50");
  circle.setAttribute("r", "40");

  coat.appendChild(circle);
  card.appendChild(coat);

  const border = document.createElement("p");
  border.textContent = borders
    ? `Borders: ${data.borders}`
    : "Borders: No Borders Found";
  card.appendChild(border);

  const latLng = document.createElement("p");
  latLng.textContent = `Coordinates: Latitude: ${lat}, Longitude: ${lng}`;
  card.appendChild(latLng);

  const button = document.createElement("button");
  button.textContent = "Sees First Border";
  card.appendChild(button);

  button.addEventListener("click", async function () {
    if (borders) {
      card.remove();
      const existingMapTile = document.querySelector("#mapTile");
      if (existingMapTile) {
        existingMapTile.remove();
      }
      console.log("Border Country Info");
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${borders[0]}`
      );
      const [data] = await response.json();
      displayInfo(data);
      console.log(data);
    } else {
      console.log(`No borders found for this Country`);
      alert("No borders found for this Country");
    }
  });

  const button2 = document.createElement("button");
  button2.textContent = "Load Map";
  card.appendChild(button2);

  button2.addEventListener("click",  function () {
    alert("This Feature is not Found");
  });

  container.appendChild(card);

  document.body.appendChild(container);
}
