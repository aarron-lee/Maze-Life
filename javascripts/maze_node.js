class MazeNode{

  constructor(pos){
    this.pos = pos;
    this.walls = {};
    this.visited = false;
    this.directions = ["N", "S", "E", "W"];
    this.directions.forEach(direction =>{
      this.walls[direction] = true;
    });

    this.htmlnode = document.createElement('div');
    this.htmlnode.classList.add("maze-node");
    this.htmlnode.id = `node-${pos[0]}-${pos[1]}`;
    this.setWalls();

    this.resetNode = this.resetNode.bind(this);
    this.calculateHCost = this.calculateHCost.bind(this);
    this.parent = null;
    this.pathNode = false;
    this.activeStatus = false;
    this.isCurrent = false;

    this.hCost = 0;
    this.fCost = 0;
    this.gCost = 0;
  }

  carveWall(direction){
    if(direction && this.directions.includes(direction)){
      this.walls[direction] = false;
      this.removeWalls();
      this.setWalls();
      return direction;
    }
    return null;
  }

  toggleActive(){
    if(this.activeStatus){
      this.activeStatus = false;
      this.htmlnode.classList.remove('active-node');
    }else{
      this.activeStatus = true;
      this.htmlnode.classList.add('active-node');
    }
  }

  setActive(){
    if(this.activeStatus === false){
      this.activeStatus = true;
      this.htmlnode.classList.add('active-node');
    }
  }

  disableActive(){
    if(this.activeStatus === true){
      this.activeStatus = false;
      this.htmlnode.classList.remove('active-node');
    }
  }

  toggleCurrent(){
    if(this.isCurrent === false){
      this.isCurrent = true;
      this.htmlnode.classList.add('current-node');
    }else{
      this.isCurrent = false;
      this.htmlnode.classList.remove('current-node');
    }
  }

  setPath(){
    if(this.pathNode === true){
      this.pathNode = false;
      this.htmlnode.classList.remove('active-node');
    }else{
      this.pathNode = true;
      this.htmlnode.classList.add('path-node');
    }
  }

  node(){
    return this.htmlnode;
  }

  setWalls(){
    if(this.walls["N"]){
      this.htmlnode.classList.add("north-wall");
    }
    if(this.walls["S"]){
      this.htmlnode.classList.add("south-wall");
    }
    if(this.walls["E"]){
      this.htmlnode.classList.add("east-wall");
    }
    if(this.walls["W"]){
      this.htmlnode.classList.add("west-wall");
    }
  }

  removeWalls(){
    let classes = ["north-wall", "south-wall", "east-wall", "west-wall"];

    classes.forEach( c => {
      this.htmlnode.classList.remove(c);
    });
  }

  resetNode(){
    this.directions.forEach(direction =>{
      this.walls[direction] = true;
    });

    this.parent = null;
    this.pathNode = false;
    this.activeStatus = false;
    this.isCurrent = false;
    this.visited = false;
    this.htmlnode.className="maze-node";

    this.hCost = 0;
    this.fCost = 0;
    this.gCost = 0;

    this.setWalls();
    this.disableActive();
  }

  removeTracesOfTravel(){
    this.parent = null;
    this.pathNode = false;
    this.activeStatus = false;
    this.isCurrent = false;
    this.visited = false;

    this.fCost = 0;
    this.gCost = 0;

    this.htmlnode.className="maze-node";
    this.setWalls();
  }


  /* A* search helper methods*/
  calculateHCost(endPos){
    let hCost = 0;

    hCost += (endPos[0] - this.pos[0]);
    hCost += (endPos[1] - this.pos[1]);

    this.hCost = hCost;
    return hCost;
  }


}

export default MazeNode;
