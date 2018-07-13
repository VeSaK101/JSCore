class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for(let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for(let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}
let str = new StringBuilder('hello');
console.log(str.toString());

str.append(', there');
str.prepend('User, ');
str.insertAt('woop',5 );
console.log(str.toString());
str.remove(6, 3);
console.log(str.toString());

let expect = require('chai').expect

describe('TestStringBuilder',function () {
    it('has functions attached to prototype', function () {
        let builder = new StringBuilder()
        expect(Object.getPrototypeOf(builder).hasOwnProperty('append')).to.equal(true, "Missing append function");
        expect(Object.getPrototypeOf(builder).hasOwnProperty('prepend')).to.equal(true, "Missing prepend function");
        expect(Object.getPrototypeOf(builder).hasOwnProperty('insertAt')).to.equal(true, "Missing insertAt function");
        expect(Object.getPrototypeOf(builder).hasOwnProperty('remove')).to.equal(true, "Missing remove function");
        expect(Object.getPrototypeOf(builder).hasOwnProperty('toString')).to.equal(true, "Missing toString function");
    });


    it('should instantiate properly', function () {
        let str = new StringBuilder('hello')
        expect(str.toString()).to.be.equal('hello')
    });
    it('should instantiate properly', function () {
        let str = new StringBuilder()
        expect(str.toString()).to.be.equal('')
    });
    it('should throw Error for anything different than string', function () {
        expect(function () {
            let str = new StringBuilder({})
        }).to.throw('Argument must be string')
    });
    it('should throw Error for anything different than string', function () {
        expect(function () {
            let str = new StringBuilder(23)
        }).to.throw('Argument must be string')
    });


    describe('test append()',function () {
        it('should return \'hello, there\' for str.append(variable) ', function () {
            let str = new StringBuilder('hello')
            let variable = ', there'
            str.append(variable)
            expect(str.toString()).to.be.equal('hello, there')
        });
        it('should throw Error for str.append({not string})', function () {
            let str = new StringBuilder('hello')
            expect(function () {
                str.append(23)
            }).to.throw('Argument must be string')
        });
    })
    describe('test prepend()',function () {
        it('should return \'\'User, hello\'\' for str.append(variable) ', function () {
            let str = new StringBuilder('hello')
            let variable = 'User, '
            str.prepend(variable)
            expect(str.toString()).to.be.equal('User, hello')
        });
        it('should throw Error for str.prepend({not string})', function () {
            let str = new StringBuilder('hello')
            expect(function () {
                str.prepend(23)
            }).to.throw('Argument must be string')
        });
    })
    describe('test insertAt()',function () {
        it('inserts correctly', function () {
            let builder = new StringBuilder('hello')
            let str = 'kek';
            builder.insertAt(str, 3);
            let expected = Array.from('hello');
            expected.splice(3, 0, ...str);
            compareArray(builder._stringArray, expected);
        });
        it('should return (\'hellowoop\' ); str.insertAt(\'woop\',5 ); ', function () {
            let str = new StringBuilder('hello')
            let variable = 'woop'
            str.insertAt(variable,5)
            expect(str.toString()).to.be.equal('hellowoop')
        });
        it('should throw Error for str.insertAt(5,5 ))', function () {
            let str = new StringBuilder('hello')
            expect(function () {
                str.insertAt(5,5)
            }).to.throw('Argument must be string')
        });
    })
    describe('test remove()',function () {
        it('should remove', function () {
            let str = new StringBuilder('hello there')
            str.remove(2,3)
            expect(str.toString()).to.be.equal('he there')
        });
    })
    function compareArray(source, expected) {
        expect(source.length).to.equal(expected.length, "Arrays don't match");
        for (let i = 0; i < source.length; i++) {
            expect(source[i]).to.equal(expected[i], 'Element ' + i + ' mismatch');
        }
    }
})