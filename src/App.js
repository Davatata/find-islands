import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [algo, setAlgo] = useState("DFS");
  const [speed, setSpeed] = useState(1);
  const [badRows, setBadRows] = useState(false);
  const [badCols, setBadCols] = useState(false);
  const [tempGrid, setTempGrid] = useState([]);
  const [finalGrid, setFinalGrid] = useState([]);
  const didMount = useRef(false);
  
  // Run everytime the rows or cols are changed.
  useEffect(() => {
    console.log("rows and cols changed", rows, cols);
    console.table("tempGrid: ", tempGrid);
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
  const baseSpeed = 200;
  const waterClasses = ['bg-primary'];
  const landClasses = ['bg-opacity-50', 'bg-warning'];

  const Algos = Object.freeze({
    DFS:   "DFS",
    BFS:   "BFS",
  });

  const Speeds = Object.freeze({
    Speed1: 1,
    Speed2: 2,
    Speed4: 4
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
      setBadRows(false);
      setRows(rowsValue);
    } else {
      setBadRows(true);
      setFinalGrid([]);
    }

  }

  function checkColValidity() {
    console.log("validating cols");
    var colsValue = getInputCols();
    if (isColsValid()) {
      setBadCols(false);
      setCols(colsValue);
    } else {
      setBadCols(true);
      setFinalGrid([]);
    }

  }

  function getInputRows() {
    return +document.getElementById("RowsInput").value;
  }

  function getInputCols() {
    return +document.getElementById("ColsInput").value;
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
    console.log("algo changed", ev.target.value);
    var algo = ev.target.value;
    setAlgo(algo);
  }

  function handleSpeedChange(ev) {
    console.log("speed changed", +ev.target.value);
    var speed = +ev.target.value;
    setSpeed(speed);
  }

  function run() {
    console.log("run traversal");

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

    // Iterate all the 0's and 1's and perform traversal
    // for (let i = 0; i < cellHolder.length; i++) {
    //   for (let j = 0; j < cellHolder[i].length; j++) {
    //     if (cellHolder[i][j].textContent === '0') {
    //       cellHolder[i][j].classList.remove(...landClasses);
    //       cellHolder[i][j].classList.add(...waterClasses);
    //     }
    //     else {
    //       cellHolder[i][j].classList.remove(...waterClasses);
    //       cellHolder[i][j].classList.add(...landClasses);
    //     }
    //   }
    // }

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
    console.log("post randomize grid", grid);
    setTempGrid(grid);
    console.log("post randomize tempGrid", tempGrid);
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
    console.log("pre-setup tempGrid", tempGrid);

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

    for(const [row, value] of tempGrid.entries()) {
      var tempRow = [];

      for(const [col, v] of value.entries()) {
        let updateClass = v === 0 ? waterClasses.join(" ") : landClasses.join(" ");
        tempRow.push(<td className={updateClass}
          onClick={() => toggleCell(row,col,v)} key={row+"-"+col}>{v}</td>);
      }

      finalGridTemp.push(<tr key={row}>{tempRow}</tr>);
    }

    setFinalGrid(finalGridTemp);
  }

  function toggleCell(row,col,v) {
    let grid = [...tempGrid];
    grid[row][col] = v === 0 ? 1 : 0;
    setTempGrid(grid);
  }

  function saveGrid(grid) {
    localStorage.setItem("grid", JSON.stringify(grid));
  }

  function getGrid() {
    return JSON.parse(localStorage.getItem("grid"));
  }

  return (
    <div className="App">      
      <div className="App-container p-3">
        <div className="mx-4 my-2 help-button">
          <button className="btn btn-secondary">?</button>
        </div>

        <h1 className="fs-2 fst-italic fw-bold text-uppercase">Find Islands</h1>

        <div className='container form-container mt-5'>
          <div className='gap-3 justify-content-center row'>            
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="RowsInput">Rows</label>
                <select className="form-select" id="RowsInput" onChange={handleRowsChange}>
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
                <select className="form-select" id="ColsInput" onChange={handleColsChange}>
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
                <input type="radio" className="btn-check" name="Algo" id="Algo1" autoComplete="off" value={Algos.DFS} defaultChecked/>
                <label className="btn btn-outline-primary" htmlFor="Algo1">{Algos.DFS}</label>

                <input type="radio" className="btn-check" name="Algo" id="Algo2" autoComplete="off" value={Algos.BFS}/>
                <label className="btn btn-outline-primary" htmlFor="Algo2">{Algos.BFS}</label>           
              </div>
            </div>
            <div className='col-5 p-0'>
                <div className="btn-group float-start w-100" role="group" aria-label="Basic radio toggle button group" onChange={handleSpeedChange}>
                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed1" autoComplete="off" defaultChecked 
                    value={Speeds.Speed1}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed1">{Speeds.Speed1}x</label>

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed2" autoComplete="off" 
                    value={Speeds.Speed2}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed2">{Speeds.Speed2}x</label>     

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed3" autoComplete="off" 
                    value={Speeds.Speed4}/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed3">{Speeds.Speed4}x</label>    
                </div>
            </div>
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className='col-5 p-0'>
              <div className="input-group mb-3 float-end">
                <button className="btn btn-outline-warning w-100" onClick={randomize} disabled={finalGrid.length === 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                  </svg>
                  <span className='mx-1'></span>Random</button>
              </div>
            </div>
            <div className='col-5 p-0'>
              <div className="input-group mb-3 float-end">
                <button className="btn btn-outline-info w-100" onClick={setBlank} disabled={badCols || badRows}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-border-all" viewBox="0 0 16 16">
                  <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z"/>
                </svg>
                <span className='mx-1'></span>Blank</button>
              </div>
            </div>   
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className="input-group mb-3">
              <button className="btn btn-success w-100" onClick={run} disabled={badCols || badRows || finalGrid.length === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
                
                <span className='mx-1'></span>Run</button>
            </div>
          </div>


        </div>

        <div className='container grid-container'>
          <div className='row justify-content-center'>
              <table id='islandGrid' className='table table-bordered table-dark'>
                <tbody>
                  {finalGrid}
                </tbody>
              </table>
            </div>
        </div>
      
      </div>
    </div>
  );
}

export default App;
