const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');


ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE); // scale =  blocs = 1, au lieux de calculer les blocs à chaque fois






let board = new Board();

time = { start: 0, elapsed: 0, level: 1000 };

    

    function play() {
      animate();
        board.reset();  //restart
        // console.table(board.grid); // vérifie si le canvas est en tableau de nombre déclarer à zero

        let piece = new Piece(ctx);
        piece.animate();

        
        board.piece = piece;
        
    }


    
    
    const moves = {
        [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }), // ligne droite vers le bas
        [KEY.UP] : (p) => board.rotate(p),         // rotation
        [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),  //gauche par rapport à p.x
        [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),  //droite par rapport à p.x
        [KEY.DOWN]:  p => ({ ...p, y: p.y + 1 }) // bas par rapport à p.y
      };
      

      
      

    document.addEventListener('keydown', event => { // ajoute un evenement d'écoute pour touche clavier
    if (moves[event.keyCode]) {                   
      // Arrêtez l'événement
      event.preventDefault();
      // obtenir un nouvelle état de la piece
      let p = moves[event.keyCode](board.piece);
      
      
      if (board.valid(p)) {    
          
        // si mouvement possible = bouger
        board.piece.move(p);
        
        // efface l'ancienne position avant de dessiner
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        
        board.piece.draw(); // dessine la piece
        
        if (event.keyCode === KEY.SPACE) {
          while (board.valid(p)) {
            board.piece.move(p);   
            p = moves[KEY.DOWN](board.piece);
          }
        }
      
        
      }
      
    }
  });
  
  function animate(now = 0) {
          
    // met à jour le temps écoulé
    time.elapsed = now - time.start;
    
    // Si le temps écoulé a dépassé le temps pour le niveau actuel
    if (time.elapsed > time.level) {
    
      // recommence le compter maintenant
      time.start = now;   
      this.drop(); 
      console.log('timer'); 
    }
    
    // efface le canvas avant de dessiner le nouveau
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    
    board.draw();  
    requestId = requestAnimationFrame(animate); //peint un cadre, puis se replanifie
  }
  


  function drop() {
    
    let p = moves[KEY.DOWN](board.piece);
    if (board.valid(p)) {  
      board.piece.move(p);
    } else {
      board.freeze();
    }
  }
  
  function draw(){
    this.piece.draw();
    this.drawBoard();
  }