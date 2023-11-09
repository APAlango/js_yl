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

    const errorMessages = validateFormInputs();
    if (errorMessages.length > 0) {
      window.alert(errorMessages.join('\n'))
    }
    else {
      let e = document.getElementById("delivery");
      if (!e) console.log(`Ei leia elementi id-ga '#delivery'!s`)
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
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  function validateFormInputs() {
    const errorMessages = [];
    // eesnimi
    let fname = document.getElementById('fname');
    if (!fname) errorMessages.push("Midagi on veebilehega katki.")
    else if (fname.value == "") errorMessages.push("Palun sisesta oma eesnimi.")
    else if (fname.value.length < 2) errorMessages.push("Eesnimi peab olema vähemalt 2 tähte pikk.")
    else if (hasNumber(fname.value)) errorMessages.push("Eesnimi ei tohi sisaldada numbreid.")
    // perenimi
    let lname = document.getElementById('lname');
    if (!lname) errorMessages.push("Midagi on veebilehega katki.")
    else if (lname.value == "") errorMessages.push("Palun sisesta oma perekonnanimi.")
    else if (lname.value.length < 2) errorMessages.push("Perekonnanimi peab olema vähemalt 2 tähte pikk.")
    else if (hasNumber(lname.value)) errorMessages.push("Perenimi ei tohi sisaldada numbreid.")
    // kingitus - optional
    // kontaktivaba - optional
    // linn
    let linn = document.getElementById("linn");
    if (!linn) errorMessages.push("Midagi on veebilehega katki.");
    else if (!['tln', 'trt', 'nrv', 'prn'].includes(linn.value)) errorMessages.push(`Palun valige linn nimekirjast.`);

    // payment-method
    const payment = document.querySelector('input[name="paymentmethod"]:checked');
    if (!payment || payment.value == '') errorMessages.push("Kõigil on lemmik makseviis! Sa pead ühe valima.")
    else if (!['LHV', 'REVOLUT', 'MASTERCARD'].includes(payment.value)) errorMessages.push(`Valitud makseviis '${payment.value}' pole lubatud. Kuidas sa selle valisid?`);
    return errorMessages;
  }

})();

// map

let mapAPIKey =
  "Amu--4cP4XlBj-lWqCopGmNdG-Bvjvc1VFNO-pMHjJevdMKQXYglqNKlUYyKabjJ";

let map;

function GetMap() {
  "use strict";

  let initialCenterPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let myNewPoint = new Microsoft.Maps.Location(52.561852, 13.472157);

  let newCenterPoint = new Microsoft.Maps.Location((initialCenterPoint.latitude+myNewPoint.latitude)/2, (initialCenterPoint.longitude+myNewPoint.longitude)/2)

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: newCenterPoint,
    zoom: 5,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

  let infobox = new Microsoft.Maps.Infobox(newCenterPoint, {
    title: 'My Infobox',
    description: 'This is the default description.',
    visible: false
  });

  infobox.setMap(map);

  let pushpin = new Microsoft.Maps.Pushpin(initialCenterPoint, {
    title: "Tartu Ülikool",
    subTitle: 'Hea koht',
    //text: 'UT'
  });

  let myPushpin = new Microsoft.Maps.Pushpin(myNewPoint, {
    title: "Teepood Berliinis",
    subTitle: "Kui leiad end Berliinis ning soovid osta teed suurtes kogustes, siis vaata siia!"
  });

  Microsoft.Maps.Events.addHandler(myPushpin, 'click', () => {
    infobox.setOptions({
      location: myPushpin.getLocation(),
      title: myPushpin.getTitle(),
      description: myPushpin.getSubTitle(),
      visible: true
    })
  })

  Microsoft.Maps.Events.addHandler(pushpin, 'click', () => {
    infobox.setOptions({
      location: pushpin.getLocation(),
      title: pushpin.getTitle(),
      description: pushpin.getSubTitle(),
      visible: true
    })
  })

  map.entities.push(pushpin);
  map.entities.push(myPushpin);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
