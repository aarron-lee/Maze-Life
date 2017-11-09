import MazeNode from './maze_node';

class MazeGrid{
  // origin is top left, [0][0]
  // [row][col]
  constructor(dimensions=8){
    this.mazeNodes = new Array(dimensions);
    for(let idx = 0; idx < dimensions; idx++){
      this.mazeNodes[idx] = new Array(dimensions);
    }
    this.dimensions = dimensions;

    this.constructGrid();

    this.carveWall = this.carveWall.bind(this);
    this.checkIfLegal = this.checkIfLegal.bind(this);
    this.carveWallsBetweenNodes = this.carveWallsBetweenNodes.bind(this);
    this.nextPos = this.nextPos.bind(this);
    this.validPos = this.validPos.bind(this);
    this.neighborNodes = this.neighborNodes.bind(this);
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
    if(this.validPos(pos)){
      if(this.checkIfLegal(pos, direction)){
        this.carveWallsBetweenNodes(pos, direction);
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  checkIfLegal(pos, direction){
    let row = pos[0];
    let col = pos[1];

    if(row === 0){// top row
      if(direction == "N"){
        return false;
      }
    }
    if(row === (this.dimensions-1)){// bottom row
      if(direction == "S"){
        return false;
      }
    }
    if(col === 0){// leftmost col
      if(direction == "W"){
        return false;
      }
    }
    if(col === (this.dimensions-1)){// rightmost col
      if(direction == "E"){
        return false;
      }
    }
    return true;
  }

  carveWallsBetweenNodes(pos, direction){
    this.mazeNodes[pos[0]][pos[1]].carveWall(direction)
    let nextPos = this.nextPos(pos, direction);
    if(nextPos){
      nextPos.carveWall(this.oppositeDirection(direction));
    }
  }

  oppositeDirection(direction){
    if(direction == "N"){
      return "S";
    }
    if(direction == "S"){
      return "N";
    }
    if(direction == "E"){
      return "W";
    }
    if(direction == "W"){
      return "E";
    }
  }

  nextPos(currentPos, direction){
    let nextPos = [ currentPos[0], currentPos[1] ];
    if(direction == "N"){
      nextPos[0]-= 1;
    }else if (direction == "S") {
      nextPos[0]+= 1;
    }else if (direction == "E") {
      nextPos[1]+= 1;
    }else if (direction == "W") {
      nextPos[1]-= 1;
    }
    if(this.validPos(nextPos)){
      return this.mazeNodes[nextPos[0]][nextPos[1]];
    }
    return null;
  }


  neighborNodes(pos){

    let neighborNodes = [];

    let directions = ["N", "S", "E", "W"];

    directions.forEach(direction =>{
      let nextNode = this.nextPos(pos, direction);
      if(nextNode !== null ){
        neighborNodes.push({ direction: direction, node: nextNode });
      }
    });

    return neighborNodes;
  }

  validPos(pos){
    if(pos.length < 2){
      return false;
    }
    if(pos[0] >= this.dimensions || pos[0] < 0){
      return false;
    }
    if(pos[1] >= this.dimensions || pos[1] < 0){
      return false;
    }
    return true;
  }


}


export default MazeGrid;
