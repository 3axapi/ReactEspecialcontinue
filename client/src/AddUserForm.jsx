import { useState } from "react";

const AddUserForm = () => {
    const [newUser, setNewUser] = useState({name: "", email: "", age: 0});

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                header: {"Content-type":"application/json"}
            });
        } catch (err) {
            console.error(`Some problems with youe fetch operation: ${{message: err.message}}`);
        }
    }

    return (
        <>
            <h5>Add a new user</h5>
            <form onSubmit={submitHandler}>
            <input type="text"
                placeholder="wprowadź imię użytkownika"
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})} />
            <input type="email"
                placeholder="email"
                value={newUser.email}
                onChange={e => setNewUser({...newUser, email: e.target.value})} />
            <input type="number"
                placeholder="wiek"
                value={newUser.age}
                onChange={e => setNewUser({...newUser, age: e.target.value})} />
            <button type="submit">Add User</button>
            </form>
        </>
    );
};

export default AddUserForm;