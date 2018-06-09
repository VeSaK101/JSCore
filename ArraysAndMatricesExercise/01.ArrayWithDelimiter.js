function solve(arr) {
    let delimiter = arr.pop();

    console.log(arr.join(delimiter));

}

solve(['one','two','three','four','-']);