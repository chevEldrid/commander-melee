import React, { useEffect } from 'react';
import CardsStore from './stores/CardsStore';
import Frame from './components/frame';

function App() {
  const cardsStore = new CardsStore();
  
  useEffect(() => {
    if (!cardsStore.cardsLoaded) {
      cardsStore.populateCards();
    }
  }, []);

  return (
    <div className="App">
      <Frame cardsStore={cardsStore}/>
    </div>
  );
}

export default App;
