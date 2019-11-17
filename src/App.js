import React from 'react';
import './App.css';
import Calculator from './components/calculator'
import MadeBy from './components/madeBy'
function App() {
  return (
    <div className="App">
      <Calculator className='main-app'/>
      <MadeBy />
    </div>
  );
}

export default App;
