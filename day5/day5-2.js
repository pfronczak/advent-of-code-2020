const fs = require('fs')

const lines = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

const seats = lines.map(line => {
    let row = parseInt(line.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
    let col = parseInt(line.substr(7, 3).replace(/R/g, '1').replace(/L/g, '0'), 2);
    return {
        row,
        col,
        id: row * 8 + col
    };
});

let seatIds = new Set(seats.map(seat => seat.id));
const maxSeat = Math.max(...seatIds);

for (let i = 0; i < maxSeat; i++) {
    if (!seatIds.has(i) && seatIds.has(i - 1) && seatIds.has(i + 1)) {
        console.log(i);
        return;
    }
}