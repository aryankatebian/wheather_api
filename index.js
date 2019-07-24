window.addEventListener("load", () => {
  let long;
  let lati;

  let ICON = document.querySelector(".icon1");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let location = document.querySelector(".location-timezone");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let long = position.coords.longitude;
      let lati = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/73084a483848987fa41526ff897b8dce/${lati},${long}`;
      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          location.textContent = data.timezone;
          setIcons(icon, ICON);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.add(iconId, Skycons[currentIcon]);
    skycons.play();
  }
});
