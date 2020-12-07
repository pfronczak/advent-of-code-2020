const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const counts = [];
let questions = new Set();
for (let line of lines) {
    if (line == '') {
        counts.push(questions.size);
        questions = new Set();
        continue;
    }
    line.split('').forEach(v => questions.add(v));
}
counts.push(questions.size);

console.log(counts);
console.log(counts.reduce((a, b) => a + b));