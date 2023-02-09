class Solver {
	constructor(world) {
		this.world = world;
	}

	solve() {
		console.error("Pas de solveur implémenté !");
	}
}

class Backtracking extends Solver {
	constructor(world) {
		super(world)
	}
	
	solve() {

	}
}


//La grille est un tableau de sommets.
//Un chemin est une suite de sommets de la grille. (donc une suite de coordonnées)
//Les chemins sont trivialement ordonnés par le nombre qu'il essaient de relier.



//Une fonction qui check si ce qu'on à fait est une solution
function is_solved(grid,paths){
}

//Une fonction qui donne, pour chaque nombre présent sur la grid, les coordonnées du point de début et du point de fin (ceux-ci étant choisi arbitrairement, mais il faut un point de départ et un point de fin pour chaque nombre)
function get_couples(grid){
}

function get_voisins(grid, path){

}

function nb_voisins(grid, path){
	let i, j = coords_last_point(path);
	let nb = 0;
	return tkt;

}

//Pour que l’extension des chemins soit consistante et opti, on choisi d’étendre le chemins qui a le moins d’expension possible (donc le moins de voisins possible), et en cas d’égalité, le plus petit chemin d’après notre ordre défini en haut, c’est à dire le premier dans notre liste de chemin qui est si petit.
function choose_path_to_extend(grid, paths){
	let path = paths[1];
	let max_nb_voisin = nb_voisins(grid, path);
	for (let i = 1; i < paths.length; i++){
		if (nb_voisins(paths[i]) > max_nb_voisin){
			path = paths[i];
			max_nb_voisin = nb_voisins(paths[i]);
		}
	}
	return path;
}

//Cette fonction va essayer d’étendre un chemin en ajoutant, à la fin du chemin, un des voisins possible du dernier sommet du chemin. 
function extend_path(){
}


function find_solution(grid){
	let k = nb_numbers();
}
