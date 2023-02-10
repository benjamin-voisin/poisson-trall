class Solver {
	constructor(world) {
		this.world = world;
	}

	get_neighbour(cell) {
		let array = [];
		if ((cell.j + 1 < this.world.width) && (this.world.grid[cell.i][cell.j + 1].is_free())) {array.push(this.world.grid[cell.i][cell.j + 1])};
		if ((0 <= cell.j - 1) && (this.world.grid[cell.i][cell.j - 1].is_free())) {array.push(this.world.grid[cell.i][cell.j - 1])};
		if ((cell.i + 1 < this.world.height) && (this.world.grid[cell.i + 1][cell.j].is_free())) {array.push(this.world.grid[cell.i + 1][cell.j])};
		if ((0 <= cell.i - 1) && (this.world.grid[cell.i - 1][cell.j].is_free())) {array.push(this.world.grid[cell.i - 1][cell.j])};
		return array;
	}

	solve() {
		console.error("Pas de solveur implémenté !");
	}
}

class TrackedCell extends Cell {
	constructor(i, j, w, number=null) {
		super(i, j, w, number);
	}
}

class BacktrackingSolver extends Solver {
	constructor(world) {
		super(world);
		this.timestamp = (0, 0);
	}

	heuristique(cella, target) {
		return Math.abs(cella.i - target.i) + Math.abs(cella.j - target.j);
	}

	explore_cell(path, cell) {
		let neighbour = this.get_neighbour(cell);
		neighbour.sort((c1, c2) => (this.heuristique(c1, path.cellend) - this.heuristique(c2, path.cellend)));
		path.tilelist.push([cell, neighbour, this.timestamp]);
	}
	
	explore_path(path) {
		if (path.tilelist[1].length > 0) {
			this.explore_cell(path, path.tilelist[1].pop(), this.timestamp);
		} else {
			path.tilelist.pop();
			this.timestamp = (this.timestamp[0] + 1, 0);
			this.explore_path(path, this.timestamp);
		}
	}

	solve() {
		let sorted_path = [[], [], [], []];
		// Initialise les chemins en précalculant les chemins possibles
		for (let i=0; i < this.world.path.length; i++) {
			this.explore_cell(this.world.path[i], this.world.path[i].cellstart, (0, 0));
			sorted_path[this.world.path[i].tilelist[0][1].length - 1].push(this.world.path[i])
		}
		console.log(sorted_path);
		// Répartition des chemins dans en fonction des coups possibles
		let n_target = 0;
		//while (n_target < this.world.path.length) {
			//console.log("lol")
		//}
	}
}


//La grille est un tableau de sommets.
//Un chemin est une suite de sommets de la grille. (donc une suite de coordonnées)
//Les chemins sont trivialement ordonnés par le nombre qu'il essaient de relier.



//Une fonction qui check si ce qu'on a fait est une solution
function is_solved(grid, paths) {
}

//Une fonction qui donne, pour chaque nombre présent sur la grid, les coordonnées du point de début et du point de fin (ceux-ci étant choisi arbitrairement, mais il faut un point de départ et un point de fin pour chaque nombre)
function get_couples(grid) {
	let res = Array(k);
	const flattened = grid.flatMap(cell => cell);

	for (let i = 0; i < k; i++) {
		res[i] = flattened.filter(cell => cell.number === i);
	}

	return res;
}

function nb_voisins(grid, path) {
	let i, j = coords_last_point(path);
	let nb = 0;
	return tkt;

}

//Pour que l’extension des chemins soit consistante et opti, on choisi d’étendre le chemins qui a le moins d’expension possible (donc le moins de voisins possible), et en cas d’égalité, le plus petit chemin d’après notre ordre défini en haut, c’est à dire le premier dans notre liste de chemin qui est si petit.
function choose_path_to_extend(grid, paths) {
	let path = paths[1];
	let max_nb_voisin = nb_voisins(grid, path);
	for (let i = 1; i < paths.length; i++) {
		if (nb_voisins(paths[i]) > max_nb_voisin) {
			path = paths[i];
			max_nb_voisin = nb_voisins(paths[i]);
		}
	}
	return path;
}

//Cette fonction va essayer d’étendre un chemin en ajoutant, à la fin du chemin, un des voisins possible du dernier sommet du chemin. 
function extend_path() {
}


function find_solution(grid) {
	let k = nb_numbers();
	while (!is_solved(grid, paths)) {
	}
}
