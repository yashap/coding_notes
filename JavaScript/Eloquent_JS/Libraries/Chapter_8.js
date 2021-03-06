function Point(x, y) {
	this.x = x;
	this.y = y;
}
Point.prototype.add = function(other) {
	return new Point(this.x + other.x, this.y + other.y);
};
Point.prototype.isEqualTo = function(other) {
	return this.x === other.x && this.y === other.y;
};
Point.prototype.toString = function() {
	return "(" + this.x + "," + this.y + ")";
};

function Grid(width, height) {
	this.width = width;
	this.height = height;
	this.cells = new Array(width * height);
}
Grid.prototype.valueAt = function(point) {
	return this.cells[point.x + point.y * this.width];
};
Grid.prototype.setValueAt = function(point, value) {
	this.cells[point.x + point.y * this.width] = value;
};
Grid.prototype.isInside = function(point) {
	return point.x >= 0 && point.y >= 0 &&
		point.x < this.width && point.y < this.height;
};
Grid.prototype.moveValue = function(from, to) {
	this.setValueAt(to, this.valueAt(from));
	this.setValueAt(from, undefined);
};
Grid.prototype.each = function(action) {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var point = new Point(x, y);
			action(point, this.valueAt(point));
		}
	}
};

function Dictionary(startValues) {
	this.values = startValues || {};
}
Dictionary.prototype.store = function (name, value) {
	this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
	return this.values[name];
};
Dictionary.prototype.contains = function(name) {
	return Object.prototype.hasOwnProperty.call(this.values, name) &&
		Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
	forEachIn(this.values, action);
};
Dictionary.prototype.namesArray = function() {
	var names = [];
	this.each(function(name, value) {names.push(name);});
	return names;
};
Dictionary.prototype.valuesArray = function() {
	var values = [];
	this.each(function(name, value) {values.push(value);});
	return values;
};

var creatureTypes = new Dictionary();
creatureTypes.register = function(constructor) {
	this.store(constructor.prototype.character, constructor);
};
function StupidBug() {}
StupidBug.prototype.act = function(surroundings) {
	return {type: "move", direction: "s"};
};
StupidBug.prototype.character = "o";
creatureTypes.register(StupidBug);

function BouncingBug() {
	this.direction = "ne";
}
BouncingBug.prototype.act = function(surroundings) {
	if (surroundings[this.direction] != " ")
		this.direction = (this.direction === "ne" ? "sw" : "ne");
	return {type: "move", direction: this.direction};
};
BouncingBug.prototype.character = "%";
creatureTypes.register(BouncingBug);

function DrunkBug() {}
DrunkBug.prototype.act = function(surroundings) {
	return {type: "move", direction: randomElement(directions.namesArray())};
};
DrunkBug.prototype.character = "~";
creatureTypes.register(DrunkBug);

function Terrarium(plan) {
	var grid = new Grid(plan[0].length, plan.length);
	for (var y = 0; y < plan.length; y++) {
		var line = plan[y];
		for (var x = 0; x < line.length; x++) {
			grid.setValueAt(new Point(x, y),
				elementFromCharacter(line.charAt(x)));
		}
	}
	this.grid = grid;
}
Terrarium.prototype.toString = function() {
	var characters = [];
	var endOfLine = this.grid.width - 1;
	this.grid.each(function(point, value) {
		characters.push(characterFromElement(value));
		if (point.x === endOfLine)
			characters.push("\n");
	});
	return characters.join("");
};
Terrarium.prototype.listActingCreatues = function() {
	var found = [];
	this.grid.each(function(point, value) {
		if (value !== undefined && value.act)
			found.push({object: value, point: point});
	});
	return found;
};
Terrarium.prototype.listSurroundings = function(center) {
	var result = {};
	var grid = this.grid;
	directions.each(function(name, direction) {
		var place = center.add(direction);
		if (grid.isInside(place))
			result[name] = characterFromElement(grid.valueAt(place));
		else
			result[name] = "#";
	});
	return result;
};
Terrarium.prototype.processCreature = function(creature) {
	var surroundings = this.listSurroundings(creature.point);
	var action = creature.object.act(surroundings);
	if (action.type === "move" && directions.contains(action.direction)) {
		var to = creature.point.add(directions.lookup(action.direction));
		if (this.grid.isInside(to) && this.grid.valueAt(to) === undefined)
			this.grid.moveValue(creature.point, to);
	}
	else {
		throw new Error("Unsupported action: " + action.type);
	}
};
Terrarium.prototype.step = function() {
	forEach(this.listActingCreatues(), bind(this.processCreature, this));
	if (this.onStep)
		this.onStep();
};
Terrarium.prototype.start = function() {
	if (!this.running)
		this.running = setInterval(bind(this.step, this), 500);
};
Terrarium.prototype.stop = function() {
	if (this.running) {
		clearInterval(this.running);
		this.running = null;
	}
};

var thePlan =
	["############################",
	"#      #    #      o      ##",
	"#                          #",
	"#          #####           #",
	"##         #   #    ##     #",
	"###           ##     #     #",
	"#           ###      #     #",
	"#   ####                   #",
	"#   ##       o             #",
	"# o  #         o       ### #",
	"#    #                     #",
	"############################"];

var wall = {character: "#"};

var directions = new Dictionary({
	"n":  new Point( 0, -1),
	"ne": new Point( 1, -1),
	"e":  new Point( 1,  0),
	"se": new Point( 1,  1),
	"s":  new Point( 0,  1),
	"sw": new Point(-1,  1),
	"w":  new Point(-1,  0),
	"nw": new Point(-1, -1)
});

function elementFromCharacter(character) {
	if (character === " ")
		return undefined;
	else if (character === "#")
		return wall;
	else if (creatureTypes.contains(character))
		return new (creatureTypes.lookup(character))();
	else
		throw new Error("Unknown character: " + character);
}

function characterFromElement(element) {
	if (element === undefined)
		return " ";
	else
		return element.character;
}

function terrariumPrinter() {
	console.log(terrarium.toString());
}
var terrarium = new Terrarium(thePlan);
terrarium.onStep = terrariumPrinter;

function clone(object) {
	function OneShotConstructor() {}
	OneShotConstructor.prototype = object;
	return new OneShotConstructor();
}
function LifeLikeTerrarium(plan) {
	Terrarium.call(this, plan);
}
LifeLikeTerrarium.prototype = clone(Terrarium.prototype);
LifeLikeTerrarium.prototype.constructor = LifeLikeTerrarium;
