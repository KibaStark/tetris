const COLS = 10;   //colonnes
const ROWS = 20;   // lignes
const BLOCK_SIZE = 30; // blocs

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
}
Object.freeze(POINTS);



const KEY = {
    SPACE: 32,
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
  }
  Object.freeze(KEY);

  const COLORS = [  
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
  ];
  
  const SHAPES = [  
    [
      [0, 0, 0, 0], 
      [1, 1, 1, 1],
      [0, 0, 0, 0], 
      [0, 0, 0, 0]
    ], 
    [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ],
    [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ],
    [
      [6, 6, 6],
      [0, 6, 0],
      [0, 0, 0]
    ],
    [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ]
  ];
  
  // const p = this.move[event.key](this.piece);