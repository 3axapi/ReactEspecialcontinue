import { useState } from 'react';
import './App.css';

function App() {
  const [userList, setUserList] = useState([]);

  async function fetchDate() {
    consle.log("I am fetching");
    try {
      const res = await fetch("http://localhost:8000/api/users", {method: "GET"});
      if (!res.ok) throw Error(`network responce was not ok: ${res.status}`);

      const data = await res.json();
      setUserList(data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const deleteUser = async (userID) => {
    const confirmation = window.confirm("Czy chcesz skasować użytkownika");

    if (!confirmation) return

    try {
      const res = await fetch(`http://localhost:8000/api/users/:${userID}`, {method: "DELETE"});
      if (!res.ok) throw new Error("Error response is not ok");
    } catch (err) {
      console.log()
    }
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