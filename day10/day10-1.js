const fs = require('fs')

const adapters = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(Number);
adapters.sort((a, b) => a - b);

const differences = new Map([
    [1, 0],
    [2, 0],
    [3, 1],
]);
let prevOutput = 0;
for (let x of adapters) {
    differences.set(x - prevOutput, differences.get(x - prevOutput) + 1);
    prevOutput = x;
}
console.log(differences, differences.get(1) * differences.get(3));