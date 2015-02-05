var fs = require('fs');
var _ = require('underscore');


var str = fs.readFileSync("seating_chart.csv").toString();
var rows = str.split(/\n/);
var guests = {};
var tableNums;
var name;

for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].split(",");
    if (cells[0].indexOf("Table") > -1) {
        tableNums = cells;
    } else {
        for (var j = 0; j < cells.length; j ++) {
            name = cells[j].trim();
            if (name.length && guests[name]) {
                guests[name].count++;
            } else {
                guests[name] = {
                    name: cells[j],
                    table: tableNums[j].replace("Table", "").trim(),
                    count: 1
                };
            }
        }
    }
}

guests = _.sortBy(_.values(guests), function (a) {
    return parseInt(a.table);
});

console.log("var GUESTS = ");
console.log(guests);
