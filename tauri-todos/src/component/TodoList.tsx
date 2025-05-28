import { useAtom } from 'jotai'
import { v4 as randomUUID } from 'uuid'
import { useState, useCallback, KeyboardEventHandler, useEffect } from 'react'
import { activeTodoCountAtom, allTodosAtom, anyTodosDone, filterType } from '../store/todos'
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'
import { invoke } from '@tauri-apps/api/core'

const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const [ticket, setTicket] = useState('');
  const [, setTodos] = useAtom(allTodosAtom)
  const [type, setType] = useAtom(filterType)
  const [activeCount] = useAtom(activeTodoCountAtom)
  const [anyDone] = useAtom(anyTodosDone)

  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    invoke<string>('get_ticket').then((res) => {
        console.log("get ticket");
        console.log(res);
        setTicket(res)
    })
  }, [])

  const addTodo = async (label: string, id: string) => {
    invoke('new_todo', { todo: { id, label, done: false, is_delete: false, created: 0 } })
  }

  const onAddTodo = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (newTodo) {
          const id = randomUUID()
          addTodo(newTodo, id)
          setTodos((oldTodos) => {
            return [...oldTodos, { label: newTodo, id, done: false } as Todo]
          })
          setNewTodo('')
        }
      }
    },
    [newTodo]
  )

  const onClearComplete = () => {
    setTodos((oldTodos) => {
      return oldTodos.filter((todo) => {
        const isDone = todo.done
        if (isDone) {
          invoke('delete', { id: todo.id })
          return false
        }
        return true
      })
    })
  }
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <a style={
          {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            color: "#b83f45",
            top: -30,
            cursor: "pointer",
          }
        } onClick={() => navigator.clipboard.writeText(ticket)}>Copy Ticket</a>
        <input
          type="text"
          className="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value)
          }}
          onKeyDown={onAddTodo}
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        <input type="checkbox" className="toggle-all" />
        <label htmlFor="togle-all"></label>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a onClick={() => setType('all')} className={type == 'all' ? 'selected' : ''}>
              All
            </a>
          </li>
          <li>
            <a onClick={() => setType('active')} className={type == 'active' ? 'selected' : ''}>
              Active
            </a>
          </li>
          <li>
            <a onClick={() => setType('completed')} className={type == 'completed' ? 'selected' : ''}>
              Completed
            </a>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearComplete}>
            Clear completed
          </button>
        )}
      </footer>
    </>
  )
}
export default TodoList
