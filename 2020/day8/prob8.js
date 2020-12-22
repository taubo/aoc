const { exec } = require('child_process');
const fs = require('fs');
const { runInContext } = require('vm');
const filename = process.argv[2];
const input = String(fs.readFileSync(filename));

prog = input.split('\n')
    .map(elem => { [opcode, arg] = elem.split(" "); return { 'opcode': opcode, 'arg': parseInt(arg) }; });

// console.log(prog);

function execute(state, currentInstruction) {
    let acc = state.acc;
    let nextRow = state.currentRow;

    switch (currentInstruction.opcode) {
        case 'acc':
            acc += currentInstruction.arg;
            nextRow += 1;
            break;
        case 'jmp':
            nextRow += currentInstruction.arg;
            break;
        case 'nop':
            nextRow += 1;
            break;
        default:
            break;
    }
    return { 'acc': acc, 'currentRow': nextRow };
}

let instructionMap = new Set();

function run(prog, state) {
    newState = execute(state, prog[state.currentRow]);
    console.log(prog[state.currentRow]);
    console.log(state.currentRow);

    if (instructionMap.has(newState.currentRow)) {
        console.log("solution: ", state.acc);
        return;
    } else {
        instructionMap.add(newState.currentRow);
    }

    run(prog, newState);
}

function probA() {

}

function probB() {

}

let initialState = { 'acc': 0, 'currentRow': 0 };
// run(prog, initialState);

instructionMap.clear();
progFix = prog;
// progFix[295] = { opcode: 'nop', arg: 239 };
// run(progFix, initialState);

offset = 109;
index = 0;
boh = prog.map((elem, idx) => {
    if ((elem.opcode == 'nop') || (elem.opcode == 'jmp')) {
        if ((elem.arg + idx) == prog.length - offset) {
            index = idx;
            console.log("new offset: ", prog.length - idx);
            console.log(elem);
            return true;
        }
        return false;
    } else
        return false;
});
// for (b of boh) {
    // console.log(b);
// }
console.log("index: ", index);
console.log("offset instruction: ", prog[prog.length - offset]);

probA();
probB();
