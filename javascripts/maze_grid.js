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
    this.getNode = this.getNode.bind(this);

    this.dfs = this.dfs.bind(this);
    this.dfsearch = this.dfsearch.bind(this);
    this.bfs = this.bfs.bind(this)
    this.bfsearch = this.bfsearch.bind(this)

    this.mazeSteps = [];
    this.visitedPath = [];
  }

  dfs(endPos){
    if(!endPos){
      endPos = [this.dimensions-1, this.dimensions-1];
    }

    let stack = [];
    let foundNode = this.dfsearch([0,0], endPos, stack);

    this.animateVisitedPath(foundNode);


  }

  dfsearch(currentPos, endPos, stack){
    let currentNode = this.getNode(currentPos);
    let neighborNodes = this.neighborNodes(currentPos);

    if((currentPos[0] === endPos[0]) && (currentPos[1] === endPos[1])){
      //found
      currentNode.visited = true;
      return currentNode;
    }

    let validMoves = [];

    Object.keys(neighborNodes).forEach((direction)=>{
      if(!currentNode.walls[direction] && !neighborNodes[direction].node.visited){
        validMoves.push( neighborNodes[direction] );
        neighborNodes[direction].node.parent = currentNode;
      }
    });

    stack = stack.concat(validMoves);


    while(stack.length > 0){
      let n = stack.pop();
      currentNode.visited = true;
      this.visitedPath.push(currentNode);
      return this.dfsearch(n.node.pos, endPos, stack);
    }
  }

  bfs(endPos){
    if(!endPos){
      endPos = [this.dimensions-1, this.dimensions-1];
    }

    let queue = [];
    let foundNode = this.bfsearch([0,0], endPos, queue);
    this.animateVisitedPath(foundNode);
  }

  bfsearch(currentPos, endPos, queue){
    let currentNode = this.getNode(currentPos);
    let neighborNodes = this.neighborNodes(currentPos);

    if((currentPos[0] === endPos[0]) && (currentPos[1] === endPos[1])){
      //found
      currentNode.visited = true;
      return currentNode;
    }

    let validMoves = [];

    Object.keys(neighborNodes).forEach((direction)=>{
      if(!currentNode.walls[direction] && !neighborNodes[direction].node.visited){
        validMoves.push( neighborNodes[direction] );
        neighborNodes[direction].node.parent = currentNode;
      }
    });

    queue = queue.concat(validMoves);

    while(queue.length > 0){
      let n = queue.shift();
      currentNode.visited = true;
      this.visitedPath.push(currentNode);
      return this.bfsearch(n.node.pos, endPos, queue);
    }
  }

  validMoves(currentPos){
    let neighborNodes = this.neighborNodes(currentPos);
  }

  animateVisitedPath(foundNode){
    let visitedPath = this.visitedPath;

    let i = 0;
    let intervalId = null;
    intervalId = setInterval( ()=>{
      if(i < visitedPath.length){
        visitedPath[i].toggleCurrent();
        visitedPath[i].setActive();
        if(i+1 < visitedPath.length){
          visitedPath[i+1].toggleCurrent();
        }
        i+=1;
      }else{
        clearInterval(intervalId);
        this.animateFoundPath(foundNode);
      }
    }, 50);
  }

  animateFoundPath(foundNode){
    let foundPath = [];

    while(foundNode.parent){
      foundPath.push(foundNode);
      foundNode = foundNode.parent;
    }

    let i = 0;
    let intervalId = null;
    intervalId = setInterval( ()=>{
      if(i < foundPath.length){
        foundPath[i].setPath();
        i+=1;
      }else{
        clearInterval(intervalId);
        this.getNode([0,0]).setPath();
      }
    }, 20);
  }

  resetMaze(){
    this.mazeSteps = [];
    this.visitedPath = [];
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].resetNode();
      }
    }
  }

  animateMazeCreation(intervalMs){
    let i = 0;

    let intervalId = null;
    intervalId = setInterval( ()=>{
      if(i < this.mazeSteps.length){
        if( this.carveWall(this.mazeSteps[i].pos, this.mazeSteps[i].direction) ){
          this.mazeNodes[this.mazeSteps[i].pos[0]][this.mazeSteps[i].pos[1]].setActive();
          this.nextPos(this.mazeSteps[i].pos, this.mazeSteps[i].direction).setActive();
        }
        i+=1;
      }else{
        clearInterval(intervalId);
        this.mazeSteps = [];
        let generateMazeButton = document.querySelector('#generate-maze-button');
        generateMazeButton.disabled = false;
        this.resetActive();
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

  resetActive(){
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].disableActive();
      }
    }
  }


  generateMaze(intervalMs=100, startingPos=[0,0]){
    this.resetMaze();
    this.createMaze(startingPos);
    this.resetVisited();
    this.animateMazeCreation(intervalMs);
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

  // shuffle source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

  getNode(pos){
    return this.mazeNodes[ pos[0]][ pos[1] ];
  }

}


export default MazeGrid;
