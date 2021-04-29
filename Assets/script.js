// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

 

function initMap() {
  const sydney = new google.maps.LatLng(-38.98, 94.67);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });
  service = new google.maps.places.PlacesService(map);
  donutTracker("66220")
}

function donutTracker(searchTerm){
  const request = {
    query: searchTerm ,
    fields: ["business_status", "formatted_address", "geometry", "icon","name", 'photos', 'place_id', 'plus_code', 'types'],
  };
  
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      
      map.setCenter(results[0].geometry.location);
      var nearbyRequest = {
          location: results[0].geometry.location,
          radius: 2000,
          keyword: "donuts"
      }
      service.nearbySearch(nearbyRequest, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK && results){
          console.log(results)
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          //TODO: Use result information to add business information to the page can put the information 
          //wherever we want 
          }
        }
      });
    }
  });
}



function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

initMap();

$('#donut-tracker-search').on('click', function(event){
  event.preventDefault();
  var donutSearch = $("#donutSearchBar").val();
  console.log(donutSearch);
  donutTracker(donutSearch);
})