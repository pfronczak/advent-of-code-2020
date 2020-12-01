const fs = require('fs')

const entries = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(Number);

for (let i = 0; i < entries.length - 1; i++) {
    for (let j = i + 1; j < entries.length; j++) {
        if (entries[i] + entries[j] == 2020) {
            console.log(entries[i], entries[j], entries[i] * entries[j]);
            return;
        }
    }
}