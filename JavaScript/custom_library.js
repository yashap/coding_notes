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

var op = {
	"+": function(a, b) {return a + b;},
	"*": function(a, b) {return a * b;},
	"/": function(a, b) {return a / b;},
	"==": function(a, b) {return a == b;},
	"===": function(a, b) {return a === b;},
	"!": function(a) {return !a;},
	"!=": function(a, b) {return a != b;},
	"!==": function(a, b) {return a !== b;},
	">": function(a, b) {return a > b;},
	">=": function(a, b) {return a >= b;},
	"<": function(a, b) {return a > b;},
	"<=": function(a, b) {return a >= b;}
};

function asArray(quasiArray, start) {
	var result = [];
	for (var i = (start || 0); i < quasiArray.length; i++)
		result.push(quasiArray[i]);
	return result;
}

function partial(func) {
	var fixedArgs = asArray(arguments, 1);
	return function() {
		return func.apply(null, fixedArgs.concat(asArray(arguments)));
	};
}

function any(testFunc, array) {
	for (var i = 0; i < array.length; i++) {
		var found = testFunc(array[i]);
		if (found)
			return found;		// note that found is the RESULT of calling testFunc on this element
	}
	return false;
}

function every(testFunc, array) {
	for (var i = 0; i < array.length; i++) {
		var found = testFunc(array[i]);
		if (!found)
			return found;
	}
	return true;
}

function member(array, value) {
	return any(partial(op["==="], value), array);
}

function flatten(arrays) {
	var result = [];
	forEach(arrays, function (array) {
		forEach(array, function (element){result.push(element);});
	});
	return result;
}

function filter(testFunc, array) {
	var result = [];
	forEach(array, function(element) {
		if (testFunc(element))
			result.push(element);
	});
	return result;
}
