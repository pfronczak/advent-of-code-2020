const fs = require('fs')

const adapters = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(Number);
adapters.sort((a, b) => a - b);

const sequences = [];
let prevOutput = 0;
let currSequence = 1;
for (let x of adapters) {
    if (x - prevOutput == 1) {
        currSequence++;
    } else {
        sequences.push(currSequence);
        currSequence = 1;
    }
    prevOutput = x;
}
sequences.push(currSequence);
console.log(sequences.filter(s => s > 2));
const combinations = new Map([
    [1, 2],
    [2, 4],
    [3, 7]
])
console.log(sequences.filter(s => s > 2).map(s => combinations.get(s - 2)).reduce((a, b) => a * b));