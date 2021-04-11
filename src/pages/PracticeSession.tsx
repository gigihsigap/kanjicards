import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar'

const {store} = require('../store.tsx');

let correctAnswers:any = [];
let wrongAnswers:any = [];

export default (props: any) => {
  const [answer, setAnswer] = useState('')
  const [useCard, setUseCard] = useState({
    kanji: '',
    hiragana: '',
    translate: [''],
  })
  const [state, setState] = useState({
    mode: props.location.mode,
    promptType: props.location.promptType,
    answerType: props.location.answerType,
    numOfCards: Number(props.location.numOfCards),
    outOfCards: false,
    showResult: true,
  })
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    correctAnswers = []
    wrongAnswers = []
    store.shuffleAllCards()
    store.setNumOfCards(state.numOfCards)
    const firstcard = store.drawCard()
    setUseCard(firstcard)
  }, [])

  const ifCorrect = () => {
    setScore(score + 1)
    correctAnswers.push(useCard)
  }

  const ifWrong = () => {
    const prompt:"kanji"|"hiragana"|"translate" = state.promptType
    const check:"kanji"|"hiragana"|"translate" = state.answerType
    let obj = {
      check: false,
      prompt: useCard[prompt],
      input: answer,
      correctAnswer: useCard[check],
    }
    if (prompt === "translate") obj.prompt = useCard.translate[0]
    if (check === "translate") obj.correctAnswer = useCard.translate.slice(0,2).join(', ')
    wrongAnswers.push(obj)
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
    
    (answer === correctAnswer || translations.includes(answer)) ? ifCorrect() : ifWrong()
    
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
      ? (<>
          <h1>Practice complete!</h1>
          <div style={{fontSize: '1.5em', margin: '0.5em 0'}}>You got {score} out of {state.numOfCards} cards correct!</div>
          <div>
            {(state.showResult)
            ? <button className="btn" onClick={() => (setState({...state, showResult: false}))}>Show Wrong Answers</button>
            : <button className="btn" onClick={() => (setState({...state, showResult: true}))}>Show Correct Answers</button>
            }
          </div>
          <div>
            {(state.showResult)
            ? <div style={{fontSize: '1.2em', margin: '0.5em 0'}}>You answered correct on these cards:</div>
            : <div style={{fontSize: '1.2em', margin: '0.5em 0'}}>... And here's where you can improve. Try again!</div>
            }
          </div>
          <div>
            {(state.showResult)
            ? (<>
              <div className="cardlist">
                {correctAnswers.map((card:any, id:number) => {
                  return (
                    <div key={id} className="resultcard" id="true">
                      <div className="kanji">{card.kanji}</div>
                      <div className="hiragana">({card.hiragana})</div>
                      <div className="translate">{card.translate.slice(0,2).join(', ')}</div>
                    </div>
                  )}
                )}
              </div>
            </>)
            : (<>
              <div className="cardlist">
              {wrongAnswers.map((card:any, id:number) => {
                return (
                  <div key={id} className="resultcard" id="false">
                    <div style={{fontSize: '2.3em', marginBottom: '0.05em'}}>{card.prompt}</div>
                    <div className="lefttext">Your answer: </div>
                    <div className="righttext">{card.input}</div>
                    <div className="lefttext">Correct answer: </div>
                    <div className="righttext">{card.correctAnswer}</div>
                  </div>
                )}
              )}
              </div>
            </>)}
          </div>
        </>)
      : (<div>
        <div style={{height:'20px'}}></div>
          <div className="largecard">
            <div>
              {(state.mode === "kanji") ? <>
                <div className="translate" style={{fontSize: '2.5em'}}>{useCard.translate[0]}</div>
              </> : ''}
            
              {(state.mode === "hiragana") ? <>
                <div className="kanji">{useCard.kanji}</div>
              </> : ''}
            
              {(state.mode === "translation") ? <>
                <div className="kanji">{useCard.kanji}</div>
                <div className="hiragana">{useCard.hiragana}</div>
              </> : ''}
            </div>
          </div>
          <div style={{margin:'1em 0'}}>
            What is the correct {state.mode} for this word?
          </div>
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