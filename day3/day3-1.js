const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const slopeMap = new Map();
for (let y = 0; y < lines.length; y++) {
    let line = lines[y].split('');
    for (let x = 0; x < line.length; x++) {
        slopeMap.set(`${x},${y}`, line[x]);
    }    
}

const width = lines[0].length;
let treesCount = 0;
let pos = { x: 0, y: 0 };
while (pos.y < lines.length) {
    if (slopeMap.get(`${pos.x},${pos.y}`) == '#') {
        treesCount++;
    }
    pos.x = (pos.x + 3) % width;
    pos.y += 1;
}

console.log(treesCount);