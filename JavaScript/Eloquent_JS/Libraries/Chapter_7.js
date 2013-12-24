function makeRoad(from, to, length) {
	function addRoad(from, to) {
		if (!(from in roads))
			roads[from] = [];
		roads[from].push({to: to, distance: length});
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
console.log(roads["Puamua"]);
console.log(roadsFrom("Puamua"));

function gamblerPath(from, to) {
	function randomInteger(below) {
		return Math.floor(Math.random() * below);
	}
	function randomDirection(from) {
		var options = roadsFrom(from);
		return options[randomInteger(options.length)].to;
	}
	var path = [];
	while (true) {
		path.push(from);
		if (from === to)
			break;
		from = randomDirection(from);
	}
	return path;
}

function possibleRoutes(from, to) {
	function findRoutes(route) {
		function notVisited(road) {
			return !member(route.places, road.to);
		}
		function continueRoute(road) {
			return findRoutes({
				"places": route.places.concat([road.to]),
				"length": route.length + road.distance
			});
		}
		var end = route.places[route.places.length - 1];
		if (end === to)
			return [route];
		else
			return flatten(map(continueRoute, filter(notVisited, roadsFrom(end))));
	}
	return findRoutes({"places": [from], "length": 0});
}

function shortestRoute(from, to) {
	var currentShortest = null;
	forEach(possibleRoutes(from, to), function(route) {
		if (!currentShortest || currentShortest["length"] > route.length)
			currentShortest = route;
	});
	return currentShortest;
}

function minimise(func, array) {
	var minScore = null;
	var found = null;
	forEach(array, function(elelment) {
		var score = func(elelment);
		if (minScore === null || score < minScore) {
			minScore = score;
			found = elelment;
		}
	});
	return found;
}

function getProperty(propName) {
	return function(object) {
		return object[propName];
	};
}

function shortestRoute2(from, to) {
	return minimise(getProperty("length"), possibleRoutes(from, to));
}

var myMapBitches = {x0y0: 111, x0y1: 205, x0y2: 228, x0y3: 228, x0y4: 238, x0y5: 245, x0y6: 264, x0y7: 300, x0y8: 343, x0y9: 348, x0y10: 320, x0y11: 297, x0y12: 302, x0y13: 287, x0y14: 260, x0y15: 266, x0y16: 306, x0y17: 367, x0y18: 342, x0y19: 311, x1y0: 111, x1y1: 186, x1y2: 176, x1y3: 207, x1y4: 237, x1y5: 264, x1y6: 287, x1y7: 327, x1y8: 379, x1y9: 348, x1y10: 328, x1y11: 331, x1y12: 347, x1y13: 317, x1y14: 277, x1y15: 255, x1y16: 312, x1y17: 357, x1y18: 362, x1y19: 337, x2y0: 122, x2y1: 160, x2y2: 232, x2y3: 263, x2y4: 275, x2y5: 289, x2y6: 331, x2y7: 360, x2y8: 373, x2y9: 364, x2y10: 334, x2y11: 304, x2y12: 332, x2y13: 310, x2y14: 269, x2y15: 254, x2y16: 328, x2y17: 339, x2y18: 381, x2y19: 358, x3y0: 137, x3y1: 218, x3y2: 258, x3y3: 264, x3y4: 315, x3y5: 340, x3y6: 365, x3y7: 355, x3y8: 337, x3y9: 369, x3y10: 348, x3y11: 283, x3y12: 326, x3y13: 293, x3y14: 243, x3y15: 254, x3y16: 279, x3y17: 330, x3y18: 359, x3y19: 376, x4y0: 226, x4y1: 217, x4y2: 246, x4y3: 284, x4y4: 353, x4y5: 359, x4y6: 382, x4y7: 365, x4y8: 309, x4y9: 337, x4y10: 354, x4y11: 283, x4y12: 314, x4y13: 284, x4y14: 236, x4y15: 265, x4y16: 287, x4y17: 290, x4y18: 353, x4y19: 330, x5y0: 192, x5y1: 233, x5y2: 289, x5y3: 348, x5y4: 355, x5y5: 349, x5y6: 381, x5y7: 402, x5y8: 336, x5y9: 276, x5y10: 316, x5y11: 279, x5y12: 286, x5y13: 235, x5y14: 255, x5y15: 307, x5y16: 320, x5y17: 323, x5y18: 353, x5y19: 341, x6y0: 246, x6y1: 268, x6y2: 306, x6y3: 368, x6y4: 341, x6y5: 336, x6y6: 386, x6y7: 393, x6y8: 378, x6y9: 321, x6y10: 254, x6y11: 250, x6y12: 223, x6y13: 217, x6y14: 343, x6y15: 350, x6y16: 377, x6y17: 363, x6y18: 369, x6y19: 342, x7y0: 275, x7y1: 300, x7y2: 351, x7y3: 358, x7y4: 332, x7y5: 303, x7y6: 360, x7y7: 343, x7y8: 352, x7y9: 390, x7y10: 315, x7y11: 243, x7y12: 205, x7y13: 305, x7y14: 312, x7y15: 311, x7y16: 359, x7y17: 374, x7y18: 391, x7y19: 374, x8y0: 285, x8y1: 316, x8y2: 374, x8y3: 391, x8y4: 350, x8y5: 267, x8y6: 299, x8y7: 307, x8y8: 303, x8y9: 347, x8y10: 303, x8y11: 264, x8y12: 202, x8y13: 286, x8y14: 280, x8y15: 267, x8y16: 289, x8y17: 330, x8y18: 384, x8y19: 411, x9y0: 333, x9y1: 357, x9y2: 388, x9y3: 387, x9y4: 315, x9y5: 259, x9y6: 258, x9y7: 274, x9y8: 290, x9y9: 354, x9y10: 297, x9y11: 251, x9y12: 178, x9y13: 229, x9y14: 220, x9y15: 276, x9y16: 328, x9y17: 331, x9y18: 372, x9y19: 408, x10y0: 328, x10y1: 276, x10y2: 319, x10y3: 320, x10y4: 283, x10y5: 285, x10y6: 254, x10y7: 232, x10y8: 294, x10y9: 309, x10y10: 283, x10y11: 226, x10y12: 160, x10y13: 211, x10y14: 252, x10y15: 292, x10y16: 367, x10y17: 415, x10y18: 408, x10y19: 421, x11y0: 264, x11y1: 240, x11y2: 333, x11y3: 344, x11y4: 310, x11y5: 340, x11y6: 284, x11y7: 226, x11y8: 241, x11y9: 259, x11y10: 238, x11y11: 204, x11y12: 172, x11y13: 234, x11y14: 280, x11y15: 355, x11y16: 355, x11y17: 446, x11y18: 448, x11y19: 382, x12y0: 202, x12y1: 240, x12y2: 299, x12y3: 366, x12y4: 355, x12y5: 315, x12y6: 264, x12y7: 221, x12y8: 176, x12y9: 208, x12y10: 229, x12y11: 155, x12y12: 171, x12y13: 227, x12y14: 298, x12y15: 305, x12y16: 271, x12y17: 385, x12y18: 382, x12y19: 271, x13y0: 175, x13y1: 253, x13y2: 307, x13y3: 382, x13y4: 350, x13y5: 290, x13y6: 276, x13y7: 262, x13y8: 204, x13y9: 147, x13y10: 207, x13y11: 144, x13y12: 132, x13y13: 243, x13y14: 288, x13y15: 250, x13y16: 250, x13y17: 308, x13y18: 358, x13y19: 311, x14y0: 151, x14y1: 215, x14y2: 261, x14y3: 372, x14y4: 336, x14y5: 333, x14y6: 295, x14y7: 289, x14y8: 235, x14y9: 158, x14y10: 156, x14y11: 154, x14y12: 118, x14y13: 188, x14y14: 252, x14y15: 223, x14y16: 198, x14y17: 241, x14y18: 256, x14y19: 246, x15y0: 222, x15y1: 201, x15y2: 286, x15y3: 394, x15y4: 405, x15y5: 372, x15y6: 323, x15y7: 250, x15y8: 205, x15y9: 165, x15y10: 129, x15y11: 147, x15y12: 116, x15y13: 160, x15y14: 210, x15y15: 200, x15y16: 163, x15y17: 190, x15y18: 178, x15y19: 166, x16y0: 250, x16y1: 256, x16y2: 291, x16y3: 360, x16y4: 361, x16y5: 306, x16y6: 281, x16y7: 252, x16y8: 203, x16y9: 169, x16y10: 128, x16y11: 120, x16y12: 114, x16y13: 152, x16y14: 176, x16y15: 197, x16y16: 139, x16y17: 145, x16y18: 143, x16y19: 132, x17y0: 222, x17y1: 312, x17y2: 355, x17y3: 314, x17y4: 273, x17y5: 254, x17y6: 233, x17y7: 228, x17y8: 206, x17y9: 169, x17y10: 161, x17y11: 111, x17y12: 96, x17y13: 129, x17y14: 163, x17y15: 193, x17y16: 155, x17y17: 99, x17y18: 125, x17y19: 116, x18y0: 219, x18y1: 224, x18y2: 277, x18y3: 259, x18y4: 264, x18y5: 220, x18y6: 202, x18y7: 160, x18y8: 169, x18y9: 200, x18y10: 174, x18y11: 129, x18y12: 80, x18y13: 138, x18y14: 133, x18y15: 166, x18y16: 153, x18y17: 88, x18y18: 85, x18y19: 108, x19y0: 146, x19y1: 200, x19y2: 258, x19y3: 207, x19y4: 228, x19y5: 220, x19y6: 160, x19y7: 160, x19y8: 132, x19y9: 147, x19y10: 165, x19y11: 138, x19y12: 75, x19y13: 101, x19y14: 112, x19y15: 158, x19y16: 190, x19y17: 145, x19y18: 109, x19y19: 72};

function heightAt(positionObject) {
	return myMapBitches["x" + positionObject["x"] + "y" + positionObject["y"]];
}

function weightedDistance(pointA, pointB) {
	var heightDifference = heightAt(pointB) - heightAt(pointA);
	var climbFactor = (heightDifference < 0 ? 1 : 2);
	var flatDistance = (pointA.x === pointB.x || pointA.y === pointB.y ? 100 : 141);
	return flatDistance + climbFactor * Math.abs(heightDifference);
}

function possibleDirections(from) {
	var mapSize = 20;
	function insideMap(point) {
		return point.x >= 0 && point.x < mapSize && point.y >= 0 && point.y < mapSize;
	}
	var directions = [point(-1, 0), point(1, 0), point(0, -1), point(0, 1), point(-1, -1), point(-1, 1), point(1, 1), point(1, -1)];
	return filter(insideMap, map(partial(addPoints, from), directions));
}