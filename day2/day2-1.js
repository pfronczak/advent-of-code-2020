const fs = require('fs')

const passwords = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

let validPasswordsCount = 0;
for (const passLine of passwords) {
    const [, minCount, maxCount, char, password] = passLine.match(/(\d+)-(\d+) (\w): (\w+)/);
    let charCount = 0;
    for (const c of password) {
        if (c == char) {
            charCount++;
        }
    }
    if (charCount >= minCount && charCount <= maxCount) {
        validPasswordsCount++;
        console.log(password);
    }
}

console.log(validPasswordsCount);
