import { useState } from "react";

const AddUserForm = ({updateUsersList}) => {
    const [newUser, setNewUser] = useState({name: "", email: "", age: 0});

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                header: {"Content-type":"application/json"},
                body: JSON.stringify(newUser) // będzie JSONem
            });

            if (!response.ok) throw new Error(`Network response was not ok ${response.status}`);
            const data = await response;
            console.log(`user added ${data}`);
            setNewUser({name: "", email: "", age: 0});
        } catch (err) {
            console.error(`Some problems with youe fetch operation: ${{message: err.message}}`);
        }
    }

    function onChangeHandler(event, title) {
        console.log(event.target.value);
        setNewUser({...newUser, name: event.target.value})
    }

    return (
        <>
            <h5>Add a new user</h5>
            <form onSubmit={submitHandler}>
            <input type="text"
                placeholder="wprowadź imię użytkownika"
                value={newUser.name}
                onChange={onChangeHandler /*e => setNewUser({...newUser, name: e.target.value})*/} />
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