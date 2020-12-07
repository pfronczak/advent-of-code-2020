const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const counts = [];
let commonQuestions = null;
for (let line of lines) {
    if (line == '') {
        counts.push(commonQuestions.size);
        commonQuestions = null;
        continue;
    }
    if (commonQuestions == null) {
        commonQuestions = new Set(line.split(''));
    } else {
        let questions = new Set(line.split(''));
        for (let q of commonQuestions) {
            if (!questions.has(q)) {
                commonQuestions.delete(q);
            }
        }
    }
}
counts.push(commonQuestions.size);

console.log(counts);
console.log(counts.reduce((a, b) => a + b));