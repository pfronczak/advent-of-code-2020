const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const passports = [];
let passport = {};
for (let line of lines) {
    if (line == '') {
        passports.push(passport);
        passport = {};
        continue;
    }

    let pairs = line.split(/\s+/);
    for (let pair of pairs) {
        let [key, val] = pair.split(':');
        passport[key] = val;
    }
}
passports.push(passport);

// console.log(passports);

let validPassports = 0;
for (let pass of passports) {
    let valid = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(key => pass[key]);
    if (valid) {
        validPassports++;
    }
}

console.log(validPassports);