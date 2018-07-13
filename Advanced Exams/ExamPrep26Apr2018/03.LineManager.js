class LineManager {
    constructor(arr) {
        this.stops = [];
        for (let stop of arr) {
            if (typeof stop.name === 'string' &&
                stop.name.length > 0 &&
                stop.timeToNext >= 0) {
                this.stops.push(stop)
            }
            else{throw new Error('Cannot initialize instance with incorrect types')}
        }
        this.currentStop = this.stops[0];
        this.stopsCovered = 0;
        this.timeOnCourse = 0;
        this.delay = 0;
    }

    get atDepot(){
        return (this.currentStop === this.stops[this.stops.length-1])
    }
    get nextStopName(){
        if (this.atDepot){
            return 'At depot.'
        }
        else {
            return this.stops[this.stops.indexOf(this.currentStop)+1].name
        }
    }
    get nextStop(){
        if (this.atDepot){
            return 'At depot.'
        }
        else {
            return this.stops[this.stops.indexOf(this.currentStop)+1]
        }
    }

    get currentDelay(){
        return this.delay
    }
    arriveAtStop(minutes){
        if (minutes < 0 || this.atDepot){
            throw new Error('Last stop or negative time')
        }

        this.timeOnCourse += minutes;
        this.stopsCovered += 1;
        this.delay += (minutes -this.stops[this.stops.indexOf(this.nextStop)-1].timeToNext )

        this.currentStop = this.nextStop
        return !this.atDepot;
    }
    toString(){
        let result = 'Line summary \n'
        if (this.atDepot){
            result += `- Course completed\n`
        }
        else{
            result += `- Next stop: ${this.nextStopName}\n`
        }
        result += `- Stops covered: ${this.stopsCovered}\n`
        result += `- Time on course: ${this.timeOnCourse} minutes\n`
        result += `- Delay: ${this.delay} minutes`
        return result
    }
}


// Initialize a line manager with correct values
const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);


console.log(man.toString());

// console.log(man.nextStopName);
//

// Travel through all the stops until the bus is at depot
// while(man.atDepot === false) {
//     console.log(man.toString());
//     man.arriveAtStop(4);
// }
// //
// console.log(man.toString());
//
// // Should throw an Error (minutes cannot be negative)
// man.arriveAtStop(-4);
// // Should throw an Error (last stop reached)
// man.arriveAtStop(4);
//
// // Should throw an Error at initialization
// const wrong = new LineManager([
//     { name: 'Stop', timeToNext: { wrong: 'Should be a number'} }
// ]);
