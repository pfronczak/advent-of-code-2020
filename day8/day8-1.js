
const fs = require('fs')

const instructions = fs.readFileSync(process.stdin.fd, 'utf8')
    .split(/\r?\n/)
    .map(instr => {
        let [op, param] = instr.split(' ');
        return {
            op,
            param: Number(param)
        };
    });

const visited = new Set();
let ip = 0;
let acc = 0;
while (true) {
    let instr = instructions[ip];
    console.log(instr);
    if (visited.has(ip)) {
        console.log(acc);
        break;
    }
    visited.add(ip);
    switch (instr.op) {
        case 'nop':
            ip++;
            break;
        case 'acc':
            acc += instr.param;
            ip++;
            break;
        case 'jmp':
            ip += instr.param;
            break;
    }
}