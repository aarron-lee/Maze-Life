class MazeNode{

  constructor(pos){
    this.pos = pos;
    this.walls = {};
    this.visited = false;
    this.directions = ["N", "S", "E", "W"];
    this.directions.forEach(direction =>{
      this.walls[direction] = true;
    });
  }

  carveWall(direction){
    if(direction && this.directions.includes(direction)){
      this.walls[direction] = false;
      return direction;
    }
    return null;
  }

  print(){
    let style = "";
    if(this.walls["N"]){
      style+= " border-top: 1px solid black;";
    }
    if(this.walls["S"]){
      style+= " border-bottom: 1px solid black;";
    }
    if(this.walls["E"]){
      style+= " border-right: 1px solid black;";
    }
    if(this.walls["W"]){
      style+= " border-left: 1px solid black;";
    }

    return `<div class="maze-node" id="node-${this.pos[0]}-${this.pos[1]}" style="${style}"></div>`
  }

}

export default MazeNode;
