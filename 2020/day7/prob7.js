const { PRIORITY_ABOVE_NORMAL } = require('constants');
const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)


function parse(filename) {
    let colorMap = new Map();

    readInterface.on('line', (line) => {
        colorDesc = line.split(" contain ");
        let [a, b] = line.split(" contain ");
        colorDescStripped = colorDesc[1].replace('.', '').replace(/bags? ?/g,'');
        // console.log(colorDescStripped);
        colors = colorDescStripped.split(", ");
        // console.log(colors);
        let tmp = new Map(
            colors.map((elem) => {
                re = new RegExp("([0-9]) (.*)");
                let stuff = elem.match(re);
                // console.log(stuff);

                if (stuff != null)
                    return [stuff[2], stuff[1]];
                else
                    return {};
        }));

        aStripped = a.replace(/bags?/g, '');
        colorMap.set(aStripped, tmp);
    });

    return colorMap;
}

function probA(parseStruct) {
    readInterface.on('close', () => {
        let filtered = [];
        let validColors = new Set();
        let colorFilter = ['shiny gold '];
        do {
            col = colorFilter.pop();
            validColors.add(col);
            filtered = new Map([...parseStruct].filter((elem) => {
                return elem[1].has(col);
            }));
            for (c of filtered.keys()) {
                colorFilter.push(c);
            }
        } while (colorFilter.length > 0)

        console.log("solution: " + (validColors.size - 1));
    });
}

let sum = 0;

function probB(parseStruct) {
    readInterface.on('close', () => {
        let filtered = [];
        let validColors = new Set();
        let colorFilter = ['shiny gold '];
        // console.log([...parseStruct]);
        /*
        do {
            col = colorFilter.pop();
            validColors.add(col);
            filtered = new Map([...parseStruct].filter((elem) => {
                return elem[0] == (col);
            }));
            // console.log(filtered);
            vals = filtered.values();
            for (v of vals) {
                for (k of v.keys()) {
                    if (k != undefined) {
                        // console.log(k);
                        colorFilter.push(k);
                    }
                }
            }
        } while (colorFilter.length > 0)
        */

        // console.log("solution: " + (validColors.size - 1));
    });
}

parsedStruct = parse(filename);
probA(parsedStruct);
probB(parsedStruct);