function make2DArray(height, width) {
    return Array.from(Array(height), () => new Array(width));
}

class World {
    constructor(height, width, w, world) {
        this.height = height;
        this.width = width;
        this.w = w;
        this.world = world;
    }

    show() {
        this.world.forEach(raw => raw.forEach(tile => tile.show())); 
    }
}

function makeEmptyWorld(height, width, w) {
    let world = new World(height, width, w, make2DArray(height, width));
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            world.world[i][j] = new Cell(i, j, w);
        }
    }
    return world;
}

const cell = {
    wall: 1,
    number: 2,
    empty: 3
}
Object.freeze(cell)

class Cell {
    constructor(i, j, w, number=null) {
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
            textAlign(CENTER);
            fill(0);
            strokeWeight(0.2);
            text(this.number, this.x + this.w * 0.5, this.y + this.w * 0.5);
        }
    }
}