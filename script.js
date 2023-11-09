(function () {
  "use strict";

  //clock

  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");

    //setTimeout(updateClock, 2000);
    setInterval(updateClock, 1000);

    function updateClock() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let suffix = "EL";
      if (h > 12) {
        suffix = "PL";
        h -= 12;
      }

      if (h < 10) {
        h = "0" + h;
      }

      if (m < 10) {
        m = "0" + m;
      }

      if (s < 10) {
        s = "0" + s;
      }

      c.innerHTML = h + ":" + m + ":" + s + " " + suffix;
    }
  });

  document.getElementById("form").addEventListener("submit", estimateDelivery);

  function estimateDelivery(event) {
    event.preventDefault();
    
    let e = document.getElementById("delivery");
    if (!e) console.log(`Cannot find element with id '#delivery'`)
    let total = 0;
    e.innerHTML = "0,00 &euro;";
    console.log(`estimateDelivery()`)

    // Checkboxid
    let v1 = document.getElementById('v1');
    if (v1 && v1.checked) total += 5;
    let v2 = document.getElementById('v2');
    if (v2 && v2.checked) total += 1;

    // Linn
    let linn = document.getElementById("linn");

    if (linn.value === "") {
      alert("Palun valige linn nimekirjast");

      linn.focus();
      return;
    } else {
      if (linn.value == 'trt')
        total += 2.5;
      else if (linn.value == 'nrv')
        total += 2.5;
      else if (linn.value == 'prn')
        total += 3;
      else
        console.log("ERROR STATE")
      e.innerHTML = `${total} &euro;`;
    }

    console.log("Tarne hind on arvutatud");
  }
})();

// map

let mapAPIKey =
  "Amu--4cP4XlBj-lWqCopGmNdG-Bvjvc1VFNO-pMHjJevdMKQXYglqNKlUYyKabjJ";

let map;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.38104, 26.71992);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 14,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

  let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
    title: "Tartu Ülikool",
    //subTitle: 'Hea koht',
    //text: 'UT'
  });

  map.entities.push(pushpin);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
