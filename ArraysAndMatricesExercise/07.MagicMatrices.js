function solve(arr) {
    let magicNum = arr[0].reduce((a,b)=>a+b);

    for (let i = 0; i < arr.length; i++) {
        if (magicNum === arr[i].reduce((a,b)=>a+b)) {
            continue;
        }
        else return false;
    }
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = 0; j < arr.length; j++) {
            sum += arr[j][i];
        }
        if (sum === magicNum)continue;
        else return false;
    }

    return true;
}

console.log(solve([[4, 5, 6],
                   [6, 5, 4],
                   [5, 5, 5]]
));