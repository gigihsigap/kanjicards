import React, { useState, useEffect }  from 'react';

const {store} = require('../store.tsx');

export default (props: any) => {
  const [decks, setDecks] = useState([store])

  useEffect(() => {
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
    })
  }

  const removeDeck = (i: number) => {
    // TODO: Trigger modal?
    if (decks.length <= 1) { return } // TODO: Trigger modal cannot remove
    store.removeFromLocalDecks(i)
    let kanjidecks = store.getAllLocalDecks()
    setDecks(kanjidecks)
  }

  const routePrevent = (route: number) => {
    // This routing is specific to DeckList page
    // to prevent duplicates in local storage data
    // by selecting default deck before switching route
    store.removeFromLocalDecks(decks.length-1)
    store.saveToLocalStorage()
    store.replaceDeck(store)

    if (route === 1) props.history.push("/")
    if (route === 2) props.history.push("/practice-settings")
    if (route === 3) props.history.push("/add-deck")
    if (route === 4) props.history.push("/about")
    
  }

  return (
    <div>
      <div className="header">
        <a className="logo" onClick={() => routePrevent(1)}>
          Kanji Cards
        </a>
        <button className="btn" id="practice" onClick={() => routePrevent(2)}>
          Practice!
        </button>
      </div>
      
      <button onClick={() => routePrevent(3)} className="btn">
        Import Deck / Create New Deck
      </button>
      <div style={{margin: "1em"}}>
        Select a deck to study with:
      </div>
      <div className="main-section" >
        <div className="cardlist">
          {decks.map((deck:any, id:number) => {
            return (
              <div>
                <div key={id} className="smallcard"> 
                    <div style={{fontSize: '1.5em', fontWeight: 600, marginBottom: '0.2em'}}>{deck.name}</div>
                    <div>Number of cards: {deck.cards.length}</div>
                </div>
                <button className="btn" onClick={() => selectDeck(Number(id), deck)}>Select Deck</button>
                <button className="btn" onClick={() => removeDeck(Number(id))}>Remove Deck</button>
              </div>
            )}
          )}
        </div>
          
        
        
      </div>
      <div className="footer">
        <button onClick={() => routePrevent(4)}>?</button>
      </div>
    </div>
  );
}