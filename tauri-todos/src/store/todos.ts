import { atom } from 'jotai'
import { Todo } from '../types/todo'

/** filter type controls */
export const filterType = atom<'all' | 'completed' | 'active'>('all')

/** all todos contains deleted */
export const allTodosAtom = atom<Todo[]>([])

/** all undeleted todos */
export const todosAtom = atom<Todo[]>((get) => {
  const todos = get(allTodosAtom)
  return todos.filter((todo) => !todo.is_delete)
})

/** filtered todos */
export const filterAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => {
    if (get(filterType) === 'all') return true
    return todo.done === (get(filterType) === 'completed')
  })
})

/** active todos count */
export const activeTodoCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => !todo.done).length
})

/** is any todos done */
export const anyTodosDone = atom((get) => {
  const todos = get(todosAtom)
  return todos.some((todo) => todo.done)
})
