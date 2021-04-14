import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props: any) => {
  const [refresh, setRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    store.getFromLocalStorage()
    setIsLoading(false);
  }, [])

  useEffect(() => {}, [refresh])

  const addCard = () => {
    props.history.push({
      pathname:"/add-card"
    })
  }
  
  const editCard = (id: number, card: CardContent) => {
    props.history.push({
      pathname:"/edit-card",
      cardData: card,
      id: id
    })
  }

  const deleteCard = async (id: number) => {
    store.removeCard(id)
    store.saveToLocalStorage()
    setRefresh(!refresh);
  }

  return (
    <div>
      <Header />
      <div className="main-section" >
        Your current deck is: <span style={{fontSize: '1.2em', fontWeight: 550}}> {store.name}</span>
        <div className="button-links">
          <Link to="/practice-settings" >
            <button className="btn" id="practice">Practice!</button>
          </Link>
          <Link to="/deck-list" >
            <button className="btn">Manage Deck</button>
          </Link>
          <Link to="/add-card" >
            <button className="btn">Add Card</button>
          </Link>
          <Link to="/export-deck" >
            <button className="btn">Export Deck</button>
          </Link>
        </div>
        {(isLoading)
        ? ""
        : <div className="cardlist">
            {store.cards.map((card:CardContent, id:number) => {
              return (
                <div key={id} className="smallcard" >
                  <div onClick={() => editCard(id, card)}>
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
        }
      </div>
      <Footer/>
    </div>
  );
}
