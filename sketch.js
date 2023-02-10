const n = 20;
let cols, rows;
let canvasx, canvasy;

const k = 10;

let colors;

function setup() {
    frameRate(30);
    cnv = createCanvas(600, 600);
    canvasx = cnv.position().x, canvasy = cnv.position().y;

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
    let start = document.getElementById("start");

    start.addEventListener("click", function () {
        s = new BacktrackingSolver(world);
        s.solve();
    });
}


function draw() {
    frameRate(30);
    background(255);

    stroke(255, 204, 0);
    strokeWeight(w * 0.5);
    noFill();
    strokeJoin(ROUND);
    beginShape();
    for (const pos of current_path) {
        vertex(pos.i * w + w * 0.5, pos.j * w + w * 0.5);
    }
    endShape();
    strokeWeight(0.2);
    world.show()
}

let is_dragging = false;
let current_path = Array();

function mouseDragged(event) {
    const x = event.clientX - canvasx, y = event.clientY - canvasy;
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

    // On ne peut pas se déplacer sur une case déjà prise par un chemin fini
    if (world.grid[i][j].path) {
        return;
    }

    // On ne peut aller que sur des cases adjacentes à la dernière, et pas en diagonale
    const prev_pos = current_path[current_path.length - 1];
    const prev_i = prev_pos.i, prev_j = prev_pos.j;

    let diff_i = Math.abs(prev_i - i);
    let diff_j = Math.abs(prev_j - j);

    if ((diff_i !== 0 || diff_j !== 1) && (diff_j !== 0 || diff_i !== 1)) {
        return;
    }

    // Si on intersecte le chemin actuel, on casse la boucle
    let index = current_path.findIndex(pos => pos.i === i && pos.j === j);
    if (index !== -1) {
        current_path = current_path.slice(0, index + 1);
        return;
    }

    current_path.push({ i: i, j: j });
}

function mouseReleased() {
    is_dragging = false;

    current_path = Array();
}
