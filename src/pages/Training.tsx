import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const store = require('../store.tsx');

export default () => {
  const [answer, setAnswer] = useState('')
  const [useCard, setUseCard] = useState({
    kanji: '',
    hiragana: '',
    translate: [],
  })
  const [state, setState] = useState({
    outOfCards: false,
    notificationMessage: '',
    sessionSetting: 'default',
  })
  const [score, setScore] = useState(0)


  useEffect(() => {
    console.log('Use Effect jalan')

    // store.currentDeck.getFromLocalStorage()

    store.currentDeck.shuffleAllCards()
    const firstcard = store.currentDeck.drawCard()

    const obj = {
      outOfCards: false,
      notificationMessage: '',
      sessionSetting: 'kanji', // bisa diganti
    }
    console.log('First card', firstcard)
    setState(obj)
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
    // const token = localStorage.owner_token
    // console.log("Card infos are:", useCard)
    console.log("Your answer:", answer)
    if (!answer) return

    let correctAnswer = ''

    // Belum bikin kasus ketika mengecek translate (terutama cek answer)
    switch (state.sessionSetting) {
      case 'kanji':
        correctAnswer = useCard.kanji
        break
      case 'hiragana':
        correctAnswer = useCard.hiragana
        break
      default: break
    }

    (answer === correctAnswer.toLowerCase()) ? promptCorrect() : promptWrong()
    
    loadNextCard()

  }

  const loadNextCard = () => {
    let nextCard = store.currentDeck.drawCard()

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
        <h2>Your got {score} out of {store.currentDeck.currentSession.totalCount} correct</h2>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
          <h1>Train yourself! (default: kanji)</h1>
          <div style={{
            maxWidth: "180px",
            height: "200px",
            marginBottom: "2%", /* (100-24*5)/2 */
            border: "1px solid black"
          }}>
            <ul>
              {(state.sessionSetting === 'kanji') ? <li>{useCard.hiragana}</li> : ''}
              {(state.sessionSetting === 'hiragana') ? <li>{useCard.kanji}</li> : ''}
              {(state.sessionSetting === 'translate') ? <li>{useCard.kanji}</li> : ''}
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