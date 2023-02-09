const n = 20;
let cols, rows;

const k = 5;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(400, 400);
    width = floor(width / n);
    background(51);
    grid = make2DArray(n, n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            grid[i][j] = new Cell(i, j, width);
        }
    }

    for (let nb = 0; nb < k; nb ++) {
        let rd = floor(random(n * n));
        let i = rd % n;
        let j = floor(rd / n);

        while (grid[i][j].number !== null) {
            rd = floor(random(n * n));
            i = rd % n;
            j = rd / n;
        }
        grid[i][j].number = nb;


        rd = floor(random(n * n - 1));
        i = rd % n;
        j = floor(rd / n);

        while (grid[i][j].number !== null) {
            rd = floor(random(n * n - 1));
            i = rd % n;
            j = rd / n;
        }
        grid[i][j].number = nb;
    }
}


function draw() {
    background(255);

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            grid[i][j].show();
        }
    }

}


function mouseDragged(event) {
    let x = event.clientX, y = event.clientY;
    let i = floor(x / width), j = floor(y / width);
    
    
}
