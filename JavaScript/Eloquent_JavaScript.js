// #####################################
// Eloquent JavaScript
// #####################################


// #####################################
// Chapter 1
// #####################################

// You should generally use === and !== (no type conversion) over == and != (type conversion)

// Basic while loop (prints a triangle in # form)
var line = "";
var counter = 0;
while (counter < 10) {
	line = line + "#";
	console.log(line);
	counter++;
}

// Basic for loop (prints the same triangle)
var line = "";
for (var n = 0; n < 10; n++) {
	line += "#";
	console.log(line);
}

// Standard way to name functions:
// capitalizeFirstLettersExceptFirstWord

// JavaScript keywords (reserved, can't be variable names):
// abstract boolean break byte case catch char class const continue
// debugger default delete do double else enum export extends false
// final finally float for function goto if implements import in
// instanceof int interface long native new null package private
// protected public return short static super switch synchronized
// this throw throws transient true try typeof var void volatile
// while with

// Note that if your code block is just one line, you don't need {}
for (var n = 0; n < 20; n++) {
	if (n % 3 === 0 && n % 4 === 0)
		console.log(n);
}

// Basic if/else if/else statement
for (var n = 0; n < 20; n++) {
	if (n > 15)
		console.log(n + "**");
	else if (n > 10)
		console.log(n + "*");
	else
		console.log(n);
}

// Using break to end a loop, without a condition in the () part of the loop
for (var current = 20; ; current++) {
	if (current % 7 === 0)
		break;
}
console.log(current);
// So this will return 21

// Could also have written the above as
for (var current = 20; current % 7 !== 0; current++);
console.log(current);
// Will also return 21.  Note that the body of the loop is empty, which is OK, it still increments to a value then stops

// Asks the user what the value of 2+2 is, and gives a response to the user’s answer
var answer = prompt("Hey there, what's the value of 2+2?", "");
// Note that the "" part simply defines the default text
if (answer == "4")
	alert("Damn straight it is!");
else if (answer == "3" || answer == "5")
	alert("That's close, I guess");
else
	alert("Holy fuck you’re dumb");

// As above, but keep prompting until they get it right
var answer;
while(true) {
	answer = prompt("Hey you, what's 2+2?","");
	if (answer == "4") {
	alert("Damn straight it is!");
		break;
	} else if (answer == "3" || answer == "5") {
		alert("Keep guessing you dumbass!");
	} else {
		alert("Good god you're dumb!");
	}
}
// Note that while(true) will just keep on looping until you hit a break

// Undefined vs. null
// undefined is the value of an "empty place."  For example, if you define an empty variable (like var myVar;), it will be undefined.  Same with functions that just return side effects, like alert("Some stuff!");
// null means the variable is defined, but doesn’t have a value, i.e.:
// var myString = null;
// Often there is no practical difference, and if you use == instead of ===, null == undefined

// Auto type conversion:
// Adding something to a string makes a string
// Multiplying a number with something will try to make a number
console.log("Apollo" + 5);			// "Apollo5"
console.log(null + "ify");			// "nullify"
console.log("5" * 5);						// 25
console.log("strawberry" * 5);	// NaN

// Notes on NaN
// NaN is false when converted to boolean
// If you want to check if something is NaN, use the isNaN function
// NaN == NaN returns false!

// Also note that it’s generally best to avoid auto type conversions
// If you want to convert a string to a number, better to do:
console.log(Number("5")*5);
//than
console.log(5*5);

// Other uses of && and ||
// || works like this: it checks if the value to its left would produce true if converted to boolean.  If that’s the case it returns this value.  If not (i.e. if the value on the left is false, null, "", NaN, 0, etc.), then it returns the value on the right.
// && works like this: if the value on the left produces false when converted to boolean, and if it does it returns that value.  Otherwise it returns the value on the right.

// Example:
var input = prompt("What is your name?", "Kilgore Trout");
console.log("Well hello " + (input || "dear"));
// If you give an input, it will return that input, else input will be false when converted to boolean, so it will instead return "dear"

// Other examples:
false || alert("I'm happening!");
// The above produces an alert
true || alert("Not me.");
// The above does not produce an alert



// #####################################
// Chapter 3
// #####################################

// Pure function = always return the same value when given the same argument, and have no side effects.

// When control hits "return", it immediately jumps out of the function and returns that value.

// Example function that raises a base to a power
function power(base, exponent) {
	var result = 1;
	for (var count = 0; count < exponent; count++)
		result *= base;
	return result;
}
console.log(power(2,10));

// Note that variables created within functions (like "result") exist only within the function.

// Another pure function, finds absolute value of a number
function absolute(x) {
	if (x >=0)
		return x;
	else
		return -x;
}

// If you can write something as a pure function, do so, but if you have to use functions with side effects, that’s fine too.

// Functions with side effects don’t have to contain a return statement, for example:
function yell(message) {
	alert(message + "!!");
}
// Note that these functions will automatically return undefined.


// Variables inside functions 

var variable = "top-level";

function printVariable() {
	console.log("inside printVariable, the variable holds '" + variable + "'.");
}

function test() {
	var variable = "local";
	console.log("inside test, the variable holds '" + variable + "'.");
	printVariable();
}

test();

// From the above code, when test() is called, it returns:
// inside test, the variable holds 'local'.
// inside printVariable, the variable holds 'top-level'.
// Because when test() is called, it first looks to see if variable is defined within test, which it is, so variable = "local".  But when printVariable() is called, it doesn’t "see" the variables inside test(), so for printVariable() variable = "top-level"

// KEY POINT: when a function is CALLED inside another function, it’s local environment is based on the top level environment, not the function it’s called in.

// BUT if the function is DEFINED inside another function (instead of just CALLED in another function), it’s local environment is based on the environment of the function it’s defined inside! 
var variable = "top-level";
function parentFunction() {
	var variable = "local";
	function childFunction() {
		console.log(variable);
	}
	childFunction();
}
parentFunction();
// Calling parentFunction() returns "local", not "top-level" 

// All variables defined "above" a function’s definition (within the program) are visible.  This includes both those at the top-level of the program, and those in function bodies that enclose it.  This approach to variable visibility is called "lexical scoping."  Note that only functions create new scope (special places where variables are defined outside of the top-level environment?), simply surrounding code in curly brackets does not.

// Closure:
// A closure is a function AND it’s referencing environment.  Closures (unlike plain function pointers) allow a function to access those non-local variables even when invoked outside its immediate lexical scope.  For example:
var variable = "top-level";
function parentFunction() {
	var variable = "local";
	function childFunction() {
		console.log(variable);
	}
	return childFunction;
}

var child = parentFunction();
child();
// The above call of child will return "local".  Basically, child calls parentFunction(), and parentFunction() returns the result of calling childFunction, which prints variable, with the local definition of variable = "local".
// None of this seems weird/novel to me, but apparently it is.

// Basically, think of functions as not just a way to package up a computation; think of them as an environment.  Top level functions exist in the top level environment, but functions defined inside functions retain access to the environment that existed at the point it was defined.  For example, if you want to create a bunch of functions that will each add a different amount to a number:
function makeMultiplicationFunction(amount) {
	function multiply(number) {
		return number * amount;
	}
	return multiply;
}
var multiplyFifty = makeMultiplicationFunction(50);
var multiplyThree = makeMultiplicationFunction(3);
console.log(multiplyFifty(50) + multiplyThree(3));

// How to think of this:
// The multiply function is created when makeMultiplyFunction is called.  It captures an environment in which amount has a specific value, then packages this environment, together with the computation return number + amount, into a value, which is then returned by makeMultiplyFunction.
// When the two returned functions are called (multiplyFifty and multiplyThree), a new environment, in which the variable number has a value (either 50 or 3), is created, as a sub-environment of the captured environment (in which amount has a value).
// A key thing to note: when I define multiplyFifty, note that it is not returning a value, it is itself returning a function (the multiply function, with amount = 50, and number yet to be set).  makeMultiplicationFunction(50) doesn’t return a value, it returns a function!  Then calling multiplyFifty with an argument returns a number, but it saves the bit about amount being 50.

// These same scoping rules allow functions to call themselves!  Functions that call themselves are called recursive functions.  Example:
function power(base, exponent) {
	if (exponent === 0)
		return 1;
	else
		return base * power(base, exponent - 1);
}
console.log(power(10,3));


// What happens here?  Exponent != 1, so we go to else.  So we return 10 * power(10,2).  But what is power(10,2)?  It’s 10 * power(10,1), so overall we now have 10 * 10 * power(10,1).  Repeat twice more, and you get 10 * 10 * 10 * 1, at which point we’re no longer returning a function, we’ve just returned numbers and we’re done.

// HOWEVER, in JavaScript loops are much cheaper than recursion, which is slow.

// #################
// The stack:
// #################
// When a function is called, control is given to the body of the function.  When that body returns, control shifts back to the code that called the function.  While the body is running, the computer must remember the context from which the function was called, so that it knows where to continue after.  The place where this context is stored is called the stack.  It’s called the stack because functions can call functions, and if this happens over and over you get a "stack" of contexts.  When a function returns, you remove that level of the stack.  The stack takes up space in memory, and if you have a program that lets it grow too big, you’ll get an error like "out of stack space" or "too much recursion."

// Note that functions can be recursive even if they don’t call themselves.  An example would be this broken program (which will return an "out of stack space" error):

function chicken() {
	return egg();
}
function egg() {
	return chicken();
}
console.log(chicken() + " came first.");

// Recursion CAN be a much better way to solve problems than loops, depending on the problem.  Problems that are easier to solve with recursion often require exploring or processing several possible "branches," each of which might branch out into more branches.

// Example of using recursion to solve a branching problem:
// Start with the number 1, and try to find how you can get to number X by any sequence of adding 5 or multiplying by 3.  Return this sequence, or if you can’t get there, return null.

// Recursive solution:
function findSequence(goal) {
	function find(start, history) {
		if (start == goal)
			return history;
		else if (start > goal)
			return null;
		else
			return find(start + 5, "(" + history + " + 5)") ||
				find(start * 3, "(" + history + " * 3)");
	}
	return find(1, "1");
}
console.log(findSequence(24));
// Returns the following string: (((1 * 3) + 5) *3)

// How would findSequence(3) work?

// Step 1: BIG ASSUMPTION - I assume find() can’t be called since we don’t have "start" and "history", so control moves on?  If so, we move on to:
// return find(1, "1");

// But what is find(1, "1")?

// if section:	1 != 3, move on
// else if:		1 !> 3, move on
// else:		Start with the first branch, if that fails try the second.
//   First branch calls find(6, "(1 + 5)")

// This branch will ultimately return null, which means "try the other branch"

// This branch works right away!
// It calls find(3, "(1 * 3)")

// Start == goal, so we return history, therefore find(1, "1") returns "(1 * 3)"

// BIG ASSUMPTIONS here are that control just moves on if we try to call a function without defining the parameters, and that returning null means the branch fails.

// Could have also written this function as:
function findSequence(goal) {
	function find(start, history) {
		if (start == goal)
			return history;
		else if (start > goal)
			return null;
		else {
			var found = find(start + 5, "(" + history + " + 5)");
			if (found === null)
				found = find(start * 3, "(" + history + " * 3)");
			return found;
		}
	}
	return find(1, "1");
}

// The red part is just a more wordy way of saying the same thing.

// Program execution order:
// Computer looks up and stores all functions BEFORE it starts running the rest of the program.  Same thing happens with functions defined inside other functions - when the outer function is called, the first thing that happens is that all the inner functions are added to the new environment.

// Another way to define functions:
var add = function(a, b) {
	return a+b;
};
console.log(add(5, 5));

// Note the semi-colon after the definition of add!  That’s because the statement has the same structure as something like var add = 22;

// You generally make "anonymous" functions like this when you need to refer to them only once, and make named functions otherwise.

// Another example of anonymous functions:
function greaterThan(x) {
	return function(y) {
		return y > x;
	};
}
var greaterThanFour = greaterThan(4);
console.log(greaterThanFour(6));


// What happens here?  If we were to simply:
console.log(greaterThan(4));
// It would return:
function(y) {
	return y > x;
}

// But we’ve set x to 4.  However, by assigning it to a variable (greaterThanFour), this variable becomes what’s returned by greaterThan(4), including the environment (with x = 4).  So it becomes a function to test if the single input is greater than 4, and since we’re returning y > x, that will be a boolean, either true or false.

// Note that you can pass a function the wrong number of arguments in JS, and it doesn’t complain.  This is both good and bad.



// #####################################
// Chapter 4
// Data structures: Objects and Arrays
// #####################################

// Properties of objects:
// There are two ways to access properties of objects:

var text = "purple haze";
console.log(text["length"]);
console.log(text.length);

// Both work, the second is shorthand for the first, and only works when the property would be a valid variable name (no spaces, no symbols, doesn’t start with a digit character).

// null and undefined do not have any properties.

// Properties are simply values associated with other values.  The properties of a string value cannot be changed, but the properties of objects can.  With objects you’re free to modify, remove and add properties.

// An object can be written and manipulated like this:

var cat = {colour: "grey", name: "Spot", size: 46};
cat.size = 47;
console.log(cat.size);	// 47
delete cat.size;
console.log(cat.size);	// undefined
console.log(cat);		// {colour: "grey", name: "Spot"};
cat.eyeColour = "green";
console.log(cat);		// {colour: "grey", name: "Spot", eyeColour: "green"};
cat["eye colour"] = "blue";
console.log(cat);		// {colour: "grey", name: "Spot", eyeColour: "green", "eye colour": "blue"};

// You can also use variables to name properties:

var propertyName = "length";
var text = "mainline";
console.log(text[propertyName]);

// This is the same as saying "mainline".length
// Remember that variable[method] is a "safer" version of variable.method

// You can use the "in" operator to test whether an object has a given property, and it returns a boolen (true/false).  For example:
var chineseBox = {};
chineseBox.content = chineseBox;
console.log("content" in chineseBox);		// true
console.log("content" in chineseBox.content);		// true

// How we can use objects to store and alter a set of cat names:
var cats = {"Igor": true};
cats["White Fang"] = true;
cats["Sam"] = true;
cats["Penelope"] = true;
delete cats["Igor"];
console.log(cats);			// {White Fang: true, Sam: true, Penelope: true}
console.log("Igor" in cats);		// false

// Note that objects behave pretty differently from values, or even "normal" variables:

var object1 = {value: 10};
var object2 = object1;	// This actually LINKS the two variables to the same object
var object3 = {value: 10};	// Same VALUE as object 1/2, but a different OBJECT
console.log(object1 == object2);	// true, they refer to the same object!
console.log(object1 == object3);	// false, same value but they refer to different objects
object1.value = 15;	// This changes the value of the object itself, not just the variable object1
// Both variables (object1 and object2) change, because both refer to the same object
console.log(object2.value);	// 15
console.log(object2.value);	// 15
console.log(object3.value);	// 10

// Key takeaway: THE VARIABLE REFERING TO THE OBJECT IS NOT THE OBJECT ITSELF!
// Multiple variables can refer to the same object.

// Back to the cat lady problem!
// What would be the best way to store her emails?  An object like this is a good choice:

var mailArchive = {0: "Contents of email 1",
	1: "email 2 stuff",
	2: "email 3 stuff"};

// Then we can easily do stuff like this:

for (var current = 0; current in mailArchive; current++)
	console.log("Processing email #", current, ": ", mailArchive[current]);

// Which will print:
// Processing email #0: Contents of email 1
// Processing email #1: email 2 stuff
// Processing email #2: email 3 stuff

// *** side note: JavaScript has a for/in loop, that automatically loops through the properties of an object.  If we had just said:
for (var x in mailArchive)
	console.log(x);
// This would print out all the values in the key/value pairs ***


// Creating objects where the keys are 0, 1, 2, etc. is so common that we have a special data type for it, arrays!
// Arrays are basically like objects where the keys are 0, 1, 2, etc., but you don’t have to actually list the 0, 1, 2, etc. part.

// Array version of the above:

var mailArchive = ["Contents of email 1", "email 2 stuff", "email 3 stuff"];

for (var current = 0; current < mailArchive.length; current++)
	console.log("Processing email #", current, ": ", mailArchive[current]);


// Example 2.4:
// Write a function range that takes one argument, a positive number, and returns an array containing all numbers from 0 up to and including the given number.
function range(x) {
  var myArray = [];
  for (var i = 0; i <= x; i++)
    myArray[i] = i;
  return myArray;
}
console.log(range(5));
console.log(range(5).length);

// Returns:
// 0,1,2,3,4,5
// 6

// Properties of strings and array objects:
// length is the most common, but there are a number of others, for example toUpperCase():
var doh = "Doh";
console.log(typeof doh.toUpperCase);		// function.  Note that we haven't called the function, no ()
console.log(typeof doh.toUpperCase());	// string.  Here we have called the function, and returned a string
console.log(doh.toUpperCase);						// [Function: toUpperCase]
console.log(doh.toUpperCase());					// DOH

// There’s also toLowerCase()

// Properties that contain functions are generally called methods.
// i.e. toUpperCase is a method of a string object

// push adds values to an array (it’s the same as append in other languages)
// pop removes and returns the last value of an array
// join builds a single string from an array of strings

var mack = [];
mack.push("Mack");
mack.push("the");
mack.push("Knife");
console.log(mack);			// ["Mack", "the", "Knife"]
console.log(mack.join(" "));	// "Mack the Knife"
console.log(mack.pop());		// "Knife"
console.log(mack);			// ["Mack", "the"]

// split is ALMOST the opposite of join.  It splits a string into an array of strings.
// Here’s why they’re ALMOST, but not exactly opposite:
console.log("string of characters".split(" ").join(" "));	// always produces the original value
console.log(["extra space", "fucks", "you", "up"].join(" ").split(" "));	//does not

// Basically, split then join on a string always produces the same string
// Join then split on an array doesn't always produce the same array

// The charAt method will return the character at a given position:
var paragraph = "born 15-11-2003 (mother Spot): White Fang";
console.log(paragraph.charAt(2));		// "r"

// The slice method is similar:
var paragraph = "born 15-11-2003 (mother Spot): White Fang";
console.log(paragraph.slice(0, 4));		// "born"


// Write a function called startsWith that takes two arguments, both strings. It returns true when the first argument starts with the characters in the second argument, and false otherwise.
function startsWith(a,b) {
	return a.slice(0, b.length) == b;
}
console.log(startsWith("hello", "hell"));		// true

// Notes:
// charAt will return "" when there is no character at the given position
// slice will simply leave out parts of strings that don’t exist
console.log("Pip".charAt(250));		// ""
console.log("Nop".slice(1, 10));		// "op"


// Can you write a function catNames that takes a paragraph as an argument and returns an array of names?
// Remember that the names are always listed after ":", and are sepparated by ", "
function catNames(paragraph) {
	var names = paragraph.slice(paragraph.indexOf(":") + 2);	// I guess slice automatically goes to end if you only specify a starting point?
	return names.split(", ");	// Split string into an array by ", "
}
var myString = "born 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois";
console.log(catNames(myString));
// ["Red Lion", "Doctor Hobbles the 3rd", "Little Iroquois"]



// ############################
// Putting everything together, the "bad" way
// ############################
// Ideally we'd have a function like this to retreive mail:
// var mailArchive = retrieveMails();
// But for now we have:
var mail1 = "Dear nephew,\nContents of mail1\nMuch love, Aunt Emily\ndied 27/04/2006: Spot\nborn 05/04/2006 (mother Spot): Red Lion, Doctor Hobbles the 3rd, Little Iroquois";
var mail2 = "Dear nephew,\nContents of mail2\nMuch love, Aunt Emily\ndied 27/05/2007: Doctor Hobbles the 3rd\nborn 05/05/2007 (mother Red Lion): Whiskers, Whiskers the 2nd";
var mail3 = "Dear nephew,\nContents of mail3\nMuch love, Aunt Emily\ndied 27/06/2008: Little Iroquois\nborn 05/06/2008 (mother Red Lion): Whiskers the 3rd, Whiskers the 4th";
var mail4 = "Dear nephew,\nContents of mail4\nMuch love, Aunt Emily\ndied 27/07/2009: Whiskers, Whiskers the 2nd\nborn 05/07/2009 (mother Red Lion): Whiskers the 5th, Whiskers the 6th";
var mail5 = "Dear nephew,\nContents of mail5\nMuch love, Aunt Emily\ndied 27/08/2010: Whiskers the 5th\nborn 05/08/2010 (mother Red Lion): Whiskers the 7th, Whiskers the 8th";
var mailArchive = [mail1, mail2, mail3, mail4, mail5];
// Before the mail there was only Spot
var livingCats = {"Spot": true};
// Functions we need:
function startsWith(a,b) {
	return a.slice(0, b.length) == b;																				// Returns true if a starts with b
}
function catNames(paragraph) {
	var names = paragraph.slice(paragraph.indexOf(":") + 2);								// Takes in a paragraph, slices from two chars after ":" to the end
	return names.split(", ");																								// Splits paragraph by ", ", returning an array
}

// Now the heavy lifting
for (var mail = 0; mail < mailArchive.length; mail++) {										// We're looping though the mails
	var paragraphs = mailArchive[mail].split("\n");													// Splits mail into an array of paragraphs
	for (var paragraph = 0; paragraph < paragraphs.length; paragraph++) {		// Loop through each paragraph in the paragraphs array
		if(startsWith(paragraphs[paragraph], "born")) {												// if paragraph stars with "born"
			var names = catNames(paragraphs[paragraph]);												// Pull out array of cat names
			for (var this_name = 0; this_name < names.length; this_name++)						// Loop through array of cat names
				livingCats[names[this_name]] = true;															// Add each name to the livingCats dictionary
		}
		if(startsWith(paragraphs[paragraph], "died")) {												// As above, but for cats that died
			var names = catNames(paragraphs[paragraph]);
			for (var this_name = 0; this_name < names.length; this_name++)
				delete livingCats[names[this_name]];															// Only difference - delete instead of add
		}
	}
}

// Print all living Cats
for (var cat in livingCats)
	console.log(cat);

// Is a specific cat alive?
function isAlive(cat) {
	if (cat in livingCats)
		console.log(cat+" lives!");
	else
		console.log("Good old "+cat+", may he/she rest in peace.");
}
isAlive("Spot");
isAlive("Red Lion");



// ############################
// Putting everything together, the "good" way
// BUT this is a limited version, only listing alive cats, not extra data
// ############################
function startsWith(a,b) {
	return a.slice(0, b.length) == b;
}
function addToSet(set, values) {
	for (var i = 0; i < values.length; i++)
		set[values[i]] = true;
}
function removeFromSet(set, values) {
	for (var i = 0; i < values.length; i++)
		delete set[values[i]];
}

function findLivingCats() {
	// Ideally this:
	// var mailArchive = retreiveMails();
	// Instead this:
	var mailArchive = ["Dear nephew,\nContents of mail1\nMuch love, Aunt Emily\ndied 27/04/2006: Spot\nborn 05/04/2006 (mother Spot): Red Lion, Doctor Hobbles the 3rd, Little Iroquois", "Dear nephew,\nContents of mail2\nMuch love, Aunt Emily\ndied 27/04/2006: Doctor Hobbles the 3rd\nborn 05/04/2006 (mother Red Lion): Whiskers, Whiskers the 2nd", "Dear nephew,\nContents of mail3\nMuch love, Aunt Emily\ndied 27/04/2006: Little Iroquois\nborn 05/04/2006 (mother Red Lion): Whiskers the 3rd, Whiskers the 4th", "Dear nephew,\nContents of mail4\nMuch love, Aunt Emily\ndied 27/04/2006: Whiskers, Whiskers the 2nd\nborn 05/04/2006 (mother Red Lion): Whiskers the 5th, Whiskers the 6th", "Dear nephew,\nContents of mail5\nMuch love, Aunt Emily\ndied 27/04/2006: Whiskers the 5th\nborn 05/04/2006 (mother Red Lion): Whiskers the 7th, Whiskers the 8th"];
	var livingCats = {"Spot": true};

	function catNames(paragraph) {
		var names = paragraph.slice(paragraph.indexOf(":") + 2);
		return names.split(", ");
	}

	function handleParagraph(paragraph) {
		if (startsWith(paragraph, "born"))
			addToSet(livingCats, catNames(paragraph));
		else if (startsWith(paragraph, "died"))
			removeFromSet(livingCats, catNames(paragraph));
	}

	for (var mail = 0; mail < mailArchive.length; mail++) {
		var paragraphs = mailArchive[mail].split("\n");
		for (var i = 0; i < paragraphs.length; i++)
			handleParagraph(paragraphs[i]);
	}
	return livingCats;
}

function setLength(object) {
	var how_many = 0;
	for (var i in object)
		how_many++;
	return how_many;
}
console.log("There are " + setLength(findLivingCats()) + " cats.");


// "new" is a way to build up object values with a function, instead of setting all the names and values manually
// For example:
var when = new Date(2011, 0, 18);
console.log(when);
// Returns Tue Jan 18 2011 00:00:00 GMT-0800 (PST)
// Note that month starts at 0, but everything else is normal?
// new Date() is called a "date constructor"
// More uses:
console.log(new Date());		// Current date/time
console.log(new Date(2007, 2, 30, 8, 20, 30));		// Date/time

// get... methods can be used to get contents of a date object
// For example:
var today = new Date();
console.log(today);
console.log("Year: " + today.getFullYear() + ", month: " + today.getMonth() + ", day: " + today.getDate());
console.log("Hour: " + today.getHours() + ", minutes: " + today.getMinutes() + ", seconds: " + today.getSeconds());
console.log("Day of the week: " + today.getDay());
console.log(today.getTimezoneOffset());	// Returns different from GMT

// Dates are internally represent as milliseconds since Jan 1st, 1970
console.log(today.getTime());

// Comparing dates
var dateA = new Date(2011, 1, 2);
var dateA2 = new Date(2011, 1, 2);
var dateB = new Date(2013, 0, 1);
console.log(dateA < dateB);		// true
console.log(dateA > dateB);		// false
console.log(dateA == dateB);	// false
console.log(dateA == dateA2);	// false!!! Same date, BUT not the same object
console.log(dateA.getTime() == dateA2.getTime());		// true.  This is how to compare if two dates are equal
console.log(dateA.getTime() >= dateA2.getTime());		// also true

// Write a function extractDate
// Takes such a paragraph like this as its argument:
// "died 27/04/2006: Spot"
// Then extracts the date, and returns it as a date object
function extractDate(paragraph) {
	function numberAt(start, length) {
		return Number(paragraph.slice(start, start + length));
	}
	return new Date(numberAt(11, 4), numberAt(8, 2) - 1, numberAt(5, 2));
}
console.log(extractDate("died 27/04/2006: Spot"));

// How to store dates?
// Instead of just storing a list of ***LIVING*** cats, like:
// {"Spot": true, "Bob": true}
// Let's store info about each cat, like:
// {"Spot": {name: *name*, birth: *birthdate*, death: *deathdate*, mother: *name*}, "Bob": {name: *name*, birth: *birthdate*, death: *deathdate*, mother: *name*}}
// First let's make a function to produce cat records:
function catRecord(name, birthdate, mother) {
	return {name: name, birth: birthdate, mother: mother};
}
// Note that there's no deat property, because cat's don't get them when "created"
// Now we need a function to add cats
// Remember the data: it will be taking in an array of cats born by a given mother on a given day, and add them to a set
// So there will be one set (that we add stuff to), an array of names, but just one mother and birthdate associated with that array of names
function addCats(set, names, birthdate, mother) {
	for (var i = 0; i < names.length; i++)
		set[names[i]] = catRecord(names[i], birthdate, mother);
}
// Note that this function doesn't return anything, it just adds cats to a set
// Now we need a function similar to the above, but for dead cats
// It will get an array of names associated with a single death date, and add them to a set
function deadCats(set, names, deathdate) {
	for (var i = 0; i < names.length; i++)
		set[names[i]].death = deathdate;
}
// Note that we're adding a new property to a a specific name, names[i], within this set
// Also note that all these names have the same death date, that's why this works

// How to get the names of the mother cats?
// Remember the string will be in this format:
// "born 15/11/2003 (mother Spot): White Fang"
// First let's make a function to extract text between strings:
function between(paragraph, start_string, end_string) {
	var start = paragraph.indexOf(start_string) + start_string.length;
	var end = paragraph.indexOf(end_string, start);
	return paragraph.slice(start, end);
}
// Test it
console.log(between("bu ] boo [ bah ] gzz", "[ ", " ]"));
// Now right a specialized wrapper around this function:
function extractMother(paragraph) {
	return between(paragraph, "(mother ", ")");
}
console.log(extractMother("born 15/11/2003 (mother Spot): White Fang"));


// ############################
// Final verison, looking at all data
// ############################

// The data
function retrieveMails() {
	var mail1 = "Dear nephew,\nContents of mail1\nMuch love, Aunt Emily\ndied 27/04/2006: Spot\nborn 05/04/2006 (mother Spot): Red Lion, Doctor Hobbles the 3rd, Little Iroquois";
	var mail2 = "Dear nephew,\nContents of mail2\nMuch love, Aunt Emily\ndied 27/05/2007: Doctor Hobbles the 3rd\nborn 05/05/2007 (mother Red Lion): Whiskers, Whiskers the 2nd";
	var mail3 = "Dear nephew,\nContents of mail3\nMuch love, Aunt Emily\ndied 27/06/2008: Little Iroquois\nborn 05/06/2008 (mother Red Lion): Whiskers the 3rd, Whiskers the 4th";
	return [mail1, mail2, mail3];
}

// The general functions
function startsWith(a,b) {
	return a.slice(0, b.length) == b;
}
function catNames(paragraph) {
	var names = paragraph.slice(paragraph.indexOf(":") + 2);
	return names.split(", ");
}
function catRecord(name, birthdate, mother) {
	return {name: name, birth: birthdate, mother: mother};
}
function addCats(set, names, birthdate, mother) {
	for (var i = 0; i < names.length; i++)
		set[names[i]] = catRecord(names[i], birthdate, mother);
}
function deadCats(set, names, deathdate) {
	for (var i = 0; i < names.length; i++)
		set[names[i]].death = deathdate;
}
function between(paragraph, start_string, end_string) {
	var start = paragraph.indexOf(start_string) + start_string.length;
	var end = paragraph.indexOf(end_string, start);
	return paragraph.slice(start, end);
}
function extractMother(paragraph) {
	return between(paragraph, "(mother ", ")");
}
function extractDate(paragraph) {
	function numberAt(start, length) {
		return Number(paragraph.slice(start, start + length));
	}
	return new Date(numberAt(11, 4), numberAt(8, 2) - 1, numberAt(5, 2));
}

// The final function:
function findCats() {
	var mailArchive = retrieveMails();
	var cats = {"Spot": catRecord("Spot", new Date(1997, 2, 5), "unknown")};

	function handleParagraph(paragraph) {
		if (startsWith(paragraph, "born"))
			addCats(cats, catNames(paragraph), extractDate(paragraph), extractMother(paragraph));
		else if (startsWith(paragraph, "died"))
			addCats(cats, catNames(paragraph), extractDate(paragraph));
	}

	for (var mail = 0; mail < mailArchive.length; mail++) {
		var paragraphs = mailArchive[mail].split("\n");
		for (var i = 0; i < paragraphs.length; i++)
			handleParagraph(paragraphs[i]);
	}

	return cats;
}

var catData = findCats();
console.log(catData);


// Left off at:

// Having that extra data allows us to finally have a clue about the cats aunt Emily talks about. A function like this could be useful:

// http://eloquentjavascript.net/chapter4.html
