const Elevator = require("./elevator");


   var DOWN = -1;
   var IDLE= 0;
   var UP = 1;


var nrElevators = 2;
var maxFloors = 6;

function Elevator(currentFloor, direction) {
    this.currentFloor = currentFloor;
    this.direction = direction;
}

//FLOOR BUTTON outside call
document.getElementById("callElevator")
    .addEventListener("click", function (e) {
        
        findElevator();

    });

function validate(floor) {
    if (parseInt(floor) == floor) {
        floor = (floor > maxFloors) ? maxFloors : floor;
        findElevator(floor, function (closest) {
            elevators[closest].move(elevators[closest].onFloor,
                floor, function (action) {
                    elevators[closest].doors(action);
                    document.getElementById("getIn").innerHTML =
                        "<p> if you are in elevator<br>\
                    enter a floor and press enter here\
                    <input type='text' name=" + closest + " id='elev'>";
                });
            console.log("closest is coming");
        });
    } else {
        alert('an integer is required, got:' + floor);
    }
}



// check for an elevator to come
//if near to floor 0, elevator 0 is coming
//if near to floor 6, elevator 1 is coming
function findElevator(requestFloor, floor) {
    var bestFit = null;
    this.floor = floor;
    var closest = Math.floor(Math.random() * elevators.length);

    elevators.forEach(function (elevator, elevatorID) {
        var distance = Math.abs(requestFloor - elevator.floor);

        for (i = 0; i < nrElevators; i++) {
            // elevator is already stopped at that floor,
            if (requestFloor == floor) {
                console.log("The elevator is already here!");
                break;
            } else {
                if (distance < Math.abs(requestFloor - elevators[closest].floor)) {
                    closest = elevatorID;
                    console.log("Wait for the elevator to come!")
                }
            }
        }
    });
    return bestFit !== null ? bestFit : closest;
}


var elevators = [
    new Elevator(0, IDLE),
    new Elevator(6, IDLE)
];

//show which elevator is coming
Elevator.prototype.toString = function () {
    return "Elevator from floor " + this.currentFloor + " which is " + (this.direction === IDLE ? "idle" : (this.direction > 0 ? "going up" : "going down"));
};
console.log("For going UP:", elevators[findElevator(3, 0)].toString(), "is coming");


// INSIDE THE ELEVATOR BUTTON, go to a specified direction from a specific floor
function goToFloor(floor, requestedFloor) {
    this.floor = floor;
    this.requestFloor = requestedFloor;

    var valid = [0, 1, 2, 3, 4, 5, 6];
    requestFloor = Number(requestedFloor);

    if (typeof floor === 'number' && typeof requestedFloor === 'number') {
        for (var i = 0; i < valid.length; i++) {
            for (var j = 0; j < valid.length; j++) {
                if (floor === valid[i] && requestedFloor === valid[j]) {
                    if ((requestedFloor - floor) > 0) {
                        return "Going Up " + (requestedFloor - floor) + " floors";
                    } else if ((requestedFloor - floor) < 0) {
                        return "Going Down  " + ((requestedFloor - floor) * -1) + " floors";
                    } else {
                        return "You are at the same floor"
                    }
                }
            }
        }
    }
    return 0;
}

console.log(goToFloor(0, 0));

