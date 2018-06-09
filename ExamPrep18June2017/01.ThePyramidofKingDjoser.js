function solve(width,increment) {
    let stone = 0;
    let marble = 0;
    let lapisLazuli = 0;
    let gold = 0;
    let steps = 1;

    for (let i = width; i > 0; i-=2) {

        if (i === 1 || i === 2){
            gold += i**2;
            break;
        }

        if (steps % 5 === 0){
            let currLapis = ((i*4)-4);
            lapisLazuli += currLapis*increment;
            stone += ((i*i)- currLapis)*increment;
        }
        else {

            let currMarble = ((i*4)-4);
            marble += currMarble*increment;
            stone += ((i*i)- currMarble)*increment;
        }
         steps++
    }
    let height = Math.floor(steps*increment);
    let totalStone = Math.ceil(stone);
    let totalMarble = Math.ceil(marble);
    let totalLapis = Math.ceil(lapisLazuli);
    let totalGold = Math.ceil(gold);

    console.log(`Stone required: ${totalStone}`);
    console.log(`Marble required: ${totalMarble}`);
    console.log(`Lapis Lazuli required: ${totalLapis}`);
    console.log(`Gold required: ${totalGold}`);
    console.log(`Final pyramid height: ${height}`)
}
// solve(11,1);
// solve(11,0.75);
// solve(12,1);
// solve(23,0.5);
solve(2,0.2)