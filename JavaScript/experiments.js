// #####################################
// My version of a NoSQL database (without persistent storage)
// #####################################

// Empty "database"
var dataBase = {};
// Add some users
dataBase[123] = {
	"firstName": "Bob",
	"secondName": "Joey",
	"purchases": [
		{"date": '2013-04-25', "amount": 25, "part": "Nut"},
		{"date": '2013-04-27', "amount": 15, "part": "Bolt"}
	]
};
dataBase[124] = {
	"firstName": "Joe",
	"secondName": "Jones",
	"purchases": [
		{"date": '2010-04-25', "amount": 25, "part": "Nut"},
		{"date": '2013-04-26', "amount": 15, "part": "Bolt"}
	]
};
// Explore the data
console.log(dataBase);
console.log(dataBase[123]);
console.log(dataBase[124]);
// Add some data
dataBase[123]["country"] = "Canada";
dataBase[123]["purchases"].push({"date": '2013-04-30', "amount": 500, "part": "Hammer"});
dataBase[123]["purchases"].push({"date": '2013-05-02', "amount": 2, "part": "Nail"});
// Explore
console.log(dataBase[123]["purchases"][1]["date"]);
// Function to sum all purchases in date range
function purchaseSum(startString, endString) {
	start = new Date(startString);
	end = new Date(endString);
	total = 0;
	for (var user in dataBase) {
		thisUser = dataBase[user];
		userPurchases = thisUser["purchases"];
		for (var purchaseNum = 0; purchaseNum < userPurchases.length; purchaseNum++) {
			thisPurchase = userPurchases[purchaseNum];
			thisDate = new Date(thisPurchase["date"]);
			if (thisDate >= start && thisDate <= end)
				total += thisPurchase["amount"];
		}
	}
	return total;
}
// Same function implemented with forEach
//   Note that I have definited the function called by forEach outside forEach, because you shouldn't define functions within loops
function purchaseSum2(startString, endString) {
	start = new Date(startString);
	end = new Date(endString);
	total = 0;
	function sumDateRange(thisPurchase) {
		thisDate = new Date(thisPurchase["date"]);
		if (thisDate >= start && thisDate <= end)
			total += thisPurchase["amount"];
	}
	for (var user in dataBase) {
		userPurchases = dataBase[user]["purchases"];
		forEach(userPurchases, sumDateRange);
	}
	return total;
}
// Call function
console.log(purchaseSum('2013-01-01', '2013-04-29'));
console.log(purchaseSum2('2013-01-01', '2013-04-29'));


