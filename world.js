function make2DCellArray(height, width, w) {
    let i = -1;
    let j = -1;
    return Array.from(Array(height), function () {j++;i=-1;return Array.from(Array(width), function () {i++;return new Cell(i, j, w)})});
}

class World {
    constructor(height, width, w, grid) {
        console.log(grid);
        this.height = height;
        this.width = width;
        this.w = w;
        this.grid = grid;
    }

    show() {
        this.grid.forEach(raw => raw.forEach(tile => tile.show())); 
    }

    static makeEmptyWorld(height, width, w) {
        return new World(height, width, w, make2DCellArray(height, width, w));
    }

}

const cell = {
    wall: 1,
    number: 2,
    empty: 3
}
Object.freeze(cell)

class Cell {
    constructor(i, j, w, number=null) {
        this.i = i;
        this.j = j;

        this.x = i * w;
        this.y = j * w;
        this.w = w;

        this.celltype = cell.empty;
        this.path = false;
        this.number = number;
    }

    show() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);

        if (this.number !== null) {
            textAlign(CENTER, CENTER);
            fill(0);
            strokeWeight(0.2);
            text(this.number, this.x + this.w * 0.5, this.y + this.w * 0.5);
        }
    }
}