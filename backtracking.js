class Solver {
	constructor(world) {
		this.world = world;
	}

	get_free_neighbour(path, cell) {
		let array = [];
		if ((cell.j + 1 < this.world.width) && (this.world.grid[cell.i][cell.j + 1].is_free(path))) {array.push(this.world.grid[cell.i][cell.j + 1])};
		if ((0 <= cell.j - 1) && (this.world.grid[cell.i][cell.j - 1].is_free(path))) {array.push(this.world.grid[cell.i][cell.j - 1])};
		if ((cell.i + 1 < this.world.height) && (this.world.grid[cell.i + 1][cell.j].is_free(path))) {array.push(this.world.grid[cell.i + 1][cell.j])};
		if ((0 <= cell.i - 1) && (this.world.grid[cell.i - 1][cell.j].is_free(path))) {array.push(this.world.grid[cell.i - 1][cell.j])};
		return array;
	}

	solve() {
		console.error("Pas de solveur implémenté !");
	}
}

class BacktrackingSolver extends Solver {
	constructor(world) {
		super(world);
		this.moves = [];
		this.sorted_path = [[], [], [], [], [], []];
	}

	heuristique(cella, target) {
		return (cella.i - target.i) ** 2 + (cella.j - target.j) ** 2;
	}

	backtrack_cell(cell) {
		cell.path = null;
	}

	backtrack_path(path) {
		let tile = path.tilelist.pop();
		this.backtrack_cell(tile[0]);
	}

	backtrack(path) {
		console.log("BACKTRACK");
		console.log(path.id);
		console.log(this.moves);
		console.log(this.sorted_path);
		while ((this.moves.length > 0) && (this.moves[this.moves.length - 1] !== path.id)) {
			this.backtrack_path(this.world.paths[this.moves.pop()]);
		}
		this.backtrack_path(this.world.paths[this.moves.pop()]);
	}

	explore_cell(path, cell) {
		this.moves.push(path.id);
		cell.path = path.id;
		if (cell != path.cellend) { 
			let neighbour = this.get_free_neighbour(path, cell);
			neighbour.sort((c1, c2) => (this.heuristique(c2, path.cellend) - this.heuristique(c1, path.cellend)));
			path.tilelist.push([cell, neighbour]);
			this.sorted_path[neighbour.length].push(path);
		} else {
			path.tilelist.push([cell, []]);
			this.sorted_path[5].push(path);
		}
	}
	
	explore_path(path) {
		if (path.tilelist[path.tilelist.length - 1][1].length > 0) {
			// Vérifier que la node n'a pas étée occupée depuis
			let cell = path.tilelist[path.tilelist.length - 1][1].pop();
			if (cell.is_free(path)) {
				this.explore_cell(path, cell);
			}
		} else {
			this.backtrack(path)
		}
	}

	compute_sorted_path() {
		this.sorted_path = [[], [], [], [], [], []];
		for (let i=0; i < this.world.paths.length; i++) {
			if (this.world.paths[i].tilelist[this.world.paths[i].tilelist.length - 1][0] !== this.world.paths[i].cellend) {
				this.sorted_path[this.world.paths[i].tilelist[0][1].length].push(this.world.paths[i]);
			} else {
				this.sorted_path[5].push(this.world.paths[i]);
			}
		}
	}

	start_solve() {
		// Initialise les chemins en précalculant les chemins possibles
		for (let i=0; i < this.world.paths.length; i++) {
			this.explore_cell(this.world.paths[i], this.world.paths[i].cellstart);
		}
		this.compute_sorted_path()
	}

	iter_solve() {
		let i = 0;
		while ((i < this.sorted_path.length) && (this.sorted_path[i].length === 0)) {i++}
		if (i === this.sorted_path.length) {
			console.log("On ne peut plus avancer ! sad");
		} else {
			this.explore_path(this.sorted_path[i].pop());	
		}
	}
}
