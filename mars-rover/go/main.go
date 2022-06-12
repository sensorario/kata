package main

import (
     "fmt"
)

type Point struct {
    x int
    y int
}

type Sphere struct {
    firstCorner Point
    lastCorner Point
    obstacles []Point
}

type Rover struct {
    position Point
    direction string
    world Sphere
}

func (r *Rover) moves (moves []string) {
    for _, m := range moves {
        r.move(m)
    }
}

func (r *Rover) move (command string) {
    if command == "l" {
        if r.direction == "e" { r.direction = "n"; return }
        if r.direction == "s" { r.direction = "e"; return }
        if r.direction == "w" { r.direction = "s"; return }
        if r.direction == "n" { r.direction = "w"; return }
    }
    if command == "r" {
        if r.direction == "n" { r.direction = "e"; return }
        if r.direction == "e" { r.direction = "s"; return }
        if r.direction == "s" { r.direction = "w"; return }
        if r.direction == "w" { r.direction = "n"; return }
    }
    if command == "f" {
        if r.direction == "n" { r.update(r.position.x,r.position.y+1) }
        if r.direction == "s" { r.update(r.position.x,r.position.y-1) }
        if r.direction == "w" { r.update(r.position.x-1,r.position.y) }
        if r.direction == "e" { r.update(r.position.x+1,r.position.y) }
    }
    if command == "b" {
        if r.direction == "n" { r.update(r.position.x,r.position.y-1) }
        if r.direction == "s" { r.update(r.position.x,r.position.y+1) }
        if r.direction == "w" { r.update(r.position.x+1,r.position.y) }
        if r.direction == "e" { r.update(r.position.x-1,r.position.y) }
    }
}

func (r *Rover) update (x int, y int) {
    if y > r.world.lastCorner.y {
        x,y = r.world.lastCorner.y,x
    }

    if y < r.world.firstCorner.y {
        x,y = r.world.lastCorner.y,r.world.lastCorner.x
    }

    if x < r.world.firstCorner.x {
        x,y = r.world.lastCorner.x, r.world.firstCorner.y
    }

    if x > r.world.lastCorner.x {
        x,y = r.world.firstCorner.x, r.world.firstCorner.y
    }

    isFree := true
    destination := Point{x,y}
    for _, obstacle := range r.world.obstacles {
        if obstacle.x == destination.x && obstacle.y == destination.y {
            isFree = false
        }
    }
    if isFree == true {
        r.position = destination
    }
}

func main() {
     fmt.Println("Mars Rover Kata!")
}

