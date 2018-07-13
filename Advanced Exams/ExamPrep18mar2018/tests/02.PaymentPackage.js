class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

let expect = require('chai').expect

describe('testPaymentPackage', function () {
    it('should instantiate correctly', function () {
        let pay = new PaymentPackage('Gosho', 50)
        expect(pay.name).to.be.equal('Gosho')
        expect(pay.value).to.be.equal(50)
        expect(pay.VAT).to.be.equal(20)
        expect(pay.active).to.be.true

    });
    it('should instantiate correctly', function () {
        expect(function () {
            new PaymentPackage('Gosho')
        }).to.throw('Value must be a non-negative number')


    });
    describe('testGetters', function () {
        it('should return Gosho for pay.name', function () {
            let pay = new PaymentPackage('Gosho', 50)
            expect(pay.name).to.be.equal('Gosho')
        });
        it('should return 50 for pay.value', function () {
            let pay = new PaymentPackage('Gosho', 50)
            expect(pay.value).to.be.equal(50)
        });
        it('should return 20 for pay.VAT', function () {
            let pay = new PaymentPackage('Gosho', 50)
            expect(pay.VAT).to.be.equal(20)
        });
        it('should return true for pay.active', function () {
            let pay = new PaymentPackage('Gosho', 50)
            expect(pay.active).to.be.true
        });
    })
    describe('tesSetters', function () {

        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.name = ('')
            }).to.throw('Name must be a non-empty string')
        });

        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.name = ({})
            }).to.throw('Name must be a non-empty string')
        });

        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.value = ('')
            }).to.throw('Value must be a non-negative number')
        });

        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.value = (-50)
            }).to.throw('Value must be a non-negative number')
        });
        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.VAT = ('')
            }).to.throw('VAT must be a non-negative number')
        });
        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.VAT = (-50)
            }).to.throw('VAT must be a non-negative number')
        });
        it('should ', function () {
            let pay = new PaymentPackage('Gosho', 50)

            expect(function () {
                pay.active = (50)
            }).to.throw('Active status must be a boolean')
        });
    })
    describe('Test toString()',function () {
        it('should ', function () {
            let package = new PaymentPackage('HR Services', 1500)
            expect(package.toString()).to.be.equal('Package: HR Services\n' +
                '- Value (excl. VAT): 1500\n' +
                '- Value (VAT 20%): 1800')
        });
        it('should ', function () {
            let package = new PaymentPackage('HR Services', 1500)
            package.active = false
            console.log(package.toString())
            expect(package.toString()).to.be.equal('Package: HR Services (inactive)\n' +
                '- Value (excl. VAT): 1500\n' +
                '- Value (VAT 20%): 1800')
        });
    })
})


//AssertionError: expected 'Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800' to equal 'Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800\n' <Click to see difference>