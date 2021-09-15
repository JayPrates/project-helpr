//I have values, João don't feelsbadman
let latitude = 38.71210642635249;
let longitude = -9.124274630421395;

const send = (e) => {
	const title = document.getElementById("requestTitle").value;
	const description = document.getElementById("requestDescription").value;
	axios.post("/request", { latitude, longitude, title, description });
};

let newOrigin;
let newDestination;

const setRoute = (latitude, longitude) => {
	console.log("latitude", latitude);
	console.log("longitude", longitude);
	document.getElementById("to").value = `${latitude}, ${longitude}`;
	//	newDestination = (all)
	document.getElementById("mode").value = "WALKING";
	directionsRenderer.setDirections(response);
};

const successCallback = (position) => {
	latitude = position.coords.latitude;
	console.log("latitude-------->", latitude);
	longitude = position.coords.longitude;
	console.log("longitude-------->", longitude);
	document.getElementById("from").value = `${latitude}, ${longitude}`;
};
const errorCallback = (error) => {
	console.log(error);
};
const watchId = navigator.geolocation.watchPosition(
	successCallback,
	errorCallback,
	{
		enableHighAccuracy: true,
	}
);

function initMap() {
	const directionsRenderer = new google.maps.DirectionsRenderer();
	const directionsService = new google.maps.DirectionsService();
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		disableDefaultUI: true,
		center: { lat: Number(latitude), lng: Number(longitude) },
		styles: [
			{
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#f5f5f5"
				}
			  ]
			},
			{
			  "elementType": "labels.icon",
			  "stylers": [
				{
				  "visibility": "off"
				}
			  ]
			},
			{
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#616161"
				}
			  ]
			},
			{
			  "elementType": "labels.text.stroke",
			  "stylers": [
				{
				  "color": "#f5f5f5"
				}
			  ]
			},
			{
			  "featureType": "administrative.land_parcel",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#bdbdbd"
				}
			  ]
			},
			{
			  "featureType": "landscape",
			  "elementType": "geometry.fill",
			  "stylers": [
				{
				  "color": "#8c8c8c"
				}
			  ]
			},
			{
			  "featureType": "poi",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#eeeeee"
				}
			  ]
			},
			{
			  "featureType": "poi",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#757575"
				}
			  ]
			},
			{
			  "featureType": "poi.park",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#e5e5e5"
				}
			  ]
			},
			{
			  "featureType": "poi.park",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#9e9e9e"
				}
			  ]
			},
			{
			  "featureType": "road",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#ffffff"
				}
			  ]
			},
			{
			  "featureType": "road.arterial",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#757575"
				}
			  ]
			},
			{
			  "featureType": "road.highway",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#dadada"
				}
			  ]
			},
			{
			  "featureType": "road.highway",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#616161"
				}
			  ]
			},
			{
			  "featureType": "road.local",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#9e9e9e"
				}
			  ]
			},
			{
			  "featureType": "transit.line",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#e5e5e5"
				}
			  ]
			},
			{
			  "featureType": "transit.station",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#eeeeee"
				}
			  ]
			},
			{
			  "featureType": "water",
			  "elementType": "geometry",
			  "stylers": [
				{
				  "color": "#c9c9c9"
				}
			  ]
			},
			{
			  "featureType": "water",
			  "elementType": "geometry.fill",
			  "stylers": [
				{
				  "color": "#b1b5e2"
				}
			  ]
			},
			{
			  "featureType": "water",
			  "elementType": "labels.text.fill",
			  "stylers": [
				{
				  "color": "#9e9e9e"
				}
			  ]
			}
		  ]
	});
	const svgMarker = {
		path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
		fillColor: "black",
		fillOpacity: 1,
		strokeWeight: 0,
		rotation: 0,
		scale: 2,
		anchor: new google.maps.Point(15, 30),
	};

	new google.maps.Marker({
		position: map.center,
		icon: svgMarker,
		map: map,
	});

	directionsRenderer.setMap(map);

	var allBtns = document.getElementsByClassName("btn btn-secondary");
	console.log("this is crazy", allBtns);
	console.log("this is the item", allBtns.item(0));
	for (var i = 0; i < allBtns.length; i++) {
		console.log("calculating", allBtns.item(i));
		allBtns.item(i).addEventListener("click", () => {
			calculateAndDisplayRoute(directionsService, directionsRenderer);
		});
	}
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	const selectedMode = document.getElementById("mode").value;

	directionsService
		.route({
			origin: document.getElementById("from").value,
			destination: document.getElementById("to").value,
			travelMode: google.maps.TravelMode[selectedMode],
		})
		.then((response) => {
			directionsRenderer.setDirections(response);
		});
}
