package main

import(
    "testing"
)

type TestRover struct {
    position Point
    destination Point
    direction string
    command string
}

func TestRoverPosition(t *testing.T) {
    tests := []TestRover{
        // foreward from origin
        {Point{0,0},Point{0,1},"n","f"},
        {Point{0,0},Point{0,-1},"s","f"},
        {Point{0,0},Point{-1,0},"w","f"},
        {Point{0,0},Point{1,0},"e","f"},
        // foreward from another point
        {Point{2,0},Point{2,1},"n","f"},
        {Point{2,0},Point{2,-1},"s","f"},
        {Point{2,0},Point{1,0},"w","f"},
        {Point{2,0},Point{3,0},"e","f"},
        // backward from origin
        {Point{0,0},Point{0,-1},"n","b"},
        {Point{0,0},Point{0,1},"s","b"},
        {Point{0,0},Point{1,0},"w","b"},
        {Point{0,0},Point{-1,0},"e","b"},
        // backward from another point
        {Point{2,0},Point{2,-1},"n","b"},
        {Point{2,0},Point{2,1},"s","b"},
        {Point{2,0},Point{3,0},"w","b"},
        {Point{2,0},Point{1,0},"e","b"},
    }

    for _, tc := range tests {
        rover := Rover{
            tc.position,
            tc.direction,
            Sphere{
                Point{-99,-99},
                Point{99,99},
                []Point{},
            },
        }

        rover.move(tc.command)
        if rover.position != tc.destination {
            t.Fatal(rover,tc.position,"position should be",tc.destination)
        }
    }
}

func TestAcceptSequence(t *testing.T) {
    type test struct {
        start Point
        sequence []string
        end Point
    }

    tests := []test{
        {Point{0,0},[]string{"f","f","f"},Point{0,3}},
        {Point{0,0},[]string{"l","f","f","f"},Point{-3,0}},
        {Point{0,0},[]string{"r","f","f","f"},Point{3,0}},
        {Point{0,0},[]string{"f","l","f","l","f","l","f","l"},Point{0,0}},
        {Point{0,0},[]string{"f","r","f","r","f","r","f","r"},Point{0,0}},
    }

    for _, tc := range tests {
        rover := Rover{
            tc.start,
            "n",
            Sphere{
                Point{-99,-99},
                Point{99,99},
                []Point{},
            },
        }

        rover.moves(tc.sequence)
        desired := tc.end
        if rover.position != desired {
            t.Fatal(rover,rover.position,"position should be",desired)
        }
    }
}

type TestPoint struct {
    given Point
    desired Point
    command string
}

func TestMain(t *testing.T) {
    main()
}

func TestDetectObstacles(t *testing.T) {
    type test struct {
        start Point
        obstacle Point
        sequence []string
        end Point
    }

    tests := []test{
        {Point{0,0},Point{0,2},[]string{"f","f","f"},Point{0,1}},
    }

    for _, tc := range tests {
        rover := Rover{
            tc.start,
            "n",
            Sphere{
                Point{-99,-99},
                Point{99,99},
                []Point{tc.obstacle},
            },
        }

        rover.moves(tc.sequence)
        desired := tc.end
        if rover.position != desired {
            t.Fatal(rover,rover.position,"position should be",desired)
        }
    }
}

func TestWrapAroutThwWorld(t *testing.T) {
    type test struct {
        start Point
        firstCorner Point
        lastCorner Point
        sequence []string
        destination Point
    }

    tests := []test{
        {Point{1,1},Point{1,1},Point{5,5},[]string{"f","f","f","f","f"},Point{5,1}},
        {Point{1,1},Point{1,1},Point{5,5},[]string{"l","f"},Point{5,1}},
        {Point{1,1},Point{1,1},Point{5,5},[]string{"b"},Point{5,5}},
        {Point{1,1},Point{1,1},Point{5,5},[]string{"r","f","f","f","f","f"},Point{1,1}},
        {Point{1,1},Point{1,1},Point{5,5},[]string{"r","f","l","f","f","f","f","f"},Point{5,2}},
    }

    for _, tc := range tests {
        rover := Rover{
            tc.start,
            "n",
            Sphere{
                tc.firstCorner,
                tc.lastCorner,
                []Point{},
            },
        }

        rover.moves(tc.sequence)
        desired := tc.destination
        if rover.position != desired {
            t.Fatal(rover,rover.position,"position should be",desired)
        }
    }
}
