const router = require("express").Router();
const Coordinates = require("../models/Coord.model");
const User = require("../models/User.model");

// let vOneLs = localStorage.getItem("vOneLocalStorage");
// let vTwoLs = localStorage.getItem("vTwoLocalStorage");
// import { latitude } from "../public/js/main.js";
// import { longitude } from "../public/js/main.js";

// const coordinates = require("../public/js/main");
// require("../public/js/main.js");

/* GET home page */

router.get("/", async (req, res, next) => {
	const allRequests = await Coordinates.find();
	const allUsers = await User.find();
	console.log("rendering", allRequests);
	res.render("index", { allRequests, allUsers});
});

router.get("/request", async (req, res) => {
	res.redirect("/");
});

router.post("/request", async (req, res) => {
	const { title, description, latitude, longitude, user } = req.body;
	console.log("latitude", latitude);
	console.log("long", longitude);
	console.log("title", title);
	console.log("description", description);

	await Coordinates.create({
		title,
		description,
		lat: latitude,
		long: longitude,
		user: req.session.currentUser,
	});
	const allCoords = await Coordinates.find();
	console.log(allCoords);
	res.redirect("/");
});

router.post("/request", async (req, res) => {
	const allRequests = Coordinates.find();
	console.log("rendering", allRequests);
	res.render("/", allRequests);
});

module.exports = router;
