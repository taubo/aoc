const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

var expense_report_entries = [];
var solutions = new Set();

readInterface.on('line', function(line) {
    expense_report_entries.push(line);
});

readInterface.on('close', function() {
    // "smart LOL"
    expense_report_entries.forEach(function(elem) {
        if (elem > 2020)
            return;

        diff = 2020 - elem;
        found = expense_report_entries.find(function(elem) {
            return elem == diff;
        })

        if (found != undefined) {
            // console.log("Found correct diff for elem: " + elem + " being: " + diff + " at position: " + found);
            solution = diff * elem;
            solutions.add(solution);
        }
    });
    for (let items of solutions) console.log("solution: " + items);
})

var sums = [];

readInterface.on('close', function() {
    // naive
    for (let i = 0; i < expense_report_entries.length; ++i) {
        for (let j = 0; j < expense_report_entries.length; ++j) {
            for (let k = 0; k < expense_report_entries.length; ++k) {
                if ((+expense_report_entries[i] + +expense_report_entries[j] + +expense_report_entries[k]) == 2020) {
                    console.log("solution: " + expense_report_entries[i] * expense_report_entries[j] * expense_report_entries[k]);       
                    return;
                }
            }
        }
    }
})