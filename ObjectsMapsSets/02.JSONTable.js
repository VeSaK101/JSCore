function solve(arr) {
    let result = '<table>\n';

    for (let str of arr) {
        let obj = JSON.parse(str);
        result += '    <tr>\n';
        for (let val in obj) {
            result += `        <td>${obj[val]}</td>\n`;
        }
        result += '    <tr>\n';
    }
    result += '</table>';

    console.log(result);


    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}']);