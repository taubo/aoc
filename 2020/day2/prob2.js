
const fs = require('fs');
const readline = require('readline');

const filename = process.argv[2]; 
console.log(filename);

const readInterface = readline.createInterface(
    {
        input: fs.createReadStream(filename)
    }
)

passwordPolicyRegExp = new RegExp("([0-9]*)-([0-9]*) ([a-z])");

const validatePasswordPart1 = function(password, passwordPolicy) {
    var characterRe = new RegExp(passwordPolicy.character, 'g');
    var len = (password.match(characterRe) || []).length;

    if (len >= passwordPolicy.minNumCharacters && len <= passwordPolicy.maxNumCharacters)
        return true;
    else
        return false;
};

const xor = function(a, b) {
    return ((a && !b) || (!a && b))
};

const validatePasswordPart2 = function(password, passwordPolicy) {
    cond1 = (password[passwordPolicy.minNumCharacters] == passwordPolicy.character); 
    cond2 = (password[passwordPolicy.maxNumCharacters] == passwordPolicy.character); 
    if (xor(cond1, cond2))
        return true;
    return false;
};

var validPasswordsCountPart1 = 0;
var validPasswordsCountPart2 = 0;

const solve = function(validateFunction) {
    var validPasswordsCount = 0;
    readInterface.on('line', (line) => {
        var passwordPolicyParsed = line.split(":")[0]
            .match(passwordPolicyRegExp);

        var passwordPolicyInfo = {
            minNumCharacters: passwordPolicyParsed[1],
            maxNumCharacters: passwordPolicyParsed[2],
            character: passwordPolicyParsed[3],
        };
        // console.log(passwordPolicyInfo);

        var password = line.split(":")[1];
        if (validateFunction(password, passwordPolicyInfo)) {
            validPasswordsCount++;
        }
    })

    readInterface.on('close', () => {
        console.log("solution: " + validPasswordsCount);
    })
}


validPasswordsCountPart1 = solve(validatePasswordPart1);
validPasswordsCountPart2 = solve(validatePasswordPart2);