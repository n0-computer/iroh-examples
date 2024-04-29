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

  function createList() {
    console.log("create list");
    invoke('new_list').then(() => {
      console.log("in new_list and then");
       getTodos(); 
       setShowOpenList(false);
    })
  }

  function joinList(ticket:string) {
    console.log("join list");
    setTicket(ticket);
    getTodos();
    setShowOpenList(false);
  }

  function setTicket(ticket: string) {
    // this is the effect for the modal
    // otherwise just get-todos
    invoke<Todo[]>('set_ticket', {ticket}).then((res) => {
      getTodos()
    })
  }

  function getTodos() {
    invoke<Todo[]>('get_todos').then((res) => {
      setAllTodos(res)
    }).then(()=> {
      setShowOpenList(false)
    })
  }

  return (
    <div className="todoapp">
      {showOpenList && <OpenList createList={createList} joinList={joinList}/>}
      {!showOpenList && <TodoList todos={todos} />}
    </div>
  )
}

export default App
