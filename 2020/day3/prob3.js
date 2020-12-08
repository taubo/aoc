const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

const startingPosition = {
    'x': 0,
    'y': 0,
};

const slopes = [
    {'dx': 1, 'dy': 1},
    {'dx': 3, 'dy': 1},
    {'dx': 5, 'dy': 1},
    {'dx': 7, 'dy': 1},
    {'dx': 1, 'dy': 2},
];

var currentPosition = startingPosition;

const treeHit = function(line, lineNumber, slope, currentPosition) {
    var hit = false;
    if ((lineNumber % slope.dy) == 0) {
        if (line[currentPosition.x] == '#') {
            hit = true;
        }
        currentPosition.x = (currentPosition.x + slope.dx) % line.length;
        currentPosition.y = currentPosition.y + slope.dy;
    }

    return hit;
}

const partA = function(slope) {
    let lineNumber = startingPosition.y;
    let treesCount = 0;
    readInterface.on('line', (line) => {
        if (treeHit(line, lineNumber, slope, currentPosition)) {
            treesCount++;
        }
        lineNumber++;
    })

    readInterface.on('close', () => {
        console.log("solution: " + treesCount);
    })
}

const partB = function() {
    let lineNumber = startingPosition.y;
    let treesCounts = [0, 0, 0, 0, 0];
    let positions = [];
    for (i = 0; i < treesCounts.length; ++i) {
        positions[i] = {'x': 0, 'y': 0};
    }
    let solution = 1;

    readInterface.on('line', (line) => {
        for (i = 0; i < slopes.length; ++i) {
            if (treeHit(line, lineNumber, slopes[i], positions[i])) {
                treesCounts[i]++;
            }
        }
        lineNumber++;
    })

    readInterface.on('close', () => {
        for (i = 0; i < treesCounts.length; ++i) {
            solution *= treesCounts[i];
        }
        console.log("solution: " + solution);
    })
}

partA(slopes[1]);
partB();