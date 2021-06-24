class Board {
  
    // restart le canvas quant on fait une nouvelle partie
    reset() {
      this.grid = this.getEmptyBoard();
    }
    
    // Obtenez une matrice remplie de zéros. ??? ligne ???
    getEmptyBoard() {
      return Array.from(
        {length: ROWS}, () => Array(COLS).fill(0)
      );
    }

    isEmpty(x, y){
      return this.grid[y] && this.grid[y][x] === 0;
    }
    insideWalls(x){
      return (x >=0 && x<10)
    }
    aboveFloor(y){
      return (y <20)
    }
    valid(p) { // fonction de coalision
      return p.shape.every((row, dy) => {   // dy = toute la forme du tableau
        return row.every((value, dx) => {   // dx = toute la ligne
          let x = p.x + dx; // ajoute la position à x pour la bloquer dans le tableau
          let y = p.y + dy;
          return (
            value === 0 ||
            (this.isEmpty(x, y) && // dans le tableau
           this.insideWalls(x) && // x interieur des murs
            this.aboveFloor(y) // au dessus du sol
          )
          );
        });
      });
    }
    

    rotate(p){
      // Clonage avec JSON pour l'immuabilité
      let clone = JSON.parse(JSON.stringify(p)); // JSON.parse ?? (JSON. stringify(p) n'accepte que des nombres et met le reste en null)
        for (let y = 0; y < p.shape.length; ++y) {  // boucle pour transposer la piece pour X
        for (let x = 0; x < y; ++x) {               //                                 pour y
          [p.shape[x][y], p.shape[y][x]] = 
          [p.shape[y][x], p.shape[x][y]];
        }
      }
  p.shape.forEach(row => row.reverse()); // inverse l'ordre des colonnes
      
      // faire l'algorithme
      
      return clone;
    }
    
    draw(){
      // this.piece.draw();
      // this.drawBoard();
    }

    freeze() {
      this.piece.shape.forEach((row, y) => { // si touche la dernière ligne , rajoute la valuer au tableau
        row.forEach((value, x) => {
          if (value > 0) {
            this.grid[y + this.piece.y][x + this.piece.x] = value;  // met les valeur x et y des tétrominos dans le tableau en grid
          }
        });
      });
      console.table(board.grid);
    }

    

    drawBoard() { // dessine le tableau
      this.grid.forEach((row, y) => {         // prend les valeurs y du tableau
        row.forEach((value, x) => {           // prend les valeurs x du tableau
          if (value > 0) {
            this.ctx.fillStyle = COLORS[value]; // color
            this.ctx.fillRect(x, y, 1, 1);      // dessine
          }
        });
      });
    }

    
  }

