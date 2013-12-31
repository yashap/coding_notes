// #####################################
// Eloquent JavaScript
// #####################################

// Side note - to cancel inputting the current command in node repl, just enter .break

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
	"!": function(a) {return !a;},
	"!=": function(a, b) {return a != b;},
	"!==": function(a, b) {return a !== b;}
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
// Also note that we had to store the arguments of partial() in a variable, so that the inner function can see them
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

// First, let's load all functions from custom_library.js

// Think of ways to find the shortest distance between two points
// For example, I'll enter data for an abbreviated version of :
var roads = {
	"Taaoa": [
		{"to": "Mt Temetu", "distance": 4},
		{"to": "Atuona", "distance": 3},
		{"to": "Point Kiukiu", "distance": 15}
	],
	"Point Kiukiu": [
		{"to": "Mt Feani", "distance": 15},
		{"to": "Hanaiapa", "distance": 19},
		{"to": "Taaoa", "distance": 15}
	],
	"Mt Temetu": [
		{"to": "Mt Feani", "distance": 8},
		{"to": "Taaoa", "distance": 4}
	],
	"Mt Feani": [
		{"to": "Mt Temetu", "distance": 8},
		{"to": "Airport", "distance": 5},
		{"to": "Point Kiukiu", "distance": 15}
	],
	"Airport": [
		{"to": "Mt Feani", "distance": 5},
		{"to": "Atuona", "distance": 4},
		{"to": "Hanaiapa", "distance": 6}
	],
	"Atuona": [
		{"to": "Airport", "distance": 4},
		{"to": "Taaoa", "distance": 3}
	],
	"Hanaiapa": [
		{"to": "Airport", "distance": 6},
		{"to": "Point Kiukiu", "distance": 19}
	]
};

console.log(roads["Airport"]);
console.log(roads["Airport"][1]["distance"]);

// However, there's plenty of duplicate information here
//   All roads are duplicated
// Also, it sucks typing all that out
// SO let's create a function that can make road data!

var roads = {};			// Like above, this is what we'll populate

function makeRoad(from, to, length) {
	function addRoad(from, to) {
		if (!(from in roads))
			roads[from] = [];			// if we don't already have the city associated with these roads, add that city, so we can add roads to it
		roads[from].push({to: to, distance: length});		// from and to are the 1st and 2nd arguments passed to addRoad, but length is the 3rd argument passed to makeRoad
	}
	addRoad(from, to);
	addRoad(to, from);
}

makeRoad("Point Kiukiu", "Hanaiapa", 19);
makeRoad("Point Kiukiu", "Mt Feani", 15);
makeRoad("Point Kiukiu", "Taaoa", 15);
console.log(roads);
// The two calls to addRoad add both roads!
//   So the single call makeRoad("Point Kiukiu", "Taaoa", 15) adds the road as both from Point Kiukiu and from Taaoa
// Also note that the "from" and "to" in makeRoad are not the same as the "from" and "to" in addRoad
//   In addRoad the from and to are just the 1st and 2nd arguments passed to it, not necessarily from and to from the outer function

// Write a function makeRoads
// Should take an uneven number of arguments
// Argument 1 is always the starting point, after that it's pairs of end point/distance
// This single function should be able to duplicate the 3 calls above

function makeRoads(start) {
	for (var i = 1; i < arguments.length; i += 2)
		makeRoad(start, arguments[i], arguments[i + 1]);
}
// So we have just one named argument, and we get the rest from start
// The rest is obvious

// Now we can make all of our roads quickly and easily
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

// Note that there are 13 cities, 16 roads
// Because the function makes roads to and from each city, we don't have to list each city, we just have to list each road
// One thing this function lacks is protection against adding a road twice!

// We could just select roads like this:
console.log(roads["Airport"]);

// But what happens if you search for a location that doesn't exist?
console.log(roads["Arport"]);
// Just returns undefined
// Let's make it return an error instead
function roadsFrom(place) {
	var found = roads[place];
	if (found === undefined)
		throw new Error("No place named '" + place + "' found.");
	else
		return found;
}
console.log(roadsFrom("Arport"));

// Ok, let's create an algorithm to find a path between two points!
// Here's the "gambler's method"
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

console.log(gamblerPath("Hanaiapa", "Mt Feani"));

// So this gives us a path, but it gives us a different path every time
// It doesn't optimize for distance, and it CAN let us backtrack
// How do we do this?
// Simple option: "Generate and Test"
//   Step 1) Generate all possible routes
//   Step 2) Find the shortest one
// BUT if we allow routes with circles in them, there's an infinite number of routes
//   Let's not consider these
//   Let's also not consider routes that don't start at the starting point!
// First we'll need a function to test whether an element is found within an array
function member(array, value) {
	var found = false;
	forEach(array, function(element) {
		if (element === value)
			found = true;
	});
	return found;
}

myArray = [6, 7, "Hello"];
console.log(member(myArray, 7));	// true
console.log(member(myArray, 8));	// false

// Let's make this a bit more efficient
//   Right now we loop through the whole array no matter what
//   We COULD use a for loop with a break statement, but we like forEach!
//   Let's write a forEach that can recognize a certain type of exception as signalling a break
// var Break = {toString: function() {return "Break";}};

// function forEach(array, action) {
// 	try {
// 		for (var i = 0; i < array.length; i++)
// 			action(array[i]);
// 		// So we try our standard forEach loop
// 	}
// 	catch (exception) {
// 		if (exception != Break)
// 			throw exception;
// 	}
// }

// So now, if the action function passed to forEach throws the 'Break' exception, forEach will absorb the exceoption and stop looping
// The toString property in the exception is good practice
//   If we somehow end up with a Break exception outside of a forEach function, we want to be able to find out where it came from

// It's going to be messy to implement this with member, though
//   We need to store the resilt, and later return it
// When we really need is a new higher order function INSTEAD OF forEach, called any (or sometimes called some)
function any(testFunc, array) {
	for (var i = 0; i < array.length; i++) {
		var found = testFunc(array[i]);
		if (found)
			return found;		// note that found is the RESULT of calling testFunc on this element
	}
	return false;
}
// Any will return the first true-ish value found
// Calling any(test, array) is more or less equivalent to:
// test(array[0]) || test (array[1]) || etc.

// Let's remember how to ue partial as well
console.log(partial(op["==="], 7)(7));	// true --> here partial is a function testing if the argument is 7
console.log(partial(op["==="], 7)(8));	// false --> here partial is a function testing if the argument is 8

// So we can do:
console.log(any(partial(op["==="], 7), [7, 8, 9, "Alex"]));		// true
console.log(any(partial(op["==="], 7), [8, 9, "Alex"]));			// false

// Then let's write a new version of member that tests if a value is in an array
function member(array, value) {
	return any(partial(op["==="], value), array);
}

console.log(member(["Fear", "Loathing", "Las", "Vegas"], "Denial"));		// false
console.log(member(["Fear", "Loathing", "Las", "Vegas"], "Las"));				// true

// Let's also write a "companion" for any, "every"
function every(testFunc, array) {
	for (var i = 0; i < array.length; i++) {
		var found = testFunc(array[i]);
		if (!found)
			return found;
	}
	return true;
}
// So if ANY of the test functions is semi-true, it will return FALSE
// Only if ALL of the test functions return false will it return TRUE
// So this will return 
console.log(every(partial(op["==="], 7), [7, 8, 9, "Alex"]));		// false
console.log(every(partial(op["==="], 7), [8, 9, "Alex"]));			// false
console.log(every(partial(op["!=="], 7), [7, 8, 9, "Alex"]));		// false
console.log(every(partial(op["!=="], 7), [8, 9, "Alex"]));			// true

// Another function we'll need is called "flatten"
//   It takes an array of arrays
//   It puts the elements of the arrays together into one big array
function flatten(arrays) {
	var result = [];
	forEach(arrays, function (array) {
		forEach(array, function (element){result.push(element);});
	});
	return result;
}
// Try it out
console.log(flatten([[2345], [3546, "bob", "joe"], ["one", "two", 3], ["end"]]));
// Note that every element of the outer array must itself be an array!
//   Even if it's just an array of one value

// We need one more higher order function, "filter"
// It's similar to map
//   It takes a function and an array as arguments, and produces a new array
//   HOWEVER, the new array is made only of elements that return a true-like value
function filter(testFunc, array) {
	var result = [];
	forEach(array, function(element) {
		if (testFunc(element))
			result.push(element);
	});
	return result;
}
// Note that unlike map, it is not appending the result of calling the function on element
//   It is appending element itself
//   The function is only to test if we should append
// Example:
console.log(filter(partial(op[">"], 5), [0, 4, 8, 12]));
// Returns [0, 4]
//   Remember, op[">"] is actually a function that takes two arguments, and tests whether the first is greater than the second
//   The first argument we give it is 5, the second is element
//   So we are testing whether 5 is greater than element, not the other way around


// OK, so let's get back to finding the shortest route!
// First let's find all possible routes
//   We have a starting location
//   Then it starts to generate a route for every road leaving that location
//   At the end of each of these roads it generates more routes
//   It doesn't just run along one road, IT BRANCHES OUT
//     Because of this, recursion is a natural way to model it
function possibleRoutes(from, to) {
	function findRoutes(route) {
	// See end of function for what we pass this
		function notVisited(road) {
			return !member(route.places, road.to);
			// remember that member is structured like this: member(array, value)
			// So this returns true if road.to IS NOT in route.places, false if it IS in route.places
		}
		function continueRoute(road) {
			return findRoutes({
				"places": route.places.concat([road.to]),
				"length": route.length + road.distance
			});
		}
		var end = route.places[route.places.length - 1];
		// This is simply the last elelment in the list of places for the route
		// At the start this is simply from
		//   Remember that there is only one end point per route, but we generate a lot of routes
		if (end === to)
			return [route];
			// This route is done!
			//   Return route, wrapped in an array
		else
			return flatten(map(continueRoute, filter(notVisited, roadsFrom(end))));
			// What this says:
			//   "Take all the roads going from the current location, discard the ones that go to places this route has already visited.  Continue each of these roads, which will give an array of finished routes for each of them, then put all these routes into a single big array that we return"
			// Step by step:
			//   1) roadsFrom(end)
			//     The input is simply a town name string, like "Puamua"
			//     The output is the roads from there, formatted as an array of roads, each of which is an object with "to" and "distance" properties
			//       [ { to: 'Mt Ootua', distance: 13 },
			//       { to: 'Point Teohotepapapa', distance: 14 } ]
			//   3) notVisited
			//     Takes an object, in this case a road, which is an element of roadsFrom(end), an object like { to: 'Mt Ootua', distance: 13 }
			//     Returns true if road.to is NOT in route.places
			//       Remember route is the object we're generating, and it has a property places that is an array of places passed through on the route
			//   2) filter(testFunc, array)
			//     The test function (notVisited) is true if we haven't visited the element in the array
			//     The array is the array of road objects generated by roadsFrom(end)
			//     So here we simply filter out all of the roads with a "to" property that's already in our routes.places array
			//   3) map(func, array)
			//     The array is the array of road objects
			//     The function is continueRoute
			//       continueRoute calls findRoutes --> we're in the process of working through a findRoutes call, so this is the recursive part
			//       It returns a NEW call of findRoutes
			//         This time we call it with a different object, though
			//           It takes the current route.places array, and concats the current road object's to property
			//           It takes the current route.length number, and adds the current road.distance
			//           It SEEMS like continueRoute will continue forever, but it won't
			//             Eventually the outgoing roads will go to only already visited places, so the result of calling filter will be an empty array
			//             Mapping over an empty array produces an empty array
			//             Flattening still gives an empty array
			//             So calling findRoutes on a dead end produces an empty array, meaning there is no way to continue this route
			//     So overall map is creating an array of route objects
			//   4) Flatten just gets rid of nesting
	}
	return findRoutes({"places": [from], "length": 0});
	// So what we are doing is passing findRoutes a route
	//   A route is an object where places starts at from, and length starts at 0
}

console.log(possibleRoutes("Point Teohotepapapa", "Point Kiukiu"));
console.log(possibleRoutes("Hanapaoa", "Mt Ootua"));

// It's key that we append to routes using concat, not push
//   push simply changes the current array, it wouldn't allow branching
//   concat creates new array
// Overall this function returns an array of objects, where each object is a route
//   Each route object has two properties
//     place is an array of places that the route passes through (including start and end)
//     length is the lenght of the route

// Now that we have all possible routes with possibleRoutes(), let's find the shortest route

// My solution, which works
// function shortestRoute(from, to) {
// 	var routesArray = possibleRoutes(from, to);
// 	var minLength, thisLength, minPosition;
// 	for (var thisRoute = 0; thisRoute < routesArray.length; thisRoute++) {
// 		thisLength = routesArray[thisRoute]["length"];
// 		if (minLength === undefined)
// 			minLength = thisLength;
// 		else {
// 			if (thisLength < minLength) {
// 				minLength = thisLength;
// 				minPosition = thisRoute;
// 			}
// 		}
// 	}
// 	return routesArray[minPosition];
// }

// console.log(shortestRoute("Point Teohotepapapa", "Point Kiukiu"));

// The book's solution, probably cleaner
function shortestRoute(from, to) {
	var currentShortest = null;
	forEach(possibleRoutes(from, to), function(route) {
		if (!currentShortest || currentShortest["length"] > route.length)
			currentShortest = route;
	});
	return currentShortest;
}

console.log(shortestRoute("Point Teohotepapapa", "Point Kiukiu"));		// returns the shortest route object
console.log(shortestRoute("Point Teohotepapapa", "Fake Place"));			// returns undefined

// In this case we know that there will always be a route between two places
//   That is, possibleRoutes(from, to) will never return an empty array
// But what if it DID return an empty array?  How would we deal with that?
//   In this case we will simply return null --> I'm getting undefined, why?

// Here's a generic algorithm for minimizing or maximizing functions that can deal with empty arrays
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

console.log(shortestRoute2("Point Teohotepapapa", "Point Kiukiu"));

// This is a lot longer, but a lot more generic, we can use this in many ways


// So far we've been generating all possible routes
//   Hasn't been a problem on a small island, but what about for a huge map?
//   We could make things fast by comparing routes WHILE we're building them!
//     Any route that's longer than a route we've already built can be instantly discarded

// In this example we will be using a map that's a 20x20 grid
// We have a function heightAt(), that returns the height at a given point on the grid
// Let's generate this map!

// First I wrote this function to extract the heights I wanted out of the e-book
function getHeights() {
	var myHeights = null;
	for (var x_pos = 0; x_pos < 20; x_pos++) {
		for (var y_pos = 0; y_pos < 20; y_pos++) {
			if (myHeights === null)
				myHeights = "var myMapBitches = {x" + x_pos +"y" + y_pos + ": " + heightAt({x: x_pos, y: y_pos});
			else
				myHeights = myHeights + ", x" + x_pos +"y" + y_pos + ": " + heightAt({x: x_pos, y: y_pos});
		}
	}
	return myHeights + "};";
}

// From which I got this:
var myMapBitches = {x0y0: 111, x0y1: 205, x0y2: 228, x0y3: 228, x0y4: 238, x0y5: 245, x0y6: 264, x0y7: 300, x0y8: 343, x0y9: 348, x0y10: 320, x0y11: 297, x0y12: 302, x0y13: 287, x0y14: 260, x0y15: 266, x0y16: 306, x0y17: 367, x0y18: 342, x0y19: 311, x1y0: 111, x1y1: 186, x1y2: 176, x1y3: 207, x1y4: 237, x1y5: 264, x1y6: 287, x1y7: 327, x1y8: 379, x1y9: 348, x1y10: 328, x1y11: 331, x1y12: 347, x1y13: 317, x1y14: 277, x1y15: 255, x1y16: 312, x1y17: 357, x1y18: 362, x1y19: 337, x2y0: 122, x2y1: 160, x2y2: 232, x2y3: 263, x2y4: 275, x2y5: 289, x2y6: 331, x2y7: 360, x2y8: 373, x2y9: 364, x2y10: 334, x2y11: 304, x2y12: 332, x2y13: 310, x2y14: 269, x2y15: 254, x2y16: 328, x2y17: 339, x2y18: 381, x2y19: 358, x3y0: 137, x3y1: 218, x3y2: 258, x3y3: 264, x3y4: 315, x3y5: 340, x3y6: 365, x3y7: 355, x3y8: 337, x3y9: 369, x3y10: 348, x3y11: 283, x3y12: 326, x3y13: 293, x3y14: 243, x3y15: 254, x3y16: 279, x3y17: 330, x3y18: 359, x3y19: 376, x4y0: 226, x4y1: 217, x4y2: 246, x4y3: 284, x4y4: 353, x4y5: 359, x4y6: 382, x4y7: 365, x4y8: 309, x4y9: 337, x4y10: 354, x4y11: 283, x4y12: 314, x4y13: 284, x4y14: 236, x4y15: 265, x4y16: 287, x4y17: 290, x4y18: 353, x4y19: 330, x5y0: 192, x5y1: 233, x5y2: 289, x5y3: 348, x5y4: 355, x5y5: 349, x5y6: 381, x5y7: 402, x5y8: 336, x5y9: 276, x5y10: 316, x5y11: 279, x5y12: 286, x5y13: 235, x5y14: 255, x5y15: 307, x5y16: 320, x5y17: 323, x5y18: 353, x5y19: 341, x6y0: 246, x6y1: 268, x6y2: 306, x6y3: 368, x6y4: 341, x6y5: 336, x6y6: 386, x6y7: 393, x6y8: 378, x6y9: 321, x6y10: 254, x6y11: 250, x6y12: 223, x6y13: 217, x6y14: 343, x6y15: 350, x6y16: 377, x6y17: 363, x6y18: 369, x6y19: 342, x7y0: 275, x7y1: 300, x7y2: 351, x7y3: 358, x7y4: 332, x7y5: 303, x7y6: 360, x7y7: 343, x7y8: 352, x7y9: 390, x7y10: 315, x7y11: 243, x7y12: 205, x7y13: 305, x7y14: 312, x7y15: 311, x7y16: 359, x7y17: 374, x7y18: 391, x7y19: 374, x8y0: 285, x8y1: 316, x8y2: 374, x8y3: 391, x8y4: 350, x8y5: 267, x8y6: 299, x8y7: 307, x8y8: 303, x8y9: 347, x8y10: 303, x8y11: 264, x8y12: 202, x8y13: 286, x8y14: 280, x8y15: 267, x8y16: 289, x8y17: 330, x8y18: 384, x8y19: 411, x9y0: 333, x9y1: 357, x9y2: 388, x9y3: 387, x9y4: 315, x9y5: 259, x9y6: 258, x9y7: 274, x9y8: 290, x9y9: 354, x9y10: 297, x9y11: 251, x9y12: 178, x9y13: 229, x9y14: 220, x9y15: 276, x9y16: 328, x9y17: 331, x9y18: 372, x9y19: 408, x10y0: 328, x10y1: 276, x10y2: 319, x10y3: 320, x10y4: 283, x10y5: 285, x10y6: 254, x10y7: 232, x10y8: 294, x10y9: 309, x10y10: 283, x10y11: 226, x10y12: 160, x10y13: 211, x10y14: 252, x10y15: 292, x10y16: 367, x10y17: 415, x10y18: 408, x10y19: 421, x11y0: 264, x11y1: 240, x11y2: 333, x11y3: 344, x11y4: 310, x11y5: 340, x11y6: 284, x11y7: 226, x11y8: 241, x11y9: 259, x11y10: 238, x11y11: 204, x11y12: 172, x11y13: 234, x11y14: 280, x11y15: 355, x11y16: 355, x11y17: 446, x11y18: 448, x11y19: 382, x12y0: 202, x12y1: 240, x12y2: 299, x12y3: 366, x12y4: 355, x12y5: 315, x12y6: 264, x12y7: 221, x12y8: 176, x12y9: 208, x12y10: 229, x12y11: 155, x12y12: 171, x12y13: 227, x12y14: 298, x12y15: 305, x12y16: 271, x12y17: 385, x12y18: 382, x12y19: 271, x13y0: 175, x13y1: 253, x13y2: 307, x13y3: 382, x13y4: 350, x13y5: 290, x13y6: 276, x13y7: 262, x13y8: 204, x13y9: 147, x13y10: 207, x13y11: 144, x13y12: 132, x13y13: 243, x13y14: 288, x13y15: 250, x13y16: 250, x13y17: 308, x13y18: 358, x13y19: 311, x14y0: 151, x14y1: 215, x14y2: 261, x14y3: 372, x14y4: 336, x14y5: 333, x14y6: 295, x14y7: 289, x14y8: 235, x14y9: 158, x14y10: 156, x14y11: 154, x14y12: 118, x14y13: 188, x14y14: 252, x14y15: 223, x14y16: 198, x14y17: 241, x14y18: 256, x14y19: 246, x15y0: 222, x15y1: 201, x15y2: 286, x15y3: 394, x15y4: 405, x15y5: 372, x15y6: 323, x15y7: 250, x15y8: 205, x15y9: 165, x15y10: 129, x15y11: 147, x15y12: 116, x15y13: 160, x15y14: 210, x15y15: 200, x15y16: 163, x15y17: 190, x15y18: 178, x15y19: 166, x16y0: 250, x16y1: 256, x16y2: 291, x16y3: 360, x16y4: 361, x16y5: 306, x16y6: 281, x16y7: 252, x16y8: 203, x16y9: 169, x16y10: 128, x16y11: 120, x16y12: 114, x16y13: 152, x16y14: 176, x16y15: 197, x16y16: 139, x16y17: 145, x16y18: 143, x16y19: 132, x17y0: 222, x17y1: 312, x17y2: 355, x17y3: 314, x17y4: 273, x17y5: 254, x17y6: 233, x17y7: 228, x17y8: 206, x17y9: 169, x17y10: 161, x17y11: 111, x17y12: 96, x17y13: 129, x17y14: 163, x17y15: 193, x17y16: 155, x17y17: 99, x17y18: 125, x17y19: 116, x18y0: 219, x18y1: 224, x18y2: 277, x18y3: 259, x18y4: 264, x18y5: 220, x18y6: 202, x18y7: 160, x18y8: 169, x18y9: 200, x18y10: 174, x18y11: 129, x18y12: 80, x18y13: 138, x18y14: 133, x18y15: 166, x18y16: 153, x18y17: 88, x18y18: 85, x18y19: 108, x19y0: 146, x19y1: 200, x19y2: 258, x19y3: 207, x19y4: 228, x19y5: 220, x19y6: 160, x19y7: 160, x19y8: 132, x19y9: 147, x19y10: 165, x19y11: 138, x19y12: 75, x19y13: 101, x19y14: 112, x19y15: 158, x19y16: 190, x19y17: 145, x19y18: 109, x19y19: 72};

// Then I made my own heightAt function!
function heightAt(positionObject) {
	return myMapBitches["x" + positionObject["x"] + "y" + positionObject["y"]];
}

console.log(heightAt({x: 0, y: 0}));
console.log(heightAt({x: 11, y: 18}));

// It works just like the one in the book!


// Think of a grid as a graph
//   Every square is a node, and it's connected to the squares around it
// We want to find the easiest route possible
//   We'll weight things so going uphill is "heavier" than going downhill, and going downhill is "heavier" than going level
//     So going level is optimal
// We will then weight distance by how "heavy" the distance travelled is
function weightedDistance(pointA, pointB) {
	var heightDifference = heightAt(pointB) - heightAt(pointA);
	var climbFactor = (heightDifference < 0 ? 1 : 2);
	// So if pointB is lower than pointA, climbFactor is 1, else it's 2
	var flatDistance = (pointA.x === pointB.x || pointA.y === pointB.y ? 100 : 141);
	// If we are going "side to side", the flat distance is 100, but if we're going accross a corner it's 141
	return flatDistance + climbFactor * Math.abs(heightDifference);
	// Note that if heightDifference is 0, it's just flatDifference
	// Else we add extra distance, equal to heightDifference for downhill, or double that for uphill
}

// Points on the map are represented by objects containing x and y properties. These three functions are useful when working with such objects:

function point(x, y) {
	return {x: x, y: y};
}

function addPoints(a, b) {
	return point(a.x + b.x, a.y + b.y);
	// Note that a and b will be point objects
}

function samePoint(a, b) {
	return a.x === b.x && a.y === b.y;
}

console.log(samePoint(addPoints(point(10,10), point(4, -2)),
	point(14, 8)));

// Now we need a function that can create 'signposts'
//   Basically lists of possible moves
//   It should take a point object as an argument, and return an array of points we can move to
//   Note that x and y can both only range from 0 to 19
// My solution:
function possibleDirections(point) {
	var mapSize = 20;
	var moves = [];
	var x = [point["x"] - 1, point["x"], point["x"] + 1];
	var y = [point["y"] - 1, point["y"], point["y"] + 1];
	forEach(x, function(x_coord) {
		forEach(y, function(y_coord) {
			if (x_coord >= 0 && x_coord < mapSize && y_coord >= 0 && y_coord < mapSize && (x_coord !== point["x"] || y_coord !== point["y"]))
				moves.push({x: x_coord, y: y_coord});
		});
	});
	return moves;
}

// This is their solution, but I like mine better:
function possibleDirections(from) {
	var mapSize = 20;
	function insideMap(point) {
		return point.x >= 0 && point.x < mapSize && point.y >= 0 && point.y < mapSize;
	}
	var directions = [point(-1, 0), point(1, 0), point(0, -1), point(0, 1), point(-1, -1), point(-1, 1), point(1, 1), point(1, -1)];
	// note that there is no (0, 0)
	return filter(insideMap, map(partial(addPoints, from), directions));

}
// Note that directions does not include point(0, 0), as that's just staying at the curret point!
// All the magic is really happening in the return line.  Here's what it's doing, step by step:
//   1) partial(addPoints, from)
//     Remember how partial works
//       op["==="]											--> returns function (a, b) {return a === b;}
//       partial(op["==="], 10)					--> returns function () {return func.apply(null, fixedArgs.concat(asArray(arguments)));}
//         func is the function passed to partial (the first argument)
//         fixedArgs is asArray(arguments, 1)			--> really just all the arguments for partial after func
//         That's pretty complex, but basically it's a function that is waiting for more arguments?
//       partial(op["==="], 10)(6+4)		--> returns true
//     So here, addPoints(a, b) needs two arguments
//       We give it a, from, but it's still waiting for b
//       Before it gets b, it's a function that will add point a to point b
//       So this is a function:
//         partial(addPoints, point(10,4))
//       And this returns {x: 13, y: 7}
//         partial(addPoints, point(10,4))(point(3,3));
//       Once we map it to an array of directions, it simply adds point a to all of those directions
//   2) map()
//     Already dealt with this, it returns an array of possible directions
//     BUT it includes those outside the map
//   3) filter()
//     Then we simply filter to include only those points where applying insideMap(point) returns a true-ish value
//       i.e. only points inside the map are returned

// Test it out:
possibleDirections(point(0, 0));
possibleDirections(point(8, 12));
possibleDirections(point(12, 19));
possibleDirections(point(19, 19));


// Ok, so how do we get the shortest route efficient?
//   Many possible solutions, we're using one called A*
// What problem does it solve?
//   On a big map there's too much room for going in the wrong direction
//   You can randomly search for ages before you find the destination, and then there are so many possible routes that it takes forever to find the right destination
//   So we want to explore directions that are likely to get us to the end point first
//     We can get a rough estimate of how good a path is by adding path length to an estimate of the distance left to go
// We will always explore the most promising path first
//   Once we know the best way to get to point X, we record that
//   If another path also passes through point X, it must suck because we've already found the best way to get to point X

// Our algorithm, in words:
// We need to keep track of 2 pieces of data
//   1) open list
//     The partial routes that must still be explored
//     Each route has a score, calculated by adding its length to its estimated distance from the goal
//     The estimate must always be optimistic, it should NEVER overestimate the remaining distance
//   2) A set of nodes we have seen, with the shortest partial route to get there (the "reached" list)
// Then:
//   - As long as there are nodes in the open list, we find the one with the lowest score, and find ways it can be continued (by calling possibleDirections)
//   - For each of the nodes this returns, we create a new route by appending it to our original route, and adjusting the length of the route using weightedDistance
//   - The endpoint of each of these new routes is then looked up in the reached list
//   - If the node is not in this list, we haven't seen it before, so we add it to the open list and record it in the reached list
//   - If we have seen it before:
//     - If it's shorter, we replace the existing route with the new one
//     - Othewise we discard it (since we already have a better way to get there)
// Continue until . . .
//   - The route we fetch from the open list ends at the goal node, in which case we found our route
//   - OR until the open list is empty, in which case we've found that there's no route
// How do we know that the first fill route we get is the shortest?
//   - We only look at a route that has the lowest score
//   - Since the score is the actual length plus an optimistic estimate of remaining length, the route with the lowest score is always the best route to the current endpoint
//     - Any "better way" to that current endpoint would have had a lower score

// We're going to need a new data structure!
//   - It's called a binary heap
//   - Similar to an array, but better for these purposes
//   - You can create them with new BinaryHeap(scoringFunction)
//     - The argument you pass them is a function that is used to 'score' its elements
//     - It creates an object with push and pop methods, just like an array, BUT this time pop returns the element with the lowest score, not just the element last pushed

// Example of how to use them
//   - See Appendix 2 for more info on this data structure
function identity(x) {
	return x;
}

// Note - node.js doesn't seem to have BinaryHeap, so this won't run
var heap = new BinaryHeap(identity);
forEach([2, 4, 5, 1, 6, 3], function(number) {
	heap.push(number);
});

while (heap.size() > 0)
	console.log(heap.pop());
// In JavaScript this will return:
// 1
// 2
// 3
// 4
// 5
// 6

// It pops off the lowest (1), then the next lowest, etc.


// Another problem is how to store routes
//   - Before we were storing them in arrays, then copying and extending them with the concat method
//   - That will be too expensive here as we'll be exploring too many routes
//   - Instead we'll use a chain objects to store a route
//     - Each object will have some properties, such as it's location (point) on the map, the length of the route so far, and a property pointing at the previous object in the route
//   - Objects can be part of multiple routes this way!
//     - This saves a lot of storage, because each point can be in a lot of different routes!


// Write a function, estimatedDistance, that gives an optimistic estimate of the distance between 2 points
//   - It can assume a flat map
//   - Remember that we can only travel straight (100 units) or diagonally (141 units)
function estimatedDistance(a, b) {
	function axisDiff(axis) {return Math.abs(b[axis] - a[axis]);}
	if (axisDiff("x") > axisDiff("y"))
		return 141 * axisDiff("y") + 100 * (axisDiff("x") - axisDiff("y"));
	else
		return 141 * axisDiff("x") + 100 * (axisDiff("y") - axisDiff("x"));
}

console.log(estimatedDistance(point(10, 11), point(9,9)));
// It works!


// We will use a binary heap for the open list. What would be a good data structure for the reached list?
// This one will be used to look up routes, given a pair of x, y coordinates. Preferably in a way that is fast.
// Write three functions, makeReachedList, storeReached, and findReached.
//   - The first one creates your data structure
//   - The second one, given a reached list, a point, and a route, stores a route in it
//   - The last one, given a reached list and point, retrieves a route or returns undefined to indicate that no route was found for that point.
function makeReachedList() {
	return {};
}

function storeReached(list, point, route) {
	// The point of this function is to add things to the reached list (list)
	//   - We want to be able to store routes (route), that we can look up by coordinates
	//   - We can basically have a dictionary of x-coordinates, then for every x we can have a dictionary of y-coordinates
	//   - The 
	var inner = list[point.x];
	// So this set inner to something like list["12"]
	if (inner === undefined) {
		// What if list["12"] is undefined?  We have to define it!  It should be an empty {}, that we will later fill
		inner = {};
		list[point.x] = inner;
		// It's key that we don't wipe "inner" if it exists
	}
	inner[point.y] = route;
	// then "inner" should get a key for each y coordinate, with the value set to route
}

function findReached(list, route) {
	var inner = list[point.x];
	if (inner === undefined)
		return undefined;
	else
		return inner[point.y];
}
// This last function is pretty simple, simply returns the route attached to a specific x and y value


// Then finally, the actual path finding function
function findRoute(from, to) {
	var open = new BinaryHeap(routeScore);	// Data structure to store all open routes
	var reached = makeReachedList();				// {} to store reached list

	function routeScore(route) {
		if (route.score === undefined)
			route.score = estimatedDistance(route.point, to) + route.length;
		return route.score;
	}
	function addOpenRoute(route) {
		open.push(route);
		storeReached(reached, route.point, route);
	}

	addOpenRoute({point: from, length: 0});

	while (open.size() > 0) {
		var route = open.pop();
		if (samePoint(route.point, to))
			return route;
		
		forEach(possibleDirections(route.point), function(direction) {
			var known = findReached(reached, direction);
			var newLength = route.length + weightedDistance(route.point, direction);
			if (!know || know.length > newLength) {
				if (known)
					open.remove(known);
				addOpenRoute({point: direction, from: route, length: newLength});
			}
		});
	}
	return null;
}

// So what are we doing here?
//   - Create the necessary data structures, an open list and a reached list
//   - routeScore is the scoring function given to the binary heap
//     - it stores its result in the route object, to make sure we don't have to re-calculate it
//   - addOpenRoute is simply for convenience
//     - instead of having to add a route to the open and reached lists separately, it does it all in one function
//   - Note that route objects always have the properties point, which holds the point at the end of the route, and length, which holds the current length of the route
//     - Routes that are more than one square long also have a from property, that points at their predecessors
//   - What does the while loop do?
//     - It keeps taking the lowest scoring route from the open list (open.pop()), and checks whether this gets us to the goal point
//       - If it does, we're done!
//       - If not, we must progress to the forEach function
//         - This function continues to expand the route
//         - It looks up the newest point that we've finished at in the reached list
//         - If we haven't reached this point before, or the reached list for this point is worse than this new route (longer length to get there), a new route object is created and the existing route (if there was one) is removed
//   - What if the route in known is not on the open list?
//     - Not possible!  Routes are only removed from the open list when they have been found to be THE MOST OPTIMAL ROUTE TO THEIR ENDPOINT

// Note that this algorithm doesn't use recursion, but still manages to explore all those branches
//   - The open list more or less takes over the role that the function call stack played in our recursive searching solution (to the Hiva Oa problem)
//     - It keeps track of the paths that still have to be explored
//   - Every recursive algorithm can be rewritten in a non-recursive way by using a data structure to store the "things that must still be done"


// #####################################
// Chapter 8: Object-oriented Programming
// #####################################

// - So far we have just used objects as dictionaries
// - In an OO approach, they're their own little worlds!
//   - The outside world may only touch them through a limited and well defined interface:
//     - Through a number of specific methods and properties
//   - Example:
//     - The "reached" list in chapter 7
//       - Used only 3 functions to interact with it (makeReachedList, storeReached, findReached)

// - How to give objects methods?
//   - One way: attach function values to it:
var rabbit = {};
rabbit.speak = function(line) {
	console.log("The rabbit says '" + line + "'");
};
rabbit.speak("Well, now you're asking me.");

// - In most cases, though, the method needs to know WHO it should act on
//   - What if there are different rabbits?
//   - The speak method should indicate which rabbit is speaking
//   - We can use "this"
//     - "this" is a special variable that is always present when a function is called
//     - when a function is called as a method, it points at the relevant object
//       - a function is called as a method when it is looked up as a property, and immediately called, for example:
//         - object.method()
function speak(line) {
	console.log("The " + this.adjective + " rabbit says '" + line +"'");
}

var whiteRabbit = {adjective: "white", speak: speak};
var fatRabbit = {adjective: "fat", speak: speak};

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
fatRabbit.speak("I could sure use a carrot right now.");

// - So we set up the speak function to look at this.adjective
//   - which is the adjective property of the object you apply the function to
// - Note that we also explicitly had to specify a speak property, which is the speak function
//   - so calling whiteRabbit.speak gives us access to the speak() function!

// Remember the "apply" method for functions?
console.log(Math.min.apply(null, [6, 20, -1, 0, -100]));		// returns -100
// - Takes two arguments:
//   - The 2nd argument is an array of arguments to pass to the function
//   - The 1st argument we always left as null before
// - The first argument is all about OOP!
//   - Here you can spcify the object you want to apply the function to!
//   - For non-method functions, this is irrelevant, so we leave it null
speak.apply(fatRabbit, ["Yum."]);

// - Functions also have a "call" method, which is similar to apply
//   - However, with "call" you give the arguments for the function separately instead of as an array
speak.call(fatRabbit, "Burp.");

// - The "new" keyword provides a convenient way of creating new objects
//   - When a function is called with the word "new" in front of it, its "this" variable will point at a NEW object, which it will automatically return
// - Functions used to create new objects like this are called "constructors"
//   - It's a JS convention to name constructor functions with a capital first letter
//   - Here's a constructor for a Rabbit, that we use to make a new Rabbit
function Rabbit(adjective) {
	this.adjective = adjective;
	this.speak = function(line) {
		console.log("The " + this.adjective + " rabbit says '" + line + "'");
	};
}
// - The above is a constructor function
//   - Note the lack of a "return" statement
//     - We're going to use this with "new", and "new" automatically returns the object that was created, it doesn't have to be specified within the constructor function
var killerRabbit = new Rabbit("killer");
// Here we create a new rabbit object using the constructor function
killerRabbit.speak("GRAHHHHHHH!!!!");
speak.apply(killerRabbit, ["Grah!"]);
speak.call(killerRabbit, "Grahhh!");
// Calling the speak method for the killer rabbit in 3 different ways
console.log(killerRabbit);
// { adjective: 'killer', speak: [Function] }


// - What does the "new" keyword really do?  Why not just do this?
function makeRabbit(adjective) {
	return {
		adjective: adjective,
		speak: function(line) {
			console.log("The " + this.adjective + " rabbit says '" + line + "'");
		}
	};
}
var blackRabbit = makeRabbit("black");
blackRabbit.speak("Sup homie?");
// - This works, and is done in the style we were previously using

// - So, why use new/constructors?
//   - "new" does a few things "behind the scenes"
//     - One is that it creates a constructor property that points at the function that created it
console.log(killerRabbit.constructor);		// [Function: Rabbit]
// - blackRabbit also has a constructor property:
console.log(blackRabbit.constructor);			// [Function: Object]
// - BUT it points at the Object function
// - Where did the constructor property come from?
//   - It's part of the prototype of a rabbit
//     - Every object is based on a prototype, with come with a set of inherent properties
//     - So far the objects we've used are associated with the Object constructor
//       - Typing {} is equivalent to typing new Object()

var simpleObject = {};
console.log(simpleObject.constructor);		// [Function: Object]
console.log(simpleObject.toString);				// [Function: toString]
// - toString is a method that is part of the Object prototype
//   - Therefore all objects have a toString method

console.log(Rabbit.prototype);							// {}
console.log(Rabbit.prototype.constructor);	// [Function: Rabbit]
// - Every function automatically gets a prototype property
//   - The constructor property of the prototype points back at the function
// - Because the rabbit prototype is itself an object, it's based on the Object prototype
//   - it thus shares its toString method
console.log(killerRabbit.toString);					// [Function: toString]
console.log(simpleObject.toString);					// [Function: toString]
console.log(killerRabbit.toString === simpleObject.toString);		// true

// - objects "share" the properties of their prototypes, BUT this sharing is one-way
//   - the properties of the object have no effect on the prototype
// - How JS works with properties/objects:
//   - When LOOKING UP the value of a property:
//     - First JS looks at the properties the object ITSELF has
//     - If there is a property, we get that value
//     - If there isn't, it looks up a level to the prototype, then up another level if it's still not there, etc.
//     - If no property is found, undefined is returned
//   - When SETTING the value of a property:
//     - JS never goes to the prototype, but always sets the property in the object itself

// - First a recap:
console.log(killerRabbit);						//{ adjective: 'killer', speak: [Function] }
console.log(killerRabbit.prototype);	// undefined --> why? Why not {} or Rabbit or something like that?
console.log(killerRabbit.constructor);	// [Function: Rabbit]
console.log(Rabbit);									// [Function: Rabbit]

// - Now some new examples
console.log(Rabbit.prototype);				// {}
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);			// "small"
// - Note that killerRabbit still does not have a teeth property itself
//   - We gave it to the prototype, and killerRabbit inherited it
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);			// "long, sharp, and bloody"
console.log(Rabbit.prototype.teeth);	// "small"
// - So killerRabbit.teeth overrode the prototype's property

// - Adding properties to the prototype allows us to add them to all rabbits!
Rabbit.prototype.dance = function() {
	console.log("The " + this.adjective + " rabbit dances a jig.");
};

killerRabbit.dance();			// The killer rabbit dances a jig.
var homelessRabbit = new Rabbit("homeless");
homelessRabbit.dance();		// The homeless rabbit dances a jig.
blackRabbit.dance();			// error, because blackRabbit wasn't made with the Rabbit constructor!

// - The prototypical rabbit is the perfect place for values that all rabbits have in common
// - Before we made the Rabbit constructor like this:
function Rabbit(adjective) {
	this.adjective = adjective;
	this.speak = function(line) {
		console.log("The " + this.adjective + " rabbit says '" + line + "'");
	};
}

// - Here's another approach
function Rabbit(adjective) {
	this.adjective = adjective;
}
Rabbit.prototype.speak = function(line) {
	console.log("The " + this.adjective + " rabbit says '" + line + "'");
};

var hazelRabbit = new Rabbit("hazel");
hazelRabbit.speak("Good Frith!");				// The hazel rabbit says 'Good Frith!'


// - All objects have a prototype, and receive some properties from it
//   - This can cause problems
//   - For example, when using an object to store a set of things
// - Example, what if we wanted to know whether there's a cat called consructor back when we were doing cat problems?
var noCatsAtAll = {};
if ("constructor" in noCatsAtAll)
	console.log("There APPEARS to be a cat called 'constructor'!");
// - We wanted {} to only contain cats, but it contains other properties too!


// - Another problem comes with extending standard constructors, such as Object and Array
//   - For example, what if we wanted to give all objects a method called properties, that returns an array with the names of the (non-hidden) properties an object has?
Object.prototype.properties = function() {
	var result = [];
	for (var property in this)
		result.push(property);
	return result;
};

var test = {x: 10, y: 3};
console.log(test.properties());
// - It returns [ 'x', 'y', 'properties' ]
//   - We didn't mean from properties to be in there, but it is!
//   - Now that the Object prototype has a property called properties, looping over the properties of any object, using for and in, will also give us that shared property
//   - This is generally NOT what we want
//   - In general, when using for or in for an object, we want ONLY THE PROPERTIES THAT BELONG TO THE OBJECT ITSELF

// - Is there a way to do this in JS?  Yes!
//   - Every object has a method called hasOwnProperty
//   - This tells us whether the object has a property with a given name
//     - object.hasOwnProperty(property) returns either true or false, if it has/doesn't have this property in the object itself
//   - We could thus re-write out properties method like this:
Object.prototype.properties = function() {
	var result = [];
	for (var property in this) {
		if (this.hasOwnProperty(property))
			result.push(property);
	}
	return result;
};

var test = {x: 10, y: 3};
console.log(test.properties());
// - It returns [ 'x', 'y' ]
//   - That's what we wanted!


// - We can also abstract this into a higher order function:
function forEachIn(object, action) {
	for (var property in object) {
		if (object.hasOwnProperty(property))
			action(property, object[property]);
	}
}

// - Uses:

// 1) Same as above
var test = {x: 10, y: 3};
var result = [];
forEachIn(test, function(propName) {result.push(propName);});
console.log(result);					// [ 'x', 'y' ]

// 2) As above, but push values instead of names
var result2 = [];
forEachIn(test, function(propName, propValue) {result2.push(propValue);});
console.log(result2);					// [ 10, 3 ]

// 3) Similar, but simply log to console instead of pushing
var chimera = {head: "lion", body: "goat", tail: "snake"};
forEachIn(chimera, function(propName, propValue) {console.log("The " + propName + " of a " + propValue + ".");});
// - Returns:
// The head of a lion.
// The body of a goat.
// The tail of a snake.


// - But what if one of the letters has a cat called hasOwnProperty?
//   - Then calling object.hasOwnProperty will fail, because it will no longer point to a function
// - We can solve this with:
function forEachIn(object, action) {
	for (var property in object) {
		if (Object.prototype.hasOwnProperty.call(object, property))
			action(property, object[property]);
	}
}

var test = {name: "Mordecai", hasOwnProperty: "Uh-oh"};
forEachIn(test, function(name, value) {console.log("Property " + name + " = " + value);});
// It works!  It returns:
// Property name = Mordecai
// Property hasOwnProperty = Uh-oh

// - What happened here?
//   - Before we were using the hasOwnProperty method found in the object itself
//     - That's why we called object.hasOwnProperty(property)
//   - This time, we get the method from the Object prototype, because nobody should be messing with the method in Object.prototype
//     - Then we use call to apply the method to the right object
// - As long as nobody messes with the method in Object.prototype, we're good

// - Clarifying some things for myself
console.log(typeof(Object.prototype.hasOwnProperty));		// function
console.log(Object.prototype.hasOwnProperty(toString));		// false, I guess toString doesn't come from the Object prototype
console.log(Object.prototype.hasOwnProperty(constructor));	// still false, I don't really get this


// - hasOwnProperty can also be used in situations where we were using the in operator
//   - to test if an object has a specific property
// - There is a catch, though
//   - some properties, like toString, are 'hidden'
//     - they won't show up when going over properties with for/in
//   - browsers like Firefox give every object a hidden property names __proto__, that points to the prototype of that object
//     - hasOwnProperty will return true for __proto__, even though the program did not explicitly add it
// - How to get around this?
//   - We can use the propertyIsEnumerable
//     - returns false for hidden properties
var myObject = {foo: "bar"};
console.log(Object.prototype.hasOwnProperty.call(myObject, "foo") &&
	Object.prototype.propertyIsEnumerable.call(myObject, "foo"));
// - This returns true, but would return false for hidden properties
// - This is an ugly but reliable workaround


// - Instead of dealing with all this ugliness, WHEN YOU WANT TO APPROACH AN OBJECT AS JUST A SET OF VALUES, it's probably better to write a constructor and prototype for this specific situation

// First our constructor:
function Dictionary(startValues) {
	this.values = startValues || {};
}

// Then all the prototype methods to add to it:
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

// Now let's test it:
var colours = new Dictionary({Grover: "blue", Elmo: "orange", Bert: "yellow"});
console.log(colours.contains("Grover"));				// true
console.log(colours.contains("constructor"));		// false, as it should be, since contains is meant to ignore hidden properties
colours.each(function(name, colour) {
	console.log(name + " is " + colour);
});
// Grover is blue
// Elmo is orange
// Bert is yellow

// Sweet!  Now the whole mess related to approaching objects as plain sets of properties has been 'encapsulated' in a convenient interface: one constructor and four methods
//   - Note that the 'values' property of a Dictionart object is not part of this interface
//   - It's an internal detail, and when using Dictionart objects we don't need to directly use it

// When writing new interfaces like this, it's often a good idea to add comments about what it does and how it should be used

// Why use interfaces instead of just dealing with the object's internal details?
//   1) It makes the object easier to use
//     - You just have to keep the interface in mind
//     - Don't have to worry about the rest unless you're changing the object itself
//   2) It's great "insurance" against future changes
//     - Often you'll want to change something about the internal implementation of an object type
//     - If outside code had to access every single property/detail, changes to the object could easily break this code
//     - If outside code only uses a small interface, you're probably fine

// Adding new methods to existing prototypes:
//   - This can be very convenient
//     - The Array and String prototypes especially in JS could use a few more basic methods
//     - For example, we could:
//       - implement forEach and map as methods of the Array prototype
//       - implement startsWith as a method of the String prototype
//   - However, if our program has to run on the same web-page as another program that uses for/in natively, then adding things to prototypes (especially Object and Array) can break things
//     - Some people therefore think you shouldn't touch prototypes at all
//     - In reality it can be fine as long as your code doesn't have to co-exist with badly written code


// Our big project for this chapter will be building a virtual terrarium
//   - A tank with insects moving inside it
//   - It will be a 2D grid
//   - All the insects will get to take actions like moving, every half second
// Overall we'll chop both time and space into units with a fixed size
//   - squares for space
//   - half seconds for time

// We will start with a "plan" for the terrarium, which is an array of strings:
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

// We used an array because JS doesn't allow multi-line strings
// In the above:
//   - # represents walls/rocks
//   - o respresents bugs
//   - spaces are empty space

// We'll be using this plan array to create a terrarium object
//   - The object will be used to keep track of the shape/content of the terrarium, and to let the bugs inside move
//   - It has 4 methods:
//     1) toString, which converts the terrarium object back to a string (so we can see what's going on inside it)
//     2) step, which allows all the bugs to move one step, if they want
//     3/4) start and stop, which control whether the terrarium is "running".  When it's running, step is automatically called every half second

// Create a constructor that creates point objects with x/y coordinates
//   - It should have 2 methods:
//     1) add, which can add the point to another point
//     2) isEqualTo, which can tell you if the point equals another point
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

console.log(new Point(3, 1));		// {x: 3, y: 1}
console.log(new Point(3, 1).add(new Point(2, 4)));		// {x: 5, y: 5}
console.log(new Point(3, 1).isEqualTo(new Point(3, 1)));		// true
console.log(new Point(3, 1).isEqualTo(new Point(3, 2)));		// false


// General principles on organizing functionality
//   - You can basically implement functionality with methods of objects, separate functions, and new objects
//   - To keep things organized, you should keep methods/responsibilities that an object has as small as possible

// Applying this to the terrarium object:
//   - Note that it LETS bugs move, but doesn't MAKE them move
//   - The bugs themselves will also be objects, and the BUG OBJECTS will decide what they want to do
//     - The terrarium just provides the infrastructure for them to move in, and lets them move every half second, if they want
//     - Putting functionality in the bug objects makes it so no one object is too complex
//   - The grid on which the content of the terrarium is kept is also going to be pretty complex
//     - Things it has to do:
//       - Define some kind of representation
//       - Provide ways to access this representation
//       - Provide a way to initialize the grid from a 'plan' array
//       - Provide a way to write the content of the grid to a string for the toString method
//       - Allow for the movement of bugs on the grid
//     - With this much complexity, the grid should probably also be its own object

// Whenever you're going to mix data representation and problem-specific code in one object, it's a good idea to put the data representation code into a separate type of object
//   - In this case we need to represent a grid of values, so let's write a Grid type
//   - First, let's decide how to store the values:

// Option 1: an array of arrays (nesting)
var grid = [["0,0", "1,0", "2,0"],
	["0,1", "1,1", "2,1"]];
console.log(grid[1][2]);		// This returns "2,1", or x = 2, y = 1

// Option 2: a single long array
//   - in this case we get elements with the following fomula:
//   x,y = grid[x + y * width]
//   - where width is the width of the grid (in this case 3)
var grid = ["0,0", "1,0", "2,0",
	"0,1", "1,1", "2,1"];
console.log(grid[2 + 1 * 3]);		// Again, returns "2,1", or x = 2, y = 1

// We chose Option 2 because it makes it much easier to initialize the array
//   - Note that:
//   new Array(x)
//   - produces a new array of length x, filled with undefined values
//   - for example:
console.log(new Array(3));

// Let's write the Grid constructor
function Grid(width, height) {
	this.width = width;
	this.height = height;
	this.cells = new Array(width * height);		// So we're storing the representation of the data in a new type of object, an array
}

// And the prototypes
Grid.prototype.valueAt = function(point) {
	return this.cells[point.x + point.y * this.width];
};
Grid.prototype.setValueAt = function(point, value) {
	this.cells[point.x + point.y * this.width] = value;
};
Grid.prototype.isInside = function(point) {
	return point.x >= 0 && point.y >= 0 &&
		point.x < this.width && point.y < this.height;		// remember that we pass the width and height when defining a new Grid with the Grid constructor
};
Grid.prototype.moveValue = function(from, to) {		// from and to will both be points
	this.setValueAt(to, this.valueAt(from));		// we set the value at "to" to be equal to the value at "from"
	this.setValueAt(from, undefined);		// the value at from is now undefined, since it moved away!
};

// We'll need to be able to go over all of the elements of a grid
//   - So we can do things like finding the bugs we need to move, or converting the whole thing to a string
//   - To do this, let's make a higher order function that takes an action as the argument
//     - Add the method "each" to the prototype of "Grid"
//     - "each" should take a function of two arguments as it's argument
//     - It calls this function for every point on the grid, giving it the point object for that point as its first argument, and the value that is on the grid at that point as its second argument
//     - go over the points starting at "0,0" one row at a time, so that "1,0" (x = 1, y = 0) is handled before "0,1" (x = 0, y = 1)
//       - we do this to make it easier to write toString later
//       - Hint:
//         - put a for loop for the x-coordinate inside a loop for the y-coordinate
//     - don't much about in the cells property of the grid object directly, instead use valueAt to get at the values
Grid.prototype.each = function(action) {
	// action is a function of 2 arguments
	// the first is the point object for that point, i.e. {x = 1, y = 4}
	// the second is the value at that point
	// when we use this method, we'll pass an action function that acts on points and values
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var point = new Point(x, y);
			action(point, this.valueAt(point));
		}
	}
};

// Testing out the grid
var testGrid = new Grid(3, 2);
console.log(testGrid);	// {width: 3, height: 2, cells: [ , , , , , ]}
testGrid.setValueAt(new Point(1, 0), "#");
testGrid.setValueAt(new Point(1, 1), "o");
testGrid.each(function(point, value) {
	console.log(point.x + "," + point.y + ": " + value);
});
// 0,0: undefined
// 1,0: #
// 2,0: undefined
// 0,1: undefined
// 1,1: o
// 2,1: undefined


// Before we can write a Terrarium constructor, let's thing a bit more about the 'bug objects' living inside it
//   - bug objects will have an 'act' method, which returns an 'action'
//   - an 'action' is an object with a 'type' property
//     - 'type' names the type of action the bug wants to take, for example "move"
//     - for most actions, 'action' also contains extra info, like the direction the bug wants to go
//   - when 'act' is called, it's given an object with info about all the adjacent squares
//     - for each of the 8 directions, it contains a property
//     - the property indicating what's above the bug will be called "n" (for north), above and right "ne" (for north-east), etc.
//     - to look up the directions these names refer to, we can use the following Dictionary object:
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

// So let's say we're at point "4, 4" on the grid, and want to move south east
//   - Where will we go?
console.log(new Point(4, 4).add(directions.lookup("se")));	// { x: 5, y: 5 }

// Let's make a StupidBug object type, that simply always moves south
function StupidBug() {}
StupidBug.prototype.act = function(surroundings) {
	return {type: "move", direction: "s"};
};
// The act method returns an action object, as it should
//   - However, this bug is stupid, so the act is takes doesn't actually depend on its surroundings


// Now let's start work on the Terrarium object type
//   - it's constructor should take a plan (an array of strings) as an argument, and initialize an empty grid
var wall = {};

function Terrarium(plan) {
	var grid = new Grid(plan[0].length, plan.length);
	// remember --> Grid(width, height)
	// so from the plan we're creating a grid object of the right size, but for now its empty (every coordinate is undefined)
	// new Grid(3, 2) would create {width: 3, height: 2, cells: [ , , , , , ]}
	for (var y = 0; y < plan.length; y++) {
		var line = plan[y];		// so we're looping through every row of the grid
		for (var x = 0; x < line.length; x++) {
			grid.setValueAt(new Point(x, y),
				elementFromCharacter(line.charAt(x)));
			// basically we're looping through the grid, and setting each point to the appropriate value based on the plan
			// elementFromCharacter is defined below, it just handles characters
			//   - spaces are undefined
			//   - # returns wall, which is an empty object
			//   - o returns a new StupidBug object
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


// Now the Terrarium will need a toString method, which converts it into a string
//   - to make this easier, we mark both the wall and the prototype for StupidBug with a property character, which holds the character that represents walls
//   - a nice side benefit is that if we want to change how terrariums look when converted to strings, it will be very easy to do so!  We just change the character property of both walls and bugs
wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement(element) {
	if (element === undefined)
		return " ";
	else
		return element.character;
		// this is why it was key we gave the property the same name for both walls and bugs
}

console.log(characterFromElement(wall));							// #
console.log(characterFromElement(new StupidBug()));		// o

// Now we can use the 'each' method of the 'Grid' object to build up a string
//   - Really we should have a newline at the end of every row
//     - Use the x-coord to determine when the end of a line is reached
// Add a method toString to the Terrarium prototype
//   - takes no arguments
//   - returns a string
//     - if we console.log this string, it should give a nice 2D view of the terrarium
Terrarium.prototype.toString = function() {
	var characters = [];
	var endOfLine = this.grid.width - 1;		// remember that grid has width, height and cells properties (cells is an array of all cell elements)
	this.grid.each(function(point, value) {
		// remember that each is essentially a for loop over all points in the grid
		// the function is what happens at each step of the loop
		// it loops through all points in the grid, starting at "0,0", then to "1,0", etc.
		// at every step you have access to the point object, {x: 3, y: 1}, and the value
		characters.push(characterFromElement(value));
		if (point.x === endOfLine)
			characters.push("\n");
	});
	return characters.join("");
};

var testTerr = new Terrarium(thePlan);
console.log(testTerr.toString());

// It works!

// Overall, terrariums are ordered like this:
// {grid: 
// 		{width: 28,
// 		height: 12,
// 		cells: [
// 			array of:
// 			1) bug objects
// 				o -> new StupidBug()
// 			2) wall objects (# -> wall)
// 				# -> wall
// 			3) blank spaces
// 				" " -> undefined
// 		]
// 		}
// }

// Note:
//   - If we had tried to access this.grid inside of the function we passed as an argument to each, it wouldn't have worked!
//   - Why?  Because this always refers to the function it's defined inside of, even if that function is not a method

// So, how do we get data from a previous 'this' statement, when we're in a new function?
//   - We can store values in a variable, like endOfLine above
//     var endOfLine = this.grid.width - 1;
//   - or we can store the entire this object in a variable, i.e.:
//     var self = this;
//   - by convention people often name such a variable 'self' or 'that'
// Another option is to use a function similar to 'partial' from Chapter 6
//   - "partial" added arguments to a function
//   - "bind" will add a "this" argument, using the first argument to the function's apply method
function bind(func, object) {
	return function() {
		return func.apply(object, arguments);
	};
}

var testArray = [];
var pushTest = bind(testArray.push, testArray);
pushTest("A");
pushTest("B");
console.log(testArray);		// ['A', 'B']

// Remember how apply works
//   - It takes two arguments
//   - The first is the object you want to apply the function to
//     - If it's a plain function, this is null
//     - If it's a method, you list the method's object here
//   - The second is an array of arguments to use as the arguments for the function
//     - if the argument takes just one arg, pass [arg], if two then [arg1, arg2], etc.

// So how is bind working?
//   - Say we have a specific object/method we want to access, but we can't do this.whatever because we're in a different this
//   - we can instead just use:
//   bind(object.method, object)
//   - which will return
//   object.method.apply(object, [array of arguments for method])

// However, that function is a bit ugly.  To use it we wrote:
//   bind(testArray.push, testArray)
// Re-write the function specifically for methods, where we don't have to name the object twice
function method(object, name) {
	return function() {
		return object[name].apply(object, arguments);
	};
}

var pushTest = method(testArray, "push");
pushTest("Sup homie?");
console.log(testArray);


// When implementing the 'step' method of a terrarium, we'll need to use 'bind' (or 'method')
//   - this method will go over all the bugs in the grid, and:
//     1) Ask them for an action
//     2) Execute the given action
// Why not just use 'each' on the grid, and just handle bugs as we come accross them?
//   - when a bug moves south or east, we'd come accross it again in the same turn!
// Better to first gather all the bugs in an array, then process them

// This method gathers anything that has an 'act' method, and stores them in objects that also contain their crrent position
//   - Bugs have an 'act' method
Terrarium.prototype.listActingCreatues = function() {
	var found = [];
	this.grid.each(function(point, value) {
	// so we'll be going over each property of the terrarium grid
	//   - remember that grids have 3 properties; height, width, cells
	//   - remember that Grid.each sets x to width, y to height, then loops through all x/y combos of grid.cell
		if (value !== undefined && value.act)
		// basically, value cannot be undefined, and value must be an object with a method "act"
			found.push({object: value, point: point});
	});
	return found;
};

console.log(new Terrarium(thePlan).listActingCreatues());
// Returns:
// [ { object: {}, point: { x: 19, y: 1 } },
// 	{ object: {}, point: { x: 13, y: 8 } },
// 	{ object: {}, point: { x: 2, y: 9 } },
// 	{ object: {}, point: { x: 15, y: 9 } } ]


// When asking a bug to act, we must pass it an object with info about its current surroundings
//   - the bug will use the directions names we saw earlier ("n", "ne", etc.) as property names
//   - each property will hold a 1 character string, as returned by characterFromElement, indicating what the bug can see in that direction
//   - add a method listSurroundings to the Terrarium prototype
//     - takes one argument, the point at which the bug is currently standing
//     - returns an object with info about the surroundings (i.e. {"n": "#", "ne": " ", etc.})
//     - if the point is at the edge of the grid (think equal to 0 or height/width), then just pass "#", because it's basically like a wall (the bug can't go there)
//     - don't write out all the directions, use the each method on the directions dictionary
//       - note that this is Dictionary.each, not Grid.each, it's a different method
Terrarium.prototype.listSurroundings = function(point) {
	// write method here
};





// Junk space

meTesting.grid.each(function(point, value) {
	console.log("point: " + point + "  value: " + value);
});

console.log(meTesting.grid.cells[47].character);		// 'o'
console.log(meTesting.grid.cells[0].character);		// '#'

console.log(testTerr.toString());

// Overall, terrariums are ordered like this:
// {grid: 
// 		{width: 28,
// 		height: 12,
// 		cells: [
// 			array of:
// 			1) bug objects
// 				o -> new StupidBug()
// 				
// 			2) wall objects (# -> wall)
// 				# -> wall
// 				{character: '#'}
// 			3) blank spaces
// 				" " -> undefined
// 		]
// 		}
// }


// Left off at:

// Hint: Do not write out all the directions, use the each method on the directions dictionary.

// http://eloquentjavascript.net/chapter8.html
