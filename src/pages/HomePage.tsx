import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import CardList from '../components/CardList';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { TodoList } from '../components/TodoList';

const store = require('../store.tsx');
  
// const initialTodos: Array<Todo> = [
//   {text: "Walk the dog", complete: true},
//   {text: "Write app", complete: false},
//   {text: "Study kanji", complete: false},
// ]

export default () => {
  // const [todos, setTodos] = useState(initialTodos)
  const [cards, setCards] = useState(store)
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    console.log('Use Effect jalan', cards)
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
    // const token = localStorage.owner_token
    console.log('Jalankan function deleteCard')
    store.currentDeck.removeCard(id)
    setRefresh(!refresh);
  }

  // Add new card
  // NOTE: bisa push ke array allCards, tapi harus refresh state?
  // Next: edit file JSON??? tapi kalau dipikir, kalau ganti jadi class, gak bisa pakai JSON
  // Ide fitur: ubah semua file menjadi bentuk JSON, dan terima file JSON

  // Shuffle card
  // Utility function to shuffle array
  // Using the Fisher-Yates shuffle
  // Thanks academia!


  // Final boss: game shuffling-nya
  
  return (
    <div>
      <Header />
      <div className="main-section" >
        <CardList/>
        {/* <TodoList todos={todos} toggleTodo={toggleTodo}/> */}
        <div style={{
          minHeight: '50vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '20px 100px',
          }}>
          {store.currentDeck.cards.map((card:CardContent, id:number) => {
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
                  pathname:"/edit",
                  cardData: card,
                  id: id
                }}><button>Edit</button></Link>
                <button onClick={() => deleteCard(id)}>Delete</button>
              </div>
            )}
          )}
        </div>
          
          <Link to="/add" ><button>Add Card</button></Link>
          <button onClick={() => store.currentDeck.shuffleAllCards()}>Shuffle</button>
      </div>
      <Footer/>
    </div>
  );
}