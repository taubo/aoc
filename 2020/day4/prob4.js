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

const expectedFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function validateYear(value, lower, upper) {
    re = new RegExp("[0-9]{4}");
    if (!value.match(re))
        return { 'val': value, 'valid': false };

    if (value >= lower && value <= upper) {
        return { 'val': value, 'valid': true };
    } else {
        return { 'val': value, 'valid': false };
    }
}

function validateByr(value) {
    return validateYear(value, 1920, 2002);
}

function validateIyr(value) {
    return validateYear(value, 2010, 2020);
}

function validateEyr(value) {
    return validateYear(value, 2020, 2030);
}

function validateHgt(value) {
    re = new RegExp("([0-9]*)(in|cm)");
    matchedVal = value.match(re);
    if (!matchedVal) {
        return { 'val': value, 'valid': false };
    } else {
        let height = matchedVal[1];
        switch (matchedVal[2]) {
            case 'in':
                return { 'val': height, 'valid': ((height >= 59 && height <= 76) ? true : false)};
            case 'cm':
                return { 'val': height, 'valid': ((height >= 150 && height <= 193) ? true : false)};
            default:
                break;
        }
    }
}

function validateHcl(value) {
    re = new RegExp("#([0-9]|[a-f]){6}");

    return { 'val': value, 'valid': (value.match(re)) ? true : false };
}

function validateEcl(value) {
    if (eyeColors.find((element) => element == value))
        validColor = true;
    else
        validColor = false;

    return { 'val': value, 'valid': validColor };
}

function validatePid(value) {
    re = new RegExp("[0-9]{9}");

    if (value.match(re)) {
        return { 'val': value, 'valid': true };
    } else {
        return { 'val': value, 'valid': false };
    }
}

const mappal = {
    'byr': (value) => validateByr(value),
    'iyr': (value) => validateIyr(value),
    'eyr': (value) => validateEyr(value),
    'hgt': (value) => validateHgt(value),
    'hcl': (value) => validateHcl(value),
    'ecl': (value) => validateEcl(value),
    'pid': (value) => validatePid(value),
}

class Parser {
    constructor() {
        this.passports = [];
        this.currElem = this.passports[this.passports.length - 1];
        this.currEntry = {};
    }

    parse(input) {
        if (input === "") {
            this.passports.push(this.currEntry);
            this.currElemIndex = this.passports.length - 1;
            this.currEntry = {};
        } else {
            let entries = input.split(" ");
            for (const entry of entries) {
                let property = entry.split(":")[0];
                let value = entry.split(":")[1];

                this.currEntry[property] = value;
            }
        }
    }
}

const probA = function() {
    parser = new Parser();
    let validPassportsCount = 0;

    readInterface.on('line', (line) => {
        parser.parse(line);
    });

    readInterface.on('close', () => {
        for (const passport of parser.passports) {
            let invalidEntry = false;
            for (const prop of expectedFields) {
                let val = passport[prop];
                if ((val == undefined) && (prop != 'cid')) {
                    invalidEntry = true;
                }
            }
            if (!invalidEntry) {
                validPassportsCount++;
            }
        }

        console.log("solution: " + validPassportsCount);
    });
}

const probB = function() {
    parser = new Parser();
    let validPassportsCount = 0;

    readInterface.on('line', (line) => {
        parser.parse(line);
    });

    readInterface.on('close', () => {
        for (const passport of parser.passports) {
            let invalidEntry = false;
            let blah = {};
            for (const prop of expectedFields) {
                let val = passport[prop];
                if (prop != 'cid' && val != undefined) {
                    blah = mappal[prop](val);
                    // console.log(prop);
                    // console.log(blah);
                    if ((blah.valid == false)) {
                        invalidEntry = true;
                    }
                    passport[prop] = blah;
                }
                if ((val == undefined) && (prop != 'cid')) {
                    invalidEntry = true;
                }
            }

            console.log("valid: " + !invalidEntry);
            console.log(passport);
            if (!invalidEntry) {
                validPassportsCount++;
            }
        }

        console.log("solution: " + validPassportsCount);
    });
}

probA();
probB();