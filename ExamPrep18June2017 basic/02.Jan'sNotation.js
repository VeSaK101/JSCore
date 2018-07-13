function solve(arr) {
    let operands = [];
    let operator = [];
    for (let arg of arr) {
        if(typeof arg === "number"){
            operands.push(arg)
        }
        else{
            operator.push(arg)
        }
    }
    if (operands.length-1 > operator.length){
        return 'Error: too many operands!'
    }
    else if(operands.length-1 < operator.length){
        return'Error: not enough operands!'
    }
    else{
        let len = operator.length;
        for (let i = 0; i < len; i++) {
            let secondOp = operands.pop();
            let firstOp = operands.pop();
            let op = operator.shift();

            let result;

            switch (op){
                case '+' : result = firstOp + secondOp; break;
                case '-' : result = firstOp - secondOp; break;
                case '*' : result = firstOp * secondOp; break;
                case '/' : result = firstOp / secondOp; break;
            }

            operands.push(result);

        }
        return operands.join('')
    }
}

console.log(solve([-1, 1, '+', 101, '*', 18, '+', 3, '/']
));
console.log(solve([15,
    '/']
));
console.log(solve([31,
    2,
    '+',
    11,
    '/']
));
console.log(solve([5,
    3,
    4,
    '*',
    '-']
));