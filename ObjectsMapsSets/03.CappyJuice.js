function solve(arr) {
    let temp = {};
    let result = new Map();
    for (let str of arr) {
        let [flavor, quantity] = str.split(/ => /g);
        quantity = +quantity;
        if (!temp.hasOwnProperty(flavor)){
            temp[flavor]=0;
        }
        temp[flavor]+= quantity;

        if (temp[flavor] >= 1000){
            let bottles = Math.floor(temp[flavor] / 1000);
            temp[flavor] %= 1000;

            if (!result.has(flavor)){
                result.set(flavor,0);
            }
            result.set(flavor,result.get(flavor)+bottles);
        }
    }
    for (let [k,v] of result) {
        console.log(`${k} => ${v}`);
    }
}
solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']);