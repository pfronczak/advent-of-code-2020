const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const slopeMap = new Map();
for (let y = 0; y < lines.length; y++) {
    let line = lines[y].split('');
    for (let x = 0; x < line.length; x++) {
        slopeMap.set(`${x},${y}`, line[x]);
    }    
}

const result = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
].map(([dx, dy]) => getTreesCount(slopeMap, lines[0].length, lines.length, dx, dy))
.reduce((a, b) => a * b);

console.log(result);

function getTreesCount(slopeMap, width, height, dx, dy) {
    let treesCount = 0;
    let pos = { x: 0, y: 0 };
    while (pos.y < height) {
        if (slopeMap.get(`${pos.x},${pos.y}`) == '#') {
            treesCount++;
        }
        pos.x = (pos.x + dx) % width;
        pos.y += dy;
    }
    console.log(treesCount);
    return treesCount;
}