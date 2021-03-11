import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default () => {
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

  const selectDeck = (i:number, deckData: Array<any>) => {
    store.removeFromLocalDecks(i)
    store.saveToLocalStorage()
    store.replaceDeck(deckData)
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
        <div style={{
          minHeight: '50vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '20px 100px',
          }}>
          {decks.map((deck:any, id:number) => {
            return (
              <div key={id} style={{
                flex: "0 24%",
                maxWidth: "180px",
                height: "200px",
                marginBottom: "2%", /* (100-24*5)/2 */
                border: "1px solid black"
              }}> 
                <ul>
                  <li>{deck.name}</li>
                  <li>Number of cards: {deck.cards.length}</li>
                </ul>
                <Link to={{
                    pathname:"/",
                    id: id
                  }}><button onClick={() => selectDeck(Number(id), deck)}>Select Deck</button></Link>
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