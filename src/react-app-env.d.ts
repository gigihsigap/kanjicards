/// <reference types="react-scripts" />
type Todo = {
  text: string
  complete: boolean
}

type CardContent = {
  kanji: string;
  hiragana: string;
  translate: Array<string>;
}

type ToggleTodo = (selectedTodo: Todo) => void