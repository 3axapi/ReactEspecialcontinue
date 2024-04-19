import { useState } from "react";

const AddUserForm = ({updateUsersList}) => {
    const [newUser, setNewUser] = useState({name: "", email: "", age: 0});

    async function submitHandler(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", newUser.email);
        formData.append("name", newUser.name);
        formData.append("age", newUser.age);

        console.log("FormData value");
        for (let [key, values] of formData.entries) {
            console.log(`${key}: ${values}`);   
        }

        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(newUser) // będzie JSONem
            });

            if (!response.ok) throw new Error(`Network response was not ok ${response.status}`);
            const data = await response.json();
            console.log(`user added ${data}`);
            setNewUser({name: "", email: "", age: 0});
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