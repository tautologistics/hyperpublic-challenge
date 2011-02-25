#!/usr/local/bin/node

var denominations = [98, 42, 23, 17, 3, 2];
var scores = [2349, 2102, 2001, 1747];

function minCombosFound (scores, combos) {
	var i;
	for (i = 0; i < scores.length; i++) {
		if (!combos[scores[i]]) {
			return false;
		}
	}
	return true;
}

function findMinCombos (denominations, scores) {
	scores.sort();
	var maxScore = scores.slice(-1);
	var minCombos = {};

	var currentCombos = { 0:0 };
	while (!minCombosFound(scores, minCombos)) {
		var oldCombos = currentCombos;
		currentCombos = {};

		var score;
		for (score in oldCombos) {
			score = parseInt(score);
			var minCombo = oldCombos[score];

			var i;
			for (i = 0; i < denominations.length; i++) {
				var denomination = denominations[i];
				var newScore = score + denomination;
				if (newScore <= maxScore && !minCombos[newScore]) {
					currentCombos[newScore] = minCombo + 1;
				}
			}
		}

		var key;
		for (key in currentCombos) {
			minCombos[key] = currentCombos[key];
		}
	}

	var finalCombos = {};
	for (var i = 0; i < scores.length; i++) {
		finalCombos[scores[i]] = minCombos[scores[i]];
	}

	return finalCombos;
}

function multiplyArray (values) {
	var total = 1;
	var i;
	for (i = 0; i < values.length; i++) {
		total *= values[i];
	}
	return total;
}

function extractHashValues (data) {
	var values = [];
	var key;
	for (key in data) {
		values.push(data[key]);
	}
	return values;
}

console.log(multiplyArray(extractHashValues(findMinCombos(denominations, scores))));
