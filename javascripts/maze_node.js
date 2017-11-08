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
  }

  carveWall(direction){
    if(direction && this.directions.includes(direction)){
      this.walls[direction] = false;
      this.resetWalls();
      this.setWalls();
      return direction;
    }
    return null;
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

  resetWalls(){
    let classes = ["north-wall", "south-wall", "east-wall", "west-wall"];

    classes.forEach( c => {
      this.htmlnode.classList.remove(c);
    });
  }

}

export default MazeNode;
