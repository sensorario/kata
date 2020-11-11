class Grid {
    constructor(bottomLeft, topRight, obstacles) {
        this.points = [];
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
        this.obstacles = obstacles;

        for (let y = bottomLeft.y;y <= topRight.y; y++) {
            for (let x = bottomLeft.x;x <= topRight.x; x++) {
                this.points.push({x:x, y:y});
            }
        }
    }

    render() {
        return this.points;
    }

    isEdge(point) {
        return point.x === this.bottomLeft.x
            || point.y === this.bottomLeft.y
            || point.x === this.topRight.x
            || point.y === this.topRight.y
    }

    isValid(point) {
        return point.x >= this.bottomLeft.x
            && point.y >= this.bottomLeft.y
            && point.x <= this.topRight.x
            && point.y <= this.topRight.y
    }

    obstaclesCount() {
        if (typeof this.obstacles === 'undefined') {
            return 0;
        }

        return this.obstacles.length;
    }

    isObstacle(point) {
        if (this.obstaclesCount() > 0) {
            for (const element of this.obstacles) {
                return point.x == element.x
                    && point.y == element.y;
            }
        }

        return false;
    }
}

module.exports = Grid;
