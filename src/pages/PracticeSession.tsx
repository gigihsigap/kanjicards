import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar'

const {store} = require('../store.tsx');

export default (props: any) => {
  const [answer, setAnswer] = useState('')
  const [useCard, setUseCard] = useState({
    kanji: '',
    hiragana: '',
    translate: [''],
  })
  const [state, setState] = useState({
    mode: props.location.mode,
    numOfCards: Number(props.location.numOfCards),
    outOfCards: false,
  })
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)


  useEffect(() => {
    store.shuffleAllCards()
    store.setNumOfCards(state.numOfCards)
    const firstcard = store.drawCard()
    setUseCard(firstcard)
  }, [])

  const promptCorrect = () => {
    setScore(score + 1)
    console.log("You're correct!")
  }

  const promptWrong = () => {
    console.log("You're wrong!")
  }


  const checkAnswer = (e: any) => {
    e.preventDefault()
    if (!answer) return

    let correctAnswer = ''
    let translations = ['']

    switch (state.mode) {
      case 'kanji':
        correctAnswer = useCard.kanji
        break
      case 'hiragana':
        correctAnswer = useCard.hiragana
        break
      case 'translation':
        translations = useCard.translate
        break
      default: break
    }
    
    (answer === correctAnswer || translations.includes(answer)) ? promptCorrect() : promptWrong()
    
    
    const meter = (state.numOfCards-store.currentSession.deck.length)*100/state.numOfCards
    setProgress(meter)

    // Empties input form
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setAnswer('')

    loadNextCard()
  }

  const loadNextCard = () => {
    let nextCard = store.drawCard()

    if (nextCard !== undefined) {
      setUseCard(nextCard)
    }

    else {
      setState({...state, outOfCards: true})
    }
  }

  const cancelPractice = () => {
    props.history.push('/')
  }

  return (
    <div>
      <div className="header">
        <div className="score">
          <div>Timer:</div>
          <span>--</span>
        </div>
        <ProgressBar bgcolor="#6a1b9a" completed={progress}/>
        <div className="cancelpractice" onClick={cancelPractice}>
          X
        </div>
      </div>
      {(state.outOfCards)
      ? (<div>
          <h1>Practice complete!</h1>
          <h2>Your got {score} out of {state.numOfCards} cards correct!</h2>
        </div>)
      : (<div>
        <div style={{height:'20px'}}></div>
          <div className="largecard">
            <div>
              {(state.mode === "kanji") ? <div className="translate">{useCard.translate[0]}</div> : ''}
            
              {(state.mode === "hiragana") ? <div className="kanji">{useCard.kanji}</div> : ''}
            
              {(state.mode === "translation") ? <><div className="kanji">{useCard.kanji}</div><div className="hiragana">{useCard.hiragana}</div></> : ''}
            </div>
          </div>
          <div style={{margin:'1em 0'}}>What is the correct {state.mode} for this word?</div>
          <form style={{display:'flex', alignItems: 'center', flexFlow:'column'}} onSubmit={(e) => checkAnswer(e)}>
            <input
              type="text"
              id="answer"
              name="answer" 
              placeholder="Type your answer here!"
              onChange={(e) => setAnswer(e.target.value)}/> 
            <button className="btn" type="submit">Submit</button>
          </form>
        </div>)}
    </div>
  );
}