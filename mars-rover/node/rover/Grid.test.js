'use strict';

const Grid = require('./Grid.js');

describe('The world is a grid', () => {
    describe('definition', () => {
        it('simple example', () => {
            let grid = new Grid({x:0,y:0}, {x:1,y:1});

            expect(grid.render()).toStrictEqual([
                {x:0,y:0},
                {x:1,y:0},
                {x:0,y:1},
                {x:1,y:1},
            ]);

            expect(grid.obstaclesCount()).toBe(0);
        });

        it('nine tile around the origin', () => {
            let grid = new Grid({x:-1,y:-1}, {x:1,y:1});

            expect(grid.render()).toStrictEqual([
                {x:-1,y:-1},
                {x:0,y:-1},
                {x:1,y:-1},
                {x:-1,y:0},
                {x:0,y:0},
                {x:1,y:0},
                {x:-1,y:1},
                {x:0,y:1},
                {x:1,y:1},
            ]);

            expect(grid.isEdge({x:0,y:0})).toBe(false);
            expect(grid.isValid({x:0,y:0})).toBe(true);

            expect(grid.isEdge({x:1,y:0})).toBe(true);
            expect(grid.isValid({x:0,y:0})).toBe(true);

            expect(grid.isEdge({x:6,y:0})).toBe(false);
            expect(grid.isValid({x:6,y:0})).toBe(false);
        });

        it('add obstacles', () => {
            let grid = new Grid({x:0,y:0}, {x:50,y:50}, [
                {x: 25, y: 25},
            ]);

            expect(grid.obstaclesCount()).toBe(1);
            expect(grid.isObstacle({x: 25, y: 25})).toBe(true);
            expect(grid.isObstacle({x: 26, y: 25})).toBe(false);
            expect(grid.isObstacle({x: 29, y: 25})).toBe(false);
        });

    });
});
