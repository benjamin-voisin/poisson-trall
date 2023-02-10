const n = 20;
let cols, rows;

const k = 10;

let colors;

function setup() {
    createCanvas(600, 600);
    background(51);

    w = floor(width / n);
    world = World.makeEmptyWorld(n, n, w);

    for (let nb = 0; nb < k; nb++) {

        rd = floor(random(n * n - 1));
        i1 = rd % n;
        j1 = floor(rd / n);

        while (world.grid[i1][j1].number !== null) {
            rd = floor(random(n * n));
            i1 = rd % n;
            j1 = floor(rd / n);
        }

        rd = floor(random(n * n - 1));
        i2 = rd % n;
        j2 = floor(rd / n);

        while (world.grid[i2][j2].number !== null) {
            rd = floor(random(n * n));
            i2 = rd % n;
            j2 = floor(rd / n);
        }

        world.add_target(world.grid[i1][j1], world.grid[i2][j2])
    }
}


function draw() {
    background(255);
    world.show()
}

let is_dragging = false;
let dragging_start = null;

function mouseDragged(event) {
    let x = event.clientX, y = event.clientY;
    let i = floor(x / width), j = floor(y / width);

    // C'est le premier mouvement de souris qu'on fait
    if (!is_dragging) {
        dragging_start = { i: i, j: j };
        is_dragging = true;
        return;
    }
}

function mouseReleased() {
    is_dragging = false;
    dragging_start = null;
}
