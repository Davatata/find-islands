import './App.css';


function App() {
  return (
    <div className="App">      
      <div className="App-container">
        <div className="mx-4 my-2 help-button">
          <button className="btn btn-secondary">?</button>
        </div>
        <h2>Find Islands</h2>
        <div className='container'>
          <div className='row'>Row input, col input, setup button</div>
          <div className='row'>dfs/bfs switch, random button</div>
          <div className='row'>1x/2x/4x switch</div>
          <div className='row'>Run Button</div>
          <div className='row'>Grid</div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
