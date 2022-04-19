
let grid = new Set();
let newGrid = new Set();

let pixelSize = 8;

let evolutionFrameRate = 10;
let drawingFrameRate = 60;

// determines how many pixels a cell can live off-sceen
let treshold = 20;

let backgroundColor = "#203051";
let cellColor = "#b3dce0";


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(cellColor);
  strokeWeight(1);
  frameRate(evolutionFrameRate);
}


function liesWithinGrid(x, y) {
  return x > 0-treshold && x < width+treshold && y > 0-treshold && y < height+treshold;
}


function createLife(x, y) {
  
  let neighbours = 0;
  
  for (let xOffset=-1; xOffset < 2; xOffset++) {
    for (let yOffset=-1; yOffset < 2; yOffset++) {
      
      if (!(xOffset === 0 && yOffset === 0)) {
        neighbours += grid.has(`${x+xOffset} ${y+yOffset}`);
      }
      
    }
  }
  
  if (neighbours === 3 && liesWithinGrid(x, y)) {
    newGrid.add(`${x} ${y}`);
  }
}


function drawField() {
  
  for(let cell of grid) {
    
    let [x, y] = cell.split(" ");
    x = parseInt(x);
    y = parseInt(y);
    
    // first we draw the current pixel
    rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
  }
}


function updateField() {
  
  // clear the new field
  newGrid = new Set();
  
  for(let cell of grid) {
    let [x, y] = cell.split(" ");
    x = parseInt(x);
    y = parseInt(y);
    
    // then we check the neighbours to see if the cell is going to live this timestep
    let neighbours = 0;
    
    for (let xOffset=-1; xOffset < 2; xOffset++) {
      for (let yOffset=-1; yOffset < 2; yOffset++) {
        
        if (!(xOffset === 0 && yOffset === 0)) {
          if (grid.has(`${x+xOffset} ${y+yOffset}`)){
            neighbours++;
          } else {
            createLife(x+xOffset, y+yOffset);
          }
        }
        
      }
    }
    
    if (neighbours >= 2 && neighbours <= 3 && liesWithinGrid(x, y)) {
        newGrid.add(`${x} ${y}`);
    }
  }
  
  // update the field
  grid = newGrid;
}


function draw() {
  
  background(backgroundColor);
  drawField();
  
  if (mouseIsPressed) {
    
    frameRate(drawingFrameRate);
    grid.add(`${parseInt(mouseX/pixelSize)} ${parseInt(mouseY/pixelSize)}`);
    
  } else {
    
    frameRate(evolutionFrameRate);
    updateField();
    
  }
  
}