import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props: any) => {
  const [decks, setDecks] = useState([store])
  // const [refresh, setRefresh] = useState(true)

  useEffect(() => {

    // Previous code: can store new LS from zero, but still can't detect changes to the deck.
    // let kanjidecks = store.getAllLocalDecks()
    // kanjidecks ? setDecks(kanjidecks) : store.compileAllDecks()
    ////////////

    store.compileAllDecks()
    const kanjidecks = store.getAllLocalDecks()
    setDecks(kanjidecks)
  }, [])

  const selectDeck = (id:number, deckData: Array<any>) => {
    store.removeFromLocalDecks(id)
    store.saveToLocalStorage()
    store.replaceDeck(deckData)
    props.history.push({
      pathname:"/",
      id: id
    })
  }

  const removeDeck = (i: number) => {
    // Trigger modal
    if (decks.length <= 1) { return } // Trigger modal nggak boleh remove
    store.removeFromLocalDecks(i)
    let kanjidecks = store.getAllLocalDecks()
    setDecks(kanjidecks)
    // setRefresh(!refresh)
    
  }

  return (
    <div>
      <Header />
      <div className="main-section" >
        <div className="cardlist">
          {decks.map((deck:any, id:number) => {
            return (
              <div key={id} className="smallcard"> 
                  <div>{deck.name}</div>
                  <div>Number of cards: {deck.cards.length}</div>
                <button onClick={() => selectDeck(Number(id), deck)}>Select Deck</button>
                  <button onClick={() => removeDeck(Number(id))}>Remove Deck</button>
              </div>
            )}
          )}
        </div>
          
        <Link to="/add-deck" ><button>Create New Deck</button></Link>
        
      </div>
      <Footer/>
    </div>
  );
}