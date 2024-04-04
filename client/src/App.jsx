import { useState } from 'react';
import AddUserForm from './AddUserForm';
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
      const res = await fetch(`http://localhost:8000/api/users/${userID}`, {method: "DELETE"});
      if (!res.ok) throw new Error("Error response is not ok");
      fetchDate()
    } catch (err) {
      console.log(`There was a problem with deleting the user: ${err.message}`)
    }
  }

  return (
    <>
      <h1>Lista użytkowników</h1>
      <h2>Users:</h2>
      <button onClick={fetchDate}>FetchMee</button>
      <ul style={{listStyle: "none"}}>
        {
          userList.map(user => { return (
            <li key={user.id} onClick={deleteUser}>
              imię: {user.name},
              email: {user.email},
              wiek: {user.age}
            </li>);
          })
        }
      </ul>
      <AddUserForm />
    </>
  );
}

export default App;