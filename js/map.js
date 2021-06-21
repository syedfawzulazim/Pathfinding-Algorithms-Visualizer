function Board(height, width) {
    this.height = height;
    this.width = width;

    this.start = null;
    this.target = null;
    this.object = null;

    this.nodes = {};

    this.boardArray = [];
    this.nodesToAnimate = [];
    this.objectNodesToAnimate = [];
    this.shortestPathNodesToAnimate = [];
    this.objectShortestPathNodesToAnimate = [];
    this.wallsToAnimate = [];

    this.pressedNodeStatus = "normal";
    this.previouslyPressedNodeStatus = null;
    this.previouslySwitchedNode = null;
    this.currentAlgorithm = null;
    this.currentHeuristic = null;
    
    this.previouslySwitchedNodeWeight = 0;
    this.numberOfObjects = 0;

    this.mouseDown = false;
    this.keyDown = false;
    this.algoDone = false;
    this.buttonsOn = true;
    this.isObject = false;
 
    this.speed = "fast";
  }

Board.prototype.initialize = function(){
    this.createGrid();
    this.addEventListeners();
}

Board.prototype.createGrid = function(){
    let tableHTML = '';
    for (let r = 0; r < this.height; r++) {
       let currentArrayRow = [];
       let currentHTMLRow = `<tr id="row ${r}">`;
       for (let c = 0; c < this.width; c++) {
           let newNodeId = `${r}-${c}`;
           let newNodeClass, newNode;
           if( r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)){
               newNodeClass = "start";
               this.start = `${newNodeId}`;
           } else if( r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)){
                newNodeClass = "target";
                this.target = `${newNodeId}`;
           } else{
                newNodeClass = "unvisited";
           }
           newNode = new Node(newNodeId, newNodeClass);
           currentArrayRow.push(newNode);
           currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
           this.nodes[`${newNodeId}`] = newNode;
       }
       this.boardArray.push(currentArrayRow);
       tableHTML += `${currentHTMLRow}</tr>`;
    }
    let tableMap = document.getElementById('tableMap');
    tableMap.innerHTML = tableHTML;
}

Board.prototype.addEventListeners = function(){
    let board = this;
    for (let r = 0; r < board.height; r++) {
      for (let c = 0; c < board.width; c++) {
            let currentId = `${r}-${c}`;
            let currentNode = board.getNode(currentId);
            let currentElement = document.getElementById(currentId);
           
            currentElement.onmousedown = (e) => {
                e.preventDefault();
                if (this.buttonsOn) {
                    board.mouseDown = true;
                    if(currentNode.status === "start" || currentNode.status === "target" || currentNode.status === "object"){
                        board.pressedNodeStatus = currentNode.status; 
                    } else{
                        board.pressedNodeStatus = "normal";
                        board.changeNormalNode(currrentNode);
                    }
                }
            }

            currentElement.onmouseup = () => {
                if(this.buttonsOn){
                    board.mouseDown = false;
                    if(board.pressedNodeStatus === "target") {
                        board.target = currentId;
                    } else if( board.pressedNodeStatus === "start"){
                        board.start = currentId;
                    } else if( board.pressedNodeStatus === "object"){
                        board.object = currentId;
                    }
                    board.pressedNodeStatus = "normal";
                }
            }

            currentElement.onmouseenter = () => {
                if (this.buttonsOn) {
                  if (board.mouseDown && board.pressedNodeStatus !== "normal") {
                    board.changeSpecialNode(currentNode);
                    if (board.pressedNodeStatus === "target") {
                      board.target = currentId;
                      if (board.algoDone) {
                        board.redoAlgorithm();
                      }
                    } else if (board.pressedNodeStatus === "start") {
                      board.start = currentId;
                      if (board.algoDone) {
                        board.redoAlgorithm();
                      }
                    } else if (board.pressedNodeStatus === "object") {
                      board.object = currentId;
                      if (board.algoDone) {
                        board.redoAlgorithm();
                      }
                    }
                  } else if (board.mouseDown) {
                    board.changeNormalNode(currentNode);
                  }
                }
              }
              currentElement.onmouseleave = () => {
                if (this.buttonsOn) {
                  if (board.mouseDown && board.pressedNodeStatus !== "normal") {
                    board.changeSpecialNode(currentNode);
                  }
                }
              }
            


      }
        
    }



    //console.log(board);
};

Board.prototype.getNode = function(id){
    let coordinates = id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
     return this.boardArray[r][c]; 
}


Board.prototype.changeNormalNode = function(currrentNode){
    let element = document.getElementById(currentNode.id);
    let relevantStatuses = ["start", "target", "object"];
    let unweightedAlgoritms = ["dfs", "bfs"];
    if(this.buttonsOn){
        if(!relevantStatuses.includes(currrentNode.status)){
            element.className = currrentNode.status !== "wall" ?
                "wall" : "unvisited";
            currrentNode.status = element.className !== "wall" ?
                "unvisited" : "wall";
            currrentNode.weight = 0;
       }
      }
      
};


Board.prototype.changeSpecialNode = function(currentNode) {
    let element = document.getElementById(currentNode.id), previousElement;
    if (this.previouslySwitchedNode) previousElement = document.getElementById(this.previouslySwitchedNode.id);
    if (currentNode.status !== "target" && currentNode.status !== "start" && currentNode.status !== "object") {
      if (this.previouslySwitchedNode) {
        this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
        previousElement.className = this.previouslySwitchedNodeWeight === 15 ?
        "unvisited weight" : this.previouslyPressedNodeStatus;
        this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15 ?
        15 : 0;
        this.previouslySwitchedNode = null;
        this.previouslySwitchedNodeWeight = currentNode.weight;
  
        this.previouslyPressedNodeStatus = currentNode.status;
        element.className = this.pressedNodeStatus;
        currentNode.status = this.pressedNodeStatus;
  
        currentNode.weight = 0;
      }
    } else if (currentNode.status !== this.pressedNodeStatus && !this.algoDone) {
      this.previouslySwitchedNode.status = this.pressedNodeStatus;
      previousElement.className = this.pressedNodeStatus;
    } else if (currentNode.status === this.pressedNodeStatus) {
      this.previouslySwitchedNode = currentNode;
      element.className = this.previouslyPressedNodeStatus;
      currentNode.status = this.previouslyPressedNodeStatus;
    }
  };
  







/* 
Table Load First Time
*/

// let w = (window.screen.availHeight % 25) +127;
// console.log(w);


// console.log(height);
// console.log(width);

// console.log(window.screen.availHeight);
// console.log(window.screen.width);
// console.log(window.screen.availWidth);





// let height = Math.floor((window.screen.availHeight) / 25);
// let width =  Math.floor((window.screen.availWidth / 25));

let height = 19;
let width = 45; 

let newBoard = new Board(height, width);
newBoard.initialize();

window.onkeydown = (e) => {
    newBoard.keyDown = e.keyCode;
}

window.onkeyup = (e) => {
    newBoard.keyDown = false;
}