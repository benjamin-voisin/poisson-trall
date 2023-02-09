const n = 20;
let cols, rows;

const k = 10;

let colors;

function setup() {
    createCanvas(400, 400);
    background(51);

    w = floor(width / n);
    world = World.makeEmptyWorld(n, n, w);

    for (let nb = 0; nb < k; nb++) {
        let rd = floor(random(n * n));
        let i = rd % n;
        let j = floor(rd / n);

        while (world.grid[i][j].number !== null) {
            rd = floor(random(n * n));
            i = rd % n;
            j = floor(rd / n);
        }
        world.grid[i][j].number = nb;


        rd = floor(random(n * n - 1));
        i = rd % n;
        j = floor(rd / n);

        while (world.grid[i][j].number !== null) {
            rd = floor(random(n * n - 1));
            i = rd % n;
            j = floor(rd / n);
        }
        world.grid[i][j].number = nb;
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
