class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.walls = [true, true, true, true];
        this.visited = false;
    }

    checkNeighbours(grid, collumns, rows) {
        let neighbours = [];

        let directions = [undefined, undefined, undefined, undefined];
        // UP
        if (this.j > 0) {
            directions[0] = grid[this.i + (this.j - 1) * rows];
        }

        //RIGHT
        if (this.i < collumns - 1) {
            directions[1] = grid[this.i + 1 + this.j * rows];
        }

        // DOWN
        if (this.j < collumns - 1) {
            directions[2] = grid[this.i + (this.j + 1) * rows];
        }

        // LEFT
        if (this.i > 0) {
            directions[3] = grid[this.i - 1 + this.j * rows];
        }

        for (let i = 0; i < 4; i++) {
            if (directions[i]) {
                if (!directions[i].visited) {
                    neighbours.push(directions[i]);
                }
            }
        }

        if (neighbours.length) {
            let randomNeighbour = floor(random(0, neighbours.length));
            return neighbours[randomNeighbour];
        }

        return undefined;
    }

    highlight(dimension) {
        let x = this.i * dimension;
        let y = this.j * dimension;

        noStroke();
        fill(0, 255, 255, 100);
        rect(x, y, dimension, dimension);
    }

    show(dimension) {
        let x = this.i * dimension;
        let y = this.j * dimension;

        if (this.visited) {
            noStroke();
            fill(255, 0, 0);
            rect(x, y, dimension, dimension);
        }

        stroke(255);
        strokeWeight(2);

        // UP
        if (this.walls[0]) {
            line(x, y, x + dimension, y);
        }

        // RIGHT
        if (this.walls[1]) {
            line(x + dimension, y, x + dimension, y + dimension);
        }

        // DOWN
        if (this.walls[2]) {
            line(x + dimension, y + dimension, x, y + dimension);

        }

        // LEFT
        if (this.walls[3]) {
            line(x, y + dimension, x, y);
        }


    }
}