import { useEffect, useState } from 'react'
import axios from "axios"

const AddList = () => {
    const [userList, setUserList] = useState([])

    async function fetchDate() {
        console.log("I am fetching")
        try {
            const responce = await axios.get("http://localhost:8000/api/users")
            setUserList(responce.data)
            if (!responce.ok) throw Error(`network responce was not ok: ${responce.status}`)

            const data = await responce.json()
            setUserList(data)
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const deleteUser = async (userID) => {
        const confirmation = window.confirm("Czy chcesz skasować użytkownika")

        if (!confirmation) return

        try {
            const res = await axios.delete(`http://localhost:8000/api/users/${userID}`)
            if (!res.ok) throw new Error("Error response is not ok")
            fetchDate()
        } catch (err) {
            console.log(`There was a problem with deleting the user: ${err.message}`)
        }
    }

    useEffect(() => {
        fetchDate()
    }, [])

    return (
        <>
            <h1>Lista użytkowników</h1>
            <h2>Users:</h2>
            <button onClick={fetchDate}>Fetch</button>
            <ul style={{listStyle: "none"}}>
            {
                userList.map(user => { return (
                <>
                    <li key={user._id} onClick={() => deleteUser(user._id)}>
                    imię: {user.name},
                    email: {user.email},
                    wiek: {user.age}
                    </li>
                    <img src="./assets/react.svg"/>
                </>
                )})
            }
            </ul>
        </>
    )
}


export default AddList;