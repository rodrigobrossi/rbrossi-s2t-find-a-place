// init map function
function initMap() {
    //retrieve the google map instance and putt that on the map element. 
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8, //Defines default zoo
    center: {lat: -23.550, lng: -46.633} //Uses the initial lat and lng (São Paulo)
  });
  var geocoder = new google.maps.Geocoder(); //Get geocoder object
  var infowindow = new google.maps.InfoWindow; //Get info Window layer

  //Add the event listener for geocode from adrees (Stree, places, KPI)
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

  document.getElementById('submit2').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });

}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

      var location = value= results[0].geometry.location.toString();
      location = location.replace('(','');
      location = location.replace(')','');
      document.getElementById('latlng').value=location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  //Split the string in order to separate both coordinates
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        document.getElementById('address').value=results[0].formatted_address;
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}