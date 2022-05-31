import Grid from './components/grid';
import React from 'react';
import CardsStore from './stores/CardsStore';

function App() {
  const cardsStore = new CardsStore();

  return (
    <div className="App">
      <Grid cardsStore={cardsStore}/>
    </div>
  );
}

export default App;
