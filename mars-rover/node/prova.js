const Rover = require('./rover');

rover = new Rover({
    x: 0,
    y: 0,
    direction: 'N'
});

rover.receive(['F', 'F']);

console.log(rover);
