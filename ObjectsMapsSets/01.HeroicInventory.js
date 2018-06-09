function solve(arr) {
    let heroData = [];

    for (let str of arr) {
        let [name,level,items] = str.split(/ \/ /)
        if (items !== undefined){
            items =  items.split(/, /)

        }
        else items = [];

        level = +level;
        let obj = {name:name,level:level,items:items};
        heroData.push(obj);
    }

    console.log(JSON.stringify(heroData));

}

solve(['Isacc / 25 ' ,
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']);