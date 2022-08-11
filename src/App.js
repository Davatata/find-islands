import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import queue from "queue";

function App() {

  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [algo, setAlgo] = useState("DFS");
  const [speed, setSpeed] = useState(1);
  const [tempGrid, setTempGrid] = useState([]);
  const [finalGrid, setFinalGrid] = useState([]);
  const didMount = useRef(false);
  const [isTraversing, setIsTraversing] = useState(false);
  
  // Run everytime the rows or cols are changed.
  useEffect(() => {
    console.log("rows and cols changed", rows, cols);
    if (isColsValid() && isRowsValid()) {      
      setup();
    }
    
  }, [rows, cols]);

  // Run once to inizialize the page values.
  useEffect(() => {
    function initializeValues() {
      document.getElementById("RowsInput").value = rows;
      document.getElementById("ColsInput").value = cols;
      console.log("initializing values");
    }

    // Used to call initalizeValues() only once.
    if (!didMount.current) {
      didMount.current = true;
      initializeValues();
    }
    
  }, []);

  // When tempGrid is modified, call setup so page displays changes.
  useEffect(() => {
    console.log("tempGrid changed");
    setup();
    
  }, [tempGrid]);

  const rowsMax = 10;
  const colsMax = 10;
  const baseSpeed = 700;
  const waterClasses = ['cell', 'bg-primary'];
  const landClasses = ['cell', 'bg-opacity-50'];
  const seenLandClasses = ['cell', 'bg-opacity-50', 'bg-danger'];
  const seenPairs = new Set();
  const cellQueue = [];
  const landBgColor = "saddlebrown";
  const traversedBgColor = "seagreen";
  
  let timeoutID = "resetCellTimeout";

  const animationQueue = queue({ autostart: false, concurrency: 1 });
  

  const Algos = Object.freeze({
    DFS:   "DFS",
    BFS:   "BFS",
  });

  const Speeds = Object.freeze({
    Speed1_0: 1,
    Speed2_0: 2,
    Speed4_0: 4,
    Speed8_0: 8
  });

  function handleRowsChange(ev) {
    console.log("rows changed", ev.target.value);
    checkRowValidity();
  }

  function handleColsChange(ev) {
    console.log("cols changed", ev.target.value);
    checkColValidity();
  }

  function checkRowValidity() {
    console.log("validating rows");

    var rowsValue = getInputRows();

    if (isRowsValid()) {
      setRows(rowsValue);
    } else {
      setFinalGrid([]);
    }

  }

  function checkColValidity() {
    console.log("validating cols");
    var colsValue = getInputCols();
    if (isColsValid()) {
      setCols(colsValue);
    } else {
      setFinalGrid([]);
    }

  }

  function getInputRows() {
    return +document.getElementById("RowsInput").value;
  }

  function getInputCols() {
    return +document.getElementById("ColsInput").value;
  }

  function getInputSpeed() {
    return +$('input[name="RunSpeed"]:checked').value;
  }

  function getInputAlgo() {
    return $('input[name="Algo"]:checked').value;
  }

  function isRowsValid() {
    const rowsValue = getInputRows();
    return rowsValue > 0 && rowsValue <= rowsMax;
  }

  function isColsValid() {
    const colsValue = getInputCols();
    return colsValue > 0 && colsValue <= colsMax;
  }

  function handleAlgoChange(ev) {
    var algo = ev.target.value;
    setAlgo(algo);
  }

  function handleSpeedChange(ev) {
    var speed = +ev.target.value;
    setSpeed(speed);
  }

  function run() {
    setTimeout(runTraversal, 100);
  }

  function runTraversal() {
    var onesExist = $(".bg-opacity-50");

    // If no 1's in table, return
    if (onesExist.length === 0) {
      console.log("No 1's found");
      endRun();
      return;
    }

    console.log("run traversal");
    
    setIsTraversing(true);

    const matches = document.querySelectorAll("td");

    const cellHolder = [];
    let tempRow = [];

    // Store all nodes in a 2d array
    for (let i = 0; i <= matches.length; i++) {
      if (tempRow.length === cols) {
        cellHolder.push([...tempRow]);
        tempRow = [];
      }

      tempRow.push(matches[i]);
    }    

    if (algo === Algos.DFS) {
      traverseGridDFS(cellHolder);
    } else if (algo === Algos.BFS) {
      console.log("traverse BFS");
    }
    
    if (cellQueue.length === 0) {
      console.log("No 1's found: cellQueue was empty.");
      endRun();
      return;
    }

    const animateSpeed = baseSpeed / speed;
    const elementsToAnimate = [];

    cellQueue.forEach((pair) => {
      var cell = cellHolder[pair[0]][pair[1]];

      if (cell.textContent === '0') {
        console.error("Bad cell", pair);
      } else {
        elementsToAnimate.push(cell);
      }

    });    

    for (let i = 0; i < elementsToAnimate.length; i++) {
      const element = elementsToAnimate[i];

      if (element.textContent === '0') {
        console.error("0 in the elementsToAnimate")
      }

      animationQueue.push(() => {
        return new Promise((resolve) => {
          if (element.textContent === '1') {
            waitAnimation(element, resolve);
            animateElement(element, animateSpeed);
          }

          if(i === elementsToAnimate.length - 1) {            
            timeoutID = setTimeout(() => {
              console.log("Reached end of elementsToAnimate");
              endRun();
            }, 1000);
          }
        });
      });
    }

    animationQueue.start();
    cellQueue.length = 0;
    seenPairs.clear();    
  }


  function endRun() {
    console.log("ending run");
    setTimeout(resetCells, 200);
  }

  function forceEndRun() {
    clearTimeout(timeoutID);
    console.log("force stopping run");
    animationQueue.end();
    setTimeout(resetCells, 0);
  }
  
  function randomize() {
    console.log("start randomize");
    let grid = [];

    for (var i = 0; i < rows; i++) {
      grid[i] = [];
      for (var j = 0; j < cols; j++) {
        grid[i].push(Math.round(Math.random() * 1));
      }
    }

    setTempGrid(grid);
  }

  function setBlank() {
    console.log("filling with 0's");
    let grid = [];

    for (var i = 0; i < rows; i++) {
      grid[i] = [];
      for (var j = 0; j < cols; j++) {
        grid[i].push(0);
      }
    }

    setTempGrid(grid);
  }

  function setup() {
    // If grid is empty
    if (tempGrid && tempGrid.length === 0) {
      console.log("grid was empty, filling with 0's");
      for (let i = 0; i < rows; i++) {
        tempGrid[i] = [];
        for (let j = 0; j < cols; j++) {
          tempGrid[i].push(0);
        }
      }
    } 
    else {
      // If user selected a higher number or rows
      if (tempGrid.length < rows) {
        console.log("adding a row to grid");
        while (tempGrid.length < rows) {
          const colsArray = Array(cols).fill(0);
          tempGrid.push(colsArray);
        }
      } 
      // If user selected a lower numbeer of rows
      else if (tempGrid.length > rows) {
        console.log("removing a row from grid");
        while (tempGrid.length > rows) {
          tempGrid.pop();
        }
      }

      // If user selected a higher number or cols
      if (tempGrid[0].length < cols) {
        console.log("adding a col to grid");
        while (tempGrid[0].length < cols) {
          for (let j = 0; j < tempGrid.length; j++) {
            tempGrid[j].push(0);
          }
        }
      }
      // If user selected a lower numbeer of cols
      else if (tempGrid[0].length > cols) {
        console.log("removing a col from grid");
        while (tempGrid[0].length > cols) {
          for (let k = 0; k < tempGrid.length; k++) {
            tempGrid[k].pop();
          }
        }
      }
    }

    setupFinalGrid();
  }

  /**
   * Create the grid of 1's and 0's
   */
  function setupFinalGrid() {    
    var finalGridTemp = [];

    setTimeout(() => {
      resetCells();
    }, 0);
    

    for(const [row, value] of tempGrid.entries()) {
      var tempRow = [];

      for(const [col, v] of value.entries()) {
        let updateClass = v === 0 ? waterClasses.join(" ") : landClasses.join(" ");
        tempRow.push(<td style={{backgroundColor: landBgColor}} className={updateClass}
          onClick={() => toggleCell(row,col,v)} key={row+"-"+col}>{v}</td>);
      }

      finalGridTemp.push(<tr key={row}>{tempRow}</tr>);
    }

    setFinalGrid(finalGridTemp);
  }

  /**
   * Converts a cell's value.
   * @param {Specifies which row the cell is on. } row 
   * @param {Specifies which row the cell is on. } col 
   * @param {The previous value.} v 
   */
  function toggleCell(row,col,v) {
    let grid = [...tempGrid];
    grid[row][col] = v === 0 ? 1 : 0;
    setTempGrid(grid);
  }

  function setTempGridToSelf() {
    setTempGrid([...tempGrid]);
  }

  // function saveGrid(grid) {
  //   localStorage.setItem("grid", JSON.stringify(grid));
  // }

  // function getGrid() {
  //   return JSON.parse(localStorage.getItem("grid"));
  // }

  function traverseGridDFS(cellHolder) {
    for (let i = 0; i < cellHolder.length; i++) {
      for (let j = 0; j < cellHolder[i].length; j++) {
        if (cellHolder[i][j].textContent === '1' && !seenPairs.has(stringPair(i,j))) {
          seenPairs.add(stringPair(i,j));
          cellQueue.push([i,j]);
          islandHelperDFS(cellHolder, i, j);          
        }
      }
    }
  }

  function stringPair(x, y) {
    return `${x}_${y}`;
  }


  function islandHelperDFS(cellHolder, i, j) {
    // Check above current cell
    if (isValidPair(i+1, j)) {
      if (cellHolder[i+1][j].textContent === '1' && !seenPairs.has(stringPair(i+1,j))) {
        seenPairs.add(stringPair(i+1,j));
        cellQueue.push([i+1,j]);
        islandHelperDFS(cellHolder, i+1, j);
      }
    }
    // Check right of current cell
    if (isValidPair(i, j+1)) {
      if (cellHolder[i][j+1].textContent === '1' && !seenPairs.has(stringPair(i,j+1))) {
        seenPairs.add(stringPair(i,j+1));
        cellQueue.push([i,j+1]);
        islandHelperDFS(cellHolder, i, j+1);
      }
    }
    // Check below current cell
    if (isValidPair(i-1, j)) {
      if (cellHolder[i-1][j].textContent === '1' && !seenPairs.has(stringPair(i-1,j))) {
        seenPairs.add(stringPair(i-1,j));
        cellQueue.push([i-1,j]);
        islandHelperDFS(cellHolder, i-1, j);
      }
    }
    // Check left current cell
    if (isValidPair(i, j-1)) {
      if (cellHolder[i][j-1].textContent === '1' && !seenPairs.has(stringPair(i,j-1))) {
        seenPairs.add(stringPair(i,j-1));
        cellQueue.push([i,j-1]);
        islandHelperDFS(cellHolder, i, j-1);
      }
    }
  }

  function isValidPair(i, j) {
    if ( (i >= 0 && i < rows) && (j >= 0 && j < cols) ) {
      return true;
    }
  }

  function waitAnimation(element, callback) {
    const onAnimationEnd = () => {
      element.removeEventListener("webkitTransitionEnd", onAnimationEnd);
      callback();
    };
    element.addEventListener("webkitTransitionEnd", onAnimationEnd);
  };

  function animateElement(element, animateSpeed) {
    if (!element) return;

    if (element.textContent !== '1') {
      console.warn("Cell with '0' was added to aniamtion queue", element);
    } else {
      element.style.cssText = `      
        background-color: seagreen !important;
        transition: background-color ${animateSpeed}ms linear;
      `;
    }


  };

  function resetCells() {
    setIsTraversing(false); 
    cellQueue.length = 0;
    seenPairs.clear();

    const matches = document.querySelectorAll(`td`);

    matches.forEach(element => {
      element.style.cssText = '';

      if (element.textContent === '0') {
        element.classList = waterClasses.join(" ");
      } else {
        element.classList = landClasses.join(" ");
        element.style.backgroundColor = landBgColor;
      }

    });       
  }

  return (
    <div className="App">      
      <div className="App-container p-3">
        <div className="mx-4 my-2 help-button">
          <button className="btn btn-secondary" disabled={isTraversing}>?</button>
        </div>

        <h1 className="fs-2 fst-italic fw-bold text-uppercase">Find Islands</h1>

        <div className='container form-container mt-5'>
          <div className='gap-3 justify-content-center row'>            
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="RowsInput">Rows</label>
                <select className="form-select" id="RowsInput" onChange={handleRowsChange}
                  disabled={isTraversing}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>                  
                </select>
              </div>
            </div>
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="ColsInput">Cols</label>
                <select className="form-select" id="ColsInput" onChange={handleColsChange}
                  disabled={isTraversing}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>                  
                </select>
              </div>
            </div>
          </div>

          <div className='gap-3 justify-content-center row pb-3'>
            <div className='col-5 p-0'>
              <div className="btn-group float-start w-100" role="group" aria-label="Basic radio toggle button group" onChange={handleAlgoChange}>
                <input type="radio" className="btn-check" name="Algo" id="Algo1" 
                  autoComplete="off" value={Algos.DFS} defaultChecked disabled={isTraversing}/>
                <label className="btn btn-outline-primary" htmlFor="Algo1" title="Depth First Search (Up, Right, Down, Left)">{Algos.DFS}</label>

                <input type="radio" className="btn-check" name="Algo" id="Algo2" 
                  autoComplete="off" value={Algos.BFS} disabled={isTraversing}/>
                <label className="btn btn-outline-primary" htmlFor="Algo2" title="Breadth First Search">{Algos.BFS}</label>           
              </div>
            </div>
            <div className='col-5 p-0'>
                <div className="btn-group float-start w-100" role="group" aria-label="Basic radio toggle button group" onChange={handleSpeedChange}>
                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed1" autoComplete="off" defaultChecked 
                    value={Speeds.Speed1_0} disabled={isTraversing}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed1" title="1x Speed">{Speeds.Speed1_0}x</label>

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed2" autoComplete="off" 
                    value={Speeds.Speed2_0} disabled={isTraversing}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed2" title="2x Speed">{Speeds.Speed2_0}x</label>     

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed4" autoComplete="off" 
                    value={Speeds.Speed4_0} disabled={isTraversing}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed4" title="4x Speed">{Speeds.Speed4_0}x</label>

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed8" autoComplete="off" 
                    value={Speeds.Speed8_0} disabled={isTraversing}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed8" title="8x Speed">{Speeds.Speed8_0}x</label>    
                </div>
            </div>
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className='col-5 p-0'>
              <div className="input-group mb-3 float-end">
                <button className="btn btn-outline-warning w-100" onClick={randomize} 
                  disabled={isTraversing || finalGrid.length === 0} title="Randomize grid">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                  </svg>
                  <span className='mx-1'></span>Random</button>
              </div>
            </div>
            <div className='col-5 p-0'>
              <div className="input-group mb-3 float-end">
                <button className="btn btn-outline-info w-100" onClick={setBlank} 
                  disabled={isTraversing} title="Set all cells to 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-border-all" viewBox="0 0 16 16">
                  <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z"/>
                </svg>
                <span className='mx-1'></span>Blank</button>
              </div>
            </div>   
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className="input-group mb-3">
              {!isTraversing &&               
                <button className="btn btn-success w-100" onClick={run} 
                disabled={isTraversing || finalGrid.length === 0} title="Traverse the grid">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>               
                  <span className='mx-1'></span>Run</button>
              }
              {isTraversing &&               
                <button className="btn btn-warning w-100" onClick={forceEndRun} 
                  title="Stop traversing">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stop-fill" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                  </svg>              
                  <span className='mx-1'></span>Stop</button>
              }
            </div>
          </div>


        </div>

        <div className='container grid-container'>
          <div className='row justify-content-center'>
              <table id='islandGrid' className='table table-bordered table-dark'
                disabled={isTraversing}>
                <tbody>
                  {finalGrid}
                </tbody>
              </table>
            </div>
        </div>
      
        {isTraversing && 
          <div>RUNNING</div>
        }

      </div>
    </div>
  );
}

export default App;
