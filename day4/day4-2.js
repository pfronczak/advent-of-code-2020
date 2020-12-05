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

let validPassports = 0;
for (let pass of passports) {
    let valid = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(key => pass[key]);
    if (!valid) {
        continue;
    }
    
    if (!(parseInt(pass.byr) >= 1920 && parseInt(pass.byr) <= 2002)) {
        continue;
    }
    if (!(parseInt(pass.iyr) >= 2010 && parseInt(pass.iyr) <= 2020)) {
        continue;
    }
    if (!(parseInt(pass.eyr) >= 2020 && parseInt(pass.eyr) <= 2030)) {
        continue;
    }

    if (!/^(\d+)(cm|in)$/.test(pass.hgt)) {
        continue;
    }
    let [, val, unit] = pass.hgt.match(/(\d+)(cm|in)/);
    if (unit == 'cm' && !(parseInt(val) >= 150 && parseInt(val) <= 193)) {
        continue;
    }
    if (unit == 'in' && !(parseInt(val) >= 59 && parseInt(val) <= 76)) {
        continue;
    }

    if (!/^#[0-9a-f]{6}$/.test(pass.hcl)) {
        continue;
    }
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(pass.ecl)) {
        continue;
    }
    if (!/^[0-9]{9}$/.test(pass.pid)) {
        continue;
    }

    console.log([pass.byr, pass.iyr, pass.eyr, pass.hgt, pass.hcl, pass.ecl, pass.pid].join(';'));
    validPassports++;
}

console.log(validPassports);