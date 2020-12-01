const fs = require('fs')

const entries = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(Number);

for (let i = 0; i < entries.length - 2; i++) {
    for (let j = i + 1; j < entries.length - 1; j++) {
        for (let k = j + 1; k < entries.length; k++) {
            if (entries[i] + entries[j] + entries[k] == 2020) {
                console.log(entries[i], entries[j], entries[k], entries[i] * entries[j] * entries[k]);
                return;
            }
        }
    }
}