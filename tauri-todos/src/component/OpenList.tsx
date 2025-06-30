import { useState } from "react";

const OpenList: React.FC<{ createList: () => void, joinList: (ticket: string) => void }> = ({ createList, joinList}) => {
    const [ticket, setTicket] = useState('');
  return (
    <>
      <header className="header">
        <h1>todos</h1>
      </header>
      <footer className="footer" style={{ height:"auto"}}>
          <p style={{ fontWeight:400, padding:0, margin:0 }}>Open a new todo list or input a ticket to join an active one:</p>
          <div style={{margin:20, display: "flex", justifyContent:"center"}}>
            <div style={{width: 100}}>
                <a onClick={createList} style={{ color: "#b83f45", cursor: "pointer" }}>Create New List ⇨</a>
            </div>
          </div>
          <div style={{margin:20, display: "flex", justifyContent:"space-between"}}>
            <input style={
                { 
                    background: "#f5f5f5",
                    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e6e6e6",
                    flexGrow: 1,
                    paddingLeft: 10,
                    marginRight: 10,
                }} 
                value={ticket}
                onChange={(e) => { setTicket(e.target.value) }}
                type="text" 
                placeholder='input a ticket to join a list'
            />
            <a onClick={() => joinList(ticket)}style={{width: 110, cursor: "pointer", color:"#b83f45"}}>Join Using Ticket ⇨</a>
          </div>
      </footer>
    </>
  )
}
export default OpenList
