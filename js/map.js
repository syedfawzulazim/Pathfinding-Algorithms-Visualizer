

function Board(height, width) {
    this.height = height;
    this.width = width;
    this.start = null;
    this.target = null;
    this.object = null;
    this.boardArray = [];
    this.nodes = {};
    this.nodesToAnimate = [];
    this.objectNodesToAnimate = [];
    this.shortestPathNodesToAnimate = [];
    this.objectShortestPathNodesToAnimate = [];
    this.wallsToAnimate = [];
    this.mouseDown = false;
    this.pressedNodeStatus = "normal";
    this.previouslyPressedNodeStatus = null;
    this.previouslySwitchedNode = null;
    this.previouslySwitchedNodeWeight = 0;
    this.keyDown = false;
    this.algoDone = false;
    this.currentAlgorithm = null;
    this.currentHeuristic = null;
    this.numberOfObjects = 0;
    this.isObject = false;
    this.buttonsOn = false;
    this.speed = "fast";
  }

Board.prototype.initialize = function(){
    this.createGrid();
 //   this.addEventListeners();
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








let height = 15;
let width = 32;

let newBoard = new Board(height, width);
newBoard.initialize();

window.onkeydown = (e) => {
    newBoard.keyDown = e.keyCode;
        
}

window.onkeyup = (e) => {
    newBoard.keyDown = false;
}