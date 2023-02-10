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
        this.paths = [];
    }

    add_target(cella, cellb) {
        cella.number = this.paths.length;
        cellb.number = this.paths.length;
        this.paths.push(new Path(this.paths.length, cella, cellb));
    }

    show() {
        this.grid.forEach(raw => raw.forEach(tile => tile.show())); 
        this.paths.forEach(path => path.show());
        this.grid.forEach(raw => raw.forEach(tile => tile.show_number()));
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
        if (this.tilelist.length > 0) {
            stroke(255, 204, 0);
            fill(255, 204, 0);
            circle(this.tilelist[0][0].i * w + w * 0.5, this.tilelist[0][0].j * w + w * 0.5, w * 0.8);
            circle(this.tilelist[this.tilelist.length - 1][0].i * w + w * 0.5, this.tilelist[this.tilelist.length - 1][0].j * w + w * 0.5, w * 0.8);
            strokeWeight(w * 0.5);
            noFill();
            strokeJoin(ROUND);
            beginShape();
            for (const tile of this.tilelist) {
                vertex(tile[0].i * w + w * 0.5, tile[0].j * w + w * 0.5);
            }
            endShape();
            strokeWeight(0.2);
        }
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

        this.wall = false;
        this.path = null;
        this.number = number;
    }

    get celltype() {
        if (this.number !== null) {
            return cell.number;
        } else {
            if (this.wall) {
                return cell.wall;
            } else {
                return cell.empty;
            }
        }
    }

    is_free(path) {
        return !this.path && ((this.celltype === cell.empty) || ((this.celltype === cell.number) && (this.number === path.id)))
    }

    show() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        this.show_number();
    }

    show_number() {
        if (this.number !== null) {
            textAlign(CENTER, CENTER);
            fill(0);
            strokeWeight(0.2);
            text(this.number, this.x + this.w * 0.5, this.y + this.w * 0.5);
        }
    }
}