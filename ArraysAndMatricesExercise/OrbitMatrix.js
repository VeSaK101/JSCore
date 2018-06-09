function orbit(input) {
    let [width, height, x, y] = input;
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix.push(Array(width).fill());
    }
    matrix.map((row, ri) =>
        row.map((el, i) => matrix[ri][i] = (Math.max(Math.abs(ri - x), Math.abs(i - y))) + 1));

    console.log(matrix.map(e => e.join(' ')).join('\n'));
}
orbit([5,5,2,2]);