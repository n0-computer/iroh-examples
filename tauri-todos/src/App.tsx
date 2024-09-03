import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import TodoList from './component/TodoList'
import OpenList from './component/OpenList'
import { allTodosAtom, filterAtom } from './store/todos'
import { Todo } from './types/todo'

function App() {
  const [, setAllTodos] = useAtom(allTodosAtom)
  const [todos] = useAtom(filterAtom)
  const [showOpenList, setShowOpenList] = useState(true);

  useEffect(() => {
    listen('update-all', (event) => {
      console.log("updating", event)
      getTodos()
    })
  }, [])

  async function createList() {
    console.log("create list");
    await invoke('new_list')
    console.log("in new_list and then")
    await getTodos()
    setShowOpenList(false)
  }

  async function joinList(ticket: string) {
    console.log("join list");
    await joinListInv(ticket);
    await getTodos();
    setShowOpenList(false);
  }

  async function joinListInv(ticket: string) {
    // this is the effect for the modal
    // otherwise just get-todos
    await invoke<Todo[]>('join_list', { ticket })
    await getTodos()
  }

  async function getTodos() {
    const res = await invoke<Todo[]>('get_todos')
    setAllTodos(res)
    setShowOpenList(false)
  }

  return (
    <div className="todoapp">
      {showOpenList && <OpenList createList={createList} joinList={joinList}/>}
      {!showOpenList && <TodoList todos={todos} />}
    </div>
  )
}

export default App
