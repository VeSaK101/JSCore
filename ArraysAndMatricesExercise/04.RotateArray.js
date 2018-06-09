function solve(arr) {
    let count = Number(arr.pop());
    count %= arr.length;

    for (let i = 0; i < count; i++) {
       let move = arr.pop();
       arr.unshift(move);
    }
    console.log(arr.join(' '));
}
solve(['Banana','Orange','Coconut','Apple','15']);
solve([1,2,3,4,2])