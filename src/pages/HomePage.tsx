import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import CardList from '../components/CardList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddCard from './AddCard';

const {store} = require('../store.tsx');

export default (props: any) => {
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    // Bad code? Probably remove this because it means your code relies on both LS and store.tsx
    // let kanjicards = store.getFromLocalStorage()
    // if (kanjicards) setCards(kanjicards)
    // console.log('From local storage: "kanjicards"', kanjicards)
  }, [refresh])

  const addCard = () => {
    props.history.push({
      pathname:"/add-card"
    })
  }

  const deleteCard = async (id: number) => {
    store.removeCard(id)
    setRefresh(!refresh);
  }

  const editCard = (card: CardContent) => {
    props.history.push({
      pathname:"/edit-card",
      cardData: card
    })
  }
  
  return (
    <div>
      <Header />
      <div className="main-section" >
        <p>Your current deck is: {store.name}</p>
        <p>Manage your decks here:</p>
        <div className="button-links">
          <Link to="/deck-list" ><button>Manage Deck</button></Link>
          <Link to="/add-card" ><button>Add Card</button></Link>
          <Link to="/export-deck" ><button>Export Deck</button></Link>
        </div>
        <CardList/>
        <div className="cardlist">
          {store.cards.map((card:CardContent, id:number) => {
            return (
              <div key={id} className="smallcard" >
                <div onClick={() => editCard(card)}>
                  <div className="kanji">{card.kanji}</div>
                  <div className="hiragana">({card.hiragana})</div>
                  <div className="translate">{card.translate.slice(0,2).join(', ')}</div>
                </div>
                <div className="xbutton" onClick={() => deleteCard(id)}>x</div>
              </div>
            )}
          )}
          <div className="smallcard" onClick={() => addCard()}>
            <div className="plusbutton">+</div>
          </div>
        </div>
          
          
      </div>
      <Footer/>
    </div>
  );
}