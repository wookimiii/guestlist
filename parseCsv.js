var fs = require('fs');


var str = fs.readFileSync("seating_chart.csv").toString();
var rows = str.split(/\n/);
var guests = [];
var tableNums;

for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].split(",");
    if (cells[0].indexOf("Table") > -1) {
        tableNums = cells;
    } else {
        for (var j = 0; j < cells.length; j ++) {
            guests.push({
                name: cells[j],
                table: tableNums[j]
            });
        }
    }
}

console.log(guests);

