import React, { useState } from 'react';
import Header from '../components/Header';

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
      <Header/>
        <h1>Create New Deck</h1>
        <div>
          <form>
            <label htmlFor="deckname">Deck Name</label>
            <input type="text" onChange={(e) => setDeckName(e.target.value)}/>
        <button type="submit" className="btn" onClick={(e) => submitForm(e)}>New Deck</button>
          </form>

        </div>
        <div>

        </div>

        <input type="file" id="selectFiles" onSubmit={() => console.log('Submit!')} />
        <button className="btn" id="import" onClick={() => uploadJSON()}>Click to Import Cards from JSON file</button>
        <textarea id="result" style={{width:'300px', height:'300px', marginTop: '1em'}}>
          
        </textarea>
      <div className="footer"></div>
    </div>
  );
}