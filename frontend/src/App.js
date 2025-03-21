import React, { useState, useEffect } from 'react'
import Axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:3001/api/users";

const App = () => {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

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

  const openEditForm = (user) => {
    setEditUser(user._id);
    setEditForm({ name: user.name, email: user.email, password: user.password });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const response = await Axios.put(`${API_URL}/${editUser}`, editForm);
      setUsers(users.map(user => (user._id === editUser ? response.data.updatedUser : user)));
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await Axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div className='container'>
      <h1 className="text-center my-4">CRUD OPERATIONS IN USER MANAGEMENT</h1>

      {/* Add User Form */}
      <form className="border p-2 text-center" onSubmit={(e) => { e.preventDefault(); addUser(); }}>
        <h2 className="text-center my-4">Add User</h2>
        <div className='mb-3'>
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
        </div>
        <button type="submit" className="btn btn-success w-20">Add User</button>
      </form>

      {/* Edit User Form (Appears when edit button is clicked) */}
      {editUser && (
        <form className="border p-2 text-center"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser();
            alert("User Updated Successfully!");
          }}
        >
          <h2 className="text-center my-4">Edit User</h2>
          <div className='mb-3'>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Enter new name"
              required
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Enter new email"
              required
            />
            <input
              type="password"
              name="password"
              value={editForm.password}
              onChange={handleEditChange}
              placeholder="Enter new password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-20 mx-2">Update</button>
          <button type="button" className="btn btn-warning w-20 mx-2" onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}

      <br />
      <br />
      {/* List of Users in a Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button class="btn btn-info mx-2" onClick={() => openEditForm(user)}>Edit</button>
                <button class="btn btn-danger mx-2"onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App