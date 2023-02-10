const n = 10;
let cols, rows;
let canvasx, canvasy;
let colors;
let solver;
let playing = false;

const k = 3;


const shuffle_array = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function setup() {
    colors = [
        color(0, 0, 0),
        color(87, 87, 87),
        color(173, 35, 35),
        color(42, 75, 215),
        color(29, 105, 20),
        color(129, 74, 25),
        color(129, 38, 192),
        color(160, 160, 160),
        color(129, 197, 122),
        color(157, 175, 255),
        color(41, 208, 208),
        color(255, 146, 51),
        color(255, 238, 51),
        color(233, 222, 187),
        color(255, 205, 243)];
    shuffle_array(colors);
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

    s = new BacktrackingSolver(world);
    s.start_solve();


    let start = document.getElementById("start");
    let stop = document.getElementById("stop");
    let forward = document.getElementById("forward");

    start.addEventListener("click", () => {
        playing = true;
    });

    forward.addEventListener("click", () => {
        s.iter_solve();
    });

    stop.addEventListener("click", () => {
        playing = false;
    })
}


function draw() {
    // frameRate(0);
    background(255);

    if (current_path.length > 0) {
        color = colors[current_path[0].number];
        stroke(color);
        strokeWeight(w * 0.5);
        noFill();
        strokeJoin(ROUND);
        beginShape();
        for (const pos of current_path) {
            vertex(pos.i * w + w * 0.5, pos.j * w + w * 0.5);
        }
        endShape();
        strokeWeight(0.2);
    }
    if (s.started && playing) {
        s.iter_solve();
    }
    world.show()
}

let is_dragging = false;
let current_path = new Array();

function mouseDragged(event) {
    const x = event.clientX - canvasx, y = event.clientY - canvasy;
    const i = floor(x / w), j = floor(y / w);

    // C'est le premier mouvement de souris qu'on fait
    if (!is_dragging) {
        if (world.grid[i][j].number == null) {
            return
        }

        current_path.push(world.grid[i][j]);
        is_dragging = true;
        return;
    }

    // On a déjà un chemin en cours

    // On vérifie qu'on est parti de la première case
    const start_cell = current_path[0];
    if (start_cell.i === i && start_cell.j === j) {
        return;
    }


    // On ne peut pas se déplacer sur une case déjà prise par un chemin fini
    if (world.grid[i][j].path) {
        return;
    }

    if (world.grid[i][j].celltype === cell.number) {

        // On a fini un chemin
        if (start_cell.number === world.grid[i][j].number) {
            current_path.push(world.grid[i][j]);
            current_path.forEach(cell => cell.path = true);

            world.paths[start_cell.number].cellend = world.grid[i][j];
            world.paths[start_cell.number].tilelist = current_path.map(cell => [cell, []]);
            current_path = new Array();
            is_dragging = false;
        }
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

    current_path.push(world.grid[i][j]);
}

function mouseReleased() {
    is_dragging = false;

    current_path = new Array();
}
