#!/usr/local/bin/node

var http = require("http");

var dataUrl = {
	  host: 'hyperpublic.com'
	, port: 80
	, path: '/challenge2input.txt'
};

function User (id) {
	this.id = id;
	this.children = {};
}
User.prototype.id = -1;
User.prototype.children = null;
User.prototype.getScore = function User__getScore () {
	var score = 0;
	for (var id in this.children) {
		score += 1 + this.children[id].getScore();
	}
	return score;
}

var reChild = /x/ig;

function parseData (data) {
	var dataRows = data.split(/[\r\n]+/g);
	var usersFlat = {};
	var usersTree = {};

	var totalChildren = 0;
	var parentId;
	for (parentId = 0; parentId < dataRows.length; parentId++) {
		var dataRow = dataRows[parentId];
		if (!dataRow.length) {
			continue;
		}

		if (!usersFlat[parentId]) {
			usersFlat[parentId] = new User(parentId);
			usersTree[parentId] = usersFlat[parentId];
		}
		var user = usersFlat[parentId];

		var found;
		while (found = reChild.exec(dataRow)) {
			totalChildren++;
			var childId = found.index;
			if (!usersFlat[childId]) {
				usersFlat[childId] = new User(childId);
			}
			user.children[childId] = usersFlat[childId];
			delete(usersTree[childId]);
		}
	}
	
	var topScores = [];
	var id;
	for (id in usersTree) {
		topScores.push([id, usersTree[id].getScore()]);
	}
	topScores.sort(function (a, b) {
		if (a[1] === b[1]) {
			return 0;
		}
		return (a[1] > b[1]) ? -1 : 1;
	});
	console.log('' + topScores[0][1] + topScores[1][1] + topScores[2][1]);
}

http.get({
	  host: dataUrl.host
	, port: dataUrl.port
	, path: dataUrl.path
	}, function (response) {
	var data = '';
	response.setEncoding('ascii');
	response.on('data', function (chunk) {
		data += chunk;
	});
	response.on('end', function () {
		parseData(data);
	})
}).on('error', function (e) {
	console.log("Error fetching data: " + e.message);
});
