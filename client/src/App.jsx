import { useState } from 'react';
import './App.css';

function App() {
  const [userList, setUserList] = useState([]);

  async function fetchDate() {
    consle.log("I am fetching");
    try {
      const res = await fetch("http://localhost:8000/api/users", {method: "GET"});
      if (!res.ok) throw Error("ntework responce was not ok:", res.status);
    } catch (error) {
      console.log("Error:", error);
    }

    const data = await res.json();
    setUserList(data);
  }

  return (
    <>
      <h1>Lista użytkowników</h1>
      <h2>Users:</h2>
      <button onClick={fetchDate}></button>
      <ul style={{listStyle: "none"}}>
        {
          userList.map(user => {
            return (<li key={user.id}>
              imię: {user.name},
              email: {user.email},
              wiek: {user.age}
            </li>);
          })
        }
      </ul>
    </>
  );
}

export default App;