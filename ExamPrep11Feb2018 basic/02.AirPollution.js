function solve(mapArr,forceArr) {
    let matrix = [];
    for (let str of mapArr) {
        let arr = str.split(' ').map(Number);
        matrix.push(arr)
    }
    for (let str of forceArr) {
        let [force, val] = str.split(' ');
        val = +val;

        if (force === 'breeze') {
            matrix[val] = matrix[val].map(n => {
                n -= 15;
                if (n < 0){
                    n = 0;
                }
                return n;
            });
        }
        if (force === 'gale') {
            for (let row of matrix) {
                if (row[val] < 20){
                    row[val] = 0;
                }
                else {
                    row[val] -= 20;
                }
            }
        }
        if (force === 'smog') {
            matrix = matrix.map(row => row.map(num => num + val))
        }
    }
        
    let result = 'Polluted areas: ';
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= 50){
                let poluted = `[${i}-${j}], `;
                result += poluted;
            }
        }
    }
    if (result === 'Polluted areas: '){
        console.log("No polluted areas")
    }
    else{
        result = result.substring(0,result.length-2);
        console.log(result);
    }
}
solve(["5 7 72 14 4",
       "41 35 37 27 33",
       "23 16 27 42 12",
       "2 20 28 39 14",
       "16 34 31 10 24",
      ],
    ["breeze 1",
      "gale 2",
      "smog 25"]);