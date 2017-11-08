import MazeNode from './maze_node';

class MazeGrid{
  // origin is top left, [0][0]
  constructor(dimensions=8){
    this.mazeNodes = new Array(dimensions);
    for(let idx = 0; idx < dimensions; idx++){
      this.mazeNodes[idx] = new Array(dimensions);
    }
    this.dimensions = dimensions;

    this.constructGrid();

  }


  constructGrid(){
    this.grid = document.createElement('div');

    this.grid.classList.add('maze-grid');

    for(let i = 0 ; i < this.dimensions ; i++){
      let row = document.createElement('div');
      row.id = `row-${i}`;
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j] = new MazeNode([i,j]);
        row.appendChild(this.mazeNodes[i][j].node());
      }
      this.grid.appendChild(row);
    }
  }


  carveWall(pos, direction){
    this.mazeNodes[pos[0]][pos[1]].carveWall(direction)
  }


}


export default MazeGrid;
