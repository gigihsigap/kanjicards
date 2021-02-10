/// <reference types="react-scripts" />
type CompleteCard = {
  kanji: string,
  hiragana: string,
  translate: string
}
  
type Todo = {
  text: string
  complete: boolean
}

type ToggleTodo = (selectedTodo: Todo) => void