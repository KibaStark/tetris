class Board {
  constructor (ctx) {
    this.ctx = ctx;
    this.piece = null;
  }
  play() {
    this.animate();
    this.reset();
    // console.table(this.grid); // vérifie si le canvas est en tableau de nombre déclarer à zero

    this.createPiece();
    
}

  createPiece() {
    this.piece = new Piece(ctx);
    this.piece.animate();
  }
  
    // tableau
    reset() {
      this.grid = this.getEmptyBoard();
    }
    
    // Obtenez une matrice remplie de zéros. ??? ligne ???
    getEmptyBoard() {
      return Array.from(
        {length: ROWS}, () => Array(COLS).fill(0)
      );
    }

    isEmpty(x, y){console.log('isEmpty', this.grid[y] && this.grid[y][x] === 0);
      return this.grid[y] && this.grid[y][x] === 0;
    }
    insideWalls(x){  console.log('insadeWalls', x >=0 && x<=9,x);
      return (x >=0 && x<COLS)
    }
    aboveFloor(y){
      return (y <= ROWS)
    }
    valid(p) { // fonction de coalision
      return p.shape.every((row, dy) => {   // dy = toute la forme du tableau
        return row.every((value, dx) => {   // dx = toute la ligne
          let x = p.x + dx; // ajoute la position à x pour la bloquer dans le tableau
          let y = p.y + dy;
          console.log(x, y);
// console.log(            value === 0 ||
//   (this.isEmpty(x, y) && // dans le tableau
//  this.insideWalls(x) && // x interieur des murs
//   this.aboveFloor(y) // au dessus du sol
// ));
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
      if (this.piece != null){
      this.piece.draw();
      // console.log('test)');
      this.drawBoard();
      }
    }

    freeze() {
      this.piece.shape.forEach((row, y) => { // si touche la ligne , rajoute la valeur au tableau
        row.forEach((value, x) => {
          if (value > 0) {
            this.grid[y + this.piece.y][x + this.piece.x] = value;  // met les valeur x et y des tétrominos dans le tableau en grid
            // console.table(board.grid);
          }
        }); 
      });
      // console.table(board.grid); 
    }

    

    drawBoard() { // dessine le tableau
      this.grid.forEach((row, y) => {         // prend les valeurs ligne et y du tableau
        row.forEach((value, x) => { 
          // console.table(board.grid)         // prend les valeurs x du tableau
          if (value > 0) {
            this.ctx.fillStyle = COLORS[value]; // color les pieces de la valeur de const COLORS
            this.ctx.fillRect(x, y, 1, 1);     // dessine
          }
        });
      });
    }

    animate(now = 0) {
          
      // met à jour le temps écoulé
      time.elapsed = now - time.start;
      
      // Si le temps écoulé a dépassé le temps pour le niveau actuel
      if (time.elapsed > time.level) {
      
        // recommence le compter maintenant
        time.start = now;   
        this.drop(); 
        // console.log('timer');

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
 
      }
      // efface le canvas avant de dessiner le nouveau


      this.draw();  

      requestAnimationFrame(this.animate.bind(this)); //peint un cadre, puis se replanifie
    }

    clearLines (){
      this.grid.forEach((row, y) => {

        //si chaque valeur est > 0
        if (row.every(value => value > 0)) {
        
          // supprimer la ligne
          this.grid.splice(y, 1);
          
          // ajouter une ligne remplie de zeros
          this.grid.unshift(Array(COLS).fill(0));
        } 
      });
    }
    
    drop() {
    
      let p = moves[KEY.DOWN](this.piece);
      if (this.valid(p)) {  
        this.piece.move(p);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        this.draw();  
      } else {
        this.freeze();
        console.table(board.grid); 
        this.clearLines();
        this.createPiece();
      }
    }

    
  }
  