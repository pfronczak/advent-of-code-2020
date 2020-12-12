
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

for (let i = 0; i < instructions.length; i++) {
    const fixedInstr = instructions.map(instr => ({ op: instr.op, param: instr.param }));
    if (fixedInstr[i].op == 'nop') {
        fixedInstr[i].op = 'jmp';
    } else if (fixedInstr[i].op == 'jmp') {
        fixedInstr[i].op = 'nop';
    } else {
        continue;
    }
    const visited = new Set();
    let ip = 0;
    let acc = 0;
    while (ip < fixedInstr.length) {
        let instr = fixedInstr[ip];
        // console.log(instr);
        if (visited.has(ip)) {
            console.log('Infinite loop!');
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
    if (ip >= fixedInstr.length) {
        console.log('Finished!', acc);
        break;
    }
}
