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

/*
Standard way to name functions:
capitalizeFirstLettersExceptFirstWord

JavaScript keywords (reserved, can't be variable names):
abstract boolean break byte case catch char class const continue
debugger default delete do double else enum export extends false
final finally float for function goto if implements import in
instanceof int interface long native new null package private
protected public return short static super switch synchronized
this throw throws transient true try typeof var void volatile
while with
*/

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

/*
Undefined vs. null
undefined is the value of an "empty place."  For example, if you define an empty variable (like var myVar;), it will be undefined.  Same with functions that just return side effects, like alert("Some stuff!");
null means the variable is defined, but doesn’t have a value, i.e.:
var myString = null;
Often there is no practical difference, and if you use == instead of ===, null == undefined
*/

// Auto type conversion:
// Adding something to a string makes a string
// Multiplying a number with something will try to make a number
console.log("Apollo" + 5);			// "Apollo5"
console.log(null + "ify");			// "nullify"
console.log("5" * 5);						// 25
console.log("strawberry" * 5);	// NaN

/* Notes on NaN
NaN is false when converted to boolean
If you want to check if something is NaN, use the isNaN function
NaN == NaN returns false! */

/* Also note that it’s generally best to avoid auto type conversions
If you want to convert a string to a number, better to do:
Number("5")*5;
than
5*5;
*/

/*
Other uses of && and ||
|| works like this: it checks if the value to its left would produce true if converted to boolean.  If that’s the case it returns this value.  If not (i.e. if the value on the left is false, null, "", NaN, 0, etc.), then it returns the value on the right.
&& works like this: if the value on the left produces false when converted to boolean, and if it does it returns that value.  Otherwise it returns the value on the right. */

// Example:
var input = prompt("What is your name?", "Kilgore Trout");
console.log("Well hello " + (input || "dear"));
/* If you give an input, it will return that input, else input will be false when converted to boolean, so it will instead return "dear" */

// Other examples:
false || alert("I'm happening!");
// The above produces an alert
true || alert("Not me.");
// The above does not produce an alert



// #####################################
// Chapter 3
// #####################################

/*
Pure function = always return the same value when given the same argument, and have no side effects.

When control hits "return", it immediately jumps out of the function and returns that value.
*/

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

/*
If you can write something as a pure function, do so, but if you have to use functions with side effects, that’s fine too.

Functions with side effects don’t have to contain a return statement, for example:
*/
function yell(message) {
	alert(message + "!!");
}
// Note that these functions will automatically return undefined.


/* Variables inside functions */

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

/* From the above code, when test() is called, it returns:
inside test, the variable holds 'local'.
inside printVariable, the variable holds 'top-level'.
Because when test() is called, it first looks to see if variable is defined within test, which it is, so variable = "local".  But when printVariable() is called, it doesn’t "see" the variables inside test(), so for printVariable() variable = "top-level"

KEY POINT: when a function is CALLED inside another function, it’s local environment is based on the top level environment, not the function it’s called in.

BUT if the function is DEFINED inside another function (instead of just CALLED in another function), it’s local environment is based on the environment of the function it’s defined inside! */
var variable = "top-level";
function parentFunction() {
	var variable = "local";
	function childFunction() {
		console.log(variable);
	}
	childFunction();
}
parentFunction();
/* Calling parentFunction() returns "local", not "top-level" */

/*
All variables defined "above" a function’s definition (within the program) are visible.  This includes both those at the top-level of the program, and those in function bodies that enclose it.  This approach to variable visibility is called "lexical scoping."  Note that only functions create new scope (special places where variables are defined outside of the top-level environment?), simply surrounding code in curly brackets does not.
*/

/*
Closure:
A closure is a function AND it’s referencing environment.  Closures (unlike plain function pointers) allow a function to access those non-local variables even when invoked outside its immediate lexical scope.  For example: */
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
/* The above call of child will return "local".  Basically, child calls parentFunction(), and parentFunction() returns the result of calling childFunction, which prints variable, with the local definition of variable = "local".
None of this seems weird/novel to me, but apparently it is.

Basically, think of functions as not just a way to package up a computation; think of them as an environment.  Top level functions exist in the top level environment, but functions defined inside functions retain access to the environment that existed at the point it was defined.  For example, if you want to create a bunch of functions that will each add a different amount to a number:
*/
function makeMultiplicationFunction(amount) {
	function multiply(number) {
		return number * amount;
	}
	return multiply;
}
var multiplyFifty = makeMultiplicationFunction(50);
var multiplyThree = makeMultiplicationFunction(3);
console.log(multiplyFifty(50) + multiplyThree(3));
/*
How to think of this:
The multiply function is created when makeMultiplyFunction is called.  It captures an environment in which amount has a specific value, then packages this environment, together with the computation return number + amount, into a value, which is then returned by makeMultiplyFunction.
When the two returned functions are called (multiplyFifty and multiplyThree), a new environment, in which the variable number has a value (either 50 or 3), is created, as a sub-environment of the captured environment (in which amount has a value).
A key thing to note: when I define multiplyFifty, note that it is not returning a value, it is itself returning a function (the multiply function, with amount = 50, and number yet to be set).  makeMultiplicationFunction(50) doesn’t return a value, it returns a function!  Then calling multiplyFifty with an argument returns a number, but it saves the bit about amount being 50.

*****

These same scoping rules allow functions to call themselves!  Functions that call themselves are called recursive functions.  Example:
*/
function power(base, exponent) {
	if (exponent === 0)
		return 1;
	else
		return base * power(base, exponent - 1);
}
console.log(power(10,3));

/*
What happens here?  Exponent != 1, so we go to else.  So we return 10 * power(10,2).  But what is power(10,2)?  It’s 10 * power(10,1), so overall we now have 10 * 10 * power(10,1).  Repeat twice more, and you get 10 * 10 * 10 * 1, at which point we’re no longer returning a function, we’ve just returned numbers and we’re done.

HOWEVER, in JavaScript loops are much cheaper than recursion, which is slow.

****
The stack:
When a function is called, control is given to the body of the function.  When that body returns, control shifts back to the code that called the function.  While the body is running, the computer must remember the context from which the function was called, so that it knows where to continue after.  The place where this context is stored is called the stack.  It’s called the stack because functions can call functions, and if this happens over and over you get a "stack" of contexts.  When a function returns, you remove that level of the stack.  The stack takes up space in memory, and if you have a program that lets it grow too big, you’ll get an error like "out of stack space" or "too much recursion."

Note that functions can be recursive even if they don’t call themselves.  An example would be this broken program (which will return an "out of stack space" error):
*/
function chicken() {
	return egg();
}
function egg() {
	return chicken();
}
console.log(chicken() + " came first.");

/*
Recursion CAN be a much better way to solve problems than loops, depending on the problem.  Problems that are easier to solve with recursion often require exploring or processing several possible "branches," each of which might branch out into more branches.

Example of using recursion to solve a branching problem:
Start with the number 1, and try to find how you can get to number X by any sequence of adding 5 or multiplying by 3.  Return this sequence, or if you can’t get there, return null.
*/

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

/*
How would findSequence(3) work?

Step 1: BIG ASSUMPTION - I assume find() can’t be called since we don’t have "start" and "history", so control moves on?  If so, we move on to:
return find(1, "1");

But what is find(1, "1")?

if section:	1 != 3, move on
else if:		1 !> 3, move on
else:		Start with the first branch, if that fails try the second.
		First branch calls find(6, "(1 + 5)")

This branch will ultimately return null, which means "try the other branch"

This branch works right away!
It calls find(3, "(1 * 3)")

Start == goal, so we return history, therefore find(1, "1") returns "(1 * 3)"

BIG ASSUMPTIONS here are that control just moves on if we try to call a function without defining the parameters, and that returning null means the branch fails.
*/

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

/*
The red part is just a more wordy way of saying the same thing.

Program execution order:
Computer looks up and stores all functions BEFORE it starts running the rest of the program.  Same thing happens with functions defined inside other functions - when the outer function is called, the first thing that happens is that all the inner functions are added to the new environment.
*/

// Another way to define functions:
var add = function(a, b) {
	return a+b;
};
console.log(add(5, 5));

/*
Note the semi-colon after the definition of add!  That’s because the statement has the same structure as something like var add = 22;

You generally make "anonymous" functions like this when you need to refer to them only once, and make named functions otherwise.
*/

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
/*
But we’ve set x to 4.  However, by assigning it to a variable (greaterThanFour), this variable becomes what’s returned by greaterThan(4), including the environment (with x = 4).  So it becomes a function to test if the single input is greater than 4, and since we’re returning y > x, that will be a boolean, either true or false.

Note that you can pass a function the wrong number of arguments in JS, and it doesn’t complain.  This is both good and bad.
*/


// #####################################
// Chapter 4
// Data structures: Objects and Arrays
// #####################################

/*
Properties:
There are two ways to access properties:
*/

var text = "purple haze";
console.log(text["length"]);
console.log(text.length);

/*
Both work, the second is shorthand for the first, and only works when the property would be a valid variable name (no spaces, no symbols, doesn’t start with a digit character).

null and undefined do not have any properties.

Properties are simply values associated with other values.  The properties of a string value cannot be changed, but the properties of objects can.  With objects you’re free to modify, remove and add properties.

An object can be written and manipulated like this:
*/

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


// Putting everything together
var mailArchive = retrieveMails();
// Just imagine this works
// It would bring in output like ["Contents of email 1", "email 2 stuff", "email 3 stuff"]
var livingCats = {"Spot": true};
// This is the single cat she had at the start
function startsWith(a,b) {
	return a.slice(0, b.length) == b;
}
// Returns true if a starts with b, else false
function catNames(paragraph) {
	var names = paragraph.slice(paragraph.indexOf(":") + 2);	// I guess slice automatically goes to end if you only specify a starting point?
	return names.split(", ");	// Split string into an array by ", "
}
// Makes an array of cat names, which come after ":", and are separated by ", "

for (var mail = 0; mail < mailArchive.length; mail++) {
	// We're looping though the mails
	var paragraphs = mailArchive[mail].split("\n");
	// Splits mail into an array of paragraphs
	for (var paragraph = 0; paragraph < paragraphs.length; paragraph++) {
		if(startsWith(paragraphs[paragraph], "born")) {
			var names = catNames(paragraphs[paragraph]);
			for (var name = 0; name < names.length; name++)
				livingCats[names[name]] = true;
		}
	}
}




// Left off at:

// All that remains now is putting the pieces together. One way to do that looks like this:

// http://eloquentjavascript.net/chapter4.html

