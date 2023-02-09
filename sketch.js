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
        let rd = floor(random(n * n));
        let i = rd % n;
        let j = floor(rd / n);

        while (world.grid[i][j].number !== null) {
            rd = floor(random(n * n));
            i = rd % n;
            j = floor(rd / n);
        }
        world.grid[i][j].number = nb;


        rd = floor(random(n * n));
        i = rd % n;
        j = floor(rd / n);

        while (world.grid[i][j].number !== null) {
            rd = floor(random(n * n));
            i = rd % n;
            j = floor(rd / n);
        }
        world.grid[i][j].number = nb;
    }
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
        if (world.grid[j][i].number == null) {
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
