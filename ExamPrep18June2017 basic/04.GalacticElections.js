function solve(arr) {
    let election = {};
    for (let obj of arr) {
        if (!election.hasOwnProperty(obj.system)){
            election[obj.system] = {};
        }
        if (!election[obj.system].hasOwnProperty(obj.candidate)){
            election[obj.system][obj.candidate] = 0;
        }
        election[obj.system][obj.candidate] += obj.votes;
    }
    let systemWinners = {};
    for (let systemName in election) {
        let winner = Array.from(Object.keys(election[systemName])).sort((a,b) => {
            if (election[systemName][a] > election[systemName][b]) return -1
            if (election[systemName][a] < election[systemName][b]) return 1
        }).shift()
        let totalVotesPerSystem = Object.values(election[systemName]).reduce((a,b) => a+b);
        election[systemName] = {};
        election[systemName][winner] = totalVotesPerSystem;
        if (!systemWinners.hasOwnProperty(winner)){
            systemWinners[winner] = {};
            systemWinners[winner]['votes'] = 0;
            systemWinners[winner]['percent'] = 0;
        }
        systemWinners[winner]['votes'] += totalVotesPerSystem;
    }

    if (Object.keys(systemWinners).length === 1) {
        let winner = Object.keys(systemWinners)[0];
         let votes = Object.values(systemWinners)[0]['votes'];
        console.log(`${winner} wins with ${votes} votes\n` +
            `${winner} wins unopposed!\n`)

        return;
    }
    let totalVotes = 0;

    for (let i = 0; i < Object.values(systemWinners).length; i++) {
       totalVotes += (Object.values(systemWinners)[i]['votes']);

    }

    for (let name in systemWinners) {
        let namePoints = systemWinners[name]['votes'];
        let percents =  Math.floor(namePoints/totalVotes*100);
        systemWinners[name]['percent'] = percents;

    }
    let sortedWin = Object.keys(systemWinners).sort((a,b) => {
        if (systemWinners[a]['percent'] > systemWinners[b]['percent']) return -1;
        if (systemWinners[a]['percent'] < systemWinners[b]['percent']) return 1;
    });

    let winner = sortedWin[0];
    let runner = sortedWin[1];

    if (systemWinners[winner]['percent'] > 50){
        console.log(`${winner} wins with ${systemWinners[winner]['votes']} votes`)
        console.log(`Runner up: ${runner}`)

        let sortedRunnerSys = [];

        for (let electionKey in election) {

            if (Object.keys(election[electionKey])[0] === runner){
                sortedRunnerSys.push(electionKey)
            }
        }
        sortedRunnerSys.sort((a,b) => {
            if (election[a][runner] < election[b][runner]) return 1
            if (election[a][runner] > election[b][runner]) return -1
        })

        for (let sys of sortedRunnerSys) {
            console.log(`${sys}: ${election[sys][runner]}`)
        }


    }
    else {
        console.log(`Runoff between ${winner} with ${systemWinners[winner]['percent']}% and ${runner} with ${systemWinners[runner]['percent']}%`)
    }
}

solve([{system: 'Tau', candidate: 'Flying Shrimp', votes: 150},
    {system: 'Tau', candidate: 'Space Cow', votes: 100},
    {system: 'Theta', candidate: 'Space Cow', votes: 10},
    {system: 'Sigma', candidate: 'Space Cow', votes: 200},
    {system: 'Sigma', candidate: 'Flying Shrimp', votes: 75},
    {system: 'Omicron', candidate: 'Flying Shrimp', votes: 50},
    {system: 'Omicron', candidate: 'Octocat', votes: 75}]
);
// solve([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
//     { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
//     { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
//     { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
//     { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
//     { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 } ]
// )
// solve([ { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
//     { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
//     { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 } ]
// )