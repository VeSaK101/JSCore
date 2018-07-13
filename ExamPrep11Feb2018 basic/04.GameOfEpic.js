function solve(arrOfKingdoms,matrixOfAttacks) {
    let kingdoms = {};
    for (let obj of arrOfKingdoms) {
        if (!kingdoms.hasOwnProperty(obj.kingdom)){
            kingdoms[obj.kingdom]={};
        }
        if (!kingdoms[obj.kingdom].hasOwnProperty(obj.general)){
            kingdoms[obj.kingdom][obj.general] = {};
            kingdoms[obj.kingdom][obj.general]['army'] = 0;
            kingdoms[obj.kingdom][obj.general]['wins'] = 0;
            kingdoms[obj.kingdom][obj.general]['losses'] = 0;
        }
        kingdoms[obj.kingdom][obj.general]['army'] += obj.army
    }
    for (let arr of matrixOfAttacks) {
       let attKingdom = arr[0];
       let attGeneral = arr[1];
       let defKingdom = arr[2];
       let defGeneral = arr[3];


        if(attKingdom === defKingdom) continue;
        let attArmy = kingdoms[attKingdom][attGeneral]['army'];
        let defArmy = kingdoms[defKingdom][defGeneral]['army'];

        // If attArmy > defArmy -> bool > 0
        // If attArmy < defArmy -> bool < 0
        // If attArmy = defArmy -> bool = 0
        let bool = attArmy - defArmy;

        if (bool === 0) continue;

        //att win
        if (bool > 0) {
            kingdoms[attKingdom][attGeneral]['wins'] += 1;
            kingdoms[attKingdom][attGeneral]['army'] = Math.floor(kingdoms[attKingdom][attGeneral]['army'] * 1.1);

            kingdoms[defKingdom][defGeneral]['losses'] += 1;
            kingdoms[defKingdom][defGeneral]['army'] = Math.floor(kingdoms[defKingdom][defGeneral]['army'] * 0.9);

        }
        if (bool < 0){
            kingdoms[defKingdom][defGeneral]['wins'] += 1;
            kingdoms[defKingdom][defGeneral]['army'] = Math.floor(kingdoms[defKingdom][defGeneral]['army'] * 1.1);

            kingdoms[attKingdom][attGeneral]['losses'] +=1;
            kingdoms[attKingdom][attGeneral]['army'] = Math.floor(kingdoms[attKingdom][attGeneral]['army'] * 0.9)

        }
    }

    let sortedKingdoms = Object.keys(kingdoms).sort((a,b) => {
        let aGenerals = Object.keys(kingdoms[a]);
        let aWins = 0;
        let aLosses = 0;
        let bGenerals = Object.keys(kingdoms[b]);
        let bWins = 0;
        let bLosses = 0;
        for (let general of aGenerals) {
            aWins += kingdoms[a][general]['wins'];
            aLosses += kingdoms[a][general]['losses']
        }
        for (let general of bGenerals) {
            bWins += kingdoms[b][general]['wins'];
            bLosses += kingdoms[b][general]['losses']
        }

        if (aWins > bWins) return -1;
        if (aWins < bWins) return 1;

        if (aLosses > bLosses) return 1;
        if (aLosses < bLosses) return -1;

        if (a > b) return 1;
        if (a < b) return -1;

    });
    let winner = sortedKingdoms.shift();

    let sortedGenerals = Object.keys(kingdoms[winner]).sort((a,b) => {
        let aArmy = kingdoms[winner][a]['army'];
        let bArmy = kingdoms[winner][b]['army'];

        if (a > b) return 1;
        if (a < b) return -1;
    });
    console.log(`Winner: ${winner}`);
    for (let general of sortedGenerals) {
        console.log(`/\\general: ${general}`);
        console.log(`---army: ${kingdoms[winner][general]['army']}`);
        console.log(`---wins: ${kingdoms[winner][general]['wins']}`);
        console.log(`---losses: ${kingdoms[winner][general]['losses']}`);
    }

}
solve([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]
)
solve([ { kingdom: "Stonegate", general: "Ulric", army: 5000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 5000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 1000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Maiden Way", "Berinon", "YorkenShire", "Quinn"] ]
)
solve([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Doran"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"] ]
)