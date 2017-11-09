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
    this.generateMaze = this.generateMaze.bind(this);
    this.createMaze = this.createMaze.bind(this);
    this.animateMazeCreation = this.animateMazeCreation.bind(this);


    this.mazeSteps = [];
  }

  resetMaze(){
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].resetNode();
      }
    }
  }

  generateMaze(intervalMs=100, startingPos=[0,0]){

    this.createMaze(startingPos);

    this.resetVisited();

    this.animateMazeCreation(intervalMs);

  }

  animateMazeCreation(intervalMs){
    let i = 0;

    let intervalId = null;
    intervalId = setInterval( ()=>{
      if(i < this.mazeSteps.length){
        if( this.carveWall(this.mazeSteps[i].pos, this.mazeSteps[i].direction)){
          this.mazeNodes[this.mazeSteps[i].pos[0]][this.mazeSteps[i].pos[1]].setActive();
          this.nextPos(this.mazeSteps[i].pos, this.mazeSteps[i].direction).setActive();
        }
        i+=1;
      }else{
        clearInterval(intervalId);
        this.mazeSteps = [];
      }
    }, intervalMs);
  }

  resetVisited(){
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].visited = false;
      }
    }
  }

  createMaze(currentPos){
    let neighborNodes = this.neighborNodes(currentPos);
    let directions = this.shuffle(Object.keys(neighborNodes));
    this.mazeNodes[currentPos[0]][currentPos[1]].visited = true;


    directions.forEach( direction =>{
      if(neighborNodes[direction] && neighborNodes[direction].node.visited === false){

        // this.carveWall(currentPos, direction);
        this.mazeSteps.push( {pos: currentPos, direction: direction} );
        neighborNodes[direction].node.visited = true;
        this.createMaze(neighborNodes[direction].node.pos);
      }
    });


  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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

    let neighborNodes = {};

    let directions = ["N", "S", "E", "W"];

    directions.forEach(direction =>{
      let nextNode = this.nextPos(pos, direction);
      if(nextNode !== null ){
        neighborNodes[direction] = { direction: direction, node: nextNode };
      }
    });

    return neighborNodes;
  }

  // unvisitedNeighborNodes(pos){
  //   return this.neighborNodes(pos).filter(node =>{
  //     return node.visited === false;
  //   });
  // }

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

  sample(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

}


export default MazeGrid;
