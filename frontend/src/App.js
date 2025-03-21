import React, { useState, useEffect } from 'react'
import Axios from "axios";

const API_URL = "http://localhost:3001/api/users";

const App = () => {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await Axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      const response = await Axios.post(API_URL, newUser);
      setUsers([...users, response.data.newUser]);
      setNewUser({ name: "", email: "", password: "" });

      alert('User Added Successfully!')
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h1>CRUD OPERATIONS IN USER MANAGEMENT</h1>

      {/* Add User Form */}
      <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Enter name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

    </div>
  )
}

export default App