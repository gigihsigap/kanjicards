import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import CardList from '../components/CardList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default () => {
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    // Bad code? Probably remove this because it means your code relies on both LS and store.tsx
    // let kanjicards = store.getFromLocalStorage()
    // if (kanjicards) setCards(kanjicards)
    // console.log('From local storage: "kanjicards"', kanjicards)
  }, [refresh])

  // const toggleTodo: ToggleTodo = selectedTodo => {
  //   const newTodos = todos.map(todo => {
  //     if (todo === selectedTodo) {
  //       return {
  //         ...todo,
  //         complete: !todo.complete
  //       }
  //     }
  //     return todo
  //   })
  //   setTodos(newTodos)
  // }

  const deleteCard = async (id: number) => {
    store.removeCard(id)
    setRefresh(!refresh);
  }
  
  return (
    <div>
      <Header />
      <div className="main-section" >
        <p>Your current deck is: {store.name}</p>
        <p>Manage your decks here:</p> <Link to="/deck-list" ><button>Manage Deck</button></Link>
        <Link to="/add-card" ><button>Add Card</button></Link>
        <Link to="/export-deck" ><button>Export Deck</button></Link>
        <CardList/>
        {/* <TodoList todos={todos} toggleTodo={toggleTodo}/> */}
        <div style={{
          minHeight: '50vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '20px 100px',
          }}>
          {store.cards.map((card:CardContent, id:number) => {
            return (
              <div key={id} style={{
                flex: "0 24%",
                maxWidth: "180px",
                height: "200px",
                marginBottom: "2%", /* (100-24*5)/2 */
                border: "1px solid black"
              }}> 
                <ul>
                  <li>{card.kanji}</li>
                  <li>{card.hiragana}</li>
                  <li>{card.translate.slice(0,2).join(', ')}</li>
                </ul>
                <Link to={{
                  pathname:"/edit-card",
                  cardData: card,
                  id: id
                }}><button>Edit</button></Link>
                <button onClick={() => deleteCard(id)}>Delete</button>
              </div>
            )}
          )}
        </div>
          
          
      </div>
      <Footer/>
    </div>
  );
}