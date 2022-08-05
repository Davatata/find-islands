import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [badRows, setBadRows] = useState(true);
  const [badCols, setBadCols] = useState(true);

  useEffect(() => {

    function initializeValues() {
      document.getElementById("RowsInput").value = rows;
      document.getElementById("ColsInput").value = cols;
      setBadRows(false);
      setBadCols(false);
    }

    initializeValues();
  }, [rows, cols])

  const rowsMax = 10;
  const colsMax = 10;

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
    checkRowColValidity();
  }

  function handleColsChange(ev) {
    console.log("cols changed", ev.target.value);
    checkRowColValidity();
  }

  function checkRowColValidity() {
    console.log("validating");
    isRowsValid();
    isColsValid();
  }

  function isRowsValid() {
    var rowsValue = +document.getElementById("RowsInput").value;
    if (rowsValue > 0 && rowsValue <= rowsMax) {
      setBadRows(false);
    } else {
      setBadRows(true);
    }
  }

  function isColsValid() {
    var colsValue = +document.getElementById("ColsInput").value;
    if (colsValue > 0 && colsValue <= colsMax) {
      setBadCols(false);
    } else {
      setBadCols(true);
    }
  }

  function handleAlgoChange(ev) {
    console.log("algo changed", ev.target.value);
  }

  function handleSpeedChange(ev) {
    console.log("speed changed", ev.target.value);
  }

  function run() {
    console.log("start run");    
  }
  
  function randomize() {
    console.log("start randomize");
  }

  return (
    <div className="App">      
      <div className="App-container p-3">
        <div className="mx-4 my-2 help-button">
          <button className="btn btn-secondary">?</button>
        </div>
        <h2>Find Islands</h2>
        <div className='container form-container'>

          <div className='gap-3 justify-content-center row'>            
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Rows">Rows</span>
                <input id="RowsInput" type="number" className="form-control" min={1} max={10} placeholder="1-10" 
                  aria-label="Rows" aria-describedby="Rows" onChange={handleRowsChange}/>
                  { badRows &&
                    <div className="bad-input-text  fs-6 fst-italic" >
                      Must be 1-10
                    </div>
                  }
              </div>
            </div>
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Cols">Cols</span>
                <input id="ColsInput" type="number" className="form-control" min={1} max={10} placeholder="1-10" 
                  aria-label="Cols" aria-describedby="Cols" onChange={handleColsChange}/>
                  { badCols &&
                    <div className="bad-input-text  fs-6 fst-italic" >
                      Must be 1-10
                    </div>
                  }
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
                <button className="btn btn-secondary w-100" onClick={randomize}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                  </svg>
                  <span className='mx-1'></span>Random</button>
              </div>
            </div>
            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <button className="btn btn-success w-100" onClick={run} disabled={badCols || badRows}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                  
                  <span className='mx-1'></span>Run</button>
              </div>
            </div>   
          </div>

          <div className='row justify-content-center'>Grid placeholder</div>

        </div>    

          {/* Toast that gets shown when bad input values used */}
          {/* <div id='toastRowsColsError' aria-live="polite" aria-atomic="true" className="bg-dark position-relative toast">
            <div className="toast-container position-absolute p-3" id="toastPlacement">
              <div className="toast">
                <div className="toast-header">
                  <strong className="me-auto">Error</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body text-danger fw-bold">
                  Please enter rows/cols values between 1-10
                </div>
              </div>
            </div>
          </div>     */}
      
      </div>
    </div>


  );
}

export default App;
