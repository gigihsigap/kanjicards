import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default (props: any) => {
  
  const [mode, setMode] = useState('translation')
  const [timer, setTimer] = useState('0')
  const [numOfCards, setNumOfCards] = useState('0')

  // const startPractice = () => {
    // Can't really figure out how to deal with querySelectorAll in TS
    // Will be dropping the hint selection feature
    // mode kanji -> hint translation
    // mode hiragana -> hint kanji
    // mode translation -> hint kanji + hiragana

    // const checkboxes = (document.querySelectorAll('input[type="checkbox"]:checked'))
    // const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    // const checkboxes = (document.getElementsByClassName('test') as HTMLInputElement)
    // let checkboxes = [...document.querySelectorAll('input[type="checkbox"]:checked')] <- works
    
    // console.log(checkboxes[0])
    // if (checkboxes.length < 1) {
    //   return // Show modal harus check minimal satu 
    // }
    // console.log(checkboxes[0])
    
    // props.history.push('/practice-session')
  // }

  const startPractice = () => {
    props.history.push({ 
      pathname: '/practice-session',
      numOfCards: numOfCards,
      mode: mode
     });
  }
  
  return (
    <div>
      <Header />
        <h1>Practice Settings</h1>

        <div className="form-group">
          <label className="control-label col-md-4" >Select practice mode:</label>
            <div className="col-md-6">
              <select onChange={(e) => {setMode(e.target.value)}} value={mode}>
                <option value="kanji" >Kanji</option>
                <option value="hiragana" >Hiragana</option>
                <option value="translation">Translation</option>
              </select>
            </div>
        </div>

        <div>
          Set timer
          <input type="number" onChange={(e) => setTimer(e.target.value)} />
        </div>

        <div>
          Set number of cards
          <input type="number" onChange={(e) => setNumOfCards(e.target.value)} />
        </div>

        
              {/* {(mode === 'kanji')
              ? (<>
                <input type="checkbox" value="hiragana" onChange={(e) => changeHint(e)}/> Hiragana
                <input type="checkbox" value="translations" onChange={(e) => changeHint(e)}/> Translations
              </>) : '' }
              {(mode === 'hiragana')
              ? (<>
                <input type="checkbox" value="kanji" onChange={(e) => changeHint(e)}/> Kanji
                <input type="checkbox" value="translations" onChange={(e) => changeHint(e)}/> Translations
              </>) : '' }
              {(mode === 'translation')
              ? (<>
                <input id="test" type="checkbox" checked value="kanji" onChange={(e) => changeHint(e)}/> Kanji
                <input id="test" type="checkbox" checked value="hiragana" onChange={(e) => changeHint(e)}/> Hiragana
              </>) : '' } */}
              
        <button onClick={() => {startPractice()}}>Start Practice!</button>
        <div style={{display:'none'}}>
          <button  onClick={() => console.log(localStorage.removeItem("kanjicards"))}>Remove Local Storage: KanjiCards</button>
          <button  onClick={() => console.log(localStorage.removeItem("kanjidecks"))}>Remove Local Storage: KanjiDecks</button>
          <button  onClick={() => console.log(localStorage.getItem("kanjicards"))}>Check Local Storage: KanjiCards</button>
          <button  onClick={() => console.log(localStorage.getItem("kanjidecks"))}>Check Local Storage: KanjiDecks</button>
        </div>
      <Footer/>
    </div>
  );
}
