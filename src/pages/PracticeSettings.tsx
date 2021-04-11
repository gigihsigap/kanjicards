import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props: any) => {
  // TODO: Add timed practice feature
  // const [timer, setTimer] = useState('0')
  const [numOfCards, setNumOfCards] = useState(store.cards.length)

  const startPractice = (mode: string, promptType: string, answerType: string) => {
    // TODO: Show settings error message
    if (numOfCards > store.cards.length || numOfCards <= 0) { return }
    props.history.push({ 
      pathname: '/practice-session',
      numOfCards: numOfCards,
      promptType: promptType,
      answerType: answerType,
      mode: mode
     });
  }
  
  return (
    <div>
      <Header />
        <h1 style={{marginTop: '0.2em'}}>Choose a practice mode:</h1>
        <div style={{display: 'flex', maxWidth: '500px', margin: '0 auto', flexFlow: 'column'}}>
          
          <div className="settingoption" onClick={() => startPractice('translation', 'kanji', 'translate')}>
            Kanji + Hiragana → Translation
          </div>
          <div className="settingoption" onClick={() => startPractice('hiragana', 'kanji', 'hiragana')}>
            Kanji → Hiragana
          </div>
          <div className="settingoption" onClick={() => startPractice('kanji', 'translate', 'kanji')}>
            Translation → Kanji
          </div>
        </div>

        <h2>Other Settings:</h2>

        <div >
          Set number of cards: 
          <input style={{maxWidth: '2em', margin: '0 1em'}} type="number" onChange={(e) => setNumOfCards(e.target.value)} value={numOfCards} />
        </div>
              
      <Footer/>
    </div>
  );
}
