function makeRoad(from, to, length) {
	function addRoad(from, to) {
		if (!(from in roads))
			roads[from] = [];			// if we don't already have the city associated with these roads, add that city, so we can add roads to it
		roads[from].push({to: to, distance: length});		// from and to are the 1st and 2nd arguments passed to addRoad, but length is the 3rd argument passed to makeRoad
	}
	addRoad(from, to);
	addRoad(to, from);
}

function makeRoads(start) {
	for (var i = 1; i < arguments.length; i += 2)
		makeRoad(start, arguments[i], arguments[i + 1]);
}

var roads = {};

makeRoads("Point Kiukiu", "Hanaiapa", 19,
	"Mt Feani", 15,
	"Taaoa", 15);
makeRoads("Airport", "Hanaiapa", 6,
	"Mt Feani", 5,
	"Atuona", 4,
	"Mt Ootua", 11);
makeRoads("Mt Temetiu", "Mt Feani", 8,
	"Taaoa", 4);
makeRoads("Atuona", "Taaoa", 3,
	"Hanakee pearl lodge", 1);
makeRoads("Cemetery", "Hanakee pearl lodge", 6,
	"Mt Ootua", 5);
makeRoads("Hanapaoa", "Mt Ootua", 3);
makeRoads("Puamua", "Mt Ootua", 13,
	"Point Teohotepapapa", 14);

function roadsFrom(place) {
	var found = roads[place];
	if (found === undefined)
		throw new Error("No place named '" + place + "' found.");
	else
		return found;
}

function gamblerPath(from, to) {
	function randomInteger(below) {
		return Math.floor(Math.random() * below);		// so randomInteger(3) will return 0, 1 or 2
	}
	function randomDirection(from) {
		var options = roadsFrom(from);		// returns an array of roads from the current location, where each road is an object with "to" and "distance" properties
		return options[randomInteger(options.length)].to;		// returns the value of "to" from a randomly chosen road object
	}
	var path = [];
	while (true) {
		path.push(from);		// append current location to path
		if (from === to)		// if current location is final location, we're done
			break;
		from = randomDirection(from);		// randomly chose new current location from the available roads
	}
	return path;
}