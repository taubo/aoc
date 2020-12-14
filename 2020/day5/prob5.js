const { assert } = require('console');
const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

function binaryPartitioningValue(seatCode, min, max) {
    let current = 0;

    for (const c of seatCode) {
        // naive: another simple solution could be to use a map
        if ((c == 'F') || (c == 'L'))  {
            max -= Math.ceil((max - min) / 2); 
        } else if ((c == 'B') || (c == 'R')) {
            min += Math.ceil((max - min) / 2);
        }
    }
    if (min == max) {
        current = min;
    } else {
        assert("ERROR");
    }

    return current;
}

function getRow(seatCode) {
    let min = 0;
    let max = 127;
    let current = 0;

    current = binaryPartitioningValue(seatCode, min, max);

    return current;
}

function getColumn(seatCode) {
    let min = 0;
    let max = 7;
    let current = 0;

    current = binaryPartitioningValue(seatCode, min, max);

    return current;
}

let allSeat = [];

function probA() {
    let row = 0;
    let col = 0;
    let max = 0;

    readInterface.on('line', (line) => {
        var seat = {
            'row': getRow(line.slice(0, 7)),
            'col': getColumn(line.slice(7, 10)),
        }
        product = (seat.row * 8) + seat.col;
        if (product > max)
            max = product;
    });

    readInterface.on('close', () => {
        console.log("solution: " + max);
    })
}

function probB() {
    let row = 0;
    let col = 0;

    readInterface.on('line', (line) => {
        var seat = {
            'row': getRow(line.slice(0, 7)),
            'col': getColumn(line.slice(7, 10)),
        }
        allSeat.push(seat);
    });

    readInterface.on('close', () => {
        // console.log("solution: " + max);
        allSeat.sort((a, b) => {
            if (a.row > b.row) {
                return 1;
            } else if (a.row < b.row) {
                return -1;
            } else {
                if (a.col >= b.col) {
                    return 1;
                } else {
                    return -1;
                }
            }
        })

        for (i = 5; i < 110; ++i) {
            for (j = 0; j < 8; ++j) {
                found = allSeat.find((elem) => {
                    return (elem.row == i && elem.col == j);
                })
                // console.log(found);
                if (found == undefined) {
                    id = (i * 8) + j;
                    console.log("solution: " + id);
                }
            }
        }
    })
}

probA();
probB();