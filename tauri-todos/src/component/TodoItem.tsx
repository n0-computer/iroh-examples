import { useAtom } from 'jotai'
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { useDebouncedCallback } from 'use-debounce'
import { allTodosAtom } from '../store/todos'
import { Todo } from '../types/todo'
import { useDoubleClick } from '../hooks/useDoubleClick'
import { invoke } from '@tauri-apps/api/core'

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [, setTodos] = useAtom(allTodosAtom)
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const toggleDone = useDebouncedCallback(() => {
    invoke('toggle_done', { id: todo.id })
  }, 500)

  const setLabel = useDebouncedCallback((label: string) => {
    invoke('update_todo', {
      todo: { ...todo, label }
    })
  }, 500)

  const deleteTodo = useCallback(() => {
    invoke('delete', { id: todo.id })
  }, [todo])

  const onDelete = () => {
    setTodos((todos) => {
      return todos.filter((t) => {
        return t.id !== todo.id
      })
    })
    deleteTodo()
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const label = e?.target.value
    setTodos((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          setLabel(label)
          return { ...t, label }
        }
        return t
      })
    })
  }

  useClickAway(ref, () => {
    finishEditing()
  })

  const finishEditing = useCallback(() => {
    setEditing(false)
  }, [todo])

  const handleViewClick = useDoubleClick(null, () => {
    setEditing(true)
  })

  const onDone = useCallback(() => {
    setTodos((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          toggleDone()
          return { ...t, done: !t.done }
        }
        return t
      })
    })
  }, [todo.id])

  const onEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        finishEditing()
      }
    },
    [todo]
  )
  return (
    <li
      className={[editing && 'editing', todo.done && 'completed'].filter(Boolean).join(' ')}
      onClick={handleViewClick}
    >
      <div className="view">
        <input type="checkbox" className="toggle" checked={todo.done} onChange={onDone} autoFocus />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDelete}></button>
      </div>
      {editing && (
        <input
          ref={ref}
          type="text"
          autoFocus={true}
          value={todo.label}
          onChange={onChange}
          className="edit"
          onKeyDown={onEnter}
        />
      )}
    </li>
  )
}
export default TodoItem
