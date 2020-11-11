class Rover {
    get pointChanges() {
        return {
            B: {
                x: {'N':0,'S':0,'O':-1,'W':+1},
                y: {'N':-1,'S':+1,'O':0,'W':0}
            },
            F: {
                x: {'N':0,'S':0,'O':+1,'W':-1},
                y: {'N':+1,'S':-1,'O':0,'W':0}
            }
        }
    }

    get directions() {
        return {
            L: {N:'W', W:'S', S:'O', O: 'N'},
            R: {N:'O', W:'N', S:'W', O: 'S'}
        };
    }

    constructor(roverPosition, grid) {
        if (grid.constructor.name != 'Grid') {
            throw 'grid is missing'
        }

        this.moves = [];
        this.obstacleDetected = false;
        this.roverPosition = roverPosition;
        this.grid = grid;
        this.checkDirection();
        this.checkCoordinates();
        this.checkGrid();
        this.commands = [];
    }

    checkGrid() {
        let search = point => point == {x:this.roverPosition.x, y:this.roverPosition.y};

        if (!this.grid.isValid({x:this.roverPosition.x, y:this.roverPosition.y})) {
            throw 'invalid position';
        }
    }

    checkDirection() {
        if (!['N', 'S', 'O', 'W'].includes(this.roverPosition.direction)) {
            throw 'Invalid direction';
        }
    }

    checkCoordinates() {
        if (!(
            typeof this.roverPosition.x == 'number'
            && typeof this.roverPosition.y == 'number'
        )) {
            throw 'Invalid coordinates';
        }
    }

    position() {
        return {
            x: this.roverPosition.x,
            y: this.roverPosition.y,
        };
    }

    direction() {
        return this.roverPosition.direction;
    }

    commandReceived() {
        return this.commands.length;
    }

    receive(commands) {
        this.commands = commands;

        this.commands.forEach(movement => {
            if (this.obstacleDetected === true) {
                return;
            }

            if (['B', 'F'].includes(movement)) {

                let destination = {
                    x: this.roverPosition.x,
                    y: this.roverPosition.y
                };

                if (this.isWrappingMovement()) {
                    if (movement === 'F') {
                        if (this.roverPosition.direction === 'N') { destination.y = this.grid.bottomLeft.y; }
                        if (this.roverPosition.direction === 'S') { destination.y = this.grid.topRight.y; }
                        if (this.roverPosition.direction === 'W') { destination.x = this.grid.topRight.x; }
                        if (this.roverPosition.direction === 'O') { destination.x = this.grid.bottomLeft.x; }
                    }
                    if (movement === 'B') {
                        if (this.roverPosition.direction === 'N') { destination.y = this.grid.topRight.y; }
                        if (this.roverPosition.direction === 'S') { destination.y = this.grid.bottomLeft.y; }
                        if (this.roverPosition.direction === 'W') { destination.x = this.grid.bottomLeft.x; }
                        if (this.roverPosition.direction === 'O') { destination.x = this.grid.topRight.x; }
                    }
                } else {
                    destination.y += this
                        .pointChanges[movement]
                        .y[this.roverPosition.direction];
                    destination.x += this
                        .pointChanges[movement]
                        .x[this.roverPosition.direction];
                }

                if (this.grid.isObstacle(destination)) {
                    this.obstacleDetected = true;
                    return;
                }

                this.moves.push(movement);

                this.roverPosition.x = destination.x;
                this.roverPosition.y = destination.y;
            }

            if (['L', 'R'].includes(movement)) {
                this.roverPosition.direction = this
                    .directions[movement]
                    [this.roverPosition.direction];
            }
        });
    }

    effectiveMoves() {
        return this.moves;
    }

    didObstacleDetected() {
        return this.obstacleDetected;
    }

    isInTheEdge() {
        return this.grid.isEdge({x:this.roverPosition.x, y:this.roverPosition.y});
    }

    isWrappingMovement() {
        return this.grid.isEdge({x:this.roverPosition.x, y:this.roverPosition.y}) && (0
                || (this.roverPosition.direction === 'N' && this.roverPosition.y === this.grid.topRight.y)
                || (this.roverPosition.direction === 'W' && this.roverPosition.x === this.grid.bottomLeft.x)
                || (this.roverPosition.direction === 'O' && this.roverPosition.x === this.grid.topRight.x)
                || (this.roverPosition.direction === 'S' && this.roverPosition.y === this.grid.bottomLeft.y)
        )
    }
}

module.exports = Rover;
