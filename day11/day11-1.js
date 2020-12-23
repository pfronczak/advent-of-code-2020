const fs = require('fs')

const seatMap = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/).map(row => ['.', ...row.split(''), '.']);
const WIDTH = seatMap[0].length;

seatMap.unshift(Array(WIDTH).fill('.'));
seatMap.push(Array(WIDTH).fill('.'));
const HEIGHT = seatMap.length;


const adjacent = (seatMap, posX, posY) => {
    const result = [];
    for (let y = posY - 1; y <= posY + 1; y++) {
        for (let x = posX - 1; x <= posX + 1; x++) {
            if (x == posX && y == posY) continue;
            result.push(seatMap[y][x]);
        }
    }
    return result;
}

let prevMap = JSON.parse(JSON.stringify(seatMap));
let curMap = [...Array(HEIGHT)].map(r => Array(WIDTH).fill('.'));

// console.log(prevMap);

while (true) {
    for (let y = 1; y < HEIGHT - 1; y++) {
        for (let x = 1; x < WIDTH - 1; x++) {
            curMap[y][x] = prevMap[y][x];
            const adj = adjacent(prevMap, x, y);
            if (prevMap[y][x] == 'L') {
                if (!adj.some(s => s == '#')) {
                    curMap[y][x] = '#'
                }
            } else if (prevMap[y][x] == '#') {
                if (adj.filter(s => s == '#').length >= 4) {
                    curMap[y][x] = 'L'
                }
            }
        }
    }
    // console.log(curMap);

    if (JSON.stringify(prevMap) == JSON.stringify(curMap)) {
        break;
    }

    prevMap = JSON.parse(JSON.stringify(curMap));
    curMap = [...Array(HEIGHT)].map(r => Array(WIDTH).fill('.'));
}

console.log(curMap.reduce((sum, r) => sum + r.filter(s => s == '#').length, 0));