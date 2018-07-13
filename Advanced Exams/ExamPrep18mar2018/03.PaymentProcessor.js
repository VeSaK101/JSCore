class PaymentProcessor{
    constructor(){
        this.payments = [];
        this.activeIDs = [];
        this._options = {
            types: ["service", "product", "other"],
            precision: 2
        }
        if (arguments.length > 0){
            this.options = (arguments[0])
        }
    }

    get options() {
        return this._options;
    }

    set options(value) {
        let optionsObj = arguments[0]
        if (optionsObj.precision) this._options.precision = optionsObj.precision
        if (optionsObj.types) this._options.types = optionsObj.types;
    }
    setOptions(input){
        this.options = input
    }
    registerPayment(id, name, type, value){
        if (this.activeIDs.includes(id)) {
            throw new Error('invalid type')
        }
        if (typeof id !== 'string' || id.length <= 0 || typeof name !== 'string' || name.length <= 0
        || typeof value !== 'number' || !this.options.types.includes(type)){
            throw new Error('invalid type')
        }
        this.activeIDs.push(id)
        this.payments.push({
            id:id,
            name:name,
            type:type,
            value:value.toFixed(this.options.precision)
        })
    }
    toString(){
        let result = 'Summary:\n'
        if (this.payments.length === 0){
            result += `- Payments: 0\n`
            result += `- Balance: 0`
        }
        else{
            result += `- Payments: ${this.payments.length}\n`
            let balance = 0
            for (let i = 0; i < this.payments.length; i++) {
                balance += Number(this.payments[i].value)
            }
            result += `- Balance: ${balance.toFixed(this.options.precision)}`
        }
        return result
    }
    get(id){
        if (!this.activeIDs.includes(id)){
            throw new Error('ID not found')
        }
        else{
            let payment = this.payments.filter(obj => {
                return obj.id === id
            })[0]
            let result = `Details about payment ID: ${id}\n`
            result += `- Name: ${payment.name}\n`
            result += `- Type: ${payment.type}\n`
            result += `- Value: ${payment.value}`
            return result
        }
    }
    deletePayment(id){
        if (!this.activeIDs.includes(id)){
            throw new Error('ID not found')
        }
        else{
            this.activeIDs = this.activeIDs.filter(i => i !== id)
            let payment = this.payments.filter(obj => {
                return obj.id === id

            })[0]
            this.payments = this.payments.filter(p => {return p.id !== id})
        }
    }
}


// // Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());
//
// // Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
//
generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);
//
// // Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// // Should throw an error (ID not found)
// console.log(generalPayments.get('E027'));
// console.log(generalPayments.payments);

//
generalPayments.deletePayment('E028');
console.log(generalPayments.toString());
//
// // Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());
//
// // Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());


// Summary:
// - Payments: 2
// - Balance: 38000.00
// Details about payment ID: E028
// - Name: Rare-earth elements
// - Type: material
// - Value: 8000.00
// Summary:
// - Payments: 3
// - Balance: 93000.00
// Summary:
// - Payments: 2
// - Balance: 1500.00
// Summary:
// - Payments: 1
// - Balance: 0.00153