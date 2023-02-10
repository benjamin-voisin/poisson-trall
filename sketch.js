const n = 20;
let cols, rows;

const k = 10;

let colors;

function setup() {
    frameRate(30);
    createCanvas(600, 600);

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
    s = new BacktrackingSolver(world);
    s.solve();
}


function draw() {
    frameRate(30);
    background(255);
    fill(255, 204, 0);
    for (const pos of current_path) {
        circle(pos.i * w + w * 0.5, pos.j * w + w * 0.5, w * 0.5);
    }
    world.show()
}

let is_dragging = false;
let current_path = Array();

function mouseDragged(event) {
    const x = event.clientX, y = event.clientY;
    const i = floor(x / w), j = floor(y / w);

    // C'est le premier mouvement de souris qu'on fait
    if (!is_dragging) {
        if (world.grid[i][j].number == null) {
            return
        }

        current_path.push({ i: i, j: j });
        is_dragging = true;
        return;
    }

    // On a déjà un chemin en cours
    
    current_path.push({ i: i, j: j });


}

function mouseReleased() {
    is_dragging = false;

    current_path = Array();
}
