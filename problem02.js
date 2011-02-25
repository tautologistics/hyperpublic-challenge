#!/usr/local/bin/node

/***********************************************
Copyright 2011, Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/

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
