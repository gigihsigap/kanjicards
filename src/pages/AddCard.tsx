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
    
    const obj:CardContent = {
      kanji,
      hiragana,
      translate:translate.split(',')
    }

    // Validate empty card
    if (kanji === '') { return }
    if (hiragana === '') { return }
    if (translate.length === 0) { return }

    store.addCard(obj)
    props.history.push('/')
  }
  
  return (
    <div>
      <Header />
      <div className="main-section">
        <h1>Add New Card</h1>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="largecard">
            <input type="text" style={{fontSize: '3em'}} placeholder="kanji" name="kanji" value={kanji} onChange={(e) => setKanji(e.target.value)}/>
            <input type="text" style={{fontSize: '1.5em'}} placeholder="hiragana" name="hiragana" value={hiragana} onChange={(e) => setHiragana(e.target.value)}/>
            <input type="text" style={{fontSize: '1em'}} placeholder="translation" name="translate" value={translate} onChange={(e) => setTranslate(e.target.value)}/>
          </div>
          <button type="submit" className="btn">Save Card</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}