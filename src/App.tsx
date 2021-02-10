import React, { useState } from 'react';
import './App.css';

import CardList from './components/CardList';
// import Counter from './components/Counter';
import Footer from './components/Footer';
import { TodoList } from './components/TodoList';
// import {Todo} from './types';

const initialTodos: Array<Todo> = [
  {text: "Walk the dog", complete: true},
  {text: "Write app", complete: false},
  {text: "Study kanji", complete: false},
]


const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos)

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete
        }
      }
      return todo
    })
    setTodos(newTodos)
  }
  

  

  const allCards = [
    {
      kanji: '1',
      hiragana: 'ichi',
      translate: ['one'],
    },
    {
      kanji: '2',
      hiragana: 'ni',
      translate: ['two'],
    }
  ]

  return (
    <div className="App" style={{margin: 0}}>
      <CardList/>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <Footer/>
    </div>
  );
}

export default App;


// Parameter "todo" must match the Todo type
  // The return value must match the Todo type
  // function toggleTodo(todo: Todo): Todo {
  //   return {
  //     text: todo.text,
  //     complete: !todo.complete
  //   }
  // }
