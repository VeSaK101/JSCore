function solve(arr) {
    arr = arr.map(Number);
    arr.unshift(0);
    let bitcoins = 0;
    let money = 0;
    let firstDay = Number.POSITIVE_INFINITY;
    for (let i = 1; i < arr.length; i++) {
        let gold = 0;
        if (i % 3 === 0){
            gold = arr[i]*0.7;
        }
        else{
            gold = arr[i];
        }
        money += gold*67.51;

        if (money >= 11949.16){
            bitcoins += Math.floor(money/11949.16);
            let todaysCoin = Math.floor(money/11949.16);
            money -= 11949.16*todaysCoin;
            if (i < firstDay){
                firstDay = i;
            }
        }

    }
    console.log(`Bought bitcoins: ${bitcoins}`);
    if (bitcoins > 0){
        console.log(`Day of the first purchased bitcoin: ${firstDay}`)
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`)

}
solve(['50', '100']);