class Piece {  
    constructor(ctx) {
      this.ctx = ctx;
      this.color = 'blue';
      this.shape = [ //forme à plat du J
        [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0]
      ];
      
      // position de départ
      this.x = 3;
      this.y = 0;
      const typeId = this.randomizeTetrominoType(COLORS.length);
      this.shape = SHAPES[typeId];
      this.color = COLORS[typeId];
    }


    draw() { // fonction pour dessiner le tétromino
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            //this.x, this.y donne la position supérieure gauche de la forme
            // x, y donne la position du bloc dans la forme
            // this.x + x est alors la position du bloc sur le tableau
            // si supérieur à zéro le bloc est dessiné
            if (value > 0) {
              this.ctx.fillRect(this.x + x, this.y + y, 1, 1); 
            }
          });
        });
      }

      move(p) { 
        this.x = p.x; 
        this.y = p.y; 
      }

      randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
      }
      
      animate() {
        this.draw(); //dessine
        requestAnimationFrame(this.animate.bind(this));
      }
      
  }

