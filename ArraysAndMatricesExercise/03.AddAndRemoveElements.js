function solve(arr) {
    let count = 1;
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let comm = arr[i];
        if (comm ==='add'){
            result.push(count);
        }
        else if(comm === 'remove'){
            result.pop();
        }
        count++;
    }
    if (result.length > 0){
        console.log(result.join('\n'));
    }
    else {
        console.log('Empty');
    }
}

solve(['add','add','add','add']);
solve(['add','add','remove','add','add']);
solve(['remove','remove','remove']);