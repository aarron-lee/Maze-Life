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
    this.endPos = [this.dimensions-1, this.dimensions-1];
    this.constructGrid();

    this.carveWall = this.carveWall.bind(this);
    this.checkIfLegal = this.checkIfLegal.bind(this);
    this.carveWallsBetweenNodes = this.carveWallsBetweenNodes.bind(this);
    this.nextPos = this.nextPos.bind(this);
    this.validPos = this.validPos.bind(this);
    this.neighborNodes = this.neighborNodes.bind(this);
    this.validNeighborNodes = this.validNeighborNodes.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.createMaze = this.createMaze.bind(this);
    this.animateMazeCreation = this.animateMazeCreation.bind(this);
    this.getNode = this.getNode.bind(this);
    this.dfs = this.dfs.bind(this);
    this.dfsearch = this.dfsearch.bind(this);
    this.bfs = this.bfs.bind(this);
    this.bfsearch = this.bfsearch.bind(this);
    this.resetPaths = this.resetPaths.bind(this);
    this.aStar = this.aStar.bind(this);

    this.mazeSteps = [];
    this.visitedPath = [];

    this.gCost = 10;
  }

  generateMaze(instant=false, buttonsToEnable, startingPos=[0,0]){
    this.resetNodes();
    this.createMaze(startingPos);
    this.resetVisited();
    if(!instant){
      this.animateMazeCreation(1, buttonsToEnable);
    }
    else{
      for(let i = 0; i < this.mazeSteps.length; i++){
        this.carveWall(this.mazeSteps[i].pos, this.mazeSteps[i].direction);
      }
      this.enableButtons(buttonsToEnable);
    }
  }

  dfs(buttonsToEnable, endPos){
    this.resetPaths();

    if(!endPos){
      endPos = this.endPos;
    }

    let stack = [];
    let foundNode = this.dfsearch([0,0], endPos, stack);

    this.animateVisitedPath(foundNode, buttonsToEnable, "timer-dfs");
  }

  bfs(buttonsToEnable, endPos){
    this.resetPaths();

    if(!endPos){
      endPos = this.endPos;
    }

    let queue = [];
    let foundNode = this.bfsearch([0,0], endPos, queue);
    this.animateVisitedPath(foundNode, buttonsToEnable, "timer-bfs");
  }


  aStar(buttonsToEnable, endPos){
    let openList = new Set();
    openList.add(this.getNode([0,0]))
    let closedList = new Set();

    while(openList.size > 0){
      let currentNode = this.getLowestFCost(openList);
      if((currentNode.pos[0] === this.endPos[0]) && (currentNode.pos[1] === this.endPos[1])){
        // found
        console.log(currentNode);
        alert('found!');
        return currentNode;
      }

      closedList.add(currentNode);
      openList.delete(currentNode);

      let neighborNodes = this.validNeighborNodes(currentNode);

      Object.keys(neighborNodes).forEach( direction =>{
        let neighbor = neighborNodes[direction].node;
        if( closedList.has(neighbor) ){
          // not a valid node to process, continue
        }else{

          let gCost = currentNode.gCost + 10;
          let gCostIsBest = false;

          if(!openList.has(neighbor)){
            gCostIsBest = true;
            openList.add(neighbor);
          }else if( gCost < neighbor.gCost ){
            gCostIsBest = true;
          }

          if(gCostIsBest){
            neighbor.parent = currentNode;
            neighbor.gCost = gCost;
            neighbor.fCost = neighbor.gCost + neighbor.hCost;
          }
        }// end else
      });// end forEach
    }// end while
    return null;
  }

  getLowestFCost(openSet){
    let openList = Array.from(openSet);
    let fCost = openList[0].fCost ? openList[0].fCost : 0;
    let node = openList[0];

    for(let i = 1; i < openList.length; i++){
      let currentNode = openList[i];
      if(currentNode.fCost < fCost){
        node = currentNode;
        fCost = currentNode.fCost;
      }
    }
    return node;
  }

  /*  internal use methods   */
  createMaze(currentPos){
    let neighborNodes = this.neighborNodes(currentPos);
    let directions = this.shuffle(Object.keys(neighborNodes));
    this.mazeNodes[currentPos[0]][currentPos[1]].visited = true;


    directions.forEach( direction =>{
      if(neighborNodes[direction] && neighborNodes[direction].node.visited === false){
        this.mazeSteps.push( {pos: currentPos, direction: direction} );
        neighborNodes[direction].node.visited = true;
        this.createMaze(neighborNodes[direction].node.pos);
      }
    });


  }

  dfsearch(currentPos, endPos, stack){
    let currentNode = this.getNode(currentPos);

    if((currentPos[0] === endPos[0]) && (currentPos[1] === endPos[1])){
      //found
      currentNode.visited = true;
      return currentNode;
    }

    let validMoves = this.validNeighborNodes(currentNode, true);

    stack = stack.concat(validMoves);

    while(stack.length > 0){
      let n = stack.pop();
      currentNode.visited = true;
      this.visitedPath.push(currentNode);
      return this.dfsearch(n.node.pos, endPos, stack);
    }
  }

  bfsearch(currentPos, endPos, queue){
    let currentNode = this.getNode(currentPos);

    if((currentPos[0] === endPos[0]) && (currentPos[1] === endPos[1])){
      //found
      currentNode.visited = true;
      return currentNode;
    }

    let validMoves = this.validNeighborNodes(currentNode, true);

    queue = queue.concat(validMoves);

    while(queue.length > 0){
      let n = queue.shift();
      currentNode.visited = true;
      this.visitedPath.push(currentNode);
      return this.bfsearch(n.node.pos, endPos, queue);
    }
  }

  animateVisitedPath(foundNode, buttonsToEnable, timerId){
    let visitedPath = this.visitedPath;
    let timer = document.getElementById(timerId);
    let animationSpeed = document.getElementById('search-speed-slider').value;


    let startTime = new Date();
    let currentTime = new Date();

    let i = 0;
    let intervalId = null;
    intervalId = setInterval( ()=>{
      if(i === 0){
        startTime = new Date();
      }
      if(i < visitedPath.length){
        visitedPath[i].toggleCurrent();
        visitedPath[i].setActive();
        if(i+1 < visitedPath.length){
          visitedPath[i+1].toggleCurrent();
        }
        i+=1;
        currentTime = new Date();
        timer.innerHTML = currentTime.getTime() - startTime.getTime() + " ms";
      }else{
        clearInterval(intervalId);
        this.animateFoundPath(foundNode, buttonsToEnable);
      }
    }, animationSpeed);
  }

  animateFoundPath(foundNode, buttonsToEnable){
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
        this.enableButtons(buttonsToEnable);
      }
    }, 3);
  }

  enableButtons(buttons){
    buttons.forEach((button) =>{
      button.disabled = false;
    });
  }

  animateMazeCreation(intervalMs, buttonsToEnable){
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
        this.enableButtons(buttonsToEnable);
        this.resetActive();
      }
    }, intervalMs);
  }

  resetPaths(){
    this.resetVisited();
    // this.mazeSteps = [];
    this.visitedPath = [];
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].removeTracesOfTravel();
      }
    }
  }

  resetNodes(){
    this.mazeSteps = [];
    this.visitedPath = [];
    for(let i = 0 ; i < this.dimensions ; i++){
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j].resetNode();
      }
    }
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

  constructGrid(endPos){
    if(!endPos){
      endPos = this.endPos;
    }
    this.grid = document.createElement('div');

    this.grid.classList.add('maze-grid');

    for(let i = 0 ; i < this.dimensions ; i++){
      let row = document.createElement('div');
      row.id = `row-${i}`;
      for(let j = 0; j < this.dimensions; j++){
        this.mazeNodes[i][j] = new MazeNode([i,j]);
        this.mazeNodes[i][j].calculateHCost(endPos);
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

  validNeighborNodes(currentNode, setParent=false){
    let pos = currentNode.pos;
    let neighborNodes = this.neighborNodes(pos);

    let validMoves = [];

    Object.keys(neighborNodes).forEach((direction)=>{
      if(!currentNode.walls[direction] && !neighborNodes[direction].node.visited){
        validMoves.push( neighborNodes[direction] );
        if(setParent){
          neighborNodes[direction].node.parent = currentNode;
        }
      }
    });
    return validMoves;
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
