class Elevator {
    constructor(nrFloors) {
        this.nrFloors = nrFloors;
        this.onFloor = 1;
        this.movingTo = null;

    }

    move(start, finish, callback) {
        if (start < 0) {
            start = 0;
        }
        if (finish > this.nrFloors) {
            finish = this.nrFloors;
        } else {
            for (let i = start - 1; i >= finish; i--) {
                this.onFloor = i;
                console.log("floor: " + i);
            }
        }
        callback = 'open';
    }

    


    doors(action, callback) {
        console.log(action + " door at " + this.onFloor + " floor");

        // callback is called when action='close'
        if (callback && typeof callback == "function") {
            callback();
        }
    }
}
module.exports = Elevator;