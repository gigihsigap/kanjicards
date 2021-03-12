import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props:any) => {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [translate, setTranslate] = useState('')

  useEffect(() => {
    console.log('Use Effect jalan', props)
    // Harusnya kalau langsung ke edit, ganti halaman ke Add card
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
    // const token = localStorage.owner_token
    console.log(kanji, hiragana, translate)
    const obj:CardContent = {
      kanji,
      hiragana,
      translate:translate.split(',')
    }
    // Rapihin kode ini Pak
    // console.log(store.cards[props.location.id])
    store.cards[props.location.id].changeContent(obj)
    store.saveToLocalStorage()
  }
  
  return (
    <div>
      <Header />
        <h1>Edit Card</h1>
        <form>
          <label htmlFor="kanji">Kanji</label>
          <input type="text" id="kanji" name="kanji" value={kanji} onChange={(e) => setKanji(e.target.value)}/>
          <label htmlFor="hiragana">Hiragana</label>
          <input type="text" id="hiragana" name="hiragana" value={hiragana} onChange={(e) => setHiragana(e.target.value)}/>
          <label htmlFor="translate">Translate</label>
          <input type="text" id="translate" name="translate" value={translate} onChange={(e) => setTranslate(e.target.value)}/>
        </form>
        <button type="submit" onClick={(e) => submitForm(e)}>Save Card</button>
      <Footer/>
    </div>
  );
}