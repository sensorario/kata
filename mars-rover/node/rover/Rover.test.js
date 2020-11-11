'use strict';

const Rover = require('./Rover.js');
const Grid = require('./Grid.js');

describe('Mars rover kata', () => {
    describe('Starts with given position and direction', () => {
        it('Works with valid input', () => {
            let rover = new Rover({
                x: 42,
                y: 23,
                direction: 'N'
            }, new Grid({x: 42, y: 23}, {x: 42, y: 23}));

            expect(rover.position()).toStrictEqual({x: 42, y: 23});
        });
        it('Accept only cardinal directions', () => {
            const t = function () {
                let rover = new Rover({
                    x: 42,
                    y: 23,
                    direction: 'X'
                }, new Grid({x: 42, y: 23}, {x: 42, y: 23}));
            }
            expect(t).toThrow('Invalid direction');
        });
        it('Accept only numerical values as coordinates', () => {
            var table = [
                {x: 42, y: 'foo', direction: 'N'},
                {x: 'var', y: 23, direction: 'N'},
            ];

            table.forEach(input => {
                const t = function () {
                    let rover = new Rover(
                        input,
                        new Grid({x: 42, y: 23}, {x: 42, y: 23})
                    );
                }
                expect(t).toThrow('Invalid coordinates');
            });
        });
    });

    describe('Rover receives a character array of commands', () => {
        it('Receive empty array of commands', () => {
            let rover = new Rover({
                x: 42,
                y: 23,
                direction: 'N'
            }, new Grid({x: 42, y: 23}, {x: 42, y: 23}));
            expect(rover.commandReceived()).toBe(0);
        })
        it('Accept casual sequence of character', () => {
            let rover = new Rover({
                x: 42,
                y: 23,
                direction: 'N'
            }, new Grid({x: 42, y: 23}, {x: 42, y: 23}));
            rover.receive(['A', 'B']);
            expect(rover.commandReceived()).toBe(2);
        })
    });

    describe('Rover can move forward/backward', () => {
        it('Can move backward', () => {
            var table = [
                 {
                     input: { x: 42, y: 23, direction: 'N' },
                     destination: {x: 42, y: 22}
                 },
                 {
                     input: { x: 42, y: 23, direction: 'S' },
                     destination: {x: 42, y: 24}
                 },
                 {
                     input: { x: 42, y: 23, direction: 'O' },
                     destination: {x: 41, y: 23}
                 },
                 {
                     input: { x: 42, y: 23, direction: 'W' },
                     destination: {x: 43, y: 23}
                 },
            ];

            table.forEach(input => {
                let rover = new Rover({
                    x: input.input.x,
                    y: input.input.y,
                    direction: input.input.direction
                }, new Grid({x: 0, y: 0}, {x: 44, y: 44}));
                rover.receive(['B']);
                expect(rover.position()).toStrictEqual(input.destination);
            });
        })
        it('Can move forward', () => {
            var table = [
                 {
                     input: { x: 42, y: 22, direction: 'N' },
                     destination: {x: 42, y: 23}
                 },
                 {
                     input: { x: 42, y: 24, direction: 'S' },
                     destination: {x: 42, y: 23}
                 },
                 {
                     input: { x: 42, y: 23, direction: 'O' },
                     destination: {x: 43, y: 23}
                 },
                 {
                     input: { x: 42, y: 23, direction: 'W' },
                     destination: {x: 41, y: 23}
                 },
            ];

            table.forEach(input => {
                let rover = new Rover({
                    x: input.input.x,
                    y: input.input.y,
                    direction: input.input.direction
                }, new Grid({x: 40, y: 20}, {x: 44, y: 33}));
                rover.receive(['F']);
                expect(rover.position()).toStrictEqual(input.destination);
            });
        })
    });

    describe('Rover can turn', () => {
        it('Can turn left', () => {
            var table = [
                 {
                     input: { x: 42, y: 22, direction: 'N' },
                     newDirection: 'W'
                 },
                 {
                     input: { x: 42, y: 24, direction: 'S' },
                     newDirection: 'O'
                 },
                 {
                     input: { x: 42, y: 23, direction: 'O' },
                     newDirection: 'N'
                 },
                 {
                     input: { x: 42, y: 23, direction: 'W' },
                     newDirection: 'S'
                 },
            ];

            table.forEach(input => {
                let rover = new Rover({
                    x: input.input.x,
                    y: input.input.y,
                    direction: input.input.direction
                }, new Grid({x: 40, y: 20}, {x: 44, y: 33}));
                rover.receive(['L']);
                expect(rover.direction()).toStrictEqual(input.newDirection);
            });
        })
        it('can turn right', () => {
            var table = [
                 {
                     input: { x: 42, y: 22, direction: 'N' },
                     newDirection: 'O'
                 },
                 {
                     input: { x: 42, y: 24, direction: 'O' },
                     newDirection: 'S'
                 },
                 {
                     input: { x: 42, y: 23, direction: 'S' },
                     newDirection: 'W'
                 },
                 {
                     input: { x: 42, y: 23, direction: 'W' },
                     newDirection: 'N'
                 },
            ];

            table.forEach(input => {
                let rover = new Rover({
                    x: input.input.x,
                    y: input.input.y,
                    direction: input.input.direction
                }, new Grid({x: 40, y: 20}, {x: 44, y: 33}));
                rover.receive(['R']);
                expect(rover.direction()).toStrictEqual(input.newDirection);
            });
        });
    });

    describe('World is a grid', () => {
        it('and grid cannot be a list of point', () => {
            const t = function () {
              let rover = new Rover({
                  x: 42,
                  y: 43,
                  direction: 'N'
              }, [{x:43, y:43},{x:43, y:43}]);
            }

            expect(t).toThrow('grid is missing');
        });

        it('detect if position is outside the grid', () => {
            const t = function () {
              let rover = new Rover({
                  x: 42,
                  y: 43,
                  direction: 'N'
              }, new Grid({x:43, y:43},{x:43, y:43}));
            }

            expect(t).toThrow('invalid position');
        });

        it('Move wrapping the edges', () => {
            let table = [
                {
                    rover: { x: 0, y: 0, direction: 'N' },
                    commands: ['F', 'F', 'F'],
                    destination: {x: 0, y: 3}
                },
                {
                    rover: { x: 0, y: 0, direction: 'W' },
                    commands: ['F', 'F', 'F'],
                    destination: {x: 98, y: 0}
                },
                {
                    rover: { x: 0, y: 100, direction: 'O' },
                    commands: ['F', 'F', 'F'],
                    destination: {x: 3, y: 100}
                },
            ];
            table.forEach(item => {
                let rover = new Rover(
                    item.rover, new Grid({x: 0, y: 0}, {x: 100, y: 100})
                );
                rover.receive(item.commands);
                expect(rover.position()).toStrictEqual(item.destination);
            });
        });

        it('detect if position is in the edge', () => {
            let rover = new Rover({
                x: 42,
                y: 43,
                direction: 'N'
            }, new Grid({x:42, y:43},{x:100, y:100}));

            expect(rover.isInTheEdge()).toBe(true);
        });

        it('detect if position is in the edge', () => {
            let table = [
                 {
                     data: { x: 42, y: 43, direction: 'W' },
                     movement: 'F',
                     finalPosition: {x:100, y:43}
                 },
                 {
                     data: { x: 100, y: 43, direction: 'O' },
                     movement: 'F',
                     finalPosition: {x:42, y:43}
                 },
                 {
                     data: { x: 100, y: 43, direction: 'S' },
                     movement: 'F',
                     finalPosition: {x: 100, y: 100}
                 },
                 {
                     data: { x: 100, y: 99, direction: 'N' },
                     movement: 'F',
                     finalPosition: {x: 100, y: 100}
                 },
             ];
             table.forEach(item => {
                 let rover = new Rover(
                     item.data,
                     new Grid({x:42, y:43}, {x:100, y:100})
                 );
                 rover.receive([item.movement]);
                 expect(rover.isInTheEdge()).toBe(true);
                 expect(rover.position()).toStrictEqual(item.finalPosition);
             });
         });
    });

    describe('Obstacle detection', () => {
        it('Store all movements if no obstacles found', () => {
            let rover = new Rover({
                x: 0,
                y: 0,
                direction: 'N'
            }, new Grid({x: 0, y: 0}, {x: 100, y: 100}));
            rover.receive(['F']);
            expect(rover.didObstacleDetected()).toBe(false);
            expect(rover.effectiveMoves()).toStrictEqual(['F']);
        });

        it('Detect obstacles and store only effective moves', () => {
            let rover = new Rover({
                x: 0,
                y: 0,
                direction: 'N'
            }, new Grid({x: 0, y: 0}, {x: 100, y: 100}, [{x: 0, y: 1}]));
            rover.receive(['F']);
            expect(rover.didObstacleDetected()).toBe(true);
            expect(rover.effectiveMoves()).toStrictEqual([]);
        });

        it('Abort and stop store movements after obstacle detection', () => {
            let rover = new Rover({
                x: 0,
                y: 0,
                direction: 'N'
            }, new Grid({x: 0, y: 0}, {x: 100, y: 100}, [{x: 0, y: 1}]));
            rover.receive(['F', 'B']);
            expect(rover.didObstacleDetected()).toBe(true);
            expect(rover.effectiveMoves()).toStrictEqual([]);
        });
    });
});
