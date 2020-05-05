import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"








function App() {
const deleteUser = (e, userId) => {
  e.preventDefault()
  axios
  .delete(`http://localhost:8000/api/users/${userId}`)
  .then(res => getUsers())
  //deletes and then update list
  .catch(err => console.log(err))
}

 const getUsers = () => {
  axios.get("http://localhost:8000/api/users")
  .then(res => setUsers(res.data))
  .catch(err => console.log(err))
 }

const [users, setUsers] = useState()

useEffect(() => {
  getUsers()
}, [])

const emptyForm = {
  name: "",
  bio: "",
}

const [formState, setFormState] = useState(emptyForm);
  
const handleSubmit = (e) => {
  e.preventDefault();
  axios
  .post("http://localhost:8000/api/users", formState)
  .then(res => getUsers())
  .catch(err => console.log(err))
  setFormState(emptyForm);
};

const handleChange = (e) => {
  e.persist();
  setFormState((previous) => ({
    ...previous,
    [e.target.name]: e.target.value,
  }));
};


  return (
    <div className="App">
      {users && users.map(user => <> <p>{user.name}</p> <p>{user.bio}</p> <button onClick={e => deleteUser(e, user.id) }>Delete User</button> </>)}
    <form>
    <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="User Name"
          />
        </label>
        <label htmlFor="bio">
          <input
            id="bio"
            type="text"
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            placeholder="Add A Short Bio"
          />
        </label>
      <button onClick={handleSubmit}>Add User</button>
    </form>
    </div>
  );
}

export default App;
