const fs = require('fs')

const passwords = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

let validPasswordsCount = 0;
for (const passLine of passwords) {
    const [, pos1, pos2, char, password] = passLine.match(/(\d+)-(\d+) (\w): (\w+)/);
    if ((password.charAt(pos1 - 1) == char) != (password.charAt(pos2 - 1) == char)) {
        validPasswordsCount++;
        console.log(password);
    }
}

console.log(validPasswordsCount);
