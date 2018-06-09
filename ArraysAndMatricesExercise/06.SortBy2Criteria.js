function solve(arr) {
    arr.sort(function (a,b){
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        
        if (a.toLowerCase() > b.toLowerCase()) return 1
        if (a.toLowerCase() < b.toLowerCase()) return -1
    });
    console.log(arr.join('\n'));
}
solve(['Isacc','Theodor','Jack','Harrison','George']);
solve(['alpha','Beta','Gamma']);
solve(['test','Deny','omen','Default']);