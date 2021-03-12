import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  const [score, setScore] = useState(0)


  useEffect(() => {
    console.log('Use Effect jalan', props)

    store.shuffleAllCards()
    store.setNumOfCards(state.numOfCards)
    const firstcard = store.drawCard()

    
    console.log('First card', firstcard)
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

  if (state.outOfCards) {
    return (
      <div>
        <Header />
        <h1>Training complete!</h1>
        <h2>Your got {score} out of {state.numOfCards} correct</h2>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
          
          <div className="largecard">
            <div>
              {(state.mode === "kanji") ? <div className="translate">{useCard.translate[0]}</div> : ''}
            
              {(state.mode === "hiragana") ? <div className="kanji">{useCard.kanji}</div> : ''}
            
              {(state.mode === "translation") ? <><div className="kanji">{useCard.kanji}</div><div className="hiragana">{useCard.hiragana}</div></> : ''}
            </div>
          </div>
          <div>Type down the right {state.mode}!</div>
          <form>
            <input type="text" id="answer" name="answer" onChange={(e) => setAnswer(e.target.value)}/>
          </form>
          <button type="submit" onClick={(e) => checkAnswer(e)}>Check Answer</button>
        <Footer/>
      </div>
    );
  }
}