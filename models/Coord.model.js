const mongoose = require("mongoose");

const coordSchema = mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	lat: {
		type: Number,
	},
	long: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Coord = mongoose.model("Coord", coordSchema);

module.exports = Coord;
