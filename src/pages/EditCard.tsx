import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props:any) => {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [translate, setTranslate] = useState('')

  useEffect(() => {
    let obj = {
      kanji: '',
      hiragana: '',
      translate: ['']
    }

    let cardData = props.location.cardData || obj
    setKanji(cardData.kanji)
    setHiragana(cardData.hiragana)
    setTranslate(cardData.translate.join(','))
  }, [])

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
    
    store.cards[props.location.id].changeContent(obj)
    store.saveToLocalStorage()
    props.history.push({
      pathname:"/"
    })
  }

  const deleteCard = async (id: number) => {
    store.removeCard(id)
    store.saveToLocalStorage()
    props.history.push({
      pathname:"/"
    })
  }
  
  return (
    <div>
      <Header />
        <h1>Edit Card</h1>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="largecard">
            <input
              className="kanji"
              type="text"
              style={{fontSize: '3em'}}
              placeholder="kanji"
              name="kanji"
              value={kanji}
              onChange={(e) => setKanji(e.target.value)}/>
            <input
              className="hiragana"
              type="text"
              style={{fontSize: '1.5em'}}
              placeholder="hiragana"
              name="hiragana"
              value={hiragana}
              onChange={(e) => setHiragana(e.target.value)}/>
            <input
              className="translate"
              type="text"
              style={{fontSize: '1em'}}
              placeholder="translation"
              name="translate"
              value={translate}
              onChange={(e) => setTranslate(e.target.value)}/>
          </div>
          <button type="submit" className="btn">Save Card</button>
        </form>
        <button className="btn" onClick={() => deleteCard(props.location.id)}>Delete Card</button>
      <Footer/>
    </div>
  );
}