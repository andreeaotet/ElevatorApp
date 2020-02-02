

const express = require("express");
const EventEmitter = require("events");
const Elevator = require("./elevator");

const app = express();
const nrElevators = 2;
const maxFloors = 7;

const elevators = [];
for (i = 0; i < nrElevators; i++){
    elevators[i] = new Elevator(maxFloors);
}

const emitter = new EventEmitter();
const queue = [];
const calls = new Array(maxFloors);

app.get('/elevator', (req, res) => {
    if (req.query.floor) {
        let floor = req.query.floor;
        if (parseInt(floor) == floor) {
            floor = (floor > maxFloors) ? maxFloors : floor;
            floor = (floor < 1) ? 1 : floor;
            findElevator(floor, (closest) => {
                if (parseInt(closest) != closest) {
                    // in case all elevators need maintenance, return a message
                    res.send(closest);
                } else {
                    elevators[closest].move(elevators[closest].onFloor,
                        floor, (action) => {
                            elevators[closest].doors(action);
                            res.send('you are in elevator:' + closest);
                        
                    });
                }
            });
        } else {
            res.send('an integer is required, got:'+floor);
        }
    } else {
        res.send('a floor is required, got nothing');
    }
});

app.get('/elevator/:closest', (req, res) => {
    let closest = req.params.closest
    if (parseInt(closest) == closest && closest >= 0 && closest < nrElevators){
        if (req.query.floor) {
            let floor = req.query.floor;
            if (parseInt(floor) == floor) {
                floor = (floor > maxFloors) ? maxFloors : floor;
                elevators[closest].doors('close', () => {
                    elevators[closest].move(elevators[closest].onFloor,
                        floor, (action) => {
                            elevators[closest].doors(action);
                            res.send('you are out of elevator');
                    });
                });
            } else {
                res.send('an integer is required, got:'+floor);
            }
          } else {
            res.send('a floor is required, got nothing');
          }
    } else {
        res.send('wrong request');
    }
});


module.exports.app = app;