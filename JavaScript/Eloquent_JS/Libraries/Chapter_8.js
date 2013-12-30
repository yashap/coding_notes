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

function StupidBug() {}
StupidBug.prototype.act = function(surroundings) {
   return {type: "move", direction: "s"};
};

var wall = {};

function Terrarium(plan) {
   var grid = new Grid(plan[0].length, plan.length);
   for (var y = 0; y < plan.length; y++) {
      var line = plan[y];
      for (var x = 0; x < line.length; x++) {
         grid.setValueAt(new Point(x, y),
            elementFromCharacter(line.charAt(x)));
      }
   }
}

function elementFromCharacter(character) {
   if (character === " ")
      return undefined;
   else if (character === "#")
      return wall;
   else if (character === "o")
      return new StupidBug();
}

wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement(element) {
   if (element === undefined)
      return " ";
   else
      return element.character;
}
