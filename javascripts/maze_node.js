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

    this.activeStatus = false;
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
