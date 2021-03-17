import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props: any) => {
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
    store.addCard(obj)
    props.history.push('/')
  }
  
  return (
    <div>
      <Header />
      <div className="main-section">
        <h1>Add New Card</h1>
          <form>
            <label htmlFor="kanji">Kanji</label>
            <input type="text" id="kanji" name="kanji" onChange={(e) => setKanji(e.target.value)}/>
            <label htmlFor="hiragana">Hiragana</label>
            <input type="text" id="hiragana" name="hiragana" onChange={(e) => setHiragana(e.target.value)}/>
            <label htmlFor="translate">Translate</label>
            <input type="text" id="translate" name="translate" onChange={(e) => setTranslate(e.target.value)}/>
          </form>
        <button type="submit" className="btn" onClick={(e) => submitForm(e)}>Save Card</button>
      </div>
        
      <Footer/>
    </div>
  );
}