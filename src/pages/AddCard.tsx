import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const store = require('../store.tsx');

export default () => {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [translate, setTranslate] = useState('')

  const submitForm = async (e: any) => {
    e.preventDefault()
    // const token = localStorage.owner_token
    console.log(kanji, hiragana, translate)
    const obj:CardContent = {
      kanji,
      hiragana,
      translate:translate.split(',')
    }
    await store.currentDeck.addCard(obj)
  }
  
  return (
    <div>
      <Header />
        <h1>Add New Card</h1>
        <form>
          <label htmlFor="kanji">Kanji</label>
          <input type="text" id="kanji" name="kanji" onChange={(e) => setKanji(e.target.value)}/>
          <label htmlFor="hiragana">Hiragana</label>
          <input type="text" id="hiragana" name="hiragana" onChange={(e) => setHiragana(e.target.value)}/>
          <label htmlFor="translate">Translate</label>
          <input type="text" id="translate" name="translate" onChange={(e) => setTranslate(e.target.value)}/>
        </form>
        <button type="submit" onClick={(e) => submitForm(e)}>Save Card</button>
      <Footer/>
    </div>
  );
}