function solve(str) {
    let messageRegex = /^<message ((?:[a-z]+="[a-zA-Z0-9 .]+"\s*)+)>(.+(\r\n|\r|\n)?.+)<\/message>$/g;
    let toReg = /to+="[a-zA-Z0-9 .]+"/g;
    let fromReg = /from+="[a-zA-Z0-9 .]+"/g;
    if(!str.match(messageRegex)){
        console.log('Invalid message format');
        return;
    }

    let from = (str.indexOf(str.match(fromReg)));
    let to = (str.indexOf(str.match(toReg)));
    if (from < 0 || to < 0) {
        console.log('Missing attributes');
        return;
    }

    let sender = /"(.+?)"/g.exec(str.match(fromReg)[0])[1];
    let receiver = /"(.+?)"/g.exec(str.match(toReg)[0])[1];
    let message = (messageRegex.exec(str)[2]).split(/\r\n|\r|\n/g);
    console.log('<article>');
    console.log(`  <div>From: <span class="sender">${sender}</span></div>`)
    console.log(`  <div>To: <span class="recipient">${receiver}</span></div>`)
    console.log('<div>');
    for (let msg of message) {
        console.log(`    <p>${msg}</p>`)
    }
    console.log('</div>');
    console.log('</article>');
}

//(solve('<message from="Alice" timestamp="1497254112">This is a test</message>'));
 (solve('<message to="MasterBlaster" from="TheAnimal" timestamp="1497254114">Same old, same old\\nLet\'s go out for a beer</message>'));
 solve('<message from="Ivan Ivanov" to="Grace">Not much, just chillin. How about you?</message>')
solve('<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old\n' +
    'Let\'s go out for a beer</message>')