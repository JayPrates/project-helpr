let latitude;
let longitude;

const successCallback = (position) => {
	latitude = position.coords.latitude.toFixed(2);
	console.log('latitude-------->', latitude);
	longitude =  position.coords.longitude.toFixed(2);
	console.log('longitude-------->', longitude);
}
const errorCallback = (error) => {
	console.log(error);
}
/* navigator.geolocation.getCurrentPosition(successCallback, errorCallback); */
const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
	enableHighAccuracy: true
});

function initMap() {
	const directionsRenderer = new google.maps.DirectionsRenderer();
	const directionsService = new google.maps.DirectionsService();
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: {lat: Number(latitude), lng: Number(longitude)},
	});

	directionsRenderer.setMap(map);
	calculateAndDisplayRoute(directionsService, directionsRenderer);
	document.getElementById("mode").addEventListener("change", () => {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
	});
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
		})
}