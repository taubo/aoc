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
            for (const c of event.input) {
                answersSets[answersSets.length - 1].add(c);
            }
            break;
    }
}

let ansB = []; 
let ansSetB = new Set();

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
        console.log("solution: " + sum);
    });
}

function probB() {
    let sum = 0;
    parser = new Parser(onParserEventPartB);

    readInterfaceB.on('line', (line) => parser.parse(line));
    readInterfaceB.on('close', () => {
        for (elem of B) {
        }
    });
}

probA();
probB();