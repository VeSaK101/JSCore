function solve(rows,cols) {
    let matrix = [];
    let current = 1;
    let last = rows*cols;

    for (let i = 0; i < rows; i++)  matrix.push([]);

    for (let i = 0; i < cols; i++,current++)  matrix[0][i]=current;


    let rowu = 1,rowd = rows-1;
    let coll=0,colr = cols-1;

    while (current<=last){
        for (let i = rowu; i <= rowd; i++,current++)matrix[i][colr] =current;
        if (current>last)break;
        colr--;
        for (let i = colr; i >= coll; i--,current++)matrix[rowd][i] =current;
        if (current>last)break;
        rowd--;
        for (let i = rowd; i >= rowu; i--,current++)matrix[i][coll] =current;
        if (current>last)break;
        coll++;
        for (let i = coll; i <= colr; i++,current++)matrix[rowu][i] =current;
        if (current>last)break;
        rowu++;
    }

    for (let arr of matrix) {
        console.log(arr.join(' '))
    }
}
solve(5,5)