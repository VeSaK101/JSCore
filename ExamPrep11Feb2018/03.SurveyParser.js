function solve(str) {
    let surveyRegex = /<svg>.+<\/svg>/g;
    let catRegex = /(<cat>.*?<\/cat>)\s*(<cat>.*?<\/cat>)/g;
    let textRegex = /<text>.*\[(.+)]<\/text>/g;
    let valsRegex = /<g><val>([1-9]|10)<\/val>([0-9]+)<\/g>/g;

    if (!str.match(surveyRegex)) return 'No survey found';
    if (!str.match(catRegex)) return 'Invalid format';
    if (str.match(catRegex).length > 1) return 'Invalid format';

    let x = catRegex.exec(str);
    let cat1 =x[1];
    let cat2 =x[2];


    if (!cat1.match(textRegex)) return 'Invalid format';
    let label = textRegex.exec(cat1)[1];

    if (!cat2.match(valsRegex)) return 'Invalid format';

    let valMatches = cat2.match(valsRegex);
    let totalRating = 0;
    let count = 0;
    for (let inp of valMatches) {
        let exec = valsRegex.exec(cat2);
        let val = +exec[1];
        let votes = +exec[2];

        count += votes;
        totalRating += val * votes
    }


    let average = totalRating/count;
    let roundedAverage = roundToTwo(average);
    return (`${label}: ${roundedAverage}`);

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
}

console.log(solve('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>'));

console.log(solve('<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>'));
console.log(solve('<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It\'s great, don\'t mess with it!</p><p>I\'d like to have the option for delivery</p>'));
console.log(solve('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>'));