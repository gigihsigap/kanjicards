import React from 'react'
import { TodoListItem } from './TodoListItem'

interface Props {
    todos: Array<Todo>;
    toggleTodo: ToggleTodo;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
    return (
        <ul>
            {todos.map(todo => {
                return <TodoListItem todo={todo} toggleTodo={toggleTodo}/>
            })}
        </ul>
    )
}