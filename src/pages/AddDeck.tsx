import React, { useState } from 'react';
import Header from '../components/Header';

const {store} = require('../store.tsx');

export default (props: any) => {
  const [deckName, setDeckName] = useState('')

  const submitForm = async (e: any) => {
    e.preventDefault()
    if (!deckName) { return }

    let obj = {
      name: deckName,
      cards: []
    }
    store.replaceDeck(obj)
    store.saveToLocalStorage()
    props.history.push("/")
  }

  const uploadJSON = () => {
    const selectFiles:any = document.getElementById('selectFiles')
    const files = selectFiles.files;
    // console.log(files);
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    
    fr.onload = function(e: any) { 
      // console.log('onload', e);
      if (!e.target.result) { return }
      const result = JSON.parse(e.target.result);
      const formatted = JSON.stringify(result, null, 2);
      const target:any = document.getElementById('result')
      target.value = formatted;

      let obj = {
        name: deckName,
        cards: result || []
      }
      store.replaceDeck(obj)
      store.saveToLocalStorage()
      props.history.push("/")
    }
    // console.log('readastext', fr)
    fr.readAsText(files.item(0));
  }
  
  return (
    <div>
      <Header/>
        <h1>Create New Deck</h1>
        <div>
          <form style={{display:'flex', alignItems: 'center', flexFlow:'column'}} onSubmit={(e) => submitForm(e)}>
            <input placeholder="Insert deck name here..." type="text" onChange={(e) => setDeckName(e.target.value)}/>
            <button type="submit" className="btn">Build New Deck</button>
          </form>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'column', maxWidth: '500px', margin: '0 auto'}}>
          <textarea id="result" style={{width:'250px', height:'250px', margin: '1em auto'}}>
          
          </textarea>
          <input style={{width: '300px', margin: '1em auto'}} type="file" id="selectFiles"/>
          <button style={{width: '300px', margin: '0 auto'}} className="btn" id="import" onClick={() => uploadJSON()}>Click to Import Cards from JSON file</button>
        </div>
    </div>
  );
}