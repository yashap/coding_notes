// #####################################
// Eloquent JavaScript
// #####################################


// #####################################
// Chapter 1: Introduction
// #####################################

// Nothing too useful here


// #####################################
// Chapter 2: Basic JavaScript: values, variables, and control flow
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
// Chapter 3: Functions
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
// Chapter 4: Data structures: Objects and Arrays
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


// Example 4.2:
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
			deadCats(cats, catNames(paragraph), extractDate(paragraph));
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

// Dealing with catData
function formatDate(date) {
	function pad(number) {
		if (number < 10)
			return "0" + number;
		else
			return number;
	}
	return pad(date.getDate()) + "/" + pad(date.getMonth() + 1) + "/" + date.getFullYear();
}

function catInfo(data, name) {
	if (!(name in data))
		return "No cat by the name of " + name + "is known.";
	var cat = data[name];
	var message = name + ", born " + formatDate(cat.birth) + " from mother " + cat.mother;
	if ("death" in cat)
		message += ", died " + formatDate(cat.death);
	return message + ".";
}

console.log(catInfo(catData, "Spot"));


// Write a function oldestCat which, given an object containing cats as its argument, returns the name of the oldest living cat.
function oldestCat(cats) {
	var oldest = null;
	for (var this_cat in cats) {
		var cat = cats[this_cat];
		if (!("death" in cat) && (oldest === null || oldest.birth > cat.birth))
			oldest = cat;
	}
	if (oldest === null)
		return null;
	else
		return oldest.name;
}

console.log(oldestCat(catData));


// Whenever a function is called, a special variable called arguments is created
// It's more or less an array of the arguments
function argumentCounter() {
	console.log("You gave me ", arguments.length, " arguments.");
	console.log(arguments[1]);
}
argumentCounter("Death", "Famine", "Pestilence");
// Returns:
// You gave me 3 arguments.
// Famine


// Before we wrote a function range that takes one argument, and returns an array from 0 to that number
// Now let it take two arguments, with the second argument being optional
function range(start, end) {
	if (arguments.length < 2) {
		end = start;
		start = 0;
	}
	var myArray = [];
	for (var i = start; i <= end; i++)
		myArray.push(i);
	return myArray;
}
console.log(range(5));
console.log(range(2,5));
// Note that when the optional argument is not given, the first argument takes the role of end

// Write a sum function, that sums an array of numbers
function sum(myArray) {
	var total = 0;
	for (var i = 0; i < myArray.length; i++)
		total += myArray[i];
	return total;
}
console.log(sum(range(2,6)));


// Remember when we talked about Math.max and Math.min?
// max and min are properties of the object Math
// We don't want to put these directly in the global environment, they'd take up too many variable names
// Properties in the Math object:
// max, min, cos, sin, tan, acos, asin, atan, PI, E, pow, sqrt, round, floor, ceil
// Note that these properties are HIDDEN, when you do something like:
for (var this_name in Math)
	print(name);
// You get nothing
// Note that most (all?) JS objects come with hidden properties, but you can't add hidden properties, you can only add visible properties


// Some properties are "read only", you can get their value but not change it
// Others are "active" properties, that can be changed.
// For example:
var array = ["Yasha", "kicks", "ass"];
console.log(array);
// ["Yasha", "kicks", "ass"]
array.length = 2;
console.log(array);
// ["Yasha", "kicks"]


// #####################################
// Chapter 5: Error Handling
// #####################################

// Two basic types of errors:
//		1) Programmer errors
//			i.e. you forget to pass a required argument to the function
//				The function is fine, you just need to make the program pass it the right arguments
//			Solution: fix the code
//		2) Genuine errors
//			i.e. the code you write doesn't deal with reasonable inputs
//			Solution: tell your program what to do in these situations

// Example of errors:
function power(base, exponent) {
	var result = 1;
	for (var count = 0; count < exponent; count++)
		result *= base;
	return result;
}
console.log(power(3, 2));
// Works as expected
console.log(power("rabbit", 2));
// Clearly not meant to be passed strings, that's a clear programmer error
console.log(power(3, 2.5));
console.log(power(3, 3));
// Oops!  Our program is treating the first case as the second case, not good!
// This is a genuine error, the function doesn't do what it should when given decimals as the exponent, which is a reasonable input that it should be able to handle
// It should give:
console.log(Math.pow(3, 2.5));
// I believe the actual algorithm is quite complex, won't get into it


// Another example, recall this example from earlier:
function between(string, start, end) {
	var startAt = string.indexOf(start) + start.length;		// Start at end of start string
	var endAt = string.indexOf(end, startAt);							// End at first end after startAt
	return string.slice(startAt, endAt);
}
console.log(between("Your {mother}!", "{", "}"));
// That works, but what about:
console.log(between("Your mother!", "{", "}"));
// That just returned "Your mother"
// Why?
// If something isn't found, it's given an index of -1
// var startAt = -1+1
// var endAt = -1
// return string.slice(0,-1)
// And apparently this starts at the start, and ends 1 from the end

// The above function fails 'silently'
// How can we make it fail noisily?
// Make it have specialized behaviour when the string isn't found!
function between(string, start, end) {
	var startAt = string.indexOf(start);
	if (startAt === -1)
		return undefined;
	startAt += start.length;
	var endAt = string.indexOf(end, startAt);
	if (endAt === -1)
		return undefined;
	return string.slice(startAt, endAt);
}
console.log(between("Your {mother}!", "{", "}"));
console.log(between("Your mother!", "{", "}"));

// Then we can do something like
var input = prompt("Tell me something", "");
var parenthesized = between(input, "(", ")");
if (parenthesized !== undefined)
	console.log("You parenthesized '" + parenthesized + "'.");
else
	console.log(input + " has no parenteses.");


// However, is returning a special value actually a good solution?
// What about functions that can return any kind of value, for example:
function lastElement(array) {
	if (array.length > 0)
		return array[array.length - 1];
	else
		return undefined;
}
console.log(lastElement([1, 2, undefined]));
console.log(lastElement([]));
// How do we know if the array had a last element?  Both of the above return undefined


// This is where exception handling comes in:
// It is possible for code to raise (or throw) an exception, which is a value.
// Raising an exception somewhat resembles a super-charged return from a function ― it does not just jump out of the current function, but also out of its callers, all the way up to the top-level call that started the current execution.
// This is called unwinding the stack.
// You may remember the stack of function calls that was mentioned in chapter 3.
// An exception zooms down this stack, throwing away all the call contexts it encounters.
// If they always zoomed right down to the base of the stack, exceptions would not be of much use, they would just provide a novel way to blow up your program.
// Fortunately, it is possible to set obstacles for exceptions along the stack.
// These 'catch' the exception as it is zooming down, and can do something with it, after which the program continues running at the point where the exception was caught.
// An example:

function lastElement(array) {
	if (array.length > 0)
		return array[array.length - 1];
	else
		throw "Can not take the last element of an empty array";
}

function lastElementPlusTen(array) {
	return lastElement(array) + 10;
}

try {
	console.log(lastElementPlusTen([]));
}
catch(error) {
	console.log("Something went wrong: " + error);
}

// throw is the keyword used to raise an exception
// try/catch is kind of like if/else:
//   If the code in the try block raises an exception, the catch block is executed
//   The variable named in the catch argument is the name given to this exception within the catch block

// Note how lastElementPlusTen doesn't have to worry about exceptions
// Error-handling code is only necessary at the point where the error occurs, and the point where it is handled.
// The functions in between can MOSTLY forget all about it.

// Example of an exception to that rule:

var currentThing = null;

function processThing(thing) {
	if (currentThing !== null)
		throw "Oh no! We are already processing a thing!";
	currentThing = thing;
	// Do complicated processing here
	currentThing = null;
}

// The idea of this function is to set the top level variable currentThing to point to a specific thing while its body executes
// This way other functions can have access to that thing too
// When the function finishes, currentThing is set back to null
// BUT what if the processing raises an exception?
//   currentThing would never get reset back to null!
// In this case we should use 'finally'
//   finally is like catch, but it executes no matter what
//   If a function has to clean something up once it's done, that should probably go in the finally block

var currentThing = null;

function processThing(thing) {
	if (currentThing !== null)
		throw "Oh no! We are already processing a thing!";
	currentThing = thing;
	try {
		// Do complicated processing here
	}
	finally {
		currentThing = null;
	}
}


// Lets of errors cause the JS environment to raise exceptions
// These exceptions are generally special error objects that raise themselves, you don't need to write the throw code
// For example, if you try to use an undefined variable:
try {
	console.log(dfgdfhdfhgh);
}
catch (error) {
	console.log("Caught: " + error.messaage);
}
// Error objects will always have a message property with a description of the problem

// You can raise similar exceptions with the Error constructor
throw new Error("Message here");

// When an error makes it all the way to the bottom of the stack without being caught in your code, it gets handled by the environment
// Different browsers do different things, like popups describing the error

// You can also use exceptions as a kind of break statement in a recursive function
// i.e. NOT for error-handling
// Example: this checks whether an object, and the objects stored inside it, contains at least seven true values:

var FoundSeven = {};											// A unique value that we will use to know we've hit a sepcific exception

function hasSevenThruths(object) {
	var counted = 0;
	function count(object) {
		for (var obj_name in object) {
			if (object[obj_name] === true) {		// Loop through the properties in the object
				counted++;												// If the property has value true, up counter
				if (counted == 7)
					throw FoundSeven;								// If counted hits 7, throw FoundSeven as the exception.  This will fly up the stack until it gets caught
			}
			else if (typeof object[obj_name] == "object") {
				count(object[obj_name]);					// If the property is itself an object, recursively call count on that object
			}
		}
	}
	try {																		// Execute block until we hit an exception, then execute catch block with the exception
		count(object);												// This executes count()
		return false;													// If there's no exception, we return false
	}
	catch (exception) {											// If there IS an exception ...
		if (exception != FoundSeven)					// And it's not FoundSeven ...
			throw exception;										// Throw the exception
		return true;													// BUT if it is FoundSeven, return true
	}
}

var testObject = {
	1: true,
	2: true,
	3: 2000,
	4: "hello",
	5: true,
	6: true,
	7: {
		12: false,
		13: false
	},
	8: "bob",
	9: true,
	10: true,
	11: false
};
console.log("It is " + hasSevenThruths(testObject) + " that this object has 7 truths.");

// Why didn't we just return 7, instead of all this throw/try/catch stuff?
// Returning won't necessarily stop counting, because we're dealing with a recrusive function
// It will stop THAT chain of counting, but this block will still execute on other calls to count
// Using error exceptions just completely knocks us to the catch block the moment an exception is thrown


// #####################################
// Chapter 6: Functional Programming
// #####################################

// The basic idea of functional programming is to make the code more abstract, and thus easier to understand, by cleverly using functions
// The standard JS environment comes with few functions, so we either have to write them ourselves or use functions written by others (i.e. libraries)

// Example:
// The for loop for going over an array is pretty ugly
// for (var i = 0; i < something.length; i++)
// Can we abstract this?
// If we just wanted to print the array, this would be easy:
function printArray(array) {
	for (var i = 0; i < array.length; i++)
		console.log(array[i]);
}
// But what if we want a more complex code block than logging each row?
// We put "what we want to do" as an argument for the function!
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}
forEach(["Hello", "Goodbye", "Bob"], console.log);
// Or more complex:
function sum(numbers) {
	var total = 0;
	forEach(numbers, function (number) {
		total += number;
	});
	return total;
}
console.log(sum([1,10,100]));
// We've used an annonymous function as the function argument
// function (number) {total += number;}
// Remember that forEach is already set up to automatically pass array[i] as the argument to the function
// So number just becomes array[i]

// Or remember this code from the cat chapter?
var paragraphs = mailArchive[mail].split("\n");		// return an array
for (var i = 0; i < paragraphs.length; i++)				// loops through array
	handleParagraph(paragraphs[i]);
// Could re-write as:
forEach(mailArchive[mail].split("\n")), handleParagraph);

// Basically, more abstract = more information and less noise

// Higher Order Functions:
// Higher order functions are simply functions that operate on other functions
// For example, makeAddFunction (which we wrote in Chapter 3) is a higher order function
//   Instead of taking functions as an argument, it produces a new function
// Higher order functions can be used to generalize many algorithms that regular functions can't describe
//   Helps you think about code in a clearer way
//   Instead of a mess of variables and loops, you can decompse algorithms into a combo of a few fundamental algorithms
//   Basically, write WHAT you want instead of HOW you want to do it

// Higher order funactions can also MODIFY the function value they're given
function negate(func) {
	return function(x) {
		return !func(x);
	};
}
var isNotNan = negate(isNaN);
console.log(isNotNan(NaN));		// false
console.log(isNaN(NaN));			// true
console.log(typeof(isNotNan));	// function, which is key, it's a function not a value


// What's happening here?
// We define a function negate
//   This function negates the result of whatever function is passed
//   isNaN(Nan) returns true, so the inverse of this is false

// But what if we don't know how many arguemnts the function within our higher order function will have?
//   We can use the apply method, which is something all functions have
//   apply takes two arguments
//     We'll discuss the role of the first argument later, for now just set it to null
//     The second argument is an array containing the arguments that the function must be applied to
console.log(Math.min.apply(null, [6, 20, -1, 0, -100]));		// -100
console.log(Math.min(6, 20, -1, 0, -100));									// -100, same as the above statement

// So let's use apply!
// Here's a function meant to take multiple arguments, without using apply
function negMin(func) {
	return function(x) {
		return -1 * func(x);
	};
}
var myNegMin = negMin(Math.min);
console.log(myNegMin(6, 20, -1, 0, -100));		// -6
// It just uses the first argument, and ignores the rest
// Not what we want!  Should return 100

// The right way to do it:
function negMin(func) {
	return function() {
		return -1 * func.apply(null, arguments);
	};
}
var myNegMin = negMin(Math.min);
console.log(myNegMin(6, 20, -1, 0, -100));		// 100


// Let us look at another way to write a sum function
// A sum function is really a variant of a general algorithm usually refered to as reduce or fold
// Reduce is a generally useful, 'fundamental algorithm'
//   It takes in an array, and returns a single value
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}
function reduce(combine, base, array) {
	forEach(array, function(element) {
		base = combine(base, element);
	});
	return base;
}
function add(a, b) {
	return a + b;
}
function sum(numbers) {
	return reduce(add, 0, numbers);
}
console.log(sum([1, 10, 100]));

// What's happening here?
// We've got our forEach loop that we defined before, which is simply an abstraction of a for loop over an array
//   forEach takes two arguments, an array and an action (i.e. a function)
//   the action is carried out over every element of the array
// We define a function add, which simply adds two numbers
// We define a function sum, which takes an array
//   It calls reduce with:
//   combine	= add				(a function we defined)
//   base			= 0					(we'll start from 0)
//   array		= numbers		(an array, which is the argument we passed to sum)
// So now we have reduce(add, 0, numbers)
//   Reduce runs an annonymous function on the array numbers
//   This annonymous function says:
//   base = add(base, this_element_of_the_array)
// Finally, we return base, which is now the sum of the numbers in the array

// Example problem
// Write a funciton, countZeroes, which takes an array of numbers as its argument and returns the amount of zeroes that occur in it
// First I will re-use forEach and reduce from above
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}
function reduce(combine, base, array) {
	forEach(array, function(element) {
		base = combine(base, element);
	});
	return base;
}
// Then I write the function to use reduce
function countZeroes(numbers) {
	function counter(base, element) {					// define the function to be used as the first argument of reduce
		return base + (element === 0 ? 1 : 0);		// Shorthand for if element is 0, then it's 1, else it's 0
	}
	return reduce(counter, 0, numbers);
}
console.log(countZeroes([10, 0, 100, 0, 4566, 0, 235346]));		// 3

// Then, write the higher-order function count, which takes an array and a test function as arguments, and returns the amount of elements in the array for which the test function returned true
// Reimplement countZeroes using this function
function count(testFunction, array) {
	return reduce(function(total, element) {
		return total + (testFunction(element) ? 1 : 0);
	}, 0, array);
}
// So the above function takes in a test function and an array
// It runs reduce on a function that simply adds up the number of times the test function is true
//   This is the annonymous function:
//     function(total, element) {
//       return total + (testFunction(element) ? 1 : 0);
//       }
// So reduce is run with this, and with 0 as the base and an array that you give it as the 2nd argument to count
function equals(x) {
	return function(element) {return x === element;};
}
// This is our test function.  It takes an argument, and returns whether or not (i.e. true or false) the argument is element.  So now we can do:
console.log(count(equals(0), [10, 0, 100, 0, 4566, 0, 235346]));
// Or we can actually re-define countZeroes
function countZeroes(array) {
	return count(equals(0), array);
}
console.log(countZeroes([10, 0, 100, 0, 4566, 0, 235346]));

// Another useful 'fundamental algorithm' is called map
// map is kind of like forEach, in that it goes over an array, and applies a function to every element
//   HOWEVER, instead of discarding the values returned by the function, it builds a new array from these values
// The map function:
function map(func, array) {
	var result = [];
	forEach(array, function(element) {
		result.push(func(element));
	});
	return result;
}
console.log(map(Math.round, [0.01, 2, 9.89, Math.PI]));			// [0, 2, 10, 3]
console.log(map(Math.round, [0.01, 2, 9.89, Math.PI])[1]);	// 2
// So we've fed forEach an annonymous function, that simply appends the result of func() ran on each elemement of the original array to the new empty array we create (result)
// Then we return result

// ##### Total shift into new topic #####
// Let's write a program that will convert plain text into HTML!
//   The text will be formated following these rules:
//     1) Paragraphs are separated by blank lines
//     2) A paragraph that starts with '%' is a header.  The more '%', the less important the header
//     3) Inside paragraphs, pieces of text can be emphasized by putting them between asterisks
//     4) Footnotes are written between braces

// Let's process the following text:
var theBook = "% The Book of Programming\n\n%% The Two Aspects\n\nBelow the surface of the machine, the program moves. Without effort, it expands and contracts. In great harmony, electrons scatter and regroup. The forms on the monitor are but ripples on the water. The essence stays invisibly below.\n\nWhen the creators built the machine, they put in the processor and the memory. From these arise the two aspects of the program.\n\nThe aspect of the processor is the active substance. It is called Control. The aspect of the memory is the passive substance. It is called Data.\n\nData is made of merely bits, yet it takes complex forms. Control consists only of simple instructions, yet it performs difficult tasks. From the small and trivial, the large and complex arise.\n\nThe program source is Data. Control arises from it. The Control proceeds to create new Data. The one is born from the other, the other is useless without the one. This is the harmonious cycle of Data and Control.\n\nOf themselves, Data and Control are without structure. The programmers of old moulded their programs out of this raw substance. Over time, the amorphous Data has crystallised into data types, and the chaotic Control was restricted into control structures and functions.\n\n%% Short Sayings\n\nWhen a student asked Fu-Tzu about the nature of the cycle of Data and Control, Fu-Tzu replied 'Think of a compiler, compiling itself.'\n\nA student asked 'The programmers of old used only simple machines and no programming languages, yet they made beautiful programs. Why do we use complicated machines and programming languages?'. Fu-Tzu replied 'The builders of old used only sticks and clay, yet they made beautiful huts.'\n\nA hermit spent ten years writing a program. 'My program can compute the motion of the stars on a 286-computer running MS DOS', he proudly announced. 'Nobody owns a 286-computer or uses MS DOS anymore.', Fu-Tzu responded.\n\nFu-Tzu had written a small program that was full of global state and dubious shortcuts. Reading it, a student asked 'You warned us against these techniques, yet I find them in your program. How can this be?' Fu-Tzu said 'There is no need to fetch a water hose when the house is not on fire.'{This is not to be read as an encouragement of sloppy programming, but rather as a warning against neurotic adherence to rules of thumb.}\n\n%% Wisdom\n\nA student was complaining about digital numbers. 'When I take the root of two and then square it again, the result is already inaccurate!'. Overhearing him, Fu-Tzu laughed. 'Here is a sheet of paper. Write down the precise value of the square root of two for me.'\n\nFu-Tzu said 'When you cut against the grain of the wood, much strength is needed. When you program against the grain of a problem, much code is needed.'\n\nTzu-li and Tzu-ssu were boasting about the size of their latest programs. 'Two-hundred thousand lines', said Tzu-li, 'not counting comments!'. 'Psah', said Tzu-ssu, 'mine is almost a *million* lines already.' Fu-Tzu said 'My best program has five hundred lines.'Hearing this, Tzu-li and Tzu-ssu were enlightened.\n\nA student had been sitting motionless behind his computer for hours, frowning darkly. He was trying to write a beautiful solution to a difficult problem, but could not find the right approach. Fu-Tzu hit him on the back of his head and shouted '*Type something!*' The student started writing an ugly solution. After he had finished, he suddenly understood the beautiful solution.\n\n%% Progression\n\nA beginning programmer writes his programs like an ant builds her hill, one piece at a time, without thought for the bigger structure. His programs will be like loose sand. They may stand for a while, but growing too big they fall apart{Referring to the danger of internal inconsistency and duplicated structure in unorganised code.}.\n\nRealising this problem, the programmer will start to spend a lot of time thinking about structure. His programs will be rigidly structured, like rock sculptures. They are solid, but when they must change, violence must be done to them{Referring to the fact that structure tends to put restrictions on the evolution of a program.}.\n\nThe master programmer knows when to apply structure and when to leave things in their simple form. His programs are like clay, solid yet malleable.\n\n%% Language\n\nWhen a programming language is created, it is given syntax and semantics. The syntax describes the form of the program, the semantics describe the function. When the syntax is beautiful and the semantics are clear, the program will be like a stately tree. When the syntax is clumsy and the semantics confusing, the program will be like a bramble bush.\n\nTzu-ssu was asked to write a program in the language called Java, which takes a very primitive approach to functions. Every morning, as he sat down in front of his computer, he started complaining. All day he cursed, blaming the language for all that went wrong. Fu-Tzu listened for a while, and then reproached him, saying 'Every language has its own way. Follow its form, do not try to program as if you were using another language.'";
// First split it into an array by "\n\n"
var paragraphs = theBook.split("\n\n");
// Explore the data a bit
console.log("Found ", + paragraphs.length + " paragraphs.");
// And let's remember some useful functions/algorithms
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}
function reduce(combine, base, array) {
	forEach(array, function(element) {
		base = combine(base, element);
	});
	return base;
}
function map(func, array) {
	var result = [];
	forEach(array, function(element) {
		result.push(func(element));
	});
	return result;
}

// Now let's write a function to process indvidual paragraphs
// It should check it the paragraph is a header, and if it is it should count the number of %s
// It should return an object with two properties, content and type

// I can do this with functions already used
// function processParagraph(paragraph) {
//   if (paragraph.charAt(0) === "%") {
//     var characters = paragraph.split("");
//     var myCount = count(equals("%"), characters);
//     var myContent = paragraph.slice(myCount + 1);
//     return {"content": myContent, "type": "h" + myCount};
//   }
//   else
//     return {"content": paragraph, "type": "p"};
// }

// Or I can do it like this:
function processParagraph(paragraph) {
	var header = 0;
	while (paragraph.charAt(0) === "%") {
		paragraph = paragraph.slice(1);		// If the first char is %, slice it off
		header++;	// Remember we want to record h1, h2, etc.
	}
	return {type: (header === 0 ? "p" : "h" + header),
		content: paragraph};
}
console.log(processParagraph("Hello"));
console.log(processParagraph("%%%% Hello"));
// Both work equally well

// Now let's run processParagraph on all paragraphs with the map function!
var paragraphs = map(processParagraph, theBook.split("\n\n"));
console.log(paragraphs);
// This returns an array of objects, each with type and content properties

// Now we must deal with empahsized parts, marked with **, and footnotes, marked with {}
// Write a function that returns an array of paragraph fragments
var paragraph = "{This is a footnote} and this is a paragraph *and this is an emphasis* another paragraph {another footnote} *and emphasis*";

function splitParagraph(text) {
	function indexOrEnd(character) {
		var index = text.indexOf(character);
		return index === -1 ? text.length : index;															// If the character isn't present, return the last position of the paragraph, else return the index of the character
	}
	function takeNormal() {																										// This is used when the text starts with anything EXCEPT * or {
		var end = reduce(Math.min, text.length, map(indexOrEnd, ["*", "{"]));
		// Reduce takes a function, base and array.  It reduces the array to a single value
		// Here the array is generated by map.  Map feeds each elelment of the array into the function, and returns and array of the results
		// So here we map gives an array of the index of * and {
		// Say they are at 8 and 22, and length is 35.  Remember reduce runs base = combine(base, elemement) on every element in the array
		// So first we have Math.min(35, 8), so base becomes 8
		// Then we have Math.min(8, 22), so base is 8
		// We return 8
		// If we had no characters, it would simply be base = Math.min(35, 35), then Math.min(35, 35)
		// The reason base is text.length, and not 0, is that we want to make sure indexOrEnd is returned, not 0
		var part = text.slice(0, end);																					// We slice up to the character or the end.  This part will be returned
		text = text.slice(end);																									// Cut off the part we sliced from text, which we will keep processing
		return part;
	}
	function takeUpTo(character) {																						// This lets us take up to a new character, i.e. up to } or the closing *
		var end = text.indexOf(character, 1);																		// We start at 1 because we don't want to accidentally take the opening *
		if (end === -1)
			throw new Error("'Missing closing '" + character + "'");							// We only run this when we first have an opening */{, so if there's no closing that's an error
		var part = text.slice(1, end);																					// Take the part between {} or **
		text = text.slice(end +1);																							// For the rest of the text, start the slice after } or * (hence end + 1)
		return part;
	}
	var fragments = [];
	while (text.length > 0) {																									// Stop once we've processed all text
		if (text.charAt(0) === "*")
			fragments.push({type: "emphasised", content: takeUpTo("*")});					// If it starts with star, takeUpTo next star
		else if (text.charAt(0) === "{")
			fragments.push({type: "footnote", content: takeUpTo("}")});						// If it starts with {, takeUpTo }
		else
			fragments.push({type: "normal", content: takeNormal()});							// Else process the normal text
	}
	return fragments;
}

console.log(splitParagraph(paragraph));

var testing123 = splitParagraph(paragraph);
console.log(testing123);
console.log(testing123.length);
testing123.content = "Im testing stuff";
console.log(testing123);
console.log(testing123.length);
console.log(testing123.content);

// Note that we're using map and reduce even on tiny arrays
// Most of the time, when a decision has to be made on a series of things, even just 2, writiing it as array operations is nicer than handling every value in a separate if statement

// Now let's modify process paragraph, which before only dealt with headers and ps, to use splitParagraph
function processParagraph(paragraph) {
	var header = 0;
	while (paragraph.charAt(0) === "%") {
		paragraph = paragraph.slice(1);
		header++;
	}
	return {type: (header === 0 ? "p" : "h" + header),
		content: splitParagraph(paragraph)};
}

// Now let's replace footnotes with references to them
function extractFootnotes(paragraphs) {
	var footnotes = [];
	var currentNote = 0;
	function replaceFootnote(fragment) {			// Will be called on every fragment.  Remember that fragments are objects
		if (fragment.type === "footnote") {			// if the fragment is a footnote, store the footnote in the footnotes array, and return a reference
			currentNote++;
			footnotes.push(fragment);							// Store the footnote in the footnotes array
			fragment.number = currentNote;				// Add a property number to the fragment, stating which number the footnote is
			return {type: "reference", number: currentNote};		// Return an object of type: "reference", number: ***that footnote's id***
		}
		else
			return fragment;			// If the fragment should stay where it is, just return it
	}
	forEach(paragraphs, function(paragraph) {													// Remember that each paragraph is an array of fragments, so we're looping through arrays of fragments
		paragraph.content = map(replaceFootnote, paragraph.content);		// forEach paragraph in an array of paragraphs, replace the content with an array from running replaceFootnote on all the elements of the paragraph.content array
	});
	return footnotes;
}

// Honestly, I don't really get the forEach part
// paragraphs are arrays, right?  Why are we adding properties to arrays?
// I'll return to that later



// GENERATING HTML
// Now that we've got the tools to extract our data from the file, we need to generate HTML!
// People ofen do this quick and dirty with concatenation, but this sucks
var url = "http://www.gokgs.com/";
var text = "Play Go!";
var linkText = "<a href=\"" + url + "\">" + text + "</a>";
console.log(linkText);
// This is clumsy, but also...
// What if text includes an & of < or >, all reserved characters in HTML?  We're not dealing with them!

// Better to write HTML generating functions
// Treat your HTML document as a data structure instead of a flat piece of text.  For this we can use JS objects
var linkObject = {name: "a",
	content: ["Play Go!"],
	attributes: {href: "http://www.gokgs.com"}
};
// The name property contains the tag name (a, img, div, etc.)
// The attributes are an object containing all the attributes
// The content is an array of everything containing within these tags
//   This allows us to nest things properly!

// Putting this in a re-useable function
function tag(name, content, attributes) {
	return {name: name, attributes: attributes, content: content};
}
// Note that if you give tag just one argument, name, that's fine, the content and attributes wil be undefined
// Now we can use tag to make even better HTML constructor functions
function link(target, text) {
	return tag("a", [text], {href: target});
}
function htmlDoc(title, bodyContent) {
	return tag("html",
		[tag("head", [tag("title", [title])]), tag("body", bodyContent)]);
}
// So in that second example the outer wrapper is <html>
// Then content of <html> is an aray of two elements:
//   The first is is <head> with <title> inside 
//   The second is <body> with bodyContent inside
// We gave no default attributes for the html tag

// Let's make one for images
function image(location) {
	return tag("img", [], {src: location});
}

// Once we've created our HTML document as a data structure, we have to turn it into a string
// First, we have to deal with special characters (&, <, >, ")
function escapeHTML(text) {
	var replacements = [[/&/g, "&amp;"],
		[/"/g, "&quot;"],
		[/</g, "&lt;"],
		[/>/g, "&gt;"]];
	forEach(replacements, function (replace) {
		text = text.replace(replace[0], replace[1]);
	});
	return text;
}

// "
// The replace metod for strings creates a new string in which all of the occurences of the pattern in the 1st argument are replaces by the 2nd argument
console.log("Hello".replace(/l/g, "r"));		// Herro
// Don't worry about the pattern syntax, we'll go over this later (regex?)
// Since one of the uses of this function is to process text inside attribute tags
//   This text will be surrounded by double quotes, i.e. src="www.blog.com/myimg.jpg"
//   Therefore the text inside must not have any double quotes

// To turn an HTML element object into a string, we can use a recursive function like this:
function renderHTML(element) {
	// Empty array to throw HTML pieces into, later join into a string
	// Concatenating strings is expensive, do it as little as possible
	var pieces = [];
	function renderAttributes(attributes) {
		var result = [];
		if (attributes) {
			for (var name in attributes)
				// The for in loop extracts the properties from a JS object, to make HTML tag attributes out of them
				result.push(" " + name + "=\"" + escapeHTML(attributes[name]) + "\"");
		}
		return result.join("");
	}
	function render(element) {
		// Text node
		if (typeof element === "string") {
			pieces.push(escapeHTML(element));
		}
		// Empty tag, i.e. image tags
		// No content, so just render the tag
		else if (!element.content || element.content.length === 0) {
			pieces.push("<" + element.name + renderAttributes(element.attributes) + "/>");
		}
		// Tag with content
		// Basically create opening tag with attributes, recursively call self for content, then create closing tag
		else {
			pieces.push("<" + element.name + renderAttributes(element.attributes) + ">");
			forEach(element.content, render);
			pieces.push("</" + element.name + ">");
		}
	}
	render(element);
	return pieces.join("");
}

// Testing
console.log(renderHTML(link("http://www.nedroid.com", "Drawings!")));
// More testing
var body = [tag("h1", ["The Test"]),
	tag("p", ["Here is a paragraph, and an image..."]),
	image("img/sheep.png")];
var doc = htmlDoc("The Test", body);
var myHTML = renderHTML(doc);
console.log(myHTML);
// It works!
// Note that this really renders XML, not HTML, which is almost the same, but not 100% the same


// I kind of breezed through these next steps, but it's worth working through the logic later

function footnote(number) {
	return tag("sup", [link("#footnote" + number, String(number))]);
}

function renderParagraph(paragraph) {
	return tag(paragraph.type, map(renderFragment, paragraph.content));
}

function renderFragment(fragment) {
	if (fragment.type == "reference")
		return footnote(fragment.number);
	else if (fragment.type == "emphasised")
		return tag("em", [fragment.content]);
	else if (fragment.type == "normal");
		return fragment.content;
}

// Finally, we need a rendering function for the footnotes
// An anchor tag much be included with every footnote, so we can use the #footnote1 type references (to link to lower down the page)
function renderFootnote(footnote) {
	var number = "[" + footnote.number + "] ";
	var anchor = tag("a", [number], {name: "footnote" + footnote.number});
	return tag("p", [tag("small", [anchor, footnote.content])]);
}

// Last but not least, redner an entire file into HTML
function renderFile(file, title) {
	var paragraphs = map(processParagraph, file.split("\n\n"));
	var footnotes = map(renderFootnote, extractFootnotes(paragraphs));
	var body = map(renderParagraph, paragraphs).concat(footnotes);
	return renderHTML(htmlDoc(title, body));
}

console.log(renderFile(theBook, "The Book of Programming"));

// It works!
// The concat method of an array can be used to concatenate another array to it, similar to + for strings



// When using higher-order functions, it's often annoying that operators (+, ==, ===, etc.) aren't functions
// You end up having to write function versions of them
// A good way to do this is with an object, for example:
var op = {
	"+": function(a, b) {return a + b;},
	"==": function(a, b) {return a == b;},
	"===": function(a, b) {return a === b;},
	"!": function(a) {return !a;}
	// etc.
};
// This allows us to do things like:
console.log(reduce(op["+"], 0, [1, 10, 100, 1000]));	// 1111
// To sum an array!


// But what if we want to create something a bit more complex?
// For example, equals(10), that we made before, which creates a function which tests if something equals 10?
// Do we have to write a new function from scratch?  No, we can use partial application
// You want to create a new function that already knows some of its arguments, and that treats any additional arguments it's passed as coming after these fixed arguments
// This can be done with creative use of the apply method of a function

function asArray(quasiArray, start) {
	// Remember that functions let you access arguments, but NOT as a normal array.  This turns them into a normal array
	var result = [];
	for (var i = (start || 0); i < quasiArray.length; i++)
		// We'll start at start if given that argument, else we'll start at 0
		result.push(quasiArray[i]);
	return result;
}

function partial(func) {
	var fixedArgs = asArray(arguments, 1);	// We'll leave off that first weird "argument" that arguments returns
	return function() {
		return func.apply(null, fixedArgs.concat(asArray(arguments)));
	};
}

// apply calls a function with a given "this" value, and with arguments provided as an array
//   "this" refers to the object that calls the function?  Not sure really
//   We are really just calling a function with the fixed and variable arguemnts
// Also note that we had to store the arguments of partial() is a variable, so that the inner function can see them
//   The inner function has its own arguments, that would "overwrite" partial's arguments

// Now we can do things like writing the equals(10) function as:
console.log(partial(op["=="], 10)(6+3));	// false
console.log(partial(op["=="], 10)(6+4));	// true
console.log(map(partial(op["+"], 1), [0, 2, 4, 6, 8, 10]));	// [1, 3, 5, 7, 9, 11]

// So remember when we gave map it's function argument before its array argument?  We did this because it's often useful to partially apply map!  This 'lifts' the function from operating on a single value to operating on an array of values!  For example, if you have an array of values, and you want to square them all:
function square(x) {return x * x;}
console.log(map(partial(map, square), [[1, 10, 100, 1000], [12, 16], [0, 1]]));

// One last trick
// Remember negate()?
function negate(func) {
	return function() {
		return !func.apply(null, arguments);
	};
}
// It applied the boolean not operator to the result of calling a function
// This is a special case of a general pattern:
//   Call function A, then apply function B to it
//   We can use this "composition" concept like this:
function compose(func1, func2) {
	return function() {
		return func1(func2.apply(null, arguments));
	};
}
var isUndefined = partial(op["==="], undefined);	// creates a function isUndefined(), that tests if the input === undefined
var isDefined = compose(op["!"], isUndefined);	// tests if not undefined
console.log(isDefined(Math.PI));	// true
console.log(isDefined(Math.PIE));	// false

// These are ways to define new functions without using the function keyword at all
// These are special tricks for specific situations, shouldn't use them all the time


// #####################################
// Chapter 7: Searching
// #####################################





// Left off at:

// But what if we need something like equals or makeAddFunction, in which one of the arguments already has a value? In that case we are back to writing a new function again.

// http://eloquentjavascript.net/chapter6.html
