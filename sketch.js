const n = 20;
let cols, rows;

const k = 10;

let colors

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(400, 400);
    background(51);

    w = floor(width / n);
    world = make2DArray(n, n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            world[i][j] = new Cell(i, j, w);
        }
    }

    for (let nb = 0; nb < k; nb++) {
        let rd = floor(random(n * n));
        let i = rd % n;
        let j = floor(rd / n);

        while (world[i][j].number !== null) {
            rd = floor(random(n * n));
            i = rd % n;
            j = floor(rd / n);
        }
        world[i][j].number = nb;


        rd = floor(random(n * n - 1));
        i = rd % n;
        j = floor(rd / n);

        while (world[i][j].number !== null) {
            rd = floor(random(n * n - 1));
            i = rd % n;
            j = floor(rd / n);
        }
        world[i][j].number = nb;
    }
}


function draw() {
    background(255);

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            world[i][j].show();
        }
    }

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
