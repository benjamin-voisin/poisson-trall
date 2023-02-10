function make2DCellArray(height, width, w) {
    let i = -1;
    let j = -1;
    return Array.from(Array(height), function () {i++;j=-1;return Array.from(Array(width), function () {j++;return new Cell(i, j, w)})});
}

class World {
    constructor(height, width, w, grid) {
        this.height = height;
        this.width = width;
        this.w = w;
        this.grid = grid;
        this.path = [];
    }

    add_target(cella, cellb) {
        cella.number = this.path.length;
        cellb.number = this.path.length;
        this.path.push(new Path(this.path.length, cella, cellb));
    }

    show() {
        this.grid.forEach(raw => raw.forEach(tile => tile.show())); 
        this.path.forEach(path => path.show())
    }

    static makeEmptyWorld(height, width, w) {
        return new World(height, width, w, make2DCellArray(height, width, w));
    }

}

class Path {
    constructor(id, cellstart, cellend) {
        this.id = id;
        this.cellstart = cellstart
        this.cellend = cellend
        this.tilelist = [];
    }

    show() {

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

    is_free() {
        return !this.path && (this.celltype === cell.empty)
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