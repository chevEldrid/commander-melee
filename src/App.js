import Grid from './components/grid';
import React, { useEffect } from 'react';
import CardsStore from './stores/CardsStore';

function App() {
  const cardsStore = new CardsStore();
  
  useEffect(() => {
    if (!cardsStore.cardsLoaded) {
      cardsStore.populateCards();
    }
  }, []);

  return (
    <div className="App">
      <Grid cardsStore={cardsStore}/>
    </div>
  );
}

export default App;
