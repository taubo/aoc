const { group } = require('console');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');
const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

const readInterfaceB = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

class Parser {
    constructor(callback) {
        this.callback = callback;
    }

    parse(input) {
        if (input === "")
            this.callback({'evt': 'new'});
        else
            this.callback({'evt': 'answers', 'input': input});
    }
}

let answersSets = [new Set()];

function onParserEvent(event) {
    switch (event.evt) {
        case 'new':
            set = new Set();
            answersSets.push(set);
            break;
        case 'answers':
            console.log(event.input);
            for (const c of event.input) {
                answersSets[answersSets.length - 1].add(c);
            }
            break;
    }
}

let ansB = []; 
let B = [];

function onParserEventPartB(event) {
    switch (event.evt) {
        case 'new':
            B.push({ 'size': ansB.length, 'answers': ansB });
            ansB = [];
            break;
        case 'answers':
            ansB.push(event.input);
            break;
    }
}

function probA() {
    let sum = 0;
    parser = new Parser(onParserEvent);

    readInterface.on('line', (line) => parser.parse(line));
    readInterface.on('close', () => {
        for (const elem of answersSets) {
            sum += elem.size;
        }
        console.log("solution A: " + sum);
    });
}

function probB() {
    let sum = 0;
    parser = new Parser(onParserEventPartB);

    let ansMap = new Map();

    readInterfaceB.on('line', (line) => parser.parse(line));
    readInterfaceB.on('close', () => {
        for (elem of B) {
            // console.log(elem);
            let i = 0;
            for (string of elem.answers) {
                [...string].map((el) => {
                    let count = ansMap.get(el);
                    if (count != undefined)
                        ansMap.set(el, count + 1);
                    else
                        ansMap.set(el, 1);
                });
                for (m of ansMap.values()) {
                    if (m == elem.size) {
                        sum++;
                    }
                }
            }
            ansMap.clear();
        }
        console.log("solution B: " + sum);
})
}

probA();
probB();