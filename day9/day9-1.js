const fs = require('fs')

const numbers = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(Number);
const PREAMBLE_SIZE = 25;

const dictionary = new Map();
for (let i = 0; i < PREAMBLE_SIZE - 1; i++) {
    for (let j = i + 1; j < PREAMBLE_SIZE; j++) {
        let sum = numbers[i] + numbers[j];
        dictionary.set(sum, dictionary.has(sum) ? dictionary.get(sum) + 1 : 1);
    }
}

for (let i = PREAMBLE_SIZE; i < numbers.length; i++) {
    if (!dictionary.has(numbers[i])) {
        console.log(numbers[i]);
        break;
    }
    updateDictionary(dictionary, i);
}

function updateDictionary(dictionary, pos) {
    for (let i = pos - PREAMBLE_SIZE + 1; i < pos; i++) {
        let sum = numbers[pos - PREAMBLE_SIZE] + numbers[i];
        if (dictionary.get(sum) == 1) {
            dictionary.delete(sum);
        } else {
            dictionary.set(sum, dictionary.get(sum) - 1);
        }
    }
    for (let i = pos - PREAMBLE_SIZE + 1; i < pos; i++) {
        let sum = numbers[i] + numbers[pos];
        dictionary.set(sum, dictionary.has(sum) ? dictionary.get(sum) + 1 : 1);
    }
}