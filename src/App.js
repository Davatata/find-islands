import './App.css';


function App() {
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
                <span className="input-group-text" id="basic-addon1">Rows</span>
                <input type="number" className="form-control" min={1} max={10} placeholder="" aria-label="Rows" aria-describedby="basic-addon1" />
              </div>
            </div>

            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cols</span>
                <input type="number" className="form-control" min={1} max={10} placeholder="" aria-label="Cols" aria-describedby="basic-addon1" />
              </div>
            </div>
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className='col-5 p-0'>
              <div className="btn-group float-start w-100" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="Algo" id="Algo1" autoComplete="off" defaultChecked/>
                <label className="btn btn-outline-primary" htmlFor="Algo1">DFS</label>

                <input type="radio" className="btn-check" name="Algo" id="Algo2" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Algo2">BFS</label>           
              </div>
            </div>

            <div className='col-5 p-0 pb-3'>
                <div className="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed1" autoComplete="off" defaultChecked/>
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed1">1x</label>

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed2" autoComplete="off" />
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed2">2x</label>     

                  <input type="radio" className="btn-check" name="RunSpeed" id="RunSpeed3" autoComplete="off" />
                  <label className="btn btn-outline-primary" htmlFor="RunSpeed3">4x</label>      
                </div>
            </div>
          </div>

          <div className='gap-3 justify-content-center row'>
            <div className='col-5 p-0'>
              <div className="input-group mb-3 float-end">
                <button className="btn btn-secondary w-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                  </svg>
                  <span className='mx-1'></span>Random</button>
              </div>
            </div>  

            <div className='col-5 p-0'>
              <div className="input-group mb-3">
                <button className="btn btn-success w-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                  
                  <span className='mx-1'></span>Run</button>
              </div>
            </div>   
          </div>

          <div className='row justify-content-center'>Grid placeholder</div>

        </div>        
      </div>
    </div>
  );
}

export default App;
