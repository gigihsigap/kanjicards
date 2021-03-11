import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default () => {
  const [deckName, setDeckName] = useState('')

  const submitForm = async (e: any) => {
    e.preventDefault()
    let obj = {
      name: deckName,
      cards: [{
        kanji: '',
        hiragana: '',
        translate: [''],
      }]
    }
    console.log('HHHHHHHHHHH')
    store.replaceDeck(obj)
    // store.compileAllDecks()
    store.saveToLocalStorage()
  }
  
  return (
    <div>
      <Header />
        <h1>Add New Deck</h1>
        <form>
          <label htmlFor="deckname">Deck Name</label>
          <input type="text" id="kanji" name="kanji" onChange={(e) => setDeckName(e.target.value)}/>
        </form>
        <button type="submit" onClick={(e) => submitForm(e)}>Create New Deck</button>
      <Footer/>
    </div>
  );
}