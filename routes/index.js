const router = require("express").Router();
const Coordinates = require("../models/Coord.model");
const User = require("../models/User.model");

/* GET home page */

router.get("/", async (req, res, next) => {
	const allRequests = await Coordinates.find();
	/* console.log("rendering", allRequests); */
	res.render("index", { allRequests });
});

router.get("/request", async (req, res) => {
	res.redirect("/");
});

router.get("/about", (req, res) => {
	res.render("about");
});

router.post("/request", async (req, res) => {
	const { title, description, latitude, longitude } = req.body;

	const thisUsa = await User.findById(req.session.currentUser._id);
	console.log(thisUsa);

	await Coordinates.create({
		title,
		description,
		lat: latitude,
		long: longitude,
		user: thisUsa.username,
		userImg: thisUsa.imageUrl,
	});
	const allCoords = await Coordinates.find();
	/* console.log(allCoords); */
	res.redirect("/");
});

module.exports = router;
