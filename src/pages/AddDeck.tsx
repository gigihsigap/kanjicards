import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default () => {
  const [deckName, setDeckName] = useState('')

  const submitForm = async (e: any) => {
    e.preventDefault()

    if (!deckName) { return }
    // const token = localStorage.owner_token
    // Gimana caranya supaya bisa import lewat masukin JSON, dan bisa bikin deck baru tanpa isi apapun
    // const importedDeck = JSON.parse(deckToImport)
    let obj = {
      name: deckName,
      cards: [{
        kanji: '',
        hiragana: '',
        translate: [''],
      }]
    }
    store.replaceDeck(obj)
    store.saveToLocalStorage()
  }

  const uploadJSON = () => {
    const selectFiles:any = document.getElementById('selectFiles')
    const files = selectFiles.files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    
    fr.onload = function(e: any) { 
      console.log(e);
      if (!e.target.result) { return }
      const result = JSON.parse(e.target.result);
      const formatted = JSON.stringify(result, null, 2);
      const target:any = document.getElementById('result')
      target.value = formatted;
    }
    console.log('readastext')
    fr.readAsText(files.item(0));
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
        <h2>Or you can IMPORT a deck here</h2>

        <input type="file" id="selectFiles" onSubmit={() => console.log('Submit!')} /><br />
        <button id="import" onClick={() => uploadJSON()}>Click to Import Cards</button>
        <textarea id="result">
          
        </textarea>
      <Footer/>
    </div>
  );
}