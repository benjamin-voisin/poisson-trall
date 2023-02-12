class Solver {
	constructor(world) {
		this.world = world;
	}

	get_free_neighbour(path, cell) {
		let array = [];
		if ((cell.j + 1 < this.world.width) && (this.world.grid[cell.i][cell.j + 1].is_free(path))) { array.push(this.world.grid[cell.i][cell.j + 1]) };
		if ((0 <= cell.j - 1) && (this.world.grid[cell.i][cell.j - 1].is_free(path))) { array.push(this.world.grid[cell.i][cell.j - 1]) };
		if ((cell.i + 1 < this.world.height) && (this.world.grid[cell.i + 1][cell.j].is_free(path))) { array.push(this.world.grid[cell.i + 1][cell.j]) };
		if ((0 <= cell.i - 1) && (this.world.grid[cell.i - 1][cell.j].is_free(path))) { array.push(this.world.grid[cell.i - 1][cell.j]) };
		return array;
	}

	solve() {
		console.error("Pas de solveur implémenté !");
	}
}

class BacktrackingSolver extends Solver {
	constructor(world) {
		super(world);
		this.started = false;
		this.moves = [];
		this.last_reverse = null;
	}

	heuristique(cella, target) {
		return (cella.i - target.i) ** 2 + (cella.j - target.j) ** 2;
	}

	update_neighbour(path) {
		let tile = path.tilelist.pop();
        let neighbour = this.get_free_neighbour(path, tile[0]);
		neighbour.sort((c1, c2) => (this.heuristique(c2, path.cellend) - this.heuristique(c1, path.cellend)));
		path.tilelist.push([tile[0], neighbour]);
    }

	backtrack_cell(cell) {
		cell.path = null;
	}

	backtrack_path(path) {
		let tile = path.tilelist.pop();
		this.backtrack_cell(tile[0]);
		if (this.last_reverse !== null && this.last_reverse !== path.id) {
			this.update_neighbour(this.world.paths[this.last_reverse]);
		}
		this.last_reverse = path.id;
	}

	backtrack() {
		if (this.moves.length > this.world.paths.length) {
			let path = this.world.paths[this.moves.pop()];
			this.backtrack_path(path);
		} else {
			console.error("Tentative de supression d'un noeud initial !");
		}
	}

	explore_cell(path, cell) {
		this.moves.push(path.id);
		cell.path = path.id;
		if (cell !== path.cellend) {
			let neighbour = this.get_free_neighbour(path, cell);
			neighbour.sort((c1, c2) => (this.heuristique(c2, path.cellend) - this.heuristique(c1, path.cellend)));
			path.tilelist.push([cell, neighbour]);
		} else {
			path.tilelist.push([cell, []]);
		}
	}

	explore_path(path) {
		console.log(path);
		if (path.tilelist[path.tilelist.length - 1][1].length > 0) {
			// Vérifier que la node n'a pas étée occupée depuis
			let cell = path.tilelist[path.tilelist.length - 1][1].pop();
			if (cell.is_free(path)) {
				this.explore_cell(path, cell);
			}
		} else {
			this.backtrack()
		}
	}

	start_solve() {
		this.started = true;
		// Initialise les chemins en précalculant les chemins possibles
		for (let i = 0; i < this.world.paths.length; i++) {
			this.explore_cell(this.world.paths[i], this.world.paths[i].cellstart);
		}
	}

	iter_solve() {
		let min = 5;
		let imin = -1;
		for (let i=0; i < this.world.paths.length; i++) {
			//
			console.log(`${i}: ${this.world.paths[i].tilelist[this.world.paths[i].tilelist.length - 1][1].length}, min=${min}`);
			if (this.world.paths[i].tilelist[this.world.paths[i].tilelist.length - 1][1].length < min && this.world.paths[i].tilelist[this.world.paths[i].tilelist.length - 1][0] !== this.world.paths[i].cellend) {
				min = this.world.paths[i].tilelist[this.world.paths[i].tilelist.length - 1][1].length;
				imin = i;
			}
		}
		if (min === 5) {
			console.log("Terminé, c'est trouvé !");
				this.started = false;
		} else {
			this.explore_path(this.world.paths[imin]);
		}
	}
}
