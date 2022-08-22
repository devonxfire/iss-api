// Creating a map object
const map = L.map("map").setView([0, 0], 4);

// Creating the map tiles
L.tileLayer(
  "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=R6tfLIXNoCdxWtf1oGWD",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

const myIcon = L.icon({
  iconUrl: "./images/satellite.png",
  iconSize: [225, 150],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: "my-icon-shadow.png",
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94],
});

const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  const { latitude, longitude, velocity, altitude } = data;

  document.querySelector("#lat").textContent = latitude;
  document.querySelector("#lon").textContent = longitude;
  document.querySelector("#speed").textContent = velocity.toFixed(2);
  document.querySelector("#altitude").textContent = altitude.toFixed(2);
  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude]);
}
getISS();
setInterval(getISS, 1000);
