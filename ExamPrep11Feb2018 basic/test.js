function solve(arr) {
    console.log(arr.sort((a,b) => {

        if (a>b) return 1
        if (a<b) return -1
    }))
}
solve(['Sandasdasd', 'Scan'])