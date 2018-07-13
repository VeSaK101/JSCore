let expect = require('chai').expect
let SubscriptionCard = require('../02.UnitTest')

describe('TestingForSubscriptionCardClass', function () {
    it('should return objX for let x = new SubscriptionCard("..","..",num)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245');
        expect(objX).to.deep.equal({
            _firstName: 'georgi',
            _lastName: 'ivanov',
            _SSN: '00451245',
            _subscriptions: [],
            _blocked: false
        })
    });
    it('should return georgi for objX.firstName', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        expect(objX.firstName).to.be.equal('georgi')
    });
    it('should return ivanov for objX.lastName', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        expect(objX.lastName).to.be.equal('ivanov')
    });
    it('should return 00451245 for objX.SSN', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        expect(objX.SSN).to.be.equal('00451245')
    });
    it('should return false for objX.isBlocked', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        expect(objX.isBlocked).to.be.false
    });
    it('should return true for objX.isBlocked', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.block()
        expect(objX.isBlocked).to.be.true
    });
    it("Should return true for blocked and unblocked card", function() {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.block()
        card.unblock()
        expect(card.isBlocked).to.be.equal(false)
    });

    it("Should return true for unblocked and blocked card", function() {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.unblock()
        card.block()
        expect(card.isBlocked).to.be.equal(true)
    });
    it('should create subscription for objX.addSubscrip', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'))
        let date1 = new Date('2018-04-22')
        let date2 = new Date('2018-05-21')
        expect(objX).to.deep.equal({
            _firstName: 'georgi',
            _lastName: 'ivanov',
            _SSN: '00451245',
            _subscriptions: [{
                line: '120',
                startDate: date1,
                endDate: date2
            }],
            _blocked: false
        })
    });
    it('should return true for objX.block()', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.block()
        expect(objX).to.deep.equal({
            _firstName: 'georgi',
            _lastName: 'ivanov',
            _SSN: '00451245',
            _subscriptions: [],
            _blocked: true
        })
    });
    it('should return false for objX.unblock()', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.unblock()
        expect(objX).to.deep.equal({
            _firstName: 'georgi',
            _lastName: 'ivanov',
            _SSN: '00451245',
            _subscriptions: [],
            _blocked: false
        })
    });
    it('should throw error for card.firstName(\'dasdasd\')', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        expect(function () {
            objX.lastName('dasdasd')
        }).to.throw('objX.lastName is not a function');
    });
    it('should return true for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('120', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('120', new Date('2018-04-22'))).to.be.true
    });
    it('should return true for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('*', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('120', new Date('2018-04-22'))).to.be.true
    });
    it('should return false for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('150', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('120', new Date('2018-04-22'))).to.be.false
    });
    it('should return false for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('150', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('150', new Date('2018-02-22'))).to.be.false
    });
    it('should return false for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.addSubscription('*', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('150', new Date('2018-02-22'))).to.be.false
    });it('should return false for obxX.isValid(120,date)', function () {
        let objX = new SubscriptionCard('georgi', 'ivanov', '00451245')
        objX.block()
        objX.addSubscription('*', new Date('2018-03-22'), new Date('2018-05-21'));
        expect(objX.isValid('150', new Date('2018-02-22'))).to.be.false
    });

})

// card.firstName('dasdasd')
// const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
// card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
// card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
// card.block();
// card.unblock();
// console.log(card.isValid('120', new Date('2018-04-22')));
// card.firstName = 'Gosho';
// console.log(card.firstName);

