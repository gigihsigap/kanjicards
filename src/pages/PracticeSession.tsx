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
    outOfCards: false,
    notificationMessage: '',
    mode: props.location.mode,
  })
  const [score, setScore] = useState(0)


  useEffect(() => {
    console.log('Use Effect jalan', props)

    // store.getFromLocalStorage()

    store.shuffleAllCards()
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
        <h2>Your got {score} out of {store.currentSession.totalCount} correct</h2>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
          <h1>Train yourself! (Mode: {state.mode})</h1>
          <div style={{
            maxWidth: "180px",
            height: "200px",
            marginBottom: "2%", /* (100-24*5)/2 */
            border: "1px solid black"
          }}>
            <ul>
              {(state.mode === 'kanji') ? <p>{useCard.translate[0]}</p> : ''}
              {(state.mode === 'hiragana') ? <p>{useCard.kanji}</p> : ''}
              {(state.mode === 'translation') ? <div><p>{useCard.kanji}</p><p>{useCard.hiragana}</p></div> : ''}
            </ul>
          </div>
          <form>
            <input type="text" id="answer" name="answer" onChange={(e) => setAnswer(e.target.value)}/>
          </form>
          <button type="submit" onClick={(e) => checkAnswer(e)}>Check Answer</button>
        <Footer/>
      </div>
    );
  }
}